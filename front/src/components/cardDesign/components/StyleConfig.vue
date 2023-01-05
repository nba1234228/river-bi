<template>
  <div class="style-config">
    <value-set :styles="styles" :chartType="chartType"></value-set>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import ValueSet from '@/components/configPanel/ValueSet.vue';

export default defineComponent({
  name: 'StyleConfig',
  components: { ValueSet },
  setup() {
    const store = useStore();
    const chartType = computed(
      () => store.state.cardDesign.card.cardInfo.chartType,
    );
    const styles = computed(() => store.state.cardDesign.card.styles);
    return {
      styles,
      chartType,
    };
  },
});
</script>

<style lang="less" scoped>
.style-config {
  width: 100%;
  border-top: 1px solid @rb-border-color-base;
  overflow-y: auto;
}
</style>
