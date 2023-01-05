<template>
  <div class="design-layout">
    <div class="design-layout-content">
      <div
        class="design-layout-canvas"
        :style="curStyle"
        @click="onPreviewClick"
        @dragover="(ev) => ev.preventDefault()"
        @drop="onDrop"
      >
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
          useMode="design"
          :activityCompId="activityCompId"
          @changeCardList="changeCardList"
          @setComps="setComps"
        />
        <div class="empty" v-else>
          <a-spin v-if="isLoading" size="large" />
          <rb-icon v-else type="icon_rb-empty" />
        </div>
      </div>
    </div>
    <collapse-btn
      v-model:width="designSetWidth"
      :baseWidth="designSetBaseWidth"
      from="reportDesign"
      location="right"
    ></collapse-btn>
    <design-set :width="designSetWidth"></design-set>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, provide } from 'vue';
import { useStore } from 'vuex';
import { isMobile } from '@/global/preUtils';
import DesignSet from '@/views/reportDesign/components/DesignSet.vue';
import Layout from '@/components/gridLayout/Layout.vue';
import CollapseBtn from '@/components/common/CollapseBtn.vue';
import { storeData } from '@/handle/areaHandle';

export default defineComponent({
  name: 'DesignLayout',
  components: {
    Layout,
    DesignSet,
    CollapseBtn,
  },
  setup() {
    const store = useStore();
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
    } = storeData('reportDesign', '.design-layout-canvas');
    const designSetWidth = ref(288);

    const onPreviewClick = () => {
      store.commit('reportDesign/SetActivityComp', 'report');
    };

    const onDrop = (ev: any) => {
      const card = JSON.parse(ev.dataTransfer.getData('customData'));
      // 画布内拖拽自己无效
      if (card.formType === 'report') return;
      // 计算x位置，要减去布局插件的左外边距
      let x = Math.floor(
        (ev.layerX - xMargin.value) / (colWidth.value + xMargin.value),
      );
      // 求出x的最大值
      const maxX = colNum.value - card.w;
      // x应小于等于最大值，否则卡片会重叠
      if (x >= maxX) x = maxX;
      // 计算y位置，要减去布局插件的上外边距
      const y = Math.floor(
        (ev.layerY - yMargin.value) / (rowHeight.value + yMargin.value),
      );
      if (card.formType === 'tab') {
        // 从容器拖到报告中，切换parentId
        const list = comps.value.map((it: any) => {
          if (it.dataId === card.dataId) {
            Object.assign(it, { x, y, parentId: '' });
          }
          return it;
        });
        store.commit('reportDesign/SetComps', list);
      } else {
        Object.assign(card.layouts, { x, y });
        store.commit('reportDesign/SetComps', [...comps.value, card]);
      }
    };

    const changeCardList = (list: any) => {
      store.commit('reportDesign/SetComps', list);
    };

    const setComps = (list: any) => {
      store.commit('reportDesign/SetComps', list);
    };

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
      outXMargin,
      colNum,
      colWidth,
      previewCardList,
      getTabCardList,
      activityCompId,
      comps,
      onDrop,
      changeCardList,
      onPreviewClick,
      designSetWidth,
      designSetBaseWidth: 288,
      setComps,
    };
  },
});
</script>

<style lang="less" scoped>
.design-layout {
  .flexRow(space-between, flex-start);
  height: calc(100vh - 48px);
  .design-layout-content {
    flex: 1;
    height: 100%;
    overflow-y: auto;
    box-sizing: border-box;
    .design-layout-canvas {
      position: relative;
      min-height: 100%;
      margin: 0 auto;
      background-color: @rb-background-color;
      .empty {
        // padding-top: 50%;
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
}
</style>
