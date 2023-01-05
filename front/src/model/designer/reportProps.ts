import { getControlValueMap } from '@/global/preUtils';
import {
  layoutControls,
  backgroundControls,
} from '@/model/designer/fieldControl';
import { ReportType, CompType } from '@/model/types/report';

export const ReportModel: ReportType = {
  reportId: '',
  reportName: '',
  comps: [],
  canvas: {
    background: getControlValueMap(backgroundControls),
  },
  screenType: 'pc',
  screenConfig: {
    mobile: getControlValueMap(layoutControls),
    pc: getControlValueMap(layoutControls),
  },
};

export const CompModel: CompType = {
  dataId: '',
  i: '',
  x: 0,
  y: 0,
  w: 12,
  h: 12,
  minW: 6,
  minH: 6,
  parentId: '',
  tabKey: '',
  designerType: 'dashboard',
  componentType: '',
  props: undefined,
  foreignConfig: {},
  api: {},
  cardId: '',
  serviceData: {},
};
