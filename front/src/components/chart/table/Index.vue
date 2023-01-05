<template>
  <div class="table">
    <a-table
      class="table-box"
      :dataSource="options.dataSource"
      :columns="curData"
      v-bind="options.table"
      :pagination="{ ...options.pagination, showTotal }"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';

export default defineComponent({
  name: 'Table',
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, context) {
    const showTotal = computed(() => {
      const align = props.options?.pagination?.showTotal;
      return align ? (total: number) => `总共 ${total} 条` : null;
    });
    const curData = computed(() => {
      const align = props.options?.table?.align;
      return props.options?.columns?.map((it: any) => {
        return {
          ...it,
          align,
        };
      });
    });

    return {
      curData,
      showTotal,
    };
  },
});
</script>

<style lang="less" scoped>
.table {
  flex: 1;
  width: 100%;
  height: 100%;
  max-height: 100%;
  padding: 0 16px 16px;
  overflow-y: auto;
  :deep .ant-table-pagination {
    margin-bottom: 0;
  }
}
</style>
