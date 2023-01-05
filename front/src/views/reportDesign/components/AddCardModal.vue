<template>
  <a-modal
    :visible="addCardModalVisible"
    title="添加卡片"
    :keyboard="false"
    :maskClosable="false"
    :width="760"
    :destroyOnClose="true"
    wrapClassName="add-card-list-modal"
    @ok="onOk"
    @cancel="onCancel"
  >
    <div class="add-card-modal-wrap">
      <CardList v-model:checkList="checkList" />
    </div>
  </a-modal>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import { ReportAddCard } from '@/global/utils';
import { JoinCardProp } from '@/global/preUtils';
import CardList from '@/components/card/CardList.vue';

export default defineComponent({
  name: 'AddCardModal',
  components: {
    CardList,
  },
  props: {
    addCardModalVisible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const store = useStore();
    const visible = ref(false);
    const checkList = ref([]);
    const onOk = () => {
      if (!checkList.value.length) {
        return message.warning('请选择卡片');
      }
      checkList.value.forEach((data: any) => {
        const cardProp = JoinCardProp(data);
        const component = ReportAddCard(cardProp);
        store.commit('reportDesign/AddComp', component);
      });
      context.emit('update:addCardModalVisible', false);
      checkList.value = [];
    };
    const onCancel = () => {
      checkList.value = [];
      context.emit('update:addCardModalVisible', false);
    };

    return {
      visible,
      checkList,
      onOk,
      onCancel,
    };
  },
});
</script>

<style lang="less">
.add-card-list-modal {
  .ant-modal-body {
    padding: 0;
  }
}
</style>
<style lang="less" scoped>
.add-card-modal-wrap {
  height: 340px;
}
</style>
