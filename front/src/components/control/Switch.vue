<template>
  <a-switch
    class="switch-control"
    v-model:checked="val"
    size="small"
    @click="onClick"
  ></a-switch>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'SwitchControl',
  props: {
    value: {
      type: Boolean,
      default: true,
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
    const onClick = (checked: boolean | string | number, ev: Event) => {
      ev.stopPropagation();
    };

    return {
      val,
      onClick,
    };
  },
});
</script>

<style lang="less" scoped>
.switch-control {
  // width: 100%;
}
</style>
