<template>
  <div class="tab-move" title="用于和tab容器拖拽">
    <a
      class="move-btn"
      draggable="true"
      @dragstart="onDragstart"
      @drag="onDrag"
      @dragend="onDragEnd"
    >
      <rb-icon class="move-icon" type="icon_rb-change" />
    </a>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import throttle from 'lodash/throttle';

export default defineComponent({
  name: 'TabMove',
  props: {
    rowHeight: {
      type: Number,
      default: 20,
    },
    xMargin: {
      type: Number,
      default: 10,
    },
    yMargin: {
      type: Number,
      default: 10,
    },
    colWidth: {
      type: Number,
      default: 10,
    },
    itemData: {
      type: Object,
      default: () => ({}),
    },
    formType: {
      type: String,
      default: '',
    },
  },

  setup(props, context) {
    const store = useStore();
    const width = ref(0);
    const height = ref(0);
    let dragDom: any;

    const getDragCanvas = () => {
      const canvas = document.createElement('canvas');
      canvas.style.display = 'none';
      document.body.appendChild(canvas);
      return canvas;
    };

    const onDragstart = (ev: any) => {
      ev.dataTransfer.effectAllowed = 'move';
      const item = { ...props.itemData };
      Object.assign(item, { formType: props.formType });
      const canvasDom = getDragCanvas();
      ev.dataTransfer.setDragImage(canvasDom, 0, 0);
      width.value =
        item.w * props.colWidth + item.w * props.xMargin - props.xMargin;
      height.value =
        item.h * props.rowHeight + item.h * props.yMargin - props.yMargin;
      ev.dataTransfer.setData('customData', JSON.stringify(item));
      store.commit('root/SetDragDomData', props.itemData);
      dragDom.setAttribute(
        'style',
        `
          display: flex;
          justify-content: center;
          align-items: center;
          left: ${ev.x}px;
          top: ${ev.y}px;
          width: ${width.value}px;
          height: ${height.value}px;
        `,
      );
    };

    let onDrag = (ev: any) => {
      dragDom.setAttribute(
        'style',
        `
          display: flex;
          justify-content: center;
          align-items: center;
          left: ${ev.x}px;
          top: ${ev.y}px;
          width: ${width.value}px;
          height: ${height.value}px;
        `,
      );
    };

    const onDragEnd = () => {
      dragDom.setAttribute('style', 'display: none;');
    };

    onMounted(() => {
      onDrag = throttle(onDrag, 100);
      dragDom = document.getElementById('dragDom');
    });

    return {
      onDrag,
      onDragstart,
      onDragEnd,
    };
  },
});
</script>

<style lang="less" scoped>
.tab-move {
  position: absolute;
  left: -7px;
  top: -7px;
  z-index: 99;
  // height: 18px;
  .move-btn {
    display: inline-block;
    height: 100%;
    color: @rb-label-color;
    .move-icon {
      line-height: 16px;
      font-size: 16px;
      cursor: grab;
    }
  }
}
</style>
