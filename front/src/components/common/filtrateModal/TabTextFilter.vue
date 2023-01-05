<template>
  <div class="tab-text-filter">
    <div class="valueType-box">
      <a-radio-group v-model:value="valueType" />
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';

// 待开发
export default defineComponent({
  name: 'TabTextFilter',
  components: {},
  props: {},
  setup(props, context) {
    const valueType = ref('');

    return {
      valueType,
    };
  },
});
</script>

<style lang="less" scoped></style>
