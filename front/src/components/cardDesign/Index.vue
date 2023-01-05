<template>
  <div class="card-design" v-if="cardDesignVisible">
    <!-- <teleport to="body"> -->
    <!-- 不能传送到body以下的节点，否则路由跳转时，vue报错DOMException -->
    <card-design-header
      @onSave="onSave"
      @onReturn="onReturn"
    ></card-design-header>
    <div class="card-design-container">
      <card-design-dataset
        v-model:width="datasetWidth"
        :baseWidth="datasetBaseWidth"
        :datasetJsonWidth="datasetJsonWidth"
      ></card-design-dataset>
      <collapse-btn
        v-model:width="datasetWidth"
        :baseWidth="datasetBaseWidth"
        from="cardDesign"
        location="left"
      ></collapse-btn>
      <card-design-preview
        :datasetWidth="datasetWidth"
        :chartWidth="chartWidth"
      ></card-design-preview>
      <collapse-btn
        v-model:width="chartWidth"
        :baseWidth="chartBaseWidth"
        from="cardDesign"
        location="right"
      ></collapse-btn>
      <card-design-chart :width="chartWidth"></card-design-chart>
    </div>
  </div>
  <!-- </teleport> -->
</template>

<script lang="ts">
import { defineComponent, nextTick, ref, watch } from 'vue';
import { useStore } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
import { JoinCardProp, responseHandle } from '@/global/preUtils';
import CardDesignHeader from '@/components/cardDesign/components/CardDesignHeader.vue';
import CardDesignDataset from '@/components/cardDesign/components/CardDesignDataset.vue';
import CardDesignPreview from '@/components/cardDesign/components/CardDesignPreview.vue';
import CardDesignChart from '@/components/cardDesign/components/CardDesignChart.vue';
import CollapseBtn from '@/components/common/CollapseBtn.vue';

export default defineComponent({
  name: 'CardDesign',
  components: {
    CardDesignHeader,
    CardDesignDataset,
    CardDesignPreview,
    CardDesignChart,
    CollapseBtn,
  },
  props: {
    cardId: {
      type: String,
      default: '',
    },
    cardDesignVisible: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const store = useStore();
    const datasetWidth = ref(192);
    const datasetJsonWidth = 392;
    const chartWidth = ref(256);
    watch(
      () => props.cardDesignVisible,
      async (newVal) => {
        if (newVal) {
          if (props.cardId) {
            // 编辑
            const res = await store.dispatch('cardDesign/editCard', {
              cardId: props.cardId,
            });

            responseHandle(res, () => {
              // data返回的cardId为临时数据cardId
              const { datasetCategory, dataSourceType, datasetId } = res.data;
              const cardProp = JoinCardProp(res.data);
              if (dataSourceType === 'dataset') {
                datasetWidth.value = 192;
              } else {
                datasetWidth.value = datasetJsonWidth;
              }
              store.commit('cardDesign/SetIsNeedInit', false);
              store.commit('cardDesign/SetCard', cardProp);
              if (dataSourceType === 'dataset') {
                store.commit('cardDesign/SetCurDataset', {
                  datasetCategory: datasetCategory,
                  datasetId: datasetId,
                });
              }
              nextTick(() => {
                store.commit('cardDesign/SetIsNeedInit', true);
              });
            });
            // const axes = GetAxes('bar');
            // store.commit('cardDesign/SetAxes', axes);
          } else {
            // 新建
            datasetWidth.value = 192;
            const res = await store.dispatch('cardDesign/createCard', {});
            responseHandle(res, () => {
              store.commit('cardDesign/SetChartType', 'bar'); // 会触发CardDesignView.vue的监听，从而设置SetStyles
            });
            // 不能在此设置轴信息，因为option是动态加载的，会导致获取不到option报错
            // const axes = GetAxes('bar');
            // store.commit('cardDesign/SetAxes', axes);
          }
        }
      },
    );

    const onSave = async () => {
      const res = await store.dispatch('cardDesign/saveCard');
      responseHandle(res, () => {
        const card = cloneDeep(store.state.cardDesign.card);
        // 将cardId改为原数据cardId
        card.cardInfo.cardId = res.data.cardId;
        context.emit('onSave', card);
        store.commit('cardDesign/ResetState');
      });
    };

    const onReturn = () => {
      context.emit('onReturn', false);
      store.commit('cardDesign/ResetState');
    };

    return {
      datasetWidth,
      datasetBaseWidth: 192,
      datasetJsonWidth,
      chartWidth,
      chartBaseWidth: 256,
      onSave,
      onReturn,
    };
  },
});
</script>

<style lang="less" scoped>
.card-design {
  height: 100vh;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9;
  &-container {
    .flexRow(space-between, flex-start);
    position: relative;
    height: calc(100vh - 48px);
    background-color: @rb-background-color;
  }
}
</style>
