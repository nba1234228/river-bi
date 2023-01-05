<template>
  <div class="style-config">
    <report-value-set :styles="styles"></report-value-set>
    <!-- 自定义样式配置 -->
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import ReportValueSet from '@/components/configPanel/ReportValueSet.vue';

export default defineComponent({
  name: 'StyleConfig',
  components: { ReportValueSet },
  props: {
    styles: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    return {};
  },
});
</script>

<style lang="less" scoped>
.style-config {
  overflow-y: auto;
}
</style>
