<template>
  <div class="card-list">
    <div class="left">
      <div class="item" v-for="it in typeList" :key="it.type">
        <span
          @click="chartType = it.type"
          class="text"
          :class="{ active: chartType === it.type }"
        >
          {{ it.label }}
        </span>
      </div>
    </div>
    <div class="right">
      <template v-if="getCategoryList.length">
        <template v-for="card in getCategoryList" :key="card.cardId">
          <CardItem :card="card" v-model:checkList="curCheckList" />
        </template>
      </template>
      <div class="empty" v-else>
        <rb-icon type="icon_rb-empty" />
        <span class="text">暂无数据</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref, shallowRef } from 'vue';
import { useStore } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
import { materielList, getMateriel } from '@/core/materielList';
import {
  transformStyleToOption,
  TransformAxesToEchartData,
  TransformStaticJsonToEchartData,
  responseHandle,
} from '@/global/preUtils';
import CardItem from '@/components/card/CardItem.vue';

export default defineComponent({
  name: 'CardList',
  components: {
    CardItem,
  },
  props: {
    checkList: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    const store = useStore();
    const curComp: any = shallowRef();
    const list = ref([]);
    const curCheckList = computed({
      get: () => props.checkList,
      set: (val) => context.emit('update:checkList', val),
    });
    const chartType = ref('table');
    const defaultOption = ref({});
    onBeforeMount(async () => {
      const res = await store.dispatch('root/getCardList');
      responseHandle(res, () => {
        list.value = res.data;
      });
    });
    const typeList = materielList.filter((it) => it.componentType === 'card');
    const getCategoryList = computed(() => {
      return list.value.filter((it: any) => {
        return it.chartType === chartType.value;
      });
    });
    const getOption = async (it: any) => {
      const type = it.chartType;
      const materiel = getMateriel(type);
      const component = await materiel?.component();
      curComp.value = component?.default;
      const options = await materiel?.options();
      let curOptions = cloneDeep(options?.default);
      defaultOption.value = cloneDeep(options?.default);
      transformStyleToOption(curOptions, it.styles);
      if (it.dataSourceType === 'staticJson') {
        curOptions = TransformStaticJsonToEchartData(
          type,
          curOptions.value,
          it.staticJson,
          defaultOption.value,
        );
      } else if (it.dataSourceType === 'dataset') {
        const res = await store.dispatch('root/getChartData', {
          cardId: it.cardId,
        });
        responseHandle(res, () => {
          curOptions = TransformAxesToEchartData(
            type,
            curOptions,
            res,
            defaultOption.value,
          );
        });
      }
      return curOptions;
    };

    return {
      typeList,
      curCheckList,
      chartType,
      getCategoryList,
      curComp,
      getOption,
    };
  },
});
</script>

<style lang="less" scoped>
.card-list {
  .flexRow(flex-start, flex-start);
  height: 100%;
  .left {
    padding: 16px;
    background-color: @rb-background-color;
    height: 100%;
    overflow-y: auto;
    .item {
      margin-bottom: 4px;
      cursor: pointer;
      &:last-child {
        margin-bottom: 0;
      }
      .text {
        &.active {
          color: @rb-primary-color;
        }
      }
    }
  }
  .right {
    .flexRow(space-between, flex-start);
    position: relative;
    flex: 1;
    flex-wrap: wrap;
    padding: 16px;
    height: 100%;
    overflow-y: auto;
    .empty {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
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
