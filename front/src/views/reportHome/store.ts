import { ActionContext } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
import { ReportType } from '@/model/types/report';
import { ReportModel } from '@/model/designer/reportProps';
import {
  getGroupList,
  createGroup,
  renameGroup,
  removeGroup,
  sortGroup,
  getReportList,
  createReport,
  renameReport,
  removeReport,
  sortReport,
} from '@/views/reportHome/api';
import { getReportData } from '@/core/api';

interface State {
  report: ReportType;
  curReportId: string;
  curReportName: string;
  isLoading: boolean;
}

const state: State = {
  report: {
    ...cloneDeep(ReportModel),
  },
  curReportId: '',
  curReportName: '',
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
  async getGroupList(context: ActionContext<State, any>, params: any) {
    const res: any = await getGroupList(params);
    return res;
  },
  async createGroup(context: ActionContext<State, any>, params: any) {
    const res: any = await createGroup(params);
    return res;
  },
  async renameGroup(context: ActionContext<State, any>, params: any) {
    const res: any = await renameGroup(params);
    return res;
  },
  async removeGroup(context: ActionContext<State, any>, groupId: string) {
    const res: any = await removeGroup({ groupId });
    return res;
  },
  async sortGroup(context: ActionContext<State, any>, params: any) {
    const res: any = await sortGroup(params);
    return res;
  },

  async getReportList(context: ActionContext<State, any>, params: any) {
    const res: any = await getReportList(params);
    return res;
  },
  async createReport(context: ActionContext<State, any>, params: any) {
    const reportInfo = cloneDeep(ReportModel);
    const res: any = await createReport(Object.assign(reportInfo, params));
    return res;
  },
  async renameReport(context: ActionContext<State, any>, params: any) {
    const res: any = await renameReport(params);
    return res;
  },
  async removeReport(context: ActionContext<State, any>, reportId: string) {
    const res: any = await removeReport({ reportId });
    return res;
  },
  async sortReport(context: ActionContext<State, any>, params: any) {
    const res: any = await sortReport(params);
    return res;
  },
};
const mutations = {
  SetIsLoading(state: State, data: boolean) {
    state.isLoading = data;
  },
  SetReport(state: State, data: ReportType) {
    state.report = data;
  },
  SetCurReportId(state: State, id: string) {
    state.curReportId = id;
  },
  SetCurReportName(state: State, id: string) {
    state.curReportName = id;
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
