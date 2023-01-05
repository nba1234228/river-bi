import { ConfigProvider, message } from 'ant-design-vue';
import cloneDeep from 'lodash/cloneDeep';
import { Materiel } from '@/model/types/field';
import allControls from '@/model/designer/fieldControl';
import { getMateriel } from '@/core/materielList';
import skyBlue from '@/assets/styles/themeVar/skyBlue';
import peacockGreen from '@/assets/styles/themeVar/peacockGreen';
import { Grid } from '@/components/chart/common/index';

// 获取UUID
export const getUUID = () => {
  // const model = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
  const model = 'xxxxxxxxxxxxxxxx';
  return model.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
};

// 格式化数值千分位
export const formatNumToThous = (value: number | string) => {
  if (!value) return value;
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

// 获取父节点
export const getPopupContainer = (trigger: any) => trigger.parentNode;

// 判断移动端
export const isMobile = !!navigator.userAgent.match(
  /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/,
);

// 设置主题样式
export const setTheme = (type: string) => {
  let themeType;
  switch (type) {
    case 'peacockGreen':
      themeType = peacockGreen;
      break;
    case 'skyBlue':
      themeType = skyBlue;
      break;
    default:
      themeType = skyBlue;
      break;
  }
  const body = document.getElementsByTagName('body')[0];
  body.classList.forEach((cla) => {
    body.classList.remove(cla);
  });
  body.classList.add(type);
  ConfigProvider.config({
    theme: {
      ...themeType,
    },
  });
};

// 获取控件值
export const getControlValueMap = (control: any): any => {
  const obj = {};
  Object.keys(control).forEach((key) => {
    Object.assign(obj, {
      [key]: cloneDeep(control[key].value),
    });
  });
  return obj;
};

// 转换基本设置、标题等样式
export const transformStyle = (obj: any) => {
  const res: any = {};
  Object.keys(obj).forEach((key) => {
    if (![null, undefined].includes(obj?.[key])) {
      const control = allControls[key];
      const styleKey = control.styleKey;
      if (styleKey === 'display') {
        res[styleKey] = obj[key] ? 'inline-block' : 'none';
      } else {
        res[styleKey] = control.unit ? obj[key] + control.unit : obj[key];
      }
    }
  });
  return res;
};

// 设置组件风格
export const setCompopnentStyle = (curStyle: any) => {
  const componentStyle = curStyle.value?.componentStyle;
  switch (componentStyle) {
    case 'innerLight':
      Object.assign(curStyle.value, {
        'box-shadow': '0 0 3rem rgba(100, 200, 255, 0.5) inset',
      });
      break;
    case 'halo':
      Object.assign(curStyle.value, {
        background:
          'radial-gradient(rgba(39, 73, 101, 0.5), rgba(39, 73, 101, 0.3), rgba(39, 73, 101, 0), rgba(39, 73, 101, 1))',
        'box-shadow': '0 0 2rem rgba(39, 73, 101, 0.1) inset',
      });
      break;
    case 'gradient':
      Object.assign(curStyle.value, {
        'border-image': 'linear-gradient(45deg,red,blue) 10%',
      });
      break;
    case 'fluxayRainbow':
      Object.assign(curStyle.value, {
        background:
          '-webkit-linear-gradient(30deg, #32c5ff 25%, #b620e0 50%, #f7b500 75%, #20e050 100%)',
        animation: 'fluxayRainbow 300s infinite linear',
      });
      break;
    case 'technology':
      Object.assign(curStyle.value, {
        'border-image-slice': '100 130 110 300 fill',
        'border-image-width': '10 13 11 30',
        'border-image-repeat': 'round',
      });
      break;
    case 'technology2':
      Object.assign(curStyle.value, {
        'border-image-slice': '6 120 6 120 fill',
        'border-image-width': '2 40 2 40',
        'border-image-repeat': 'stretch',
      });
      break;
    case 'technology3':
      Object.assign(curStyle.value, {
        'border-image-slice': '6 10 15 10 fill',
        'border-image-width': '0 40px 17px 40px',
        'border-image-repeat': 'stretch',
      });
      break;
    case 'technology4':
      Object.assign(curStyle.value, {
        'border-image-slice': '47 200 60 200 fill',
        'border-image-width': '11px 40px 43px 40px',
        'border-image-repeat': 'stretch',
      });
      break;
    case 'lightSensation':
    case 'blink':
      break;
    default:
      break;
  }
};

// 获取图表相应配置的样式值
export const getStyleProps = (chartType: string, materiel: Materiel) => {
  const style: any = {};
  Object.keys(materiel.controls).forEach((key) => {
    const mapKey = key.replace(/(Controls)(_\w+)?$/g, '');
    Object.assign(style, {
      [mapKey]: getControlValueMap(materiel.controls[key]),
    });
  });

  switch (chartType) {
    case 'strip':
      style.xAxis.splitLine_show = true;
      style.yAxis.yAxis_splitLine_show = false;
      style.series.label_position = 'right';
      break;
    case 'pie':
    case 'ring':
    case 'nightingale':
      Object.keys(style.tooltip).forEach((key) => {
        if (!['show', 'padding'].includes(key)) {
          delete style.tooltip[key];
        }
      });
      break;
    case 'line':
    case 'biaxial':
      style.tooltip.axisPointer_type = 'cross';
      style.series.smooth = cloneDeep(allControls.smooth.value);
      style.series.areaStyle = cloneDeep(allControls.areaStyle.value);
      break;
    default:
      break;
  }
  return style;
};

// 处理简单表
export const TableOptionHandle = (options: any, data: any) => {
  if (data) {
    const list = (data?.dim ?? []).concat(data?.measure ?? []);
    options.dataSource = data.data;
    options.columns = list.map((it: any) => {
      return {
        title: it.fieldName,
        dataIndex: it.fieldId,
        width: '120',
      };
    });
  }
};

// 轴数据转换为echart数据
export const TransformAxesToEchartData = (
  chartType: string,
  options: any,
  result: any,
  defaultOption: any = {},
) => {
  const resDim: any = result.data?.dim?.[0];
  const resMeasure: any = result.data?.measure ?? [];
  const resLegend: any = result.data?.legend?.[0];
  const data0 = result.data.data?.[0] ?? {};
  // dim字段id，用来指定data每项里的dim值
  const resDimId = resDim?.fieldId;
  // measure字段id，用来指定data每项里的measure值
  const resMeasureId = resMeasure[0]?.fieldId;
  // legend字段id，用来指定data每项里的legend值
  const resLegendId = resLegend?.fieldId;
  // 如果没有度量，则清空series的data
  if (!resMeasureId && options.series) {
    options.series = options.series.map((it: any) => {
      Object.assign(it, { name: '', data: [] });
      return it;
    });
  }
  // const tempSeries = cloneDeep(defaultOption?.series ?? []);
  const tempSeries = cloneDeep(options?.series ?? []);
  switch (chartType) {
    case 'table':
      TableOptionHandle(options, result.data);
      break;
    case 'strip':
    case 'bar':
    case 'line':
    case 'stack':
    case 'biaxial':
      // 处理X轴
      let axis = 'xAxis';
      if (chartType === 'strip') axis = 'yAxis';
      if (resDim?.ele) {
        options[axis][0].data = resDim.ele ?? [];
      } else if (resMeasure.length) {
        // 没有维度-有度量时，指标轴数据为度量名称
        options[axis][0].data = resMeasure.map((it: any) => it.fieldName);
      } else {
        options[axis][0].data = [];
      }
      // 如果有legend轴
      if (resLegend?.ele) {
        // 获取每个系列里面所有X轴列表
        let seriesTempData: any = [];
        if (resDim?.ele) {
          seriesTempData = resDim.ele?.map((it: any) => ({
            name: it,
            value: null,
          }));
        } else {
          seriesTempData = [
            {
              name: undefined,
              value: null,
            },
          ];
        }
        // series值数量由legend决定
        options.series = resLegend.ele?.map((member: any) => {
          const seriesItemData = cloneDeep(seriesTempData).map((temp: any) => {
            // 用legend和dim来找到唯一项
            const valueItem = result.data.data.find(
              (dataItem: any) =>
                dataItem[resLegendId] === member &&
                dataItem[resDimId] === temp.name,
            );
            // 用measure字段id找到对应的measure值
            temp.value = valueItem?.[resMeasureId];
            return temp;
          });
          return Object.assign(cloneDeep(tempSeries[0] ?? {}), {
            name: member,
            data: seriesItemData,
          });
        });
        // 如果有度量轴
      } else if (resMeasure.length) {
        // 仅有度量轴，度量轴字段名当作X轴
        if (!resDim && !resLegend) {
          options[axis][0].data = resMeasure.map((it: any) => it.fieldName);
          // 多个度量值存放在一个系列里面
          const series = Object.assign(cloneDeep(tempSeries[0] ?? {}), {
            data: Object.values(result.data.data[0]),
            name: '',
          });
          options.series = [series];
        } else {
          // 多个度量值存放在多个系列里面
          const measureMid = Math.ceil(resMeasure.length / 2);
          let tempSeriesItem = {};
          let i = 0;
          options.series = resMeasure.map((it: any) => {
            const fieldName = it.fieldName;
            // 按照维度成员顺序排列度量值
            const data = resDim.ele.map((dimMember: any) => {
              const val = result.data.data.find(
                (it: any) => it[resDimId] === dimMember,
              );
              return val[it.fieldId];
            });
            // 双轴图度量数量左右平分
            if (
              (i < measureMid && chartType === 'biaxial') ||
              chartType !== 'biaxial'
            ) {
              tempSeriesItem = cloneDeep(tempSeries[0] ?? {});
            } else {
              tempSeriesItem = cloneDeep(tempSeries[0] ?? {});
              Object.assign(tempSeriesItem, { type: 'line', yAxisIndex: 1 });
            }
            i++;
            return Object.assign(cloneDeep(tempSeriesItem), {
              data: data,
              name: fieldName,
            });
          });
        }
      } else {
        // 没有legend、度量轴，清空series值
        options.series = cloneDeep(tempSeries);
      }
      // 处理双轴图分割线一致
      if (options.series.length && chartType === 'biaxial') {
        const left = options.series
          .filter((it: any) => it.yAxisIndex !== 1)
          .map((it: any) => it.data)
          .flat(Infinity)
          .sort((a: number, b: number) => a - b);
        let leftMin = left[0];
        const leftMax = left.reverse()[0];
        const right = options.series
          .filter((it: any) => it.yAxisIndex === 1)
          .map((it: any) => it.data)
          .flat(Infinity)
          .sort((a: number, b: number) => a - b);
        // TODO
        // 此处还需优化
        let rightMin = right[0];
        const rightMax = right.reverse()[0];
        if (leftMin >= 0 && rightMin < 0) {
          leftMin = rightMin;
        }
        if (rightMin >= 0 && leftMin < 0) {
          rightMin = leftMin;
        }
        options.yAxis[0].min = Math.ceil(Math.ceil(leftMin) / 5) * 5;
        options.yAxis[1].min = Math.ceil(Math.ceil(rightMin) / 5) * 5;
        options.yAxis[0].interval = Math.ceil(
          (Math.ceil(leftMax) - options.yAxis[0].min) / 5,
        );
        options.yAxis[1].interval = Math.ceil(
          (Math.ceil(rightMax) - options.yAxis[1].min) / 5,
        );
      }
      break;
    case 'radar':
      if (resDim?.ele) {
        options.radar.indicator = resDim.ele.map((it: any) => ({
          name: it,
        }));
      } else {
        options.radar.indicator = [];
      }
      options.series[0].name = resMeasure[0]?.fieldName;
      // 如果有legend轴
      if (resLegend?.ele) {
        // 获取每个系列里面所有X轴列表
        const seriesTempData = resDim.ele?.map((it: any) => ({
          name: it,
          value: null,
        }));
        // series值数量由legend决定
        options.series[0].data = resLegend.ele?.map((member: any) => {
          const seriesItemData = cloneDeep(seriesTempData).map((temp: any) => {
            // 用legend和dim来找到唯一项
            const valueItem = result.data.data.find(
              (dataItem: any) =>
                dataItem[resLegendId] === member &&
                dataItem[resDimId] === temp.name,
            );
            // 用measure字段id找到对应的measure值
            temp.value = valueItem?.[resMeasureId];
            return temp;
          });
          const value = seriesItemData.map((el: any) => el.value);
          return {
            value,
            name: member,
          };
        });
        // 如果有度量轴
      } else if (resMeasure.length) {
        // 仅有度量轴，度量轴字段名当作indicator
        if (!resDim && !resLegend) {
          options.radar.indicator = resMeasure.map((it: any) => ({
            name: it.fieldName,
          }));
          let i = 0;
          const arr = new Array(resMeasure.length).fill(null);
          options.series[0].data = resMeasure.map((it: any) => {
            const curArr = cloneDeep(arr);
            curArr[i] = data0?.[resMeasure[i].fieldId];
            i++;
            return {
              value: curArr,
              name: it.fieldName,
            };
          });
        } else {
          options.series[0].data = resMeasure.map((it: any) => {
            // const value = result.data.data.map((el: any) => el[it.fieldId]);
            // 按照维度成员顺序排列度量值
            const value = resDim.ele.map((dimMember: any) => {
              const val = result.data.data.find(
                (it: any) => it[resDimId] === dimMember,
              );
              return val[it.fieldId];
            });
            return {
              value,
              name: it.fieldName,
            };
          });
        }
      } else {
        // 没有legend、度量轴，清空series值
        options.series[0].data = [];
      }
      break;
    case 'pie':
    case 'ring':
    case 'nightingale':
      // 多个度量值存放在一个系列里面，没有维度时，名称取度量的名称
      options.series[0].name = resMeasure[0]?.fieldName;
      options.series[0].data = result.data.data.map((it: any) => {
        return {
          name: resDim ? it[resDimId] : resMeasure[0]?.fieldName,
          value: it[resMeasureId],
        };
      });
      break;
    case 'multivalue':
      options.value = resMeasure.map((it: any) => {
        return {
          name: it.fieldName,
          value: data0[it.fieldId],
        };
      });
      break;
    case 'gauge':
      options.series[0].data = resMeasure.map((it: any) => {
        return {
          name: it.fieldName,
          value: data0[it.fieldId],
        };
      });
      break;
    default:
      break;
  }
  return options;
};

// 静态json转换为echart数据
export const TransformStaticJsonToEchartData = (
  chartType: string,
  options: any,
  staticJson: any,
  defaultOption: any = {},
) => {
  // const tempSeries1 = cloneDeep(defaultOption?.series?.[0] ?? {});
  const tempSeries1 = cloneDeep(options?.series?.[0] ?? {});
  const tempSeries2 = cloneDeep(options?.series?.[1] ?? {});
  switch (chartType) {
    case 'table':
      options.columns = staticJson.columnsData;
      options.dataSource = staticJson.seriesData;
      break;
    case 'strip':
    case 'bar':
    case 'line':
    case 'stack':
      // 处理X轴
      let axis = 'xAxis';
      if (chartType === 'strip') axis = 'yAxis';
      options[axis][0].data = staticJson.xAxisData;
      options.series = staticJson.seriesData.map((it: any) => {
        if (it.stack) {
          return Object.assign(cloneDeep(tempSeries1), {
            ...it,
          });
        } else {
          return Object.assign(cloneDeep(tempSeries1), {
            ...it,
          });
        }
      });
      break;
    case 'biaxial':
      options.xAxis[0].data = staticJson.xAxisData;
      options.series = staticJson.seriesData.map((it: any) => {
        if (it.type === 'line') {
          return Object.assign(cloneDeep(tempSeries2), {
            ...it,
          });
        } else {
          return Object.assign(cloneDeep(tempSeries1), {
            ...it,
          });
        }
      });
      break;
    case 'radar':
      options.radar.indicator = staticJson.indicatorData;
      options.series = staticJson.seriesData.map((it: any) => {
        return Object.assign(cloneDeep(tempSeries1), {
          ...it,
        });
      });
      break;
    case 'pie':
    case 'ring':
    case 'nightingale':
      options.series = staticJson.seriesData.map((it: any) => {
        return Object.assign(cloneDeep(tempSeries1), {
          ...it,
        });
      });
      break;
    case 'multivalue':
      options.value = staticJson.seriesData;
      break;
    case 'gauge':
      options.series = staticJson.seriesData.map((it: any) => {
        return Object.assign(cloneDeep(tempSeries1), {
          ...it,
        });
      });
      break;
    default:
      break;
  }
  return options;
};

const arrayType = ['xAxis', 'yAxis', 'series'];
function arrayHand(item: any, obj: any) {
  if (Array.isArray(item)) {
    item.forEach((el) => {
      Object.assign(el, obj);
    });
  } else {
    Object.assign(item, obj);
  }
}
// 处理多层级对象属性
function levelHand(item: any, list: any, value: any) {
  if (list.length) {
    const key = list.shift();
    if (Array.isArray(item)) {
      item.forEach((el) => {
        if (!el[key]) {
          el[key] = arrayType.includes(key) ? [] : {};
        }
        if (list.length) {
          levelHand(el[key], cloneDeep(list), value);
        } else {
          arrayHand(el, { [key]: value });
        }
      });
    } else {
      if (!item[key]) {
        item[key] = arrayType.includes(key) ? [] : {};
      }
      if (list.length) {
        levelHand(item[key], list, value);
      } else {
        arrayHand(item, { [key]: value });
      }
    }
  }
}
// 将控件数据转为css style
export const transformStyleToOption = (option: any, styles: any) => {
  if (!option) return;
  Object.keys(styles).forEach((key: any) => {
    if (!option[key]) {
      option[key] = arrayType.includes(key) ? [] : {};
    }
    const group = styles[key];
    Object.keys(group).forEach((name: any) => {
      const control = allControls[name];
      if (control) {
        const value = control.unit ? group[name] + control.unit : group[name];
        if (control.isLevel) {
          const subKeys = control.styleKey.split('_');
          levelHand(option[key], subKeys, value);
        } else {
          arrayHand(option[key], { [control.styleKey]: value });
        }
      }
    });
  });
  if (option.grid) {
    if (option.dataZoom?.show) {
      if (option.dataZoom.orient === 'vertical') {
        option.grid.right = 60;
      } else {
        option.grid.bottom = 50;
      }
    } else {
      option.grid.bottom = Grid.bottom;
    }
  }

  return option;
};

// 组装card属性
export const JoinCardProp = (data: any) => {
  const {
    cardId,
    chartType,
    cardName,
    dbSourceId,
    datasetCategory,
    dataSourceType,
    datasetId,
    axes,
    cardAttr,
    styles,
    staticJson,
    foreignConfig,
    options,
  } = data;
  const cardInfo = {
    cardId,
    chartType,
    cardName,
    dbSourceId,
    datasetCategory,
    dataSourceType,
    datasetId,
  };

  return {
    cardInfo,
    axes,
    cardAttr,
    styles,
    staticJson,
    foreignConfig,
    options,
  };
};

// 统一处理后端返回结果
export const responseHandle = (res: any, callback: Function = () => null) => {
  if (res.code === 0) {
    callback && callback();
  } else {
    message.warning(
      typeof res.message === 'object'
        ? JSON.stringify(res.message)
        : res.message || '操作失败，请稍后再试',
    );
  }
};

// 获取当前组件关联的全局筛选器的值
export const GetAllGlobalFilterValue = (comps: any, dataId: string) => {
  const filterComp = comps.filter((it: any) => {
    return ['listFilter', 'dateFilter'].includes(it.componentType);
  });
  return filterComp
    .filter((it: any) => {
      return it.serviceData.relatedCompId.includes(dataId);
    })
    .map((it: any) => {
      const field = it.serviceData.axes.dim.value[0] ?? {};
      return {
        ...field,
        value: it.serviceData.value,
        filterType: it.componentType,
      };
    });
};

// 获取图表轴列表
export const GetBizCategory = (chartType: string) => {
  const materiel = getMateriel(chartType);
  const axesList = cloneDeep(materiel?.axesList ?? []);
  return axesList;
};

// 获取图表每个轴的值限制
export const GetAxesLimit = (chartType: string) => {
  const obj: any = {};
  const axesList = GetBizCategory(chartType);
  axesList.forEach((item: any) => {
    Object.assign(obj, {
      [item.axisLocation]: item.max,
    });
  });
  return obj;
};

// 获取图表每个轴的属性
export const GetAxes = (chartType: any) => {
  const obj: any = {};
  const axesList = GetBizCategory(chartType);
  axesList.forEach((item: any) => {
    Object.assign(obj, {
      [item.axisLocation]: {
        axisLocation: item.axisLocation,
        axisLabel: item.axisLabel,
        value: [],
      },
    });
  });
  return obj;
};

// 图表转换
export const TransformChart = (type: string, preAxes: any) => {
  const axes = GetAxes(type);
  const originAxesStrList = Object.keys(preAxes);
  const targetAxesStrList = Object.keys(axes);
  targetAxesStrList.forEach((key) => {
    if (preAxes[key]?.value) {
      axes[key].value = cloneDeep(preAxes[key].value);
    }
  });
  switch (type) {
    case 'table':
      // 原来图 有系列，则系列放到维度中
      if (originAxesStrList.includes('legend')) {
        const legend = cloneDeep(preAxes.legend.value);
        axes.dim.value = axes.dim.value.concat(legend);
      }
      break;
    // case 'multivalue':
    //   break;
    case 'bar':
    case 'strip':
    case 'line':
    case 'stack':
    case 'biaxial':
    case 'radar':
      // 原来图 没有维度，有系列，则系列1放到维度中，其余放到系列中
      if (
        !originAxesStrList.includes('dim') &&
        originAxesStrList.includes('legend')
      ) {
        const legend = cloneDeep(preAxes.legend.value);
        axes.dim.value = legend.slice(0, 1);
        axes.legend.value = legend.slice(1);
      }
      break;
    case 'pie':
    case 'ring':
    case 'nightingale':
      // 原来图 有维度，则维度放到系列中
      // if (originAxesStrList.includes('dim')) {
      //   axes.dim.value = cloneDeep(preAxes.dim.value)
      // }
      break;
    // 目标图没有维度，没有系列
    case 'multivalue':
    case 'gauge':
      break;
    default:
      break;
  }
  return axes;
};
