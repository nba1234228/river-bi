import { ActionContext } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
import { getControlValueMap } from '@/global/preUtils';
import { ReportType } from '@/model/types/report';
import {
  layoutControls,
  backgroundControls,
} from '@/model/designer/fieldControl';
import { getReportData } from '@/core/api';

interface State {
  report: ReportType;
  isLoading: boolean;
}

const state: State = {
  report: {
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
  },
  isLoading: false,
};
const getters = {
  screen: (state: State) => state.report.screenConfig[state.report.screenType],
};
const actions = {
  async getReportData(context: ActionContext<State, any>, reportId: string) {
    context.commit('SetIsLoading', true);
    const res: any = await getReportData({ reportId });
    context.commit('SetIsLoading', false);
    if (res && res.code === 0 && res.data) {
      context.commit('SetReport', res.data);
    }
  },
};
const mutations = {
  SetIsLoading(state: State, data: boolean) {
    state.isLoading = data;
  },
  SetReport(state: State, data: ReportType) {
    state.report = data;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
