import { ActionContext } from 'vuex';
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import enUS from 'ant-design-vue/es/locale/en_US';
import {
  getChartData,
  getDatasetCategory,
  getDataset,
  getField,
  getCardList,
} from '@/core/api';
interface State {
  themeType: string;
  language: string;
  dragDomData: { [key: string]: any };
}

const getAntdLocale = (type: string) => {
  switch (type) {
    case 'en-us':
      return enUS;
    case 'zh-en':
      return zhCN;
    default:
      return zhCN;
  }
};

const state: State = {
  themeType: localStorage.getItem('themeType') || 'skyBlue',
  language: localStorage.getItem('language') || 'zh-en',
  dragDomData: {},
};
const getters = {
  locale: (state: State) => getAntdLocale(state.language),
};
const actions = {
  async getDatasetCategory(context: ActionContext<State, any>) {
    const res: any = await getDatasetCategory();
    return res;
  },
  async getDataset(context: ActionContext<State, any>, params: any) {
    const res: any = await getDataset(params);
    return res;
  },
  async getField(context: ActionContext<State, any>, params: any) {
    const res: any = await getField(params);
    return res;
  },
  async getChartData(context: ActionContext<State, any>, params: any) {
    const res: any = await getChartData(params);
    return res;
  },
  async getCardList(context: ActionContext<State, any>, params: any) {
    const res: any = await getCardList();
    return res;
  },
};
const mutations = {
  SetThemeType(state: State, data: string) {
    state.themeType = data;
  },
  SetLocale(state: State, data: string) {
    state.language = data;
  },
  SetDragDomData(state: State, data: any) {
    state.dragDomData = data;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
