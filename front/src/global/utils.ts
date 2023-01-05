import cloneDeep from 'lodash/cloneDeep';
import { basicControls, headlineControls } from '@/model/designer/fieldControl';
import { CompModel } from '@/model/designer/reportProps';
import { getMateriel } from '@/core/materielList';
import { getUUID, getControlValueMap } from '@/global/preUtils';

// 报告新增卡片
export const ReportAddCard = (card: any) => {
  const component = cloneDeep(CompModel);
  const foreignConfig = {
    styles: {
      basic: getControlValueMap(basicControls),
      headline: getControlValueMap(headlineControls),
    },
  };
  const id = getUUID();
  const chartType = card.cardInfo.chartType;
  const materiel = getMateriel(chartType);
  Object.assign(component, {
    props: cloneDeep(card),
    dataId: id,
    i: id,
    ...materiel.layout,
    cardId: card.cardInfo.cardId,
    componentType: 'card',
    foreignConfig,
  });
  return component;
};
