// 折线图

import cloneDeep from 'lodash/cloneDeep';
import { FieldType } from '@/model/types/field';
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
      boundaryGap: false,
      data: [],
      axisLabel: {
        width: 60,
        overflow: 'breakAll',
      },
    },
  ],
  yAxis: [{ type: 'value' }],
  series: [
    {
      name: '',
      type: 'line',
      sampling: true, // 折线图在数据量远大于像素点时候的降采样策略
      showSymbol: true,
      areaStyle: {
        opacity: 0.6,
      },
      data: [],
    },
  ],
};
export default Options;
