<template>
  <div>
    <a-dropdown
      v-model:visible="visible"
      :getPopupContainer="getPopupContainer"
      :trigger="['click']"
      @visibleChange="visibleChange"
      overlayClassName="biz-item"
      placement="bottomLeft"
    >
      <div
        :class="{ 'biz-btn': true, 'is-measure': bizItem.isMeasure }"
        @click.prevent
      >
        <div>
          <span class="biz-value">{{ bizItem.fieldName }}</span>
          <span class="value-type" v-if="bizItem.isMeasure">
            （{{ actionLabelValueMap[extAttr?.aggregation] }}）
          </span>
          <span class="value-type" v-if="bizItem.isPeriod">
            （{{ actionLabelValueMap[extAttr?.periodType] }}）
          </span>
        </div>
        <rb-icon type="icon_rb-arrow-down" />
      </div>
      <template #overlay>
        <ul class="list">
          <li
            class="item"
            v-for="it in getExtension"
            :key="it.key"
            @click="onMenuClick(it)"
          >
            <span>{{ it.label }}</span>
            <rb-icon
              v-if="it.children && it.children.length"
              type="icon_rb-arrow-right"
            />
          </li>
          <ul class="second" v-show="secondShow">
            <li
              class="item"
              v-for="el in curExtension.children"
              :key="el.key"
              @click="onSecondMenuClick(el)"
            >
              <span>{{ el.label }}</span>
              <rb-icon v-if="el.key === extensionVal" type="icon_rb-check" />
            </li>
          </ul>
        </ul>
      </template>
    </a-dropdown>
    <FiltrateModal
      v-if="groupItem.axisLocation === 'filtrate'"
      v-model:visible="filtrateVisible"
      :bizItem="bizItem"
      v-model:filtrateCondition="extensionVal"
      :tableName="curDataset.datasetId"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, reactive } from 'vue';
import { getPopupContainer } from '@/global/preUtils';
import {
  ActionType,
  ActionLabelValueMap,
} from '@/components/cardDesign/constant';
import FiltrateModal from '@/components/common/filtrateModal/Index.vue';

export default defineComponent({
  name: 'BizItem',
  components: {
    FiltrateModal,
  },
  props: {
    groupItem: {
      type: Object,
      default: () => ({}),
    },
    bizItem: {
      type: Object,
      default: () => ({}),
    },
    curDataset: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, context) {
    const visible = ref(false);
    const secondShow = ref(false);
    const curExtension = reactive<ActionType>({
      key: '',
      label: '',
      children: [],
    });
    const actionLabelValueMap: any = ActionLabelValueMap;
    const extensionVal = computed<any>({
      get: () => props.bizItem.extAttr[curExtension.key],
      set: (val) =>
        context.emit('updateBizItem', props.bizItem, curExtension.key, val),
    });
    const extAttr = computed(() => props.bizItem?.extAttr);
    const filtrateVisible = ref(false);
    const getExtension = computed(() => {
      if (props.bizItem.isPeriod) return props.groupItem.extension;
      return props.groupItem.extension.filter(
        (it: any) => it.key !== 'periodType',
      );
    });

    const onMenuClick = (it: ActionType) => {
      if (it.children?.length) {
        Object.assign(curExtension, it);
        secondShow.value = true;
      } else if (it.key === 'remove') {
        context.emit(
          'removeAxisItem',
          props.groupItem.axisLocation,
          props.bizItem.fieldId,
        );
        visible.value = false;
      } else if (it.key === 'filtrateCondition') {
        Object.assign(curExtension, { key: 'filtrateCondition' });
        filtrateVisible.value = true;
      }
    };
    const onSecondMenuClick = (it: ActionType) => {
      visible.value = false;
      extensionVal.value = it.key;
    };
    const visibleChange = () => {
      secondShow.value = false;
    };

    return {
      getPopupContainer,
      curExtension,
      extAttr,
      extensionVal,
      visible,
      secondShow,
      onMenuClick,
      onSecondMenuClick,
      visibleChange,
      actionLabelValueMap,
      filtrateVisible,
      getExtension,
    };
  },
});
</script>

<style lang="less" scoped>
.biz-btn {
  .flexRow();
  padding: 0 8px;
  line-height: 26px;
  border-radius: 4px;
  color: @rb-text-color-light;
  background: @rb-chart-1;
  cursor: pointer;
  &.is-measure {
    background: @rb-chart-2;
  }
}
.biz-item {
  .list {
    position: relative;
    padding: 4px 0;
    font-size: 12px;
    background-color: @rb-body-background;
    box-shadow: 0 0 5px @rb-border-color-base;
    .item {
      .flexRow();
      padding: 0 8px;
      line-height: 32px;
      cursor: pointer;
      &:hover {
        background-color: @rb-table-header-bg;
      }
      .rb-icon {
        font-size: 14px;
      }
    }
    .second {
      position: absolute;
      left: calc(100% + 4px);
      top: 0;
      width: 100%;
      padding: 4px 0;
      background-color: @rb-body-background;
      box-shadow: 0 0 5px @rb-border-color-base;
    }
  }
}
</style>
