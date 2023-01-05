<template>
  <grid-layout
    v-model:layout="previewCardList"
    :col-num="colNum"
    :row-height="rowHeight"
    :margin="[xMargin, yMargin]"
    :is-draggable="useMode === 'design'"
    :is-resizable="useMode === 'design'"
    :responsive="responsive"
    :breakpoints="{ sm: 540 }"
    :cols="{ sm: 2 }"
  >
    <grid-item
      v-for="item in previewCardList"
      :x="item.x"
      :y="item.y"
      :w="item.w"
      :h="item.h"
      :i="item.dataId"
      :key="item.dataId"
      :minW="item.minW"
      :minH="item.minH"
      drag-ignore-from=".echart-wrapper, .tab-move"
      @resized="onContainerResized(item)"
      @container-resized="onContainerResized(item)"
    >
      <tab-container
        v-if="item.componentType === 'tab'"
        :comps="comps"
        :list="getTabCardList(item)"
        :itemData="item"
        :ref="`tab${item.dataId}`"
        :refKey="`tab${item.dataId}`"
        :useMode="useMode"
        :reportXMargin="xMargin"
        :reportColWidth="colWidth"
        :responsive="responsive"
        @changeCardList="changeCardList"
        @setComps="setComps"
      ></tab-container>
      <template v-else>
        <comp-wrapper
          :comps="comps"
          :colWidth="colWidth"
          :itemData="item"
          :formType="formType"
          :useMode="useMode"
          :rowHeight="rowHeight"
          :xMargin="xMargin"
          :yMargin="yMargin"
        ></comp-wrapper>
      </template>
    </grid-item>
  </grid-layout>
</template>

<script lang="ts">
import { defineComponent, computed, getCurrentInstance } from 'vue';
import { GridLayout, GridItem } from 'vue-grid-layout';
import debounce from 'lodash/debounce';
import TabContainer from '@/components/gridLayout/TabContainer.vue';
import CompWrapper from '@/components/card/CompWrapper.vue';

export default defineComponent({
  name: 'Layout',
  components: {
    GridLayout,
    GridItem,
    TabContainer,
    CompWrapper,
  },
  props: {
    responsive: {
      type: Boolean,
      default: false,
    },
    comps: {
      type: Array,
      default: () => [],
    },
    rowHeight: {
      type: Number,
      default: 0,
    },
    xMargin: {
      type: Number,
      default: 0,
    },
    yMargin: {
      type: Number,
      default: 0,
    },
    colNum: {
      type: Number,
      default: 0,
    },
    colWidth: {
      type: Number,
      default: 0,
    },
    list: {
      type: Object,
      default: () => ({}),
    },
    formType: {
      type: String,
      default: 'report',
    },
    useMode: {
      type: String,
      default: 'design',
    },
  },
  setup(props, context) {
    const { proxy } = getCurrentInstance() as any;
    const previewCardList = computed({
      get: () => props.list,
      set: (val) => updateList(val),
    });
    const updateList = debounce(
      (val: any) => context.emit('update:list', val),
      1000,
      { leading: true, trailing: false },
    );

    const getTabCardList = debounce(
      (item: any) => {
        return props.comps.filter((it: any) => it.parentId === item.dataId);
      },
      500,
      { leading: true, trailing: true },
    );

    const changeCardList = (data: any) => {
      const { card, item, tabKey } = data;
      let list = [];
      if (card.formType === 'report') {
        // 从报告拖到容器中，切换parentId
        list = props.comps.map((it: any) => {
          if (it.dataId === card.dataId) {
            Object.assign(it, {
              x: card.x,
              y: card.y,
              parentId: item.dataId,
              tabKey,
            });
          }
          return it;
        });
      } else {
        Object.assign(card, { parentId: item.dataId, tabKey });
        list = [...props.comps, card];
      }
      context.emit('changeCardList', list);
    };

    const onContainerResized = (item: any) => {
      if (item.componentType === 'tab') {
        const refEl = proxy.$refs[`tab${item.dataId}`]?.[0];
        if (refEl) refEl.setColWidth();
      }
    };

    const setComps = (list: any) => {
      context.emit('setComps', list);
    };

    return {
      previewCardList,
      getTabCardList,
      changeCardList,
      onContainerResized,
      setComps,
    };
  },
});
</script>

<style lang="less" scoped>
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
</style>
