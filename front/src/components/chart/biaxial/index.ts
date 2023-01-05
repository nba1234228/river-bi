// 双轴图

import cloneDeep from 'lodash/cloneDeep';
import {
  Color,
  Tooltip,
  Legend,
  Toolbox,
  Grid,
  DataZoom,
} from '@/components/chart/common/index';

// let max = 1;
// let min = 1;
const Options = {
  title: { show: false },
  color: Color,
  tooltip: cloneDeep(Tooltip),
  legend: cloneDeep(Legend),
  toolbox: cloneDeep(Toolbox),
  grid: cloneDeep(Grid),
  dataZoom: cloneDeep(DataZoom),
  xAxis: [
    {
      type: 'category',
      data: [],
    },
  ],
  yAxis: [
    {
      type: 'value',
      // min: function (value: { min: number }) {
      //   const val = Math.ceil(Math.ceil(value.min) / 5) * 5;
      //   return val > 0 ? 0 : val;
      // },
      max: function (value: { max: number }) {
        return Math.ceil(Math.ceil(value.max) / 5) * 5;
      },
      splitNumber: 5,
      // interval: Math.ceil(Math.ceil(182.2) / 5),
    },
    {
      type: 'value',
      // min: function (value: { min: number }) {
      //   const val = Math.ceil(Math.ceil(value.min) / 5) * 5;
      //   return val > 0 ? 0 : val;
      // },
      max: function (value: { max: number }) {
        return Math.ceil(Math.ceil(value.max) / 5) * 5;
      },
      splitNumber: 5,
      // interval: Math.ceil(Math.ceil(23.4) / 5), // 替换成动态值
    },
  ],
  series: [
    {
      name: '',
      type: 'bar',
      barMaxWidth: '40', // 柱条最大宽度
      large: true, // 是否开启大数据量优化
      data: [],
    },
    {
      name: '',
      type: 'line',
      yAxisIndex: 1,
      data: [],
    },
  ],
};
export default Options;
