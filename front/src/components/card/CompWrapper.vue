<template>
  <LazyWrapper>
    <div
      :class="[
        'comp-wrapper',
        isActive ? 'is-active' : '',
        curStyle.componentStyle,
      ]"
      :style="curStyle"
      @click="onWrapperClick"
    >
      <template v-if="itemData.cardId">
        <div class="top" :style="{ display: curTitleStyle?.display }">
          <span class="top-title" :style="curTitleStyle">
            {{ headline?.name }}
          </span>
        </div>
        <div class="content">
          <component
            v-if="curComp"
            :is="curComp"
            :options="curOptions"
          ></component>
        </div>
      </template>
      <template v-else>
        <component
          v-if="curComp"
          :is="curComp"
          :itemData="itemData"
        ></component>
      </template>
      <!-- <div class="bottm">社交化扩展</div> -->
      <action-bar
        :itemData="itemData"
        :useMode="useMode"
        class="action-bar"
      ></action-bar>
      <tab-move
        v-if="useMode === 'design'"
        :rowHeight="rowHeight"
        :xMargin="xMargin"
        :yMargin="yMargin"
        :colWidth="colWidth"
        :itemData="itemData"
        :formType="formType"
        class="tab-move"
      ></tab-move>
      <BigScreen
        v-if="curStyle.componentStyle"
        :componentStyle="curStyle.componentStyle"
      ></BigScreen>
    </div>
  </LazyWrapper>
</template>

<script lang="ts">
import {
  defineComponent,
  shallowRef,
  ref,
  computed,
  watchEffect,
  inject,
} from 'vue';
import { useStore } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
import eventBus from '@/core/eventBus';
import {
  transformStyle,
  setCompopnentStyle,
  transformStyleToOption,
  TransformAxesToEchartData,
  TransformStaticJsonToEchartData,
  responseHandle,
  GetAllGlobalFilterValue,
} from '@/global/preUtils';
import { getMateriel } from '@/core/materielList';
import LazyWrapper from '@/components/gridLayout/LazyWrapper.vue';
import ActionBar from '@/components/card/ActionBar.vue';
import TabMove from '@/components/gridLayout/TabMove.vue';
import BigScreen from '@/components/common/bigScreen/Index.vue';

export default defineComponent({
  name: 'CompWrapper',
  components: {
    LazyWrapper,
    ActionBar,
    TabMove,
    BigScreen,
  },
  props: {
    comps: {
      type: Array,
      default: () => [],
    },
    colWidth: {
      type: Number,
      default: 0,
    },
    itemData: {
      type: Object,
      default: () => ({}),
    },
    formType: {
      type: String,
      default: '',
    },
    useMode: {
      type: String,
      default: 'design',
    },
    rowHeight: {
      type: Number,
      default: 0,
    },
    xMargin: {
      type: Number,
      default: 0,
    },
    yMargin: {
      type: Number,
      default: 0,
    },
  },
  setup(props, context) {
    const store = useStore();
    const updateActivityCompId: any =
      props.useMode === 'design' ? inject('updateActivityCompId') : () => '';
    const getActivityCompId: any =
      props.useMode === 'design' ? inject('getActivityCompId') : () => '';
    const activityCompId = computed(() => getActivityCompId?.());
    const isActive = computed(
      () => activityCompId.value === props.itemData.dataId,
    );
    const headline: any = ref({});
    const curOptions: any = ref({});
    const basic: any = ref({});
    const curComp: any = shallowRef();
    const curStyle: any = ref({});
    const curTitleStyle: any = ref({});
    const defaultOption = ref({});

    watchEffect(() => {
      if (props.itemData.dataId) {
        headline.value = props.itemData.foreignConfig.styles?.headline ?? {};
        basic.value = props.itemData.foreignConfig.styles?.basic ?? {};
        curStyle.value = transformStyle(basic.value);
        setCompopnentStyle(curStyle);
        curTitleStyle.value = transformStyle(headline.value);
      }
    });

    // console.log('打印：', 222222222222); 监听导致懒加载不生效
    watchEffect(async () => {
      let type = props.itemData.componentType;
      if (props.itemData.componentType === 'card') {
        type = props.itemData.props.cardInfo.chartType;
      }
      const materiel = getMateriel(type);
      if (!materiel) return;
      const component = await materiel?.component();
      curComp.value = component?.default;
      const options = await materiel?.options();
      curOptions.value = cloneDeep(options?.default);
      defaultOption.value = cloneDeep(options?.default);
      if (props.itemData.componentType === 'card') {
        transformStyleToOption(curOptions.value, props.itemData.props.styles);
        if (props.itemData.props.cardInfo.dataSourceType === 'staticJson') {
          curOptions.value = TransformStaticJsonToEchartData(
            type,
            curOptions.value,
            props.itemData.props.staticJson,
            defaultOption.value,
          );
        } else if (props.itemData.props.cardInfo.dataSourceType === 'dataset') {
          // 拿到所有筛选器组件，找出与自己关联的，传值到后端。要优化成支持多个值
          const filters = GetAllGlobalFilterValue(
            props.comps,
            props.itemData.dataId,
          );
          const res = await store.dispatch('root/getChartData', {
            cardId: props.itemData.props.cardInfo.cardId,
            filters,
          });
          responseHandle(res, () => {
            curOptions.value = TransformAxesToEchartData(
              type,
              curOptions.value,
              res,
              defaultOption.value,
            );
          });
        }
      }
    });

    const onWrapperClick = (ev: Event) => {
      ev.stopPropagation();
      if (props.useMode !== 'design') return;
      updateActivityCompId(props.itemData.dataId);
    };

    eventBus.on('global-filter-change', async (data: any) => {
      const { relatedCompId } = data;
      if (relatedCompId.includes(props.itemData.dataId)) {
        const filters = GetAllGlobalFilterValue(
          props.comps,
          props.itemData.dataId,
        );
        const res = await store.dispatch('root/getChartData', {
          cardId: props.itemData.props.cardInfo.cardId,
          filters,
        });
        const type = props.itemData.props.cardInfo.chartType;
        responseHandle(res, () => {
          curOptions.value = TransformAxesToEchartData(
            type,
            curOptions.value,
            res,
            defaultOption.value,
          );
        });
      }
    });

    return {
      isActive,
      curComp,
      curStyle,
      curTitleStyle,
      headline,
      curOptions,
      onWrapperClick,
    };
  },
});
</script>

<style lang="less">
@keyframes fluxayRainbow {
  0% {
    background-position: 0;
  }
  100% {
    background-position: calc(100vw * 50);
  }
}
</style>
<style lang="less" scoped>
.comp-wrapper {
  .flexColumn(space-between, flex-start);
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  border: 1px solid @rb-border-color-base;
  background-color: @rb-body-background;
  overflow-y: auto;
  overflow-x: hidden;
  &.is-active {
    box-shadow: 0 0 5px @rb-primary-color;
    // transform: scale(1.01);
  }
  &.technology {
    border-image-source: url('../../assets/imgs/border-card.png');
  }
  &.technology2 {
    border-image-source: url('../../assets/imgs/border-title.png');
  }
  &.technology3 {
    border-image-source: url('../../assets/imgs/border-title3.png');
  }
  &.technology4 {
    border-image-source: url('../../assets/imgs/border-title4.png');
  }
  &.lightSensation {
    background: url('../../assets/imgs/border-title2.png') no-repeat !important;
    background-position: 0 0;
    background-size: 100% 30px !important;
  }
  .action-bar,
  .tab-move {
    display: none;
  }
  &:hover {
    .action-bar,
    .tab-move {
      display: block;
    }
  }
  .top {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 0 16px;
    .top-title {
      width: 100%;
    }
  }
  .content {
    flex: 1;
    width: 100%;
    // max-height: calc(100% - 30px);
  }
  .bottm {
    width: 100%;
    height: 30px;
    line-height: 30px;
    padding: 0 20px;
  }
}
</style>
