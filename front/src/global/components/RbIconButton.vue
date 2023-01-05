<template>
  <div :class="['rb-icon-button', size, btnType]">
    <MyIcon :type="type" />
  </div>
</template>

<script lang="ts">
import { createFromIconfontCN } from '@ant-design/icons-vue';
import { defineComponent } from 'vue';
const MyIcon = createFromIconfontCN({
  // scriptUrl: './iconfont.js',
  scriptUrl: '//at.alicdn.com/t/c/font_3687670_xzai9w0peoj.js',
});

export default defineComponent({
  name: 'RbIconButton',
  components: { MyIcon },
  props: {
    type: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'default',
    },
    btnType: {
      type: String,
      default: 'default',
    },
  },
});
</script>

<style lang="less" scoped>
.rb-icon-button {
  display: inline-block;
  line-height: 16px;
  cursor: pointer;
  padding: 6px;
  border-radius: 4px;
  &:hover {
    color: @rb-primary-color;
    background-color: @rb-primary-2;
  }
  &.small {
    padding: 4px;
  }
  &.large {
    padding: 8px;
  }
  &.success {
    &:hover {
      color: @rb-success-color;
      background-color: @rb-success-bg-color;
    }
  }
  &.warning {
    &:hover {
      color: @rb-warning-color;
      background-color: @rb-warning-bg-color;
    }
  }
  &.error {
    &:hover {
      color: @rb-error-color;
      background-color: @rb-error-bg-color;
    }
  }
}
</style>
