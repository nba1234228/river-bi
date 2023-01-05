export type ActionType = {
  key: string;
  label: string;
  children?: ActionType[];
};

export const Sort: ActionType = {
  key: 'sort',
  label: '排序',
};

export const Alias: ActionType = {
  key: 'alias',
  label: '别名',
};

export const PeriodType: ActionType = {
  key: 'periodType',
  label: '日期类型',
  children: [
    {
      key: 'yyyy',
      label: '年',
    },
    {
      key: 'yyyymm',
      label: '年月',
    },
    {
      key: 'yyyymmdd',
      label: '年月日',
    },
  ],
};

export const Aggregation: ActionType = {
  key: 'aggregation',
  label: '聚合方式',
  children: [
    {
      key: 'sum',
      label: '求和',
    },
    {
      key: 'avg',
      label: '平均值',
    },
    {
      key: 'count',
      label: '计数',
    },
    {
      key: 'distinctCount',
      label: '去重计数',
    },
    {
      key: 'max',
      label: '最大值',
    },
    {
      key: 'min',
      label: '最小值',
    },
  ],
};

export const DataFormat: ActionType = {
  key: 'dataFormat',
  label: '数据格式',
};

export const HighCalc: ActionType = {
  key: 'highCalc',
  label: '高级计算',
  children: [
    {
      key: 'none',
      label: '无',
    },
    {
      key: 'sumPercent',
      label: '合计百分比',
    },
    {
      key: 'chainRate',
      label: '环比增长率',
    },
    {
      key: 'yearAlike',
      label: '年同比增长值',
    },
    {
      key: 'monthAlikeRate',
      label: '月同比增长率',
    },
  ],
};

export const Remove: ActionType = {
  key: 'remove',
  label: '移除',
};

export const EditFilter: ActionType = {
  key: 'filtrateCondition',
  label: '编辑筛选器',
};

export const OperatorOption = [
  {
    label: '无',
    value: 'none',
  },
  {
    label: '大于',
    value: 'greaterThan',
  },
  {
    label: '小于',
    value: 'lessThan',
  },
  {
    label: '等于',
    value: 'equal',
  },
  {
    label: '不等于',
    value: 'notEqual',
  },
  {
    label: '大于等于',
    value: 'greaterEqual',
  },
  {
    label: '小于等于',
    value: 'lessEqual',
  },
];

export const ActionLabelValueMap = {
  sort: '排序',
  alias: '别名',
  yyyy: '年',
  yyyymm: '年月',
  yyyymmdd: '年月日',
  sum: '求和',
  avg: '平均值',
  count: '计数',
  distinctCount: '去重计数',
  max: '最大值',
  min: '最小值',
  dataFormat: '数据格式',
  none: '无',
  sumPercent: '合计百分比',
  chainRate: '环比增长率',
  yearAlike: '年同比增长值',
  monthAlikeRate: '月同比增长率',
  remove: '移除',
  filtrateCondition: '编辑筛选器',
  greaterThan: '大于',
  lessThan: '小于',
  equal: '等于',
  notEqual: '不等于',
  greaterEqual: '大于等于',
  lessEqual: '小于等于',
  desc: '最大',
  asc: '最小',
};
