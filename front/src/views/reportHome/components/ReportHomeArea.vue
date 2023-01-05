<template>
  <div class="report-home-area">
    <div class="report-home-area-content" :style="curStyle">
      <Layout
        v-if="comps.length && !isLoading"
        :responsive="responsive || isMobile"
        :comps="comps"
        :rowHeight="rowHeight"
        :xMargin="xMargin"
        :yMargin="yMargin"
        :colNum="colNum"
        :colWidth="colWidth"
        v-model:list="previewCardList"
        formType="report"
        useMode="running"
      />
      <div class="empty" v-else>
        <a-spin v-if="isLoading" size="large" />
        <rb-icon v-else type="icon_rb-empty" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, provide } from 'vue';
import { isMobile } from '@/global/preUtils';
import Layout from '@/components/gridLayout/Layout.vue';
import { storeData } from '@/handle/areaHandle';

export default defineComponent({
  name: 'ReportHomeArea',
  components: {
    Layout,
  },
  setup() {
    const {
      responsive,
      isLoading,
      curStyle,
      rowHeight,
      xMargin,
      yMargin,
      outXMargin,
      colNum,
      colWidth,
      previewCardList,
      getTabCardList,
      activityCompId,
      comps,
    } = storeData('reportHome', '.report-home-area-content');

    provide('updateActivityCompId', (val: string) => {
      activityCompId.value = val;
    });
    provide('getActivityCompId', () => activityCompId.value);

    return {
      isMobile,
      responsive,
      isLoading,
      curStyle,
      rowHeight,
      xMargin,
      yMargin,
      colNum,
      colWidth,
      previewCardList,
      getTabCardList,
      comps,
    };
  },
});
</script>

<style lang="less" scoped>
.report-home-area {
  flex: 1;
  height: 100%;
  // padding: 16px;
  overflow-y: auto;
  transition: all 0.5s;
  background-color: @rb-text-color-light;
  .report-home-area-content {
    position: relative;
    min-height: 100%;
    margin: 0 auto;
    .empty {
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%);
      .rb-icon {
        font-size: 200px;
        cursor: auto;
      }
    }
  }
}
</style>
