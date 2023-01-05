import cloneDeep from 'lodash/cloneDeep';
import skyBlue from '@/assets/styles/themeVar/skyBlue';
import peacockGreen from '@/assets/styles/themeVar/peacockGreen';
import {
  OutXMargin,
  OutYMargin,
  ColNum,
  RowHeight,
  XMargin,
  YMargin,
} from '@/model/designer/layoutConstant';
import { FieldType } from '@/model/types/field';

const themeType = localStorage.getItem('themeType') || 'skyBlue';
let themeVar: any;
switch (themeType) {
  case 'skyBlue':
    themeVar = skyBlue;
    break;
  case 'peacockGreen':
    themeVar = peacockGreen;
    break;
  default:
    break;
}
const allControls: { [key: string]: FieldType } = {
  // 背景设置
  backgroundColor: {
    label: '背景颜色',
    value: themeVar.bodyBackground,
    key: 'backgroundColor',
    valueType: 'string',
    controlType: 'ColorPickerControl',
    styleKey: 'background-color',
    pos: 0,
  },
  // 布局设置
  colNum: {
    label: '列数',
    value: ColNum,
    key: 'colNum',
    valueType: 'number',
    controlType: 'InputNumberControl',
    styleKey: '',
    unit: '',
    propData: {
      min: 12,
      max: 96,
      step: 12,
    },
    pos: 100,
  },
  rowHeight: {
    label: '行高',
    value: RowHeight,
    key: 'rowHeight',
    valueType: 'number',
    controlType: 'InputNumberControl',
    styleKey: '',
    unit: 'px',
    propData: {
      min: 5,
      max: 50,
      step: 5,
    },
    pos: 200,
  },
  xMargin: {
    label: 'X轴间距',
    value: XMargin,
    key: 'xMargin',
    valueType: 'number',
    controlType: 'InputNumberControl',
    styleKey: '',
    unit: 'px',
    propData: {
      min: 0,
      max: 100,
      step: 10,
    },
    pos: 300,
  },
  yMargin: {
    label: 'Y轴间距',
    value: YMargin,
    key: 'yMargin',
    valueType: 'number',
    controlType: 'InputNumberControl',
    styleKey: '',
    unit: 'px',
    propData: {
      min: 0,
      max: 100,
      step: 10,
    },
    pos: 400,
  },
  outXMargin: {
    label: 'X轴外间距',
    value: OutXMargin,
    key: 'outXMargin',
    valueType: 'number',
    controlType: 'InputNumberControl',
    styleKey: '',
    unit: 'px',
    propData: {
      min: 0,
      max: 100,
      step: 2,
    },
    pos: 500,
  },
  outYMargin: {
    label: 'Y轴外间距',
    value: OutYMargin,
    key: 'outYMargin',
    valueType: 'number',
    controlType: 'InputNumberControl',
    styleKey: '',
    unit: 'px',
    propData: {
      min: 0,
      max: 100,
      step: 2,
    },
    pos: 600,
  },
  // 基本设置
  borderStyle: {
    label: '边框类型',
    value: 'solid',
    key: 'borderStyle',
    valueType: 'string',
    controlType: 'SelectControl',
    styleKey: 'border-style',
    propData: {
      options: [
        {
          label: '实线',
          value: 'solid',
          title: '实线',
        },
        {
          label: '虚线',
          value: 'dashed',
          title: '虚线',
        },
        {
          label: '点',
          value: 'dotted',
          title: '点',
        },
      ],
    },
    pos: 700,
  },
  borderColor: {
    label: '边框颜色',
    value: themeVar.borderColorBase,
    key: 'borderColor',
    valueType: 'string',
    controlType: 'ColorPickerControl',
    styleKey: 'border-color',
    pos: 800,
  },
  borderRadius: {
    label: '边框圆角',
    value: 0,
    key: 'borderRadius',
    valueType: 'number',
    controlType: 'InputNumberControl',
    styleKey: 'border-radius',
    unit: 'px',
    propData: {
      min: 0,
      max: 100,
      step: 2,
    },
    pos: 900,
  },
  borderWidth: {
    label: '边框宽度',
    value: 1,
    key: 'borderWidth',
    valueType: 'number',
    controlType: 'InputNumberControl',
    styleKey: 'border-width',
    unit: 'px',
    propData: {
      min: 0,
      max: 100,
      step: 1,
    },
    pos: 1000,
  },
  componentStyle: {
    label: '组件风格',
    value: '',
    key: 'componentStyle',
    valueType: 'string',
    controlType: 'SelectControl',
    styleKey: 'componentStyle',
    unit: '',
    propData: {
      options: [
        {
          label: '无',
          value: '',
          title: '无',
        },
        {
          label: '内发光',
          value: 'innerLight',
          title: '内发光',
        },
        {
          label: '光晕',
          value: 'halo',
          title: '光晕',
        },
        {
          label: '渐变框',
          value: 'gradient',
          title: '渐变框',
        },
        {
          label: '流光彩虹',
          value: 'fluxayRainbow',
          title: '流光彩虹',
        },
        {
          label: '光感',
          value: 'lightSensation',
          title: '光感',
        },
        {
          label: '科技边框',
          value: 'technology',
          title: '科技边框',
        },
        {
          label: '科技边框2',
          value: 'technology2',
          title: '科技边框2',
        },
        {
          label: '科技标题',
          value: 'technology3',
          title: '科技标题',
        },
        {
          label: '科技标题2',
          value: 'technology4',
          title: '科技标题2',
        },
        {
          label: '闪烁边框',
          value: 'blink',
          title: '闪烁边框',
        },
      ],
    },
    pos: 1100,
  },
  // 标题设置
  headLineShow: {
    label: '显示',
    value: true,
    key: 'show',
    valueType: 'boolean',
    controlType: 'SwitchControl',
    styleKey: 'display',
    inHead: true,
    pos: 1200,
  },
  name: {
    label: '标题',
    value: '标题内容',
    key: 'name',
    valueType: 'string',
    controlType: 'InputControl',
    styleKey: '',
    pos: 1300,
  },
  color: {
    label: '字体颜色',
    value: themeVar.textColor,
    key: 'color',
    valueType: 'string',
    controlType: 'ColorPickerControl',
    styleKey: 'color',
    pos: 1400,
  },
  fontSize: {
    label: '字体尺寸',
    value: 14,
    key: 'fontSize',
    valueType: 'number',
    controlType: 'InputNumberControl',
    styleKey: 'font-size',
    unit: 'px',
    propData: {
      min: 12,
      max: 100,
      step: 2,
    },
    pos: 1500,
  },
  fontWeight: {
    label: '字体粗细',
    value: '400',
    key: 'fontWeight',
    valueType: 'string',
    controlType: 'SelectControl',
    styleKey: 'font-weight',
    propData: {
      options: [
        {
          label: '正常',
          value: '400',
          title: '正常',
        },
        {
          label: '加粗',
          value: '600',
          title: '加粗',
        },
      ],
    },
    pos: 1600,
  },
  textDecoration: {
    label: '字体修饰',
    value: 'none',
    key: 'textDecoration',
    valueType: 'string',
    controlType: 'SelectControl',
    styleKey: 'text-decoration',
    propData: {
      options: [
        {
          label: '无',
          value: 'none',
          title: '无',
        },
        {
          label: '上划线',
          value: 'overline',
          title: '上划线',
        },
        {
          label: '中划线',
          value: 'line-through',
          title: '中划线',
        },
        {
          label: '下划线',
          value: 'underline',
          title: '下划线',
        },
      ],
    },
    pos: 1700,
  },
  textAlign: {
    label: '显示位置',
    value: 'left',
    key: 'textAlign',
    valueType: 'string',
    controlType: 'SelectControl',
    styleKey: 'text-align',
    propData: {
      options: [
        {
          label: '左对齐',
          value: 'left',
          title: '左对齐',
        },
        {
          label: '居中对齐',
          value: 'center',
          title: '居中对齐',
        },
        {
          label: '右对齐',
          value: 'right',
          title: '右对齐',
        },
      ],
    },
    pos: 1800,
  },
  paddingLeft: {
    label: '左内边距',
    value: 0,
    key: 'paddingLeft',
    valueType: 'number',
    controlType: 'InputNumberControl',
    styleKey: 'padding-left',
    unit: 'px',
    propData: {
      min: 0,
    },
    pos: 1900,
  },
  paddingRight: {
    label: '右内边距',
    value: 0,
    key: 'paddingRight',
    valueType: 'number',
    controlType: 'InputNumberControl',
    styleKey: 'padding-right',
    unit: 'px',
    propData: {
      min: 0,
    },
    pos: 2000,
  },
  // 多值图设置
  groupLayout: {
    label: '分组布局',
    value: 'row',
    key: 'groupLayout',
    valueType: 'string',
    controlType: 'SelectControl',
    styleKey: 'groupLayout',
    propData: {
      options: [
        {
          label: '水平',
          value: 'row',
          title: '水平',
        },
        {
          label: '垂直',
          value: 'column',
          title: '垂直',
        },
      ],
    },
    pos: 2100,
  },
  numberLayout: {
    label: '数值布局',
    value: 'row',
    key: 'groupLayout',
    valueType: 'string',
    controlType: 'SelectControl',
    styleKey: 'numberLayout',
    propData: {
      options: [
        {
          label: '水平',
          value: 'row',
          title: '水平',
        },
        {
          label: '垂直',
          value: 'column',
          title: '垂直',
        },
      ],
    },
    pos: 2200,
  },
  compareLayout: {
    label: '同环比布局',
    value: 'columnLeft',
    key: 'groupLayout',
    valueType: 'string',
    controlType: 'SelectControl',
    styleKey: 'compareLayout',
    propData: {
      options: [
        {
          label: '水平',
          value: 'row',
          title: '水平',
        },
        {
          label: '垂直居中',
          value: 'columnCenter',
          title: '垂直',
        },
        {
          label: '垂直左对齐',
          value: 'columnLeft',
          title: '垂直',
        },
        {
          label: '垂直右对齐',
          value: 'columnRight',
          title: '垂直',
        },
      ],
    },
    pos: 2300,
  },
  valueColor: {
    label: '字体颜色',
    value: themeVar.textColor,
    key: 'valueColor',
    valueType: 'string',
    controlType: 'ColorPickerControl',
    styleKey: 'valueColor',
    pos: 2400,
  },
  valueFontSize: {
    label: '字体尺寸',
    value: 30,
    key: 'valueFontSize',
    valueType: 'number',
    controlType: 'InputNumberControl',
    styleKey: 'valueFontSize',
    unit: 'px',
    propData: {
      min: 12,
      max: 100,
      step: 2,
    },
    pos: 2500,
  },
  valueFontWeight: {
    label: '字体粗细',
    value: '400',
    key: 'valueFontWeight',
    valueType: 'string',
    controlType: 'SelectControl',
    styleKey: 'valueFontWeight',
    propData: {
      options: [
        {
          label: '正常',
          value: '400',
          title: '正常',
        },
        {
          label: '加粗',
          value: '600',
          title: '加粗',
        },
      ],
    },
    pos: 2600,
  },
  // 图例设置
  show: {
    label: '显示',
    value: true,
    key: 'show',
    valueType: 'boolean',
    controlType: 'SwitchControl',
    styleKey: 'show',
    inHead: true,
    pos: 2700,
  },
  legendAlign: {
    label: '对齐方式',
    value: 'auto',
    key: 'align',
    valueType: 'string',
    controlType: 'SelectControl',
    styleKey: 'align',
    propData: {
      options: [
        {
          value: 'auto',
          label: '自动',
          title: '自动',
        },
        {
          value: 'left',
          label: '左对齐',
          title: '左对齐',
        },
        {
          value: 'right',
          label: '右对齐',
          title: '右对齐',
        },
      ],
    },
    pos: 2800,
  },
  orient: {
    label: '布局朝向',
    value: 'horizontal',
    key: 'orient',
    valueType: 'string',
    controlType: 'SelectControl',
    styleKey: 'orient',
    propData: {
      options: [
        {
          label: '水平',
          value: 'horizontal',
          title: '水平',
        },
        {
          label: '竖直',
          value: 'vertical',
          title: '竖直',
        },
      ],
    },
    pos: 2900,
  },
  pageIconSize: {
    label: '翻页按钮大小',
    value: 12,
    key: 'pageIconSize',
    valueType: 'number',
    controlType: 'InputNumberControl',
    styleKey: 'pageIconSize',
    propData: {
      min: 12,
      max: 100,
      step: 2,
    },
    pos: 3000,
  },
  // xAxis轴设置
  axisLine_show: {
    label: '显示轴线',
    value: false,
    key: 'axisLine_show',
    valueType: 'boolean',
    controlType: 'SwitchControl',
    styleKey: 'axisLine_show',
    isLevel: true,
    pos: 3100,
  },
  axisLine_lineStyle_type: {
    label: '轴线类型',
    value: 'solid',
    key: 'axisLine_lineStyle_type',
    valueType: 'string',
    controlType: 'SelectControl',
    styleKey: 'axisLine_lineStyle_type',
    isLevel: true,
    propData: {
      options: [
        {
          label: '实线',
          value: 'solid',
          title: '实线',
        },
        {
          label: '虚线',
          value: 'dashed',
          title: '虚线',
        },
        {
          label: '点',
          value: 'dotted',
          title: '点',
        },
      ],
    },
    pos: 3200,
  },
  axisTick_show: {
    label: '显示坐标轴刻度',
    value: false,
    key: 'axisTick_show',
    valueType: 'boolean',
    controlType: 'SwitchControl',
    styleKey: 'axisTick_show',
    isLevel: true,
    pos: 3300,
  },
  axisLabel_show: {
    label: '显示刻度标签',
    value: true,
    key: 'axisLabel_show',
    valueType: 'boolean',
    controlType: 'SwitchControl',
    styleKey: 'axisLabel_show',
    isLevel: true,
    pos: 3400,
  },
  axisLabel_align: {
    label: '对齐方式',
    value: 'center',
    key: 'axisLabel_align',
    valueType: 'string',
    controlType: 'SelectControl',
    styleKey: 'axisLabel_align',
    isLevel: true,
    propData: {
      options: [
        {
          label: '左对齐',
          value: 'left',
          title: '左对齐',
        },
        {
          label: '居中对齐',
          value: 'center',
          title: '居中对齐',
        },
        {
          label: '右对齐',
          value: 'right',
          title: '右对齐',
        },
      ],
    },
    pos: 3500,
  },
  axisLabel_rotate: {
    label: '旋转角度',
    value: 0,
    key: 'axisLabel_rotate',
    valueType: 'number',
    controlType: 'InputNumberControl',
    styleKey: 'axisLabel_rotate',
    isLevel: true,
    propData: {
      min: 0,
      max: 360,
      step: 5,
    },
    pos: 3600,
  },
  splitLine_show: {
    label: '显示分隔线',
    value: false,
    key: 'splitLine_show',
    valueType: 'boolean',
    controlType: 'SwitchControl',
    styleKey: 'splitLine_show',
    isLevel: true,
    pos: 3700,
  },
  splitLine_lineStyle_type: {
    label: '分隔线类型',
    value: 'solid',
    key: 'splitLine_lineStyle_type',
    valueType: 'string',
    controlType: 'SelectControl',
    styleKey: 'splitLine_lineStyle_type',
    isLevel: true,
    propData: {
      options: [
        {
          label: '实线',
          value: 'solid',
          title: '实线',
        },
        {
          label: '虚线',
          value: 'dashed',
          title: '虚线',
        },
        {
          label: '点',
          value: 'dotted',
          title: '点',
        },
      ],
    },
    pos: 3800,
  },
  // yAxis轴设置
  axisPointer_label_show: {
    label: '显示指示器标签',
    value: true,
    key: 'axisPointer_label_show',
    valueType: 'boolean',
    controlType: 'SwitchControl',
    styleKey: 'axisPointer_label_show',
    isLevel: true,
    pos: 3900,
  },
  yAxis_splitLine_show: {
    label: '显示分隔线',
    value: true,
    key: 'yAxis_splitLine_show',
    valueType: 'boolean',
    controlType: 'SwitchControl',
    styleKey: 'splitLine_show',
    isLevel: true,
    pos: 4000,
  },
  // 工具栏设置
  toolboxShow: {
    label: '显示',
    value: false,
    key: 'show',
    valueType: 'boolean',
    controlType: 'SwitchControl',
    styleKey: 'show',
    inHead: true,
    pos: 4100,
  },
  itemSize: {
    label: 'icon大小',
    value: 12,
    key: 'itemSize',
    valueType: 'number',
    controlType: 'InputNumberControl',
    styleKey: 'itemSize',
    propData: {
      min: 12,
      max: 100,
      step: 2,
    },
    pos: 4200,
  },
  itemGap: {
    label: 'icon间隔',
    value: 12,
    key: 'itemGap',
    valueType: 'number',
    controlType: 'InputNumberControl',
    styleKey: 'itemGap',
    propData: {
      min: 4,
      max: 30,
      step: 2,
    },
    pos: 4300,
  },
  feature_saveAsImage_show: {
    label: '保存为图片',
    value: true,
    key: 'feature_saveAsImage_show',
    valueType: 'boolean',
    controlType: 'SwitchControl',
    styleKey: 'feature_saveAsImage_show',
    isLevel: true,
    pos: 4400,
  },
  feature_dataView_show: {
    label: '数据视图',
    value: false,
    key: 'feature_dataView_show',
    valueType: 'boolean',
    controlType: 'SwitchControl',
    styleKey: 'feature_dataView_show',
    isLevel: true,
    pos: 4500,
  },
  feature_dataZoom_show: {
    label: '数据区域',
    value: false,
    key: 'feature_dataZoom_show',
    valueType: 'boolean',
    controlType: 'SwitchControl',
    styleKey: 'feature_dataZoom_show',
    isLevel: true,
    pos: 4600,
  },
  feature_magicType_show: {
    label: '类型切换',
    value: false,
    key: 'feature_magicType_show',
    valueType: 'boolean',
    controlType: 'SwitchControl',
    styleKey: 'feature_magicType_show',
    isLevel: true,
    pos: 4700,
  },
  // 系列设置
  label_show: {
    label: '显示图形标签',
    value: false,
    key: 'label_show',
    valueType: 'boolean',
    controlType: 'SwitchControl',
    styleKey: 'label_show',
    isLevel: true,
    pos: 4800,
  },
  label_position: {
    label: '标签位置',
    value: 'top',
    key: 'label_position',
    valueType: 'string',
    controlType: 'SelectControl',
    styleKey: 'label_position',
    isLevel: true,
    propData: {
      options: [
        {
          label: '顶部',
          value: 'top',
          title: '顶部',
        },
        {
          label: '左侧',
          value: 'left',
          title: '左侧',
        },
        {
          label: '右侧',
          value: 'right',
          title: '右侧',
        },
        {
          label: '底部',
          value: 'bottom',
          title: '底部',
        },
      ],
    },
    pos: 4900,
  },
  itemStyle_borderRadius: {
    label: '圆角半径',
    value: 6,
    key: 'itemStyle_borderRadius',
    valueType: 'number',
    controlType: 'InputNumberControl',
    styleKey: 'itemStyle_borderRadius',
    isLevel: true,
    propData: {
      min: 0,
      max: 100,
      step: 2,
    },
    pos: 5000,
  },
  smooth: {
    label: '显示平滑曲线',
    value: true,
    key: 'smooth',
    valueType: 'boolean',
    controlType: 'SwitchControl',
    styleKey: 'smooth',
    pos: 5100,
  },
  areaStyle: {
    label: '区域填充样式',
    value: 'true',
    key: 'areaStyle',
    valueType: 'string',
    controlType: 'SelectControl',
    styleKey: 'areaStyle',
    propData: {
      options: [
        {
          label: '面积图',
          value: 'true',
          title: '面积图',
        },
        {
          label: '折线图',
          value: null,
          title: '折线图',
        },
      ],
    },
    pos: 5200,
  },
  label_formatter: {
    label: '标签格式',
    value: '{c}',
    key: 'label_formatter',
    valueType: 'string',
    controlType: 'SelectControl',
    styleKey: 'label_formatter',
    isLevel: true,
    propData: {
      options: [
        {
          label: '数据名',
          value: '{b}',
          title: '数据名',
        },
        {
          label: '数据值',
          value: '{c}',
          title: '数据值',
        },
        {
          label: '数据名+数据值',
          value: '{b}：{c}',
          title: '数据名+数据值',
        },
      ],
    },
    pos: 5300,
  },
  pie_label_position: {
    label: '标签位置',
    value: 'outside',
    key: 'pie_label_position',
    valueType: 'string',
    controlType: 'SelectControl',
    styleKey: 'label_position',
    isLevel: true,
    propData: {
      options: [
        {
          label: '外部',
          value: 'outside',
          title: '外部',
        },
        {
          label: '内部',
          value: 'inside',
          title: '内部',
        },
        {
          label: '中心',
          value: 'center',
          title: '中心',
        },
      ],
    },
    pos: 5400,
  },
  pie_label_formatter: {
    label: '标签格式',
    value: '{c}',
    key: 'pie_label_formatter',
    valueType: 'string',
    controlType: 'SelectControl',
    styleKey: 'label_formatter',
    isLevel: true,
    propData: {
      options: [
        {
          label: '数据名',
          value: '{b}',
          title: '数据名',
        },
        {
          label: '数据值',
          value: '{c}',
          title: '数据值',
        },
        {
          label: '百分比',
          value: '{d}%',
          title: '百分比',
        },
        {
          label: '数据名+数据值',
          value: '{b}：{c}',
          title: '数据名+数据值',
        },
        {
          label: '数据名+百分比',
          value: '{b}：{d}%',
          title: '数据名+百分比',
        },
        {
          label: '数据名+数据值+百分比',
          value: '{b}：{c}({d}%)',
          title: '数据名+数据值+百分比',
        },
      ],
    },
    pos: 5500,
  },
  // 提示框设置
  padding: {
    label: '内边距',
    value: 5,
    key: 'padding',
    valueType: 'number',
    controlType: 'InputNumberControl',
    styleKey: 'padding',
    propData: {
      min: 0,
      max: 100,
      step: 1,
    },
    pos: 5600,
  },
  axisPointer_type: {
    label: '指示器类型',
    value: 'shadow',
    key: 'axisPointer_type',
    valueType: 'string',
    controlType: 'SelectControl',
    styleKey: 'axisPointer_type',
    isLevel: true,
    propData: {
      options: [
        {
          label: '线型',
          value: 'line',
          title: '线型',
        },
        {
          label: '阴影',
          value: 'shadow',
          title: '阴影',
        },
        {
          label: '无',
          value: 'none',
          title: 'none',
        },
        {
          label: '十字',
          value: 'cross',
          title: '十字',
        },
      ],
    },
    pos: 5700,
  },
  // 缩放轴
  dataZoomShow: {
    label: '显示',
    value: false,
    key: 'show',
    valueType: 'boolean',
    controlType: 'SwitchControl',
    styleKey: 'show',
    inHead: true,
    pos: 5800,
  },
  dataZoomLeft: {
    label: '左侧边距',
    value: 10,
    key: 'dataZoomLeft',
    valueType: 'number',
    controlType: 'InputNumberControl',
    styleKey: 'left',
    unit: '',
    propData: {
      min: 0,
    },
    pos: 5900,
  },
  dataZoomRight: {
    label: '右侧边距',
    value: 10,
    key: 'dataZoomRight',
    valueType: 'number',
    controlType: 'InputNumberControl',
    styleKey: 'right',
    unit: '',
    propData: {
      min: 0,
    },
    pos: 6000,
  },
  dataZoomTop: {
    label: '顶部边距',
    value: 10,
    key: 'dataZoomTop',
    valueType: 'number',
    controlType: 'InputNumberControl',
    styleKey: 'top',
    unit: '',
    propData: {
      min: 0,
    },
    pos: 6100,
  },
  dataZoomBottom: {
    label: '底部边距',
    value: 10,
    key: 'dataZoomBottom',
    valueType: 'number',
    controlType: 'InputNumberControl',
    styleKey: 'bottom',
    unit: '',
    propData: {
      min: 0,
    },
    pos: 6200,
  },
  dataZoomStart: {
    label: '起始值',
    value: 0,
    key: 'dataZoomStart',
    valueType: 'number',
    controlType: 'InputNumberControl',
    styleKey: 'start',
    unit: '',
    propData: {
      min: 0,
      max: 90,
    },
    pos: 6300,
  },
  dataZoomEnd: {
    label: '终点值',
    value: 100,
    key: 'dataZoomEnd',
    valueType: 'number',
    controlType: 'InputNumberControl',
    styleKey: 'end',
    unit: '',
    propData: {
      min: 10,
      max: 100,
    },
    pos: 6400,
  },
  // 简单表设置
  bordered: {
    label: '显示边框',
    value: false,
    key: 'bordered',
    valueType: 'boolean',
    controlType: 'SwitchControl',
    styleKey: 'bordered',
    pos: 6500,
  },
  showHeader: {
    label: '显示头部',
    value: true,
    key: 'showHeader',
    valueType: 'boolean',
    controlType: 'SwitchControl',
    styleKey: 'showHeader',
    pos: 6600,
  },
  sticky: {
    label: '粘性头部',
    value: true,
    key: 'sticky',
    valueType: 'boolean',
    controlType: 'SwitchControl',
    styleKey: 'sticky',
    pos: 6700,
  },
  align: {
    label: '列对齐方式',
    value: 'left',
    key: 'align',
    valueType: 'string',
    controlType: 'SelectControl',
    styleKey: 'align',
    propData: {
      options: [
        {
          label: '左对齐',
          value: 'left',
          title: '左对齐',
        },
        {
          label: '居中',
          value: 'center',
          title: '居中',
        },
        {
          label: '右对齐',
          value: 'right',
          title: '右对齐',
        },
      ],
    },
    pos: 6800,
  },
  // 分页器设置
  showLessItems: {
    label: '较少显示',
    value: false,
    key: 'showLessItems',
    valueType: 'boolean',
    controlType: 'SwitchControl',
    styleKey: 'showLessItems',
    pos: 6900,
  },
  showQuickJumper: {
    label: '显示快速跳转',
    value: false,
    key: 'showQuickJumper',
    valueType: 'boolean',
    controlType: 'SwitchControl',
    styleKey: 'showQuickJumper',
    pos: 7000,
  },
  showSizeChanger: {
    label: '显示页码切换',
    value: false,
    key: 'showSizeChanger',
    valueType: 'boolean',
    controlType: 'SwitchControl',
    styleKey: 'showSizeChanger',
    pos: 7100,
  },
  showTotal: {
    label: '显示总量',
    value: true,
    key: 'showTotal',
    valueType: 'boolean',
    controlType: 'SwitchControl',
    styleKey: 'showTotal',
    pos: 7200,
  },
  simple: {
    label: '简单模式',
    value: false,
    key: 'simple',
    valueType: 'boolean',
    controlType: 'SwitchControl',
    styleKey: 'simple',
    pos: 7300,
  },
};
const getGroupControl = (keys: string[]) => {
  const groupControl = {};
  keys.forEach((key) => {
    Object.assign(groupControl, {
      [key]: allControls[key],
    });
  });
  return groupControl;
};
export const backgroundControls = getGroupControl(['backgroundColor']);
export const layoutControls = getGroupControl([
  'colNum',
  'rowHeight',
  'xMargin',
  'yMargin',
  'outXMargin',
  'outYMargin',
]);
export const basicControls = getGroupControl([
  'backgroundColor',
  'borderStyle',
  'borderColor',
  'borderRadius',
  'borderWidth',
  'componentStyle',
]);
export const headlineControls = getGroupControl([
  'headLineShow',
  'name',
  'color',
  'fontSize',
  'fontWeight',
  'textDecoration',
  'textAlign',
  'paddingLeft',
  'paddingRight',
]);
export const flexLayoutControls = getGroupControl([
  'groupLayout',
  'numberLayout',
  'compareLayout',
]);
export const dataLabelControls = getGroupControl([
  'color',
  'fontSize',
  'fontWeight',
  'valueColor',
  'valueFontSize',
  'valueFontWeight',
]);
export const legendControls = getGroupControl([
  'show',
  'legendAlign',
  'orient',
  'pageIconSize',
]);
export const xAxisControls = getGroupControl([
  'show',
  'axisLine_show',
  'axisLine_lineStyle_type',
  'axisTick_show',
  'axisLabel_show',
  'axisLabel_align',
  'axisLabel_rotate',
  'splitLine_show',
  'splitLine_lineStyle_type',
]);
export const yAxisControls = getGroupControl([
  'show',
  'axisLine_show',
  'axisLine_lineStyle_type',
  'axisTick_show',
  'axisLabel_show',
  'yAxis_splitLine_show',
  'splitLine_lineStyle_type',
  'axisPointer_label_show',
]);
export const toolboxControls = getGroupControl([
  'toolboxShow',
  'itemSize',
  'itemGap',
  'feature_saveAsImage_show',
  'feature_dataView_show',
  'feature_dataZoom_show',
  'feature_magicType_show',
]);
export const seriesControls = getGroupControl([
  'label_show',
  'label_formatter',
  'label_position',
]);
export const seriesControls_pie = getGroupControl([
  'label_show',
  'pie_label_formatter',
  'pie_label_position',
  'itemStyle_borderRadius',
]);
export const tooltipControls = getGroupControl([
  'show',
  'padding',
  'axisPointer_label_show',
  'axisPointer_type',
]);
export const dataZoomControls = getGroupControl([
  'dataZoomShow',
  'dataZoomLeft',
  'dataZoomRight',
  'dataZoomBottom',
  'dataZoomStart',
  'dataZoomEnd',
]);
export const dataZoomControls_strip = getGroupControl([
  'dataZoomShow',
  'dataZoomRight',
  'dataZoomTop',
  'dataZoomBottom',
  'dataZoomStart',
  'dataZoomEnd',
]);
export const tableControls = getGroupControl([
  'bordered',
  'showHeader',
  'sticky',
  'align',
]);
export const paginationControls = getGroupControl([
  'showLessItems',
  'showQuickJumper',
  'showSizeChanger',
  'showTotal',
  'simple',
]);

export default allControls;
