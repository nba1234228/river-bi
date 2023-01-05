<template>
  <div class="report-home">
    <report-home-header></report-home-header>
    <report-home-bar></report-home-bar>
    <div class="report-home-content">
      <report-home-tree :width="width"></report-home-tree>
      <collapse-btn
        v-model:width="width"
        :baseWidth="baseWidth"
        from="reportRunning"
        location="left"
      ></collapse-btn>
      <report-home-area></report-home-area>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ReportHomeHeader from '@/views/reportHome/components/ReportHomeHeader.vue';
import ReportHomeTree from '@/views/reportHome/components/ReportHomeTree.vue';
import ReportHomeBar from '@/views/reportHome/components/ReportHomeBar.vue';
import ReportHomeArea from '@/views/reportHome/components/ReportHomeArea.vue';
import CollapseBtn from '@/components/common/CollapseBtn.vue';

export default defineComponent({
  name: 'ReportHome',
  components: {
    ReportHomeHeader,
    ReportHomeTree,
    ReportHomeBar,
    ReportHomeArea,
    CollapseBtn,
  },
  setup() {
    const width = ref(200);

    return {
      width,
      baseWidth: 200,
    };
  },
});
</script>

<style lang="less" scoped>
.report-home {
  background-color: @rb-background-color;
  height: 100vh;
  &-content {
    .flexRow(flex-start, flex-start);
    position: relative;
    height: calc(100% - 92px);
    .collapse-box {
      position: absolute;
      left: 200px;
      top: 50%;
      transform: translateY(-50%);
      width: 15px;
      font-size: 40px;
      transition: all 0.5s;
      .rb-icon {
        transform: translateX(-12.5px);
      }
    }
  }
}
</style>
