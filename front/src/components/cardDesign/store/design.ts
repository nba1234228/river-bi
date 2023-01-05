import { ActionContext } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
import { CardType } from '@/model/types/report';
import { Styles } from '@/model/types/styles';
import {
  createCard,
  saveCardInfo,
  editCard,
  saveAxes,
  saveCard,
} from '@/components/cardDesign/api';

interface State {
  card: CardType;
  preAxes: { [key: string]: any };
  isNeedInit: boolean;
  curDataset: { [key: string]: any };
}
const stateTemplate = {
  card: {
    cardInfo: {
      cardId: '',
      chartType: '',
      cardName: '未命名卡片',
      dataSourceType: 'dataset',
      dbSourceId: 'N1',
      datasetCategory: '',
      datasetId: '',
    },
    axes: {},
    staticJson: {},
    cardAttr: {},
    styles: {},
    foreignConfig: {},
  },
  preAxes: {},
  isNeedInit: true, // 用于控制编辑时，防止初始化
  curDataset: {
    datasetCategory: '',
    datasetId: '',
  },
};
const state: State = {
  ...cloneDeep(stateTemplate),
};
const getters = {};
const actions = {
  async editCard(context: ActionContext<State, any>, params: any) {
    const res: any = await editCard(params);
    return res;
  },
  async createCard(context: ActionContext<State, any>) {
    const res: any = await createCard();
    if (res.code === 0) {
      context.commit('SetCardInfoItem', {
        cardId: res.data.cardId,
      });
    }
    return res;
  },
  async saveCardInfo(context: ActionContext<State, any>) {
    const params = context.state.card.cardInfo;
    const res: any = await saveCardInfo(params);
    return res;
  },
  async saveAxes(context: ActionContext<State, any>, params: any) {
    const res: any = await saveAxes(params);
    return res;
  },
  async saveCard(context: ActionContext<State, any>) {
    const params = Object.assign(
      {},
      context.state.card,
      context.state.card.cardInfo,
    );
    const res: any = await saveCard(params);
    return res;
  },
};
const mutations = {
  SetCurDataset(state: any, data: String) {
    state.curDataset = data;
  },
  SetChartType(state: any, data: String) {
    state.card.cardInfo.chartType = data;
  },
  SetCard(state: State, data: CardType) {
    state.card = data;
  },
  SetStyles(state: State, data: Styles) {
    state.card.styles = data;
  },
  SetCardInfoItem(state: any, data: { [key: string]: any }) {
    Object.assign(state.card.cardInfo, data);
  },
  SetAxes(state: any, data: any) {
    state.card.axes = data;
  },
  SetAxesItem(state: any, data: any) {
    const { axisLocation, item } = data;
    state.card.axes[axisLocation].value.push(item);
  },
  RemoveAxesItem(state: any, data: any) {
    const { axisLocation, itemId } = data;
    state.card.axes[axisLocation].value = state.card.axes[
      axisLocation
    ].value.filter((it: any) => it.fieldId !== itemId);
  },
  ClearRenderAxesItem(state: any) {
    ['dim', 'measure', 'legend'].forEach((it: string) => {
      state.card.axes[it].value = [];
    });
  },
  ClearAxesItem(state: any, axisLocation: string) {
    state.card.axes[axisLocation].value = [];
  },
  ClearAxes(state: any) {
    Object.keys(state.card.axes).forEach((axisLocation) => {
      state.card.axes[axisLocation].value = [];
    });
  },
  SetStaticJson(state: any, data: any) {
    state.card.staticJson = data;
  },
  ResetState(state: any) {
    Object.assign(state, {
      ...cloneDeep(stateTemplate),
    });
  },
  SetPreAxes(state: State, data: any) {
    state.preAxes = data;
  },
  SetIsNeedInit(state: State, data: any) {
    state.isNeedInit = data;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
