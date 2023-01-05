<template>
  <div class="report-home-bar">
    <div class="report-home-bar-left">
      <a-breadcrumb>
        <a-breadcrumb-item>报告管理</a-breadcrumb-item>
        <a-breadcrumb-item>{{ curReportName }}</a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <div class="report-home-bar-right">
      <a-space :size="8">
        <rb-icon-button type="icon_rb-refresh" />
        <rb-icon-button @click="onEdit" type="icon_rb-edit" />
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'ReportHomeBar',
  setup() {
    const store = useStore();
    const curReportId = computed(() => store.state.reportHome.curReportId);
    const curReportName = computed(() => store.state.reportHome.curReportName);
    const onEdit = () => {
      window.open(
        `/#/reportDesign?reportId=${curReportId.value}&reportName=${curReportName.value}`,
      );
    };

    return {
      onEdit,
      curReportName,
    };
  },
});
</script>

<style lang="less" scoped>
.report-home-bar {
  .flexRow();
  padding: 0 8px;
  height: 44px;
  line-height: 44px;
  background-color: @rb-body-background;
  border-bottom: 1px solid @rb-border-color-base;
}
</style>
