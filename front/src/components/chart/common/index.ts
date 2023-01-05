import { formatNumToThous } from '@/global/preUtils';

export const Color = [
  '#1377EB',
  '#3BB875',
  '#4CCDFE',
  '#747CFB',
  '#FF99E6',
  '#CDA5F3',
  '#EFD311',
  '#81E9E6',
  '#FFB829',
  '#F54645',
  '#F56A00',
  '#B8E2FF',
  '#4E5D78',
  '#002C78',

  '#5D94FD',
  '#5DDEAB',
  '#6888B0',
  '#FDCB6E',
  '#FE7676',
  '#78CEF0',
  '#9490EF',
  '#F6AD71',
  '#50BBBA',
  '#F299B9',
  '#8DB4FD',
  '#8DE7C4',
  '#95ABC7',
  '#FDDA99',
  '#FE9F9F',
  '#A0DCF4',
  '#B3B1F3',
  '#F8C59B',
  '#84CFCE',
  '#F5B7CE',
];

export const Tooltip = {
  trigger: 'axis', // 数据项图形触发
  confine: true, // 是否将 tooltip 框限制在图表的区域内
  textStyle: {
    align: 'left',
  },
  formatter: function (params: any) {
    const isArray = Array.isArray(params);
    let tipString = `
      <div>
        <h3 style="font-weight: 600">${params[0]?.name || params.name}</h3>
    `;
    if (isArray) {
      params = params.filter((it: any) => it.value);
      for (let i = 0, length = params.length; i < length; i++) {
        const item = params[i];
        tipString += `
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span style="display: inline-block; width: 6px; height: 6px;
                margin-right: 5px; border-radius:10px;
                background: ${item.color}">
              </span>
              <span style="padding-right: 10px;">
                ${item.seriesName || item.name}：
              </span>
            </div>
            <div>
              <span>${formatNumToThous(item.value)}</span>
            </div>
          </div>
        `;
      }
    } else {
      tipString += `
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span style="display: inline-block; width: 6px; height: 6px;
                margin-right: 5px; border-radius:10px;
                background: ${params.color}">
              </span>
              <span style="padding-right: 10px;">
                ${params.seriesName || params.name}：
              </span>
            </div>
            <div>
              <span>${formatNumToThous(params.value)}</span>
        `;
      if (params.percent !== undefined) {
        tipString += `<span>(${params.percent}%)</span>`;
      }
      tipString += `</div>
        </div>`;
    }
    tipString += '</div>';
    return tipString;
  },
};

export const Legend = {
  type: 'scroll',
  top: '0',
};

export const Toolbox = {
  feature: {
    magicType: {
      type: ['line', 'bar', 'stack'],
    },
  },
};

export const Grid = {
  top: '40',
  left: '20',
  right: '20',
  bottom: '0',
  containLabel: true,
};

export const DataZoom = {
  start: 0,
  end: 100,
  textStyle: {
    width: 50,
    overflow: 'breakAll',
  },
  orient: 'horizontal',
};

export const StaticJsonTempBar = {
  xAxisData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
  seriesData: [
    {
      name: '销售',
      data: [120, 200, 150, 80, 70, 110, 130],
    },
  ],
};

export const StaticJsonTempPie = {
  seriesData: [
    {
      name: '销售分类',
      data: [
        { value: 1048, name: '体恤' },
        { value: 735, name: '西装' },
        { value: 580, name: '毛衣' },
        { value: 484, name: '短裤' },
        { value: 300, name: '棉袄' },
      ],
    },
  ],
};
