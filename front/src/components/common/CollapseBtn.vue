<template>
  <div
    class="collapse-btn"
    :class="location"
    :style="{ [location]: `${wid}px` }"
    @click="onClick"
  >
    <rb-icon v-if="isExpand" :type="`icon_rb-${location}-close`" />
    <rb-icon v-else :type="`icon_rb-${location}-open`" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import eventBus from '@/core/eventBus';

export default defineComponent({
  name: 'CollapseBtn',
  components: {},
  props: {
    width: {
      type: Number,
      default: 0,
    },
    baseWidth: {
      type: Number,
      default: 0,
    },
    location: {
      type: String,
      default: 'left',
    },
    from: {
      type: String,
      default: '',
    },
  },
  setup(props, context) {
    const wid = computed({
      get: () => props.width,
      set: (val) => context.emit('update:width', val),
    });
    const isExpand = ref(true);
    const onClick = () => {
      isExpand.value = !isExpand.value;
      wid.value = isExpand.value ? props.baseWidth : 0;
      if (props.from === 'cardDesign' && isExpand.value) {
        setTimeout(() => {
          eventBus.emit('cardDesign-btn-Expand'); // 通知echarts刷图
        }, 5);
      }
    };
    return {
      wid,
      isExpand,
      onClick,
    };
  },
});
</script>

<style lang="less" scoped>
.collapse-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  font-size: 40px;
  overflow: hidden;
  transition: all 0.4s;
  z-index: 8;
  .rb-icon {
    opacity: 0.5;
    transform: translateX(-12.5px);
    &:hover {
      opacity: 1;
    }
  }
  &.right {
    .rb-icon {
      transform: translateX(12.5px);
    }
  }
}
</style>
