<template>
  <div
    :ref="refKey"
    @click="onTabClick"
    :style="curStyle"
    :class="[
      'tab-container',
      isActive ? 'is-active' : '',
      curStyle.componentStyle,
    ]"
  >
    <a-tabs
      v-model:activeKey="activeKey"
      :type="useMode === 'design' ? 'editable-card' : 'card'"
      @edit="onEdit"
    >
      <a-tab-pane
        v-for="it in itemData.tabs"
        :key="it.key"
        :tab="it.label"
        force-render
      >
        <div
          class="tab-pane-wrapper"
          @dragenter="onDragenter"
          @drop="(ev) => onTabDrop(ev, it.key)"
        >
          <!-- :layout="getList(it.key)" -->
          <grid-layout
            v-model:layout="tabCardList[it.key]"
            :col-num="colNum"
            :row-height="rowHeight"
            :margin="[xMargin, yMargin]"
            :is-draggable="useMode === 'design'"
            :is-resizable="useMode === 'design'"
            :responsive="responsive"
            :breakpoints="{ sm: 540 }"
            :cols="{ sm: 2 }"
            class="crad-layout"
          >
            <grid-item
              v-for="item in getList(it.key)"
              :x="item.x"
              :y="item.y"
              :w="item.w"
              :h="item.h"
              :i="item.dataId"
              :key="item.dataId"
              :minW="item.minW"
              :minH="item.minH"
              drag-ignore-from=".echart-wrapper, .tab-move"
            >
              <comp-wrapper
                :comps="comps"
                :colWidth="colWidth"
                :itemData="item"
                formType="tab"
                :useMode="useMode"
                :rowHeight="rowHeight"
                :xMargin="xMargin"
                :yMargin="yMargin"
              ></comp-wrapper>
            </grid-item>
          </grid-layout>
        </div>
      </a-tab-pane>
    </a-tabs>
    <action-bar :itemData="itemData" :useMode="useMode"></action-bar>
    <BigScreen
      v-if="curStyle.componentStyle"
      :componentStyle="curStyle.componentStyle"
    ></BigScreen>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  getCurrentInstance,
  reactive,
  computed,
  watch,
} from 'vue';
import throttle from 'lodash/throttle';
import {
  TabColNum,
  TabColWidth,
  TabRowHeight,
  TabXMargin,
  TabYMargin,
} from '@/model/designer/layoutConstant';
import CompWrapper from '@/components/card/CompWrapper.vue';
import { styleHandle, actionHandle } from '@/components/gridLayout/tabHandle';
import ActionBar from '@/components/card/ActionBar.vue';
import BigScreen from '@/components/common/bigScreen/Index.vue';

export default defineComponent({
  name: 'TabContainer',
  components: {
    CompWrapper,
    ActionBar,
    BigScreen,
  },
  props: {
    comps: {
      type: Array,
      default: () => [],
    },
    list: {
      type: Array,
      default: () => [],
    },
    itemData: {
      type: Object,
      default: () => ({}),
    },
    refKey: {
      type: String,
      default: '',
    },
    useMode: {
      type: String,
      default: 'design',
    },
    reportXMargin: {
      type: Number,
      default: 0,
    },
    reportColWidth: {
      type: Number,
      default: 0,
    },
    responsive: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, context) {
    const { proxy } = getCurrentInstance() as any;
    const colNum = ref(TabColNum);
    const colWidth = ref(TabColWidth);
    const rowHeight = ref(TabRowHeight);
    const xMargin = ref(TabXMargin);
    const yMargin = ref(TabYMargin);
    const tabCardList = computed(() => {
      const obj: any = {};
      props.itemData.tabs.forEach((tab: any) => {
        obj[tab.key] = props.list.filter((it: any) => it.tabKey === tab.key);
      });
      return obj;
    });

    let refEl: any;
    const setColWidth = throttle(() => {
      const width = refEl.getBoundingClientRect().width;
      colWidth.value =
        (width - xMargin.value - colNum.value * xMargin.value) / colNum.value;
    }, 100);

    const getList = (tabKey: string): any => {
      const list = props.list.filter((it: any) => it.tabKey === tabKey);
      return list;
    };

    const onTabDrop = (ev: any, tabKey: string) => {
      const card = JSON.parse(ev.dataTransfer.getData('customData'));
      // 防止被画布捕获
      ev.stopPropagation();
      // tab不可嵌套，在tab内拖拽自己无效
      if (card.formType === 'tab' || card.type === 'tab') return;
      // 计算tab的左边距，要加上布局插件的左外边距，必须用报告的colWidth和xMargin
      const tabLeft =
        props.itemData.x * (props.reportColWidth + props.reportXMargin) +
        props.reportXMargin;
      // 计算x位置
      let x = Math.floor(
        (ev.layerX - tabLeft) / (colWidth.value + xMargin.value),
      );
      // 求出x的最大值
      const maxX = colNum.value - card.w;
      // x应小于等于最大值，否则卡片会重叠
      if (x >= maxX) x = maxX;
      // 计算tab的左边距，要加上布局插件的上外边距
      const tabTop =
        props.itemData.y * (rowHeight.value + yMargin.value) + yMargin.value;
      // 减去上边距，防止卡片计算Y时算了上边距，导致往下跑
      const y = Math.floor(
        (ev.layerY - tabTop) / (rowHeight.value + yMargin.value),
      );
      Object.assign(card, { x, y });
      context.emit('changeCardList', { card, item: props.itemData, tabKey });
    };

    const { curStyle } = styleHandle(props.comps, props);
    const { activeKey, isActive, onEdit, onTabClick, dragDomData } =
      actionHandle(props.comps, props, context);

    const onDragenter = () => {
      // const dragDom: any = document.getElementById('dragDom');
    };

    onMounted(() => {
      refEl = proxy.$refs[props.refKey];
      setColWidth();
    });

    return {
      colNum,
      colWidth,
      rowHeight,
      xMargin,
      yMargin,
      getList,
      onTabDrop,
      onDragenter,
      setColWidth,
      curStyle,
      activeKey,
      isActive,
      onEdit,
      onTabClick,
      tabCardList,
    };
  },
});
</script>

<style lang="less" scoped>
.tab-container {
  height: 100%;
  border: 1px solid @rb-border-color-base;
  &.is-active {
    box-shadow: 0 0 5px @rb-primary-color;
    // transform: scale(1.01);
  }
  &.technology {
    border-image-source: url('../../assets/imgs/border-card.png');
  }
  &.technology2 {
    border-image-source: url('../../assets/imgs/border-title.png');
  }
  &.technology3 {
    border-image-source: url('../../assets/imgs/border-title3.png');
  }
  &.technology4 {
    border-image-source: url('../../assets/imgs/border-title4.png');
  }
  &.lightSensation {
    background: url('../../assets/imgs/border-title2.png') no-repeat !important;
    background-position: 0 0;
    background-size: 100% 46px !important;
  }
  @keyframes fluxayRainbow {
    0% {
      background-position: 0;
    }
    100% {
      background-position: calc(100vw * 100);
    }
  }
  /deep/.ant-tabs {
    height: 100%;
    .ant-tabs-nav {
      margin-bottom: 0;
    }
    .ant-tabs-content {
      height: 100%;
      .tab-pane-wrapper {
        height: 100%;
        overflow-y: auto;
      }
    }
  }
  .crad-layout {
    height: 100%;
    min-height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
    :deep .vue-grid-item {
      &:hover {
        & > .vue-resizable-handle {
          display: block;
        }
      }
      & > .vue-resizable-handle {
        display: none;
      }
    }
  }
}
</style>
