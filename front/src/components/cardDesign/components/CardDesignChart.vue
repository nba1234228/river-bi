<template>
  <div
    class="card-design-chart"
    :style="{
      width: `${width}px`,
      'min-width': `${width}px`,
    }"
  >
    <chart-list></chart-list>
    <!-- <a-divider class="divider" /> -->
    <style-config></style-config>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import ChartList from '@/components/cardDesign/components/ChartList.vue';
import StyleConfig from '@/components/cardDesign/components/StyleConfig.vue';

export default defineComponent({
  name: 'CardDesignChart',
  components: {
    ChartList,
    StyleConfig,
  },
  props: {
    width: {
      type: Number,
      default: 192,
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.card-design-chart {
  .flexColumn(flex-start, flex-start);
  flex: 0;
  height: 100%;
  border-left: 1px solid @rb-border-color-base;
  background-color: @rb-body-background;
  overflow: hidden;
  transition: all 0.3s;
  .divider {
    margin: 0 0 16px;
  }
}
</style>
