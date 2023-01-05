<template>
  <a-input class="input-control" v-model:value="val" size="small"></a-input>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'InputControl',
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
.input-control {
  width: 100%;
  font-size: 12px;
  line-height: 22px;
  border-radius: 4px;
}
</style>
