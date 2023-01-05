// 条形图

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
  color: cloneDeep(Color),
  tooltip: cloneDeep(Tooltip),
  legend: cloneDeep(Legend),
  toolbox: cloneDeep(Toolbox),
  grid: cloneDeep(Grid),
  dataZoom: Object.assign(cloneDeep(DataZoom), {
    orient: 'vertical',
  }),
  xAxis: [
    {
      type: 'value',
      boundaryGap: [0, 0.01],
    },
  ],
  yAxis: [
    {
      type: 'category',
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
  ],
};
export default Options;
