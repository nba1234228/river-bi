<template>
  <div class="filter-summary">
    <h3 class="title">筛选汇总</h3>
    <div class="content">
      <div class="item">
        <span class="name">字段</span>
        <p class="value">{{ bizItem.fieldName }}</p>
      </div>
      <div class="item">
        <span class="name">列表筛选</span>
        <p class="value">{{ listFilterDesc }}</p>
      </div>
      <div class="item">
        <span class="name">TopN筛选</span>
        <p class="value">{{ topFilterDesc }}</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { ActionLabelValueMap } from '@/components/cardDesign/constant';

export default defineComponent({
  name: 'FiltrateModal',
  components: {},
  props: {
    bizItem: {
      type: Object,
      default: () => ({}),
    },
    filtrateCondition: {
      type: Object,
      default: () => ({}),
    },
    fieldMember: {
      type: Array,
      default: () => [],
    },
    fields: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    const actionLabelValueMap: any = ActionLabelValueMap;
    const listFilterDesc = computed(() => {
      const { valueType, selectKey } = props.filtrateCondition.listFilter || {};
      if (valueType === 'all') return '全部';
      switch (valueType) {
        case 'all':
          return '全部';
        case 'included':
          return `选择了${selectKey.length}个（共${props.fieldMember.length}个）`;
        case 'excluded':
          return `排除了${selectKey.length}个（共${props.fieldMember.length}个）`;
        default:
          return '';
      }
    });
    const topFilterDesc = computed(() => {
      const { valueType, topFilterId, aggregationType, extremaType, limit } =
        props.filtrateCondition.topFilter || {};
      if (valueType === 'none') return '无';
      const aggregationTxt = actionLabelValueMap[aggregationType];
      const extremaTxt = actionLabelValueMap[extremaType];
      const field: any = props.fields.find(
        (it: any) => it.fieldId === topFilterId,
      );
      return `${extremaTxt}${limit}个（按${field?.fieldName}${aggregationTxt}）`;
    });

    return {
      listFilterDesc,
      topFilterDesc,
    };
  },
});
</script>

<style lang="less" scoped>
.filter-summary {
  width: 240px;
  .title {
    line-height: 45px;
    padding: 0 16px;
    border-bottom: 1px solid @rb-border-color-base;
  }
  .content {
    padding: 16px;
    .item {
      .flexRow(flex-start, flex-start);
      line-height: 22px;
      margin-bottom: 8px;
      .name {
        flex: 0 0 78px;
        color: @rb-text-color-secondary;
      }
    }
  }
}
</style>
