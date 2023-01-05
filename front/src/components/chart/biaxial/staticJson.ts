import cloneDeep from 'lodash/cloneDeep';
// import { StaticJsonTempBar } from '@/components/chart/common/index';

const json = {
  xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  seriesData: [
    {
      type: 'bar',
      name: '销售',
      data: [120, 200, 150, 80, 70, 110, 130],
    },
    {
      type: 'line',
      name: '数量',
      data: [12, 20, 15, 8, 7, 11, 13],
      yAxisIndex: 1,
    },
  ],
};
export const StaticJson = json;
