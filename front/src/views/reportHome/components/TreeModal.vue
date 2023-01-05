<template>
  <a-modal
    v-model:visible="visib"
    :title="isNew ? '新建' : '编辑'"
    :destroyOnClose="true"
    @ok="onOk"
  >
    <div class="content">
      <label class="name">{{ title }}名称</label>
      <a-input class="input-control" v-model:value.trim="name"></a-input>
    </div>
  </a-modal>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import { message } from 'ant-design-vue';

export default defineComponent({
  name: 'TreeModal',
  props: {
    title: {
      type: String,
      default: '',
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const visib = computed({
      get: () => props.visible,
      set: (value) => context.emit('update:visible', value),
    });
    const name = ref<string>('');
    const isNew = ref<boolean>(true);
    const initName = (val: string) => {
      name.value = val;
      isNew.value = !val;
    };
    const onOk = () => {
      if (!name.value.trim()) {
        return message.warning('请输入');
      }
      context.emit('onOk', name.value);
      visib.value = false;
    };

    return {
      visib,
      name,
      isNew,
      onOk,
      initName,
    };
  },
});
</script>

<style lang="less" scoped>
.content {
  .flexRow();
  height: 80px;
  .name {
    white-space: nowrap;
    padding-right: 8px;
  }
}
</style>
