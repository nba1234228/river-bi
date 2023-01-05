// 仪表盘

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
  tooltip: cloneDeep(Tooltip),
  legend: cloneDeep(Legend),
  toolbox: cloneDeep(Toolbox),
  grid: cloneDeep(Grid),
  series: [
    {
      name: '',
      type: 'gauge',
      progress: {
        show: true,
        width: 18,
      },
      title: {
        show: false,
      },
      detail: {
        valueAnimation: true,
        fontSize: 26,
        offsetCenter: [0, '70%'],
      },
      data: [],
    },
  ],
};
export default Options;
