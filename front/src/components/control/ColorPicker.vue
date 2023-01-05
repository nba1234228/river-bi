<template>
  <div class="color-picker-control">
    <span class="text" :title="val">{{ val }}</span>
    <color-picker v-model:pureColor="val"></color-picker>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { ColorPicker } from 'vue3-colorpicker';
import 'vue3-colorpicker/style.css';

export default defineComponent({
  name: 'ColorPickerControl',
  components: { ColorPicker },
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
.color-picker-control {
  .flexRow(space-between, center);
  width: 100%;
  border: 1px solid @rb-border-color-base;
  border-radius: 4px;
  .text {
    flex: 1;
    max-width: 133px;
    padding: 0 11px;
    font-size: 12px;
    line-height: 22px;
    white-space: nowrap;
    overflow: hidden;
    border-right: 1px solid @rb-border-color-base;
  }
  :deep .vc-color-wrap {
    margin: 0 9px;
    flex: 0;
    min-width: 22px;
    max-width: 22px;
    height: 18px;
    box-shadow: 0 0 5px @rb-border-color-base;
  }
}
</style>
