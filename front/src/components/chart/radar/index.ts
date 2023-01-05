// 雷达图

import cloneDeep from 'lodash/cloneDeep';
import {
  Color,
  Tooltip,
  Legend,
  Toolbox,
  Grid,
} from '@/components/chart/common/index';

const Options = {
  title: { show: false },
  color: Color,
  tooltip: Object.assign(cloneDeep(Tooltip), {
    trigger: 'item',
    formatter: null,
  }),
  legend: cloneDeep(Legend),
  toolbox: cloneDeep(Toolbox),
  grid: cloneDeep(Grid),
  radar: {
    shape: 'circle', // 最外圈是否为圆形
    indicator: [],
    center: ['50%', '53%'],
  },
  series: [
    {
      name: '',
      type: 'radar',
      data: [],
    },
  ],
};
export default Options;
