import { Styles } from '@/model/types/styles';
import { FieldType } from '@/model/types/field';

export interface Axes {
  objectId: string;
  cardId: string;
  axisLocation: string;
  axisLabel: string;
  fieldId: string;
  fieldName: string;
  isMeasure: boolean;
  isPeriod: boolean;
  periodType: string;
  extAttr: {
    aggregation?: string;
    filtrateCondition?: {
      measureFilter?: {
        valueType: string;
        operatorValue: number;
      };
      listFilter?: {
        valueType: string;
        selectKey: string;
      };
      topFilter?: {
        valueType: string;
        topFilterId: string;
        aggregationType: string;
        extremaType: string;
        limit: number;
      };
    };
  };
  pos: number;
}
export interface CardType {
  cardInfo: {
    cardId: string;
    chartType: string;
    cardName: string;
    dataSourceType: string;
    dbSourceId: string;
    datasetId: string;
  };
  axes?: { [key: string]: any };
  staticJson?: { [key: string]: any };
  cardAttr?: { [key: string]: any };
  styles?: Styles;
  foreignConfig?: { [key: string]: any };
}

export interface CompType {
  dataId: string;
  designerType: string;
  // layout
  parentId: string;
  tabKey: string;
  tabs?: { [key: string]: any };
  // 布局属性需放在根属性下，不然vue-grid-layout会报错
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW: number;
  minH: number;
  // 布局属性结束
  componentType: string;
  props?: CardType;
  foreignConfig: { [key: string]: any };
  api: { [key: string]: string };
  cardId: string;
  serviceData: { [key: string]: any };
}

export interface ReportType {
  reportId: string;
  reportName: string;
  comps: CompType[];
  canvas: {
    background: {
      backgroundColor: FieldType;
      backgroundImage?: FieldType;
    };
  };
  screenType: string;
  screenConfig: { [key: string]: any };
}
