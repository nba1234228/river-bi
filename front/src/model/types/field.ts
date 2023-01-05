export type FieldType = {
  label: string; // 名称
  value: unknown; // 值
  key: string; // 键，和键名相同，用于从allControls中查找control，如basic，headline设置
  valueType: string; // 值类型
  controlType: string; // 控件类型
  styleKey: string; // 样式名/键，多层会切割，同一个对象下，不能重复，否则会被覆盖
  unit?: string; // 值单位
  isLevel?: boolean; // 键是否多层级
  inHead?: boolean; // 是否展示在组标题右侧
  propData?: { [key: string]: any }; // 传给组件的配置项
  pos: number; // 展示顺序
};

export type Materiel = {
  type: string;
  componentType: string;
  icon: string;
  label: string;
  tip: string;
  controls: { [key: string]: any };
  component: Function;
  customStyleComp?: Function; // 自定义样式配置
  options: Function;
  staticJson: Function;
  layout: {
    w: number;
    h: number;
    minW: number;
    minH: number;
  };
  axesList: { [key: string]: any } | null;
  disabled?: boolean;
};

export interface FieldCategory {
  label: string;
  hasVisible: boolean;
  controlKey?: string;
  pos: number;
}
