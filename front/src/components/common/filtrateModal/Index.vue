<template>
  <a-modal
    :visible="visible"
    :title="title"
    :keyboard="false"
    :maskClosable="false"
    :width="760"
    :centered="true"
    :destroyOnClose="true"
    wrapClassName="filtrate-modal"
    @ok="onOk"
    @cancel="onCancel"
  >
    <div class="filter-content">
      <div v-if="bizItem.isMeasure" class="filter-measure">
        <MeasureFilter
          v-model:filtrateCondition="curFiltrateCondition.measureFilter"
        />
      </div>
      <div v-else class="filter-dims">
        <a-tabs class="filter-dims-tab" v-model:activeKey="tabKey">
          <a-tab-pane key="list-filter" tab="列表筛选">
            <TabListFilter
              :fields="fields"
              :fieldMember="fieldMember"
              v-model:filtrateCondition="curFiltrateCondition.listFilter"
            />
          </a-tab-pane>
          <a-tab-pane key="top-filter" tab="TopN筛选">
            <TabTopFilter
              :fields="fields"
              :fieldMember="fieldMember"
              v-model:filtrateCondition="curFiltrateCondition.topFilter"
            />
          </a-tab-pane>
        </a-tabs>
        <FilterSummary
          :fields="fields"
          :fieldMember="fieldMember"
          :bizItem="bizItem"
          :filtrateCondition="curFiltrateCondition"
        />
      </div>
    </div>
  </a-modal>
</template>
<script lang="ts">
import { computed, defineComponent, ref, watch, watchEffect } from 'vue';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import cloneDeep from 'lodash/cloneDeep';
import { responseHandle } from '@/global/preUtils';
import TabListFilter from '@/components/common/filtrateModal/TabListFilter.vue';
import TabTopFilter from '@/components/common/filtrateModal/TabTopFilter.vue';
import MeasureFilter from '@/components/common/filtrateModal/MeasureFilter.vue';
import FilterSummary from '@/components/common/filtrateModal/FilterSummary.vue';

export default defineComponent({
  name: 'FiltrateModal',
  components: {
    TabListFilter,
    TabTopFilter,
    MeasureFilter,
    FilterSummary,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    bizItem: {
      type: Object,
      default: () => ({}),
    },
    filtrateCondition: {
      type: Object,
      default: () => ({}),
    },
    tableName: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    const store = useStore();
    const curFiltrateCondition = ref();
    watchEffect(() => {
      curFiltrateCondition.value = cloneDeep(props.filtrateCondition);
    });
    const title = computed(() => {
      return `筛选器（${props.bizItem.fieldName}）`;
    });
    const tabKey = ref('list-filter');
    const fieldMember = ref([]);
    const fields = ref([]);

    const checkCondition = () => {
      const { listFilter, topFilter, measureFilter } =
        curFiltrateCondition.value;
      if (
        listFilter &&
        listFilter.valueType !== 'all' &&
        !listFilter.selectKey.length
      ) {
        message.warning('列表筛选有未选择值！');
        return false;
      } else if (topFilter && topFilter.valueType !== 'none') {
        const { topFilterId, aggregationType, extremaType, limit } = topFilter;
        if (!topFilterId || !aggregationType || !extremaType || !limit) {
          message.warning('TopN筛选有未选择值！');
          return false;
        }
      } else if (
        measureFilter &&
        measureFilter.valueType !== 'none' &&
        !measureFilter?.operatorValue
      ) {
        message.warning('度量筛选有未选择值！');
        return false;
      }
      return true;
    };

    const onOk = (e: MouseEvent) => {
      const flag = checkCondition();
      if (!flag) return;
      context.emit('update:filtrateCondition', curFiltrateCondition.value);
      context.emit('update:visible', false);
    };
    const onCancel = (e: MouseEvent) => {
      context.emit('update:visible', false);
    };

    watch(
      () => props.visible,
      async (val) => {
        if (val) {
          const tableName = props.tableName;
          const fieldId = props.bizItem.fieldId;
          const periodType = props.bizItem.extAttr?.periodType;
          if (tableName) {
            store.dispatch('root/getField', { tableName }).then((res) => {
              responseHandle(res, () => {
                fields.value = res.data.list ?? [];
              });
            });
            store
              .dispatch('reportDesign/getFieldMember', {
                tableName,
                fieldId,
                periodType,
              })
              .then((res) => {
                responseHandle(res, () => {
                  fieldMember.value = res.data;
                });
              });
          } else {
            fields.value = [];
            fieldMember.value = [];
          }
        }
      },
    );

    return {
      title,
      tabKey,
      curFiltrateCondition,
      fields,
      fieldMember,
      onOk,
      onCancel,
    };
  },
});
</script>

<style lang="less" scoped>
.filter-content {
  height: 400px;
  .filter-dims {
    .flexRow(space-between, flex-start);
    height: 100%;
    border: 1px solid @rb-border-color-base;
    :deep .filter-dims-tab {
      flex: 1;
      height: 100%;
      border-right: 1px solid @rb-border-color-base;
      .ant-tabs-nav-wrap {
        padding: 0 16px;
      }
      .ant-tabs-content {
        padding: 0 16px;
        overflow-y: auto;
        height: 100%;
      }
    }
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
  }
}
</style>
