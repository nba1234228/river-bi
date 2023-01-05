import { Axes } from '@/model/types/report';
import { GetAxesLimit } from '@/global/preUtils';

export const axesHandle = (
  axes: any,
  chartType: any,
  setDataset: Function | null,
  cb: Function,
) => {
  const updateBizItem = (item: any, key: string, value: any) => {
    Object.assign(item.extAttr, { [key]: value });
  };

  const getLenLimit = (axisLocation: string) => {
    const len = (axes.value || axes)?.[axisLocation]?.value?.length;
    const limit = GetAxesLimit(chartType.value || chartType)[axisLocation];
    return { len, limit };
  };

  const isAllowDrop = (axisLocation: string) => {
    const { len, limit } = getLenLimit(axisLocation);
    // 当存在系列时，只可拖入一个度量
    if (
      (axes.value || axes)?.legend?.value?.length &&
      axisLocation === 'measure'
    ) {
      return len < 1;
    } else {
      return len < limit || limit < 2;
    }
  };

  const getTip = (axisLocation: string) => {
    const { len, limit } = getLenLimit(axisLocation);
    const flag = len === limit && limit === 1;
    switch (axisLocation) {
      case 'dim':
      case 'legend':
        return flag ? '拖拽维度字段替换原先字段' : '拖拽维度字段到这里';
      case 'measure':
        return '拖拽度量字段到这里';
      case 'filtrate':
        return flag ? '拖拽字段替换原先字段' : '拖拽字段到这里';
      default:
        return '拖拽维度字段到这里';
    }
  };

  const onDrop = (ev: any, axisLocation: string) => {
    const bizData = ev.dataTransfer.getData('bizData');
    if (!bizData) return;
    const item: Axes = JSON.parse(bizData);
    const list = (axes.value || axes)?.[axisLocation]?.value;
    // 这里要封装成统一方法
    const extAttr = {};
    // 度量聚合默认sum
    // 时间维度默认为年
    if (item.isMeasure) {
      Object.assign(extAttr, { aggregation: 'sum' });
    }
    if (item.isPeriod) {
      Object.assign(extAttr, { periodType: 'yyyy' });
    }
    if (axisLocation === 'dim') {
      // 排序
    } else if (axisLocation === 'filtrate') {
      if (item.isMeasure) {
        Object.assign(extAttr, {
          filtrateCondition: {
            measureFilter: {
              valueType: 'none',
              operatorValue: 0,
            },
          },
        });
      } else {
        Object.assign(extAttr, {
          filtrateCondition: {
            listFilter: {
              valueType: 'all',
              selectKey: [],
            },
            topFilter: {
              valueType: 'none',
              topFilterId: '',
              aggregationType: 'sum',
              extremaType: 'desc',
              limit: 10,
            },
          },
        });
      }
    }
    // 默认添加extAttr, pos属性
    Object.assign(item, { extAttr, pos: list?.length });

    const len = GetAxesLimit(chartType.value || chartType)[axisLocation];
    const index = list?.findIndex((it: any) => it.fieldId === item.fieldId);
    if (index > -1) return;
    const flag = list?.length >= len;
    const params = { flag, axisLocation, item, list };
    cb && cb(params);
  };

  const onDragover = (ev: any, axisLocation: string) => {
    const datasetDropFieldType = window.datasetDropFieldType;
    if (axisLocation === 'dim' && datasetDropFieldType !== 'dim') return;
    if (axisLocation === 'measure' && datasetDropFieldType !== 'measure') {
      return;
    }
    if (!isAllowDrop(axisLocation)) return;
    setDataset && setDataset(ev);
  };
  return {
    updateBizItem,
    getLenLimit,
    isAllowDrop,
    getTip,
    onDrop,
    onDragover,
  };
};
