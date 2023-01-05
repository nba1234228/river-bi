<template>
  <div class="card-design-view">
    <div class="name">
      <a-input
        v-show="inputShow"
        class="name-input"
        ref="cardNameInput"
        v-model:value="cardName"
        size="small"
        @blur="onCardNameBlur"
        placeholder="请输入"
      />
      <p v-show="!inputShow">
        <span class="text">{{ cardName }}</span>
        <rb-icon @click="onCardNameEdit" type="icon_rb-edit" />
      </p>
    </div>
    <div class="view" :style="style">
      <component
        v-if="
          axes.dim?.value?.length ||
          axes.measure?.value?.length ||
          axes.legend?.value?.length ||
          staticJson?.seriesData
        "
        :is="curComp"
        :options="curOptions"
      ></component>
      <div class="empty" v-else>
        <rb-icon type="icon_rb-empty" />
        <span class="text">暂无数据</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  watch,
  computed,
  ref,
  shallowRef,
  nextTick,
} from 'vue';
import { useStore } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
import { getMateriel } from '@/core/materielList';
import {
  getStyleProps,
  transformStyleToOption,
  responseHandle,
  GetAxes,
  TransformChart,
  TransformAxesToEchartData,
  TransformStaticJsonToEchartData,
} from '@/global/preUtils';

export default defineComponent({
  name: 'CardDesignView',
  components: {},
  props: {
    style: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    const { proxy } = getCurrentInstance() as any;
    const store = useStore();
    const inputShow = ref(false);
    const curComp: any = shallowRef();
    const chartType = computed(
      () => store.state.cardDesign.card.cardInfo.chartType,
    );
    const dataSourceType = computed(
      () => store.state.cardDesign.card.cardInfo.dataSourceType,
    );
    const defaultOption = ref({});
    const isNeedInit = computed(() => store.state.cardDesign.isNeedInit);
    const cardInfo = computed(() => store.state.cardDesign.card.cardInfo);
    const axes = computed(() => store.state.cardDesign.card.axes);
    const onCardNameEdit = () => {
      inputShow.value = true;
      const el = proxy.$refs.cardNameInput;
      nextTick(() => {
        el.focus();
      });
    };
    const onCardNameBlur = () => {
      inputShow.value = false;
    };
    const cardName = computed({
      get: () => cardInfo.value.cardName,
      set: (val) => (cardInfo.value.cardName = val),
    });
    const curOptions = ref<any>({});
    const setMaterielOption = async () => {
      const materiel = getMateriel(chartType.value);
      const component = await materiel?.component();
      curComp.value = component?.default;
      const options = await materiel?.options();
      curOptions.value = cloneDeep(options?.default);
      defaultOption.value = cloneDeep(options?.default);
      return materiel;
    };

    watch(
      () => chartType.value,
      async (type, val) => {
        if (type) {
          if (isNeedInit.value) {
            // 异步获取组件，不能提前，否则导致isNeedInit失效
            const materiel = await setMaterielOption();
            // 初始化默认配置样式；编辑时不能重设style，否则会覆盖配置的样式
            const style = getStyleProps(chartType.value, materiel);
            store.commit('cardDesign/SetStyles', style);
            if (dataSourceType.value === 'staticJson') {
              const staticJson = await materiel?.staticJson();
              store.commit('cardDesign/SetStaticJson', staticJson?.StaticJson);
            } else if (dataSourceType.value === 'dataset') {
              // 图表转换
              const preAxes = store.state.cardDesign.preAxes;
              const axes = TransformChart(type, preAxes);
              // 需先设置样式数据
              store.commit('cardDesign/SetAxes', axes);
            }
          } else {
            await setMaterielOption();
            transformStyleToOption(
              curOptions.value,
              store.state.cardDesign.card.styles,
            );
          }
        }
      },
      { deep: true, immediate: true },
    );

    // 监听样式面板改变
    watch(
      () => store.state.cardDesign.card.styles,
      (newVal, val) => {
        transformStyleToOption(curOptions.value, newVal);
      },
      { deep: true, immediate: true },
    );

    // 监听静态json改变
    const staticJson = computed(() => store.state.cardDesign.card.staticJson);
    watch(
      () => store.state.cardDesign.card.staticJson,
      async (val) => {
        if (val?.seriesData && dataSourceType.value === 'staticJson') {
          if (!curOptions.value || !Object.keys(curOptions.value).length) {
            await setMaterielOption();
          }
          curOptions.value = TransformStaticJsonToEchartData(
            chartType.value,
            curOptions.value,
            val,
            defaultOption.value,
          );
        }
      },
    );

    // 轴信息改变调接口
    const getAsixParams = (val: any, axis: any, cardId: string) => {
      const { axisLabel, axisLocation, value } = axis;
      const axisValue = value.map((it: any, idx: number) => {
        return {
          ...it,
          cardId,
          axisLocation,
          axisLabel,
          pos: idx,
        };
      });
      val.push(...axisValue);
    };
    watch(
      [
        () => store.state.cardDesign.card.axes.dim,
        () => store.state.cardDesign.card.axes.measure,
        () => store.state.cardDesign.card.axes.legend,
        () => store.state.cardDesign.card.axes.filtrate,
      ],
      async ([dim, measure, legend, filtrate]) => {
        const val: any = [];
        const cardId = store.state.cardDesign.card.cardInfo.cardId;
        // 组装axes数组
        dim?.value?.length && getAsixParams(val, dim, cardId);
        measure?.value?.length && getAsixParams(val, measure, cardId);
        legend?.value?.length && getAsixParams(val, legend, cardId);
        filtrate?.value?.length && getAsixParams(val, filtrate, cardId);
        if (cardId) {
          // if (val && val.length) {
          // 保存轴数据
          const res1 = await store.dispatch('cardDesign/saveAxes', {
            cardId,
            axes: val,
          });
          // 切换数据源类型时，清空轴数据
          if (dataSourceType.value !== 'dataset') return;
          responseHandle(res1, async () => {
            const res = await store.dispatch('root/getChartData', {
              cardId,
            });
            responseHandle(res, () => {
              curOptions.value = TransformAxesToEchartData(
                chartType.value,
                curOptions.value,
                res,
                defaultOption.value,
              );
            });
          });
        }
      },
      { deep: true, immediate: true },
    );

    return {
      inputShow,
      cardName,
      curOptions,
      curComp,
      axes,
      staticJson,
      onCardNameBlur,
      onCardNameEdit,
    };
  },
});
</script>

<style lang="less" scoped>
.card-design-view {
  flex: 1;
  height: 100%;
  .flexColumn(flex-start, flex-start);
  .name {
    flex: 0;
    width: 100%;
    margin-bottom: 8px;
    line-height: 24px;
    text-align: left;
    .rb-icon {
      margin-left: 8px;
      color: @rb-label-color;
    }
    .name-input {
      width: 320px;
    }
    .text {
      font-weight: 600;
    }
  }
  .view {
    flex: 1;
    width: 100%;
    max-height: calc(100% - 32px);
    padding-top: 16px;
    background-color: @rb-body-background;
    .empty {
      width: 100%;
      height: 100%;
      .flexColumn(center, center);
      .rb-icon {
        font-size: 120px;
        cursor: auto;
      }
      .text {
        color: @rb-disabled-color;
      }
    }
  }
}
</style>
