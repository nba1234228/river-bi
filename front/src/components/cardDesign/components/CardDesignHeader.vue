<template>
  <div class="card-design-header">
    <div class="left">
      <div class="left-return" @click="onReturn">
        <rb-icon type="icon_rb-arrow-left" />
        <span class="text">返回</span>
      </div>
      <a-divider class="divider" type="vertical" />
      <span class="title">卡片编辑</span>
    </div>
    <div class="right">
      <a-space :size="8">
        <a-button @click="onSaveReturn">保存并关闭</a-button>
        <a-button @click="onSave" type="primary">保存</a-button>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { responseHandle } from '@/global/preUtils';

export default defineComponent({
  name: 'CardDesignHeader',
  components: {},
  setup(props, context) {
    const store = useStore();
    const onReturn = () => {
      context.emit('onReturn');
    };
    const onSaveReturn = () => {
      context.emit('onSave');
    };
    const onSave = async () => {
      const res = await store.dispatch('cardDesign/saveCard');
      responseHandle(res);
    };
    return {
      onReturn,
      onSaveReturn,
      onSave,
    };
  },
});
</script>

<style lang="less" scoped>
.card-design-header {
  height: 48px;
  padding: 0 32px 0 16px;
  border-bottom: 1px solid @rb-border-color-base;
  background-color: @rb-body-background;
  box-sizing: border-box;
  .flexRow();
  .left {
    .flexRow(flex-start, center);
    .left-return {
      cursor: pointer;
    }
  }
}
</style>
