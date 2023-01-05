<template>
  <template v-if="componentStyle === 'blink'">
    <img :src="borderBlink" alt="img" class="blink-img pos-lt" />
    <img :src="borderBlink" alt="img" class="blink-img pos-rt" />
    <img :src="borderBlink" alt="img" class="blink-img pos-lb" />
    <img :src="borderBlink" alt="img" class="blink-img pos-rb" />
  </template>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BigScreen',
  components: {},
  props: {
    componentStyle: {
      type: String,
      default: '',
    },
  },
  setup() {
    return {
      borderBlink: require('@/assets/imgs/border-blink.svg'),
      borderCard: require('@/assets/imgs/border-card.png'),
      borderTitle: require('@/assets/imgs/border-title.png'),
    };
  },
});
</script>

<style lang="less" scoped>
.blink-img {
  max-width: 50%;
  max-height: 50%;
  position: absolute;
  &.pos-lt {
    left: -6px;
    top: -6px;
  }
  &.pos-rt {
    right: -6px;
    top: -6px;
    transform: rotate(90deg);
  }
  &.pos-lb {
    left: -6px;
    bottom: -6px;
    transform: rotate(270deg);
  }
  &.pos-rb {
    right: -6px;
    bottom: -6px;
    transform: rotate(180deg);
  }
}
</style>
