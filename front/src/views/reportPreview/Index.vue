<template>
  <div class="report-preview">
    <report-preview-header></report-preview-header>
    <div class="report-preview-content">
      <report-preview-area></report-preview-area>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import ReportPreviewHeader from '@/views/reportPreview/components/ReportPreviewHeader.vue';
import ReportPreviewArea from '@/views/reportPreview/components/ReportPreviewArea.vue';

export default defineComponent({
  name: 'ReportPreview',
  components: {
    ReportPreviewHeader,
    ReportPreviewArea,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const reportId: any = route.query?.reportId ?? '';
    reportId && store.dispatch('reportPreview/getReportData', reportId);
    return {};
  },
});
</script>

<style lang="less" scoped>
.report-preview {
  background-color: @rb-background-color;
  height: 100vh;
  &-content {
    position: relative;
    height: calc(100% - 48px);
  }
}
</style>
