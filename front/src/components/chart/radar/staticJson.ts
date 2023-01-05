const json = {
  indicatorData: [
    { name: '语文', max: 100 },
    { name: '数学', max: 100 },
    { name: '英语', max: 100 },
    { name: '物理', max: 100 },
    { name: '化学', max: 100 },
    { name: '生物', max: 100 },
  ],
  seriesData: [
    {
      name: '期中考试分析',
      data: [
        {
          value: [99, 80, 78, 66, 80, 99],
          name: '张三',
        },
        {
          value: [88, 86, 87, 83, 84, 83],
          name: '李四',
        },
      ],
    },
  ],
};
export const StaticJson = json;
