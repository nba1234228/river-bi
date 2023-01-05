<template>
  <a-select class="select-control" v-model:value="val" size="small"></a-select>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'SelectControl',
  props: {
    value: {
      type: String,
      default: '',
    },
    controls: {
      type: Object,
      default: () => ({}),
    },
    controlKey: {
      type: String,
      default: () => '',
    },
  },
  setup(props, context) {
    const val = computed({
      get: () => props.value,
      set: (val) =>
        context.emit('updateValue', val, props.controlKey, props.controls),
    });

    return {
      val,
    };
  },
});
</script>

<style lang="less" scoped>
.select-control {
  width: 100%;
  font-size: 12px;
  overflow: hidden;
  :deep .ant-select-selector {
    border-radius: 4px;
  }
}
</style>
