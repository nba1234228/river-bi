// 堆叠图

import cloneDeep from 'lodash/cloneDeep';
import {
  Color,
  Tooltip,
  Legend,
  Toolbox,
  Grid,
  DataZoom,
} from '@/components/chart/common/index';

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
    },
  ],
  series: [
    {
      name: '',
      type: 'bar',
      barMaxWidth: '40', // 柱条最大宽度
      large: true, // 是否开启大数据量优化
      data: [],
      stack: 'one',
      emphasis: {
        focus: 'series',
      },
    },
  ],
};
export default Options;
