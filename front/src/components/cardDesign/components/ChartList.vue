<template>
  <div class="chart-list">
    <h3 class="title">{{ $t(`chartType.chart`) }}</h3>
    <ul class="list">
      <li
        class="item"
        :class="{
          'is-active': item.type === chartType,
          disabled: item.disabled,
        }"
        v-for="item in list"
        :key="item.type"
        :title="item.tip"
        @click="onChartTypeChange(item)"
      >
        <rb-icon class="icon" :type="item.icon"></rb-icon>
        <span class="name">{{ $t(`chartType.${item.type}`) }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { materielList } from '@/core/materielList';

export default defineComponent({
  name: 'ChartList',
  setup() {
    const store = useStore();
    const chartType = computed(
      () => store.state.cardDesign.card.cardInfo.chartType,
    );
    const list = computed(() => {
      const axes = store.state.cardDesign.card.axes;
      let cardList = materielList.filter((it) => it.componentType === 'card');
      cardList = cardList.map((card) => {
        // 有维度时，不能转多值图和仪表盘
        // 有多个度量时，不能转仪表盘
        // 简单表有多个维度时，不能转其他
        // 饼图、环形图只能一个维度和一个度量
        if (
          (axes.dim?.value?.length &&
            ['multivalue', 'gauge'].includes(card.type)) ||
          (axes.measure?.value?.length > 1 && ['gauge'].includes(card.type)) ||
          (axes.dim?.value?.length > 1 && card.type !== 'table') ||
          (axes.measure?.value?.length > 1 &&
            ['pie', 'ring', 'nightingale'].includes(card.type))
        ) {
          card.disabled = true;
        } else {
          card.disabled = false;
        }
        return card;
      });
      return cardList;
    });

    const onChartTypeChange = (item: any) => {
      if (item.disabled) return;
      store.commit('cardDesign/SetPreAxes', store.state.cardDesign.card.axes);
      store.commit('cardDesign/SetChartType', item.type);
    };

    return {
      chartType,
      list,
      onChartTypeChange,
    };
  },
});
</script>

<style lang="less" scoped>
.chart-list {
  padding: 16px 16px 0;
  color: @rb-text-color-secondary;
  .title {
    margin-bottom: 9px;
    text-align: left;
    line-height: 22px;
    font-weight: 600;
  }
  .list {
    .flexRow(space-between , flex-start);
    flex-wrap: wrap;
    &::after {
      content: '';
      width: 64px;
      height: 0;
    }
    .item {
      .flexColumn();
      width: 64px;
      margin-bottom: 12px;
      cursor: pointer;
      &.is-active {
        .icon {
          border-color: @rb-primary-color;
        }
      }
      &.disabled {
        opacity: 0.5;
        cursor: no-drop;
        .rb-icon {
          cursor: no-drop;
        }
      }
      .icon {
        font-size: 40px;
        line-height: 30px;
        border-radius: 4px;
        border: 1px solid transparent;
      }
      .name {
        padding-top: 4px;
        font-size: 12px;
        line-height: 20px;
        white-space: nowrap;
      }
    }
  }
}
</style>
