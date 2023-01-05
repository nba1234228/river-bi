<template>
  <div class="card-design-biz">
    <div class="axisLocation" v-for="item in axesList" :key="item.axisLocation">
      <h3 v-if="item.axisLocation === 'dim'" class="group-title">
        <span class="group-title-txt">出图条件</span>
        <rb-icon @click="onClearAxis('render')" type="icon_rb-erase" />
      </h3>
      <h3 v-if="item.axisLocation === 'filtrate'" class="group-title filtrate">
        <span class="group-title-txt">筛选条件</span>
        <rb-icon @click="onClearAxis('filtrate')" type="icon_rb-erase" />
      </h3>
      <h3 v-if="item.axisLocation !== 'filtrate'" class="title">
        {{ $t(`cardDesign.${item.axisLocation}`) }}
      </h3>
      <div
        class="value"
        @dragover="(ev) => onDragover(ev, item.axisLocation)"
        @drop="(ev) => onDrop(ev, item.axisLocation)"
      >
        <template v-if="axes[item.axisLocation]">
          <draggable
            v-model="axes[item.axisLocation].value"
            group="value"
            :animation="500"
            item-key="fieldId"
            ghost-class="sortable-ghost"
            class="axis-draggable"
            @start="drag = true"
            @end="drag = false"
          >
            <template #item="{ element }">
              <div>
                <biz-item
                  :groupItem="item"
                  :bizItem="element"
                  :curDataset="curDataset"
                  @updateBizItem="updateBizItem"
                  @removeAxisItem="removeAxisItem"
                ></biz-item>
              </div>
            </template>
          </draggable>
        </template>
        <p class="tip" v-if="isAllowDrop(item.axisLocation)">
          {{ getTip(item.axisLocation) }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { useStore } from 'vuex';
import draggable from 'vuedraggable';
import { Modal } from 'ant-design-vue';
import {
  getPopupContainer,
  responseHandle,
  GetBizCategory,
} from '@/global/preUtils';
import BizItem from '@/components/cardDesign/components/BizItem.vue';
import { axesHandle } from '@/handle/axesHandle';

// 和筛选器逻辑有较大相似，需要抽成通用handle
export default defineComponent({
  name: 'CardDesignBiz',
  components: {
    draggable,
    BizItem,
  },
  setup() {
    const store = useStore();
    const chartType = computed(
      () => store.state.cardDesign.card.cardInfo.chartType,
    );
    // 当有多个度量时，隐藏系列
    const axesList = computed(() => {
      let filterArr: string[] = [];
      if (axes.value?.measure?.value?.length > 1) {
        filterArr = ['legend'];
      }
      return GetBizCategory(chartType.value).filter(
        (it: any) => !filterArr.includes(it.axisLocation),
      );
    });
    const axes = computed(() => store.state.cardDesign.card.axes);
    const curDataset = computed(() => store.state.cardDesign.curDataset);
    const drag = ref(false);

    const removeAxisItem = (axisLocation: string, itemId: string) => {
      store.commit('cardDesign/RemoveAxesItem', {
        axisLocation,
        itemId,
      });
    };
    const setDataset = async (ev: any) => {
      // 如果是第一次拖数据集，则设置数据集信息，否则提示用户切换了数据集
      const datasetId = store.state.cardDesign.card.cardInfo.datasetId;
      const curDataset = store.state.cardDesign.curDataset;
      if (!datasetId) {
        store.commit('cardDesign/SetCardInfoItem', {
          datasetId: curDataset.datasetId,
          datasetCategory: curDataset.datasetCategory,
        });
        const res = await store.dispatch('cardDesign/saveCardInfo');
        responseHandle(res, () => {
          ev.preventDefault();
        });
      } else if (datasetId && datasetId !== curDataset.datasetId) {
        Modal.confirm({
          title: '确定更改?',
          content: '更改数据集会清空已选择字段，请确认!',
          async onOk() {
            store.commit('cardDesign/SetCardInfoItem', {
              datasetId: curDataset.datasetId,
              datasetCategory: curDataset.datasetCategory,
            });
            const res = await store.dispatch('cardDesign/saveCardInfo');
            responseHandle(res, () => {
              store.commit('cardDesign/ClearAxes');
              ev.preventDefault();
            });
          },
        });
      } else {
        ev.preventDefault();
      }
    };
    const { updateBizItem, isAllowDrop, getTip, onDrop, onDragover } =
      axesHandle(axes, chartType, setDataset, (data: any) => {
        const { flag, axisLocation, item, list } = data;
        if (flag) {
          store.commit('cardDesign/ClearAxesItem', axisLocation);
        }
        store.commit('cardDesign/SetAxesItem', {
          axisLocation,
          item,
        });
      });
    const onClearAxis = (type: string) => {
      if (type === 'filtrate') {
        store.commit('cardDesign/ClearAxesItem', 'filtrate');
      } else {
        store.commit('cardDesign/ClearRenderAxesItem');
      }
    };

    return {
      getPopupContainer,
      axesList,
      axes,
      curDataset,
      drag,
      updateBizItem,
      removeAxisItem,
      getTip,
      onDragover,
      onDrop,
      isAllowDrop,
      onClearAxis,
    };
  },
});
</script>

<style lang="less" scoped>
.card-design-biz {
  .flexColumn(flex-start, flex-start);
  flex: 0;
  min-width: 184px;
  height: 100%;
  margin-right: 16px;
  text-align: left;
  .axisLocation {
    width: 100%;
    margin-bottom: 16px;
    font-size: 12px;
    .group-title {
      height: 24px;
      &.filtrate {
        margin-top: 16px;
        margin-bottom: 8px;
      }
      &-txt {
        display: inline-block;
        padding-right: 8px;
        line-height: 24px;
        font-weight: 600;
      }
    }
    .title {
      margin-bottom: 8px;
      color: @rb-text-color-secondary;
      line-height: 20px;
    }
    .value {
      display: flex;
      flex-direction: column;
      justify-content: center;
      min-height: 72px;
      padding: 8px 8px 10px;
      border: 1px dashed @rb-auxiliary-color;
      .tip {
        color: @rb-label-color;
        line-height: 20px;
        text-align: center;
      }
      .biz-btn + .tip {
        margin-top: 8px;
      }
      .axis-draggable {
        > div {
          margin-bottom: 4px;
        }
      }
    }
  }
}
</style>
