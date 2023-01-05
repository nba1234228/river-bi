// 属性设置分类
import { FieldCategory } from '@/model/types/field';

const fieldCategory: { [key: string]: FieldCategory } = {
  background: {
    label: '背景设置',
    hasVisible: false,
    pos: 0,
  },
  layout: {
    label: '布局设置',
    hasVisible: false,
    pos: 10,
  },
  basic: {
    label: '基本设置',
    hasVisible: false,
    pos: 20,
  },
  headline: {
    label: '标题',
    hasVisible: true,
    controlKey: 'headLineShow',
    pos: 30,
  },
  flexLayout: {
    label: 'flex布局',
    hasVisible: false,
    pos: 40,
  },
  dataLabel: {
    label: '数据标签',
    hasVisible: false,
    pos: 50,
  },
  // 图
  legend: {
    label: '图例',
    hasVisible: true,
    controlKey: 'show',
    pos: 60,
  },
  xAxis: {
    label: 'X轴',
    hasVisible: true,
    controlKey: 'show',
    pos: 70,
  },
  yAxis: {
    label: 'Y轴',
    hasVisible: true,
    controlKey: 'show',
    pos: 80,
  },
  series: {
    label: '系列',
    hasVisible: false,
    pos: 90,
  },
  toolbox: {
    label: '工具栏',
    hasVisible: true,
    controlKey: 'toolboxShow',
    pos: 100,
  },
  series_pie: {
    label: '系列',
    hasVisible: false,
    pos: 110,
  },
  tooltip: {
    label: '提示信息',
    hasVisible: true,
    controlKey: 'show',
    pos: 120,
  },
  dataZoom: {
    label: '缩放轴',
    hasVisible: true,
    controlKey: 'dataZoomShow',
    pos: 130,
  },
  dataZoom_strip: {
    label: '缩放轴',
    hasVisible: true,
    controlKey: 'dataZoomShow',
    pos: 140,
  },
  // 表
  table: {
    label: '表设置',
    hasVisible: false,
    pos: 150,
  },
  pagination: {
    label: '分页器',
    hasVisible: false,
    pos: 160,
  },
};

export default fieldCategory;
