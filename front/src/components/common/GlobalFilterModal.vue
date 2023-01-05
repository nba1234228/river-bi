<template>
  <a-modal
    :visible="visible"
    :title="title"
    :keyboard="false"
    :maskClosable="false"
    :width="760"
    :destroyOnClose="true"
    wrapClassName="global-filter-modal"
    @ok="onOk"
    @cancel="onCancel"
  >
    <div class="filter-content">
      <div class="dataset-box">
        <h3 class="dataset-title">数据集</h3>
        <a-cascader
          class="dataset-select"
          v-model:value="curDataset"
          :options="datasetOptions"
          :load-data="getDataset"
          @change="onDatasetSelect"
          size="small"
          placeholder="请选择"
        />
        <div class="field">
          <h3 class="title">字段</h3>
          <ul class="list">
            <li
              v-for="it in filterFieldData"
              :key="it?.fieldId"
              draggable="true"
              @dragstart="(ev) => onDragstart(ev, it, 'dim')"
              class="item"
            >
              <rb-icon type="icon_rb-text" />
              <span class="text">{{ it?.fieldName }}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="filter-box">
        <div
          class="axisLocation"
          v-for="item in axesList"
          :key="item.axisLocation"
        >
          <h3 class="title">{{ $t(`cardDesign.${item.axisLocation}`) }}</h3>
          <div
            class="value"
            @dragover="(ev) => onDragover(ev, item.axisLocation)"
            @drop="(ev) => onDrop(ev, item.axisLocation)"
          >
            <template v-if="axes[item.axisLocation]">
              <biz-item
                v-for="bizItem in axes[item.axisLocation].value"
                :key="bizItem.fieldId"
                :groupItem="item"
                :bizItem="bizItem"
                @updateBizItem="updateBizItem"
                @removeAxisItem="removeAxisItem"
              ></biz-item>
            </template>
            <p class="tip" v-if="isAllowDrop(item.axisLocation)">
              {{ getTip(item.axisLocation) }}
            </p>
          </div>
        </div>
      </div>
      <div class="preview-box" v-if="chartType === 'listFilter'">
        <h3 class="title">选项预览</h3>
        <ul class="list">
          <li class="item" v-for="item in previewList" :key="item.memberId">
            {{ item.memberName }}
          </li>
        </ul>
      </div>
    </div>
  </a-modal>
</template>
<script lang="ts">
import {
  computed,
  defineComponent,
  ref,
  PropType,
  watch,
  watchEffect,
  reactive,
} from 'vue';
import { useStore } from 'vuex';
import { message } from 'ant-design-vue';
import cloneDeep from 'lodash/cloneDeep';
import BizItem from '@/components/cardDesign/components/BizItem.vue';
import { datasetHandle } from '@/handle/datasetHandle';
import { responseHandle, GetAxesLimit } from '@/global/preUtils';
import { axesHandle } from '@/handle/axesHandle';

type AxesType = { [key: string]: any };
export default defineComponent({
  name: 'GlobalFilterModal',
  components: {
    BizItem,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    chartType: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    axesList: {
      type: Array as PropType<AxesType[]>,
      default: () => [],
    },
    axes: {
      type: Object,
      default: () => ({}),
    },
    dataset: {
      type: Array as any,
      default: () => [],
    },
  },
  setup(props, context) {
    const store = useStore();
    const curDataset = computed({
      get: () => props.dataset,
      set: (val) => context.emit('update:dataset', val),
    });
    const previewList = ref<any>([]);

    const {
      datasetOptions,
      fieldData,
      getDatasetCategory,
      getDataset,
      onDatasetSelect,
    } = datasetHandle();
    getDatasetCategory();

    const setDataset = (ev: any) => {
      ev.preventDefault();
    };

    if (props.visible && props.dataset.length) {
      onDatasetSelect(props.dataset);
    }

    const { updateBizItem, isAllowDrop, getTip, onDrop, onDragover } =
      axesHandle(props.axes, props.chartType, setDataset, (data: any) => {
        const { flag, axisLocation, item, list } = data;
        if (flag) {
          removeAxisItem(axisLocation, list[0].fieldId);
        }
        context.emit('addAxisItem', axisLocation, item);
      });

    const filterFieldData = computed(() => {
      if (props.chartType === 'dateFilter') {
        return fieldData.value.filter((it: any) => it.isPeriod);
      }
      return fieldData.value.filter((it: any) => !it.isMeasure);
    });
    const onOk = (e: MouseEvent) => {
      if (!props.axes?.dim?.value?.length) {
        return message.warning('请拖入维度字段');
      }
      context.emit('onSave');
      context.emit('update:visible', false);
      previewList.value = [];
    };
    const onCancel = (e: MouseEvent) => {
      context.emit('update:visible', false);
      previewList.value = [];
    };
    const onDragstart = (ev: any, it: any, datasetDropFieldType: string) => {
      const bizData = cloneDeep(it);
      window.datasetDropFieldType = datasetDropFieldType;
      ev.dataTransfer.setData('bizData', JSON.stringify(bizData));
    };

    const removeAxisItem = (axisLocation: string, itemId: string) => {
      context.emit('removeAxisItem', axisLocation, itemId);
    };

    watchEffect(async (val) => {
      const tableName = curDataset.value[1];
      const fieldId = props.axes?.dim?.value?.[0]?.fieldId;
      const periodType = props.axes?.dim?.value?.[0]?.extAttr?.periodType;
      if (tableName && fieldId) {
        const res = await store.dispatch('reportDesign/getFieldMember', {
          tableName,
          fieldId,
          periodType,
        });
        responseHandle(res, () => {
          previewList.value = res.data;
        });
      }
    });

    return {
      curDataset,
      datasetOptions,
      filterFieldData,
      previewList,
      getDatasetCategory,
      getDataset,
      onDatasetSelect,
      onOk,
      onCancel,
      onDragstart,
      removeAxisItem,
      updateBizItem,
      onDragover,
      onDrop,
      getTip,
      isAllowDrop,
    };
  },
});
</script>

<style lang="less">
.global-filter-modal {
  .ant-modal-body {
    padding: 0 24px;
  }
}
</style>
<style lang="less" scoped>
.filter-content {
  .flexRow(flex-start, inherit);
  height: 412px;
  .dataset-box {
    flex: 0;
    min-width: 200px;
    padding: 16px 16px 16px 0;
    border-right: 1px solid @rb-border-color-base;
    .dataset-title {
      margin-bottom: 16px;
      line-height: 22px;
      font-weight: 600;
    }
    .dataset-select {
      width: 100%;
    }
    .field {
      margin-top: 16px;
      .title {
        line-height: 22px;
        font-weight: 600;
      }
      .list {
        height: 272px;
        margin-top: 8px;
        overflow-y: auto;
        font-size: 12px;
        .item {
          padding: 0 8px;
          line-height: 26px;
          white-space: nowrap;
          cursor: pointer;
          &:hover {
            background-color: @rb-table-header-bg;
          }
          .rb-icon {
            margin-right: 4px;
            color: @rb-link-color;
          }
        }
      }
    }
  }
  .filter-box {
    flex: 0;
    min-width: 232px;
    padding: 18px 24px;
    background-color: @rb-background-color;
    overflow-y: auto;
    .axisLocation {
      margin-bottom: 16px;
      font-size: 12px;
      &:last-child {
        margin-bottom: 0;
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
      }
    }
  }
  .preview-box {
    flex: 1;
    padding: 18px 16px;
    font-size: 12px;
    .title {
      color: @rb-text-color-secondary;
      line-height: 20px;
    }
    .list {
      height: calc(100% - 28px);
      margin-top: 8px;
      overflow-y: auto;
      .item {
        line-height: 26px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
</style>
