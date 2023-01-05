// 饼图

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
  }),
  legend: cloneDeep(Legend),
  toolbox: cloneDeep(Toolbox),
  grid: cloneDeep(Grid),
  series: [
    {
      name: '',
      type: 'pie',
      radius: [0, '75%'],
      center: ['50%', '55%'],
      itemStyle: {
        // borderColor: '#fff',
      },
      data: [],
    },
  ],
};
export default Options;
