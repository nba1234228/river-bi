<template>
  <div class="header-h1">
    <span class="content" :style="curTitleStyle">
      {{ headline?.name }}
    </span>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref } from 'vue';
import { transformStyle } from '@/global/preUtils';

export default defineComponent({
  name: 'Table',
  props: {
    itemData: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, context) {
    const headline: any = ref({});
    const curTitleStyle: any = ref({});
    watchEffect(() => {
      if (props.itemData.dataId) {
        headline.value = props.itemData.foreignConfig.styles?.headline ?? {};
        curTitleStyle.value = transformStyle(headline.value);
      }
    });

    return {
      curTitleStyle,
      headline,
    };
  },
});
</script>

<style lang="less" scoped>
.header-h1 {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  .content {
    width: 100%;
  }
}
</style>
