<template>
  <a-input-number
    class="input-number-control"
    size="small"
    v-model:value="val"
  ></a-input-number>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'InputNumberControl',
  props: {
    value: {
      type: Number,
      default: 0,
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
.input-number-control {
  width: 100%;
  font-size: 12px;
  border-radius: 4px;
}
</style>
