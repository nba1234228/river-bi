<template>
  <div class="echart-box">
    <div ref="echartWrapper" class="echart-wrapper"></div>
    <div
      class="empty"
      v-if="
        !options.xAxis?.[0]?.data?.length &&
        !options.yAxis?.[0]?.data?.length &&
        !options.series?.[0]?.data?.length
      "
    >
      <rb-icon type="icon_rb-empty" />
      <span class="text">暂无数据</span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  onBeforeUnmount,
  watch,
} from 'vue';
import * as echarts from 'echarts';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
import eventBus from '@/core/eventBus';

export default defineComponent({
  name: 'EchartWrapper',
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, context) {
    const { proxy } = getCurrentInstance() as any;
    let myChart: any;
    let el: any;

    const onResize = debounce(
      () => {
        myChart.resize();
      },
      100,
      { trailing: true },
    );

    const setOption = throttle(
      () => {
        // console.log('props.options：', props.options);
        myChart.clear();
        myChart.setOption(props.options);
      },
      100,
      { leading: true, trailing: true },
    );

    const resizeObserver = new ResizeObserver((entries: any) => {
      onResize();
    });

    eventBus.on('cardDesign-btn-Expand', onResize);
    onMounted(() => {
      el = proxy.$refs.echartWrapper;
      // 模式不能写light值，不然全局color不会生效
      // myChart = echarts.init(el, 'dark');
      myChart = echarts.init(el);
      window.addEventListener('resize', () => {
        onResize();
      });
      resizeObserver.observe(el);

      watch(
        () => props.options,
        () => {
          setOption();
        },
        {
          deep: true,
          immediate: true,
        },
      );
    });
    onBeforeUnmount(() => {
      resizeObserver.unobserve(el);
      eventBus.off('cardDesignExpand', onResize);
    });
    return {};
  },
});
</script>

<style lang="less" scoped>
.echart-box {
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 0 16px 16px;
  overflow: hidden;
  .echart-wrapper {
    // flex: 1;
    width: 100%;
    height: 100%;
    // padding: 0 16px 16px;
  }
  .empty {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .flexColumn(center, center);
    .rb-icon {
      font-size: 120px;
      cursor: auto;
    }
    .text {
      color: @rb-disabled-color;
    }
  }
}
</style>
