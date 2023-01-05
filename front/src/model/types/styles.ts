import { FieldType } from '@/model/types/field';

// 基本设置
export interface StylesBasic {
  backgroundColor?: FieldType; // 背景颜色
  borderRadius: FieldType; // 边框圆角
  borderWidth: FieldType; // 边框宽度
  borderStyle: FieldType; // 边框线条样式
  borderColor: FieldType; // 边框颜色
}

// 标题设置
export interface StylesHeadline {
  name: FieldType; // 标题
  color: FieldType; // 字体颜色
  fontSize: FieldType; // 字体尺寸
  fontWeight: FieldType; // 字体粗细
  textDecoration: FieldType; // 字体修饰
  textAlign: FieldType; // 显示位置
}

// 图例
export interface StylesLegend {
  show: FieldType; // 显示
  align: FieldType; // 对齐方式
  orient: FieldType; // 布局朝向
  // textStyle_color: FieldType; // 文本颜色
  // icon: FieldType; // icon类型
  pageIconSize: FieldType; // 翻页按钮大小
}

// X轴
export interface StylesXAxis {
  show: FieldType; // 显示
  // type: FieldType; // 坐标轴类型
  nameLocation: FieldType; // 坐标轴名称显示位置
  // nameTextStyle_color: FieldType; // 坐标轴名称颜色
  nameRotate: FieldType; // 坐标轴名字旋转角度
  axisLine_show: FieldType; // 显示坐标轴轴线
  axisLine_lineStyle_type: FieldType; // 坐标轴轴线类型
  axisTick_show: FieldType; // 显示坐标轴刻度
  axisLabel_show: FieldType; // 显示刻度标签
  splitLine_show: FieldType; // 显示分隔线
  splitLine_lineStyle_type: FieldType; // 分隔线类型
  axisPointer_show: FieldType; // 显示指示器
  axisPointer_type: FieldType; // 指示器类型
}

// Y轴
export interface StylesYAxis {
  show: FieldType; // 显示
  // type: FieldType; // 坐标轴类型
  nameLocation: FieldType; // 坐标轴名称显示位置
  // nameTextStyle_color: FieldType; // 坐标轴名称颜色
  nameRotate: FieldType; // 坐标轴名字旋转角度
  axisLine_show: FieldType; // 显示坐标轴轴线
  axisLine_lineStyle_type: FieldType; // 坐标轴轴线类型
  axisTick_show: FieldType; // 显示坐标轴刻度
  axisLabel_show: FieldType; // 显示刻度标签
  splitLine_show: FieldType; // 显示分隔线
  splitLine_lineStyle_type: FieldType; // 分隔线类型
  axisPointer_show: FieldType; // 显示指示器
  axisPointer_type: FieldType; // 指示器类型
}

// 工具栏
export interface StylesToolbox {
  show: FieldType; // 显示
  itemSize: FieldType; // icon大小
  itemGap: FieldType; // icon间隔
}

// 系列
export interface StylesSeriesLine {
  label_show: FieldType; // 显示图形标签
  label_position: FieldType; // 标签位置
  lineStyle_type: FieldType; // 线类型
}
export interface StylesSeriesBar {
  label_show: FieldType; // 显示图形标签
  label_position: FieldType; // 标签位置
  backgroundStyle_borderRadius: FieldType; // 柱子圆角半径
  barGap: FieldType; // 不同系列柱间距离
  barCategoryGap: FieldType; // 同一系列柱间距离
}
export interface StylesSeriesPie {
  label_show: FieldType; // 显示图形标签
  label_position: FieldType; // 标签位置
  radius: FieldType; // 半径
}
export interface StylesSeries
  extends StylesSeriesLine,
    StylesSeriesBar,
    StylesSeriesPie {}

// 提示框
export interface StylesToolTip {
  show: FieldType; // 显示
  axisPointer_label_show: FieldType; // 显示指示器标签
  axisPointer_type: FieldType; // 指示器类型
}

// 分页器
export interface StylesTable {
  bordered: FieldType; // 显示边框
  showHeader: FieldType; // 显示头部
  sticky: FieldType; // 粘性头部
  align: FieldType; // 列对齐方式
}
// 表头
export interface StylesPagination {
  showLessItems: FieldType; // 较少显示
  showQuickJumper: FieldType; // 显示快速跳转
  showSizeChanger: FieldType; // 显示页码切换
  showTotal: FieldType; // 显示总量
  simple: FieldType; // 简单模式
}
export interface Styles {
  basic?: StylesBasic;
  headline?: StylesHeadline;
  legend?: StylesLegend;
  xAxis?: StylesXAxis;
  yAxis?: StylesYAxis;
  toolbox?: StylesToolbox;
  series?: StylesSeries;
  tooltip?: StylesToolTip;
  table?: StylesTable;
  pagination?: StylesPagination;
}
