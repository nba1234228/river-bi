<template>
  <div class="report-design">
    <design-header></design-header>
    <design-layout></design-layout>
    <CardDesign
      :cardDesignVisible="cardDesignVisible"
      :cardId="curCardId"
      @onSave="onSave"
      @onReturn="onReturn"
    />
    <ListFilterModal ref="listFilterModal" />
    <DateFilterModal ref="dateFilterModal" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import cloneDeep from 'lodash/cloneDeep';
import { ReportAddCard } from '@/global/utils';
import DesignHeader from '@/views/reportDesign/components/DesignHeader.vue';
import DesignLayout from '@/views/reportDesign/components/DesignLayout.vue';
import CardDesign from '@/components/cardDesign/Index.vue';
import ListFilterModal from '@/components/comp/listFilter/Modal.vue';
import DateFilterModal from '@/components/comp/dateFilter/Modal.vue';
import eventBus from '@/core/eventBus';

export default defineComponent({
  name: 'ReportDesign',
  components: {
    DesignHeader,
    DesignLayout,
    CardDesign,
    ListFilterModal,
    DateFilterModal,
  },
  setup() {
    const { proxy } = getCurrentInstance() as any;
    const store = useStore();
    const route = useRoute();
    const reportId: any = route.query?.reportId ?? '';
    reportId && store.dispatch('reportDesign/getReportData', reportId);

    const cardDesignVisible = computed(
      () => store.state.reportDesign.cardDesignVisible,
    );
    eventBus.on('global-filter-modal-show', (data: any) => {
      const { filterType, itemData } = data;
      const refName = `${filterType}Modal`;
      proxy.$refs[refName]?.showModal?.(itemData);
    });
    const curCardId = computed(() => store.state.reportDesign.curCardId);
    const onSave = (card: any) => {
      // 编辑
      if (curCardId.value) {
        // 合并原来crad数据
        store.commit('reportDesign/updateCompCard', cloneDeep(card));
      } else {
        // 新建
        const component = ReportAddCard(card);
        store.commit('reportDesign/AddComp', component);
      }
      store.commit('reportDesign/hiddleCardVisible');
    };
    const onReturn = () => {
      store.commit('reportDesign/hiddleCardVisible');
    };
    return {
      cardDesignVisible,
      curCardId,
      onSave,
      onReturn,
    };
  },
});
</script>
