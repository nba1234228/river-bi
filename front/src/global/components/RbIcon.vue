<template>
  <div class="rb-icon">
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
  name: 'RbIcon',
  components: { MyIcon },
  props: {
    type: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="less" scoped>
.rb-icon {
  display: inline-block;
  line-height: 16px;
  cursor: pointer;
}
</style>
