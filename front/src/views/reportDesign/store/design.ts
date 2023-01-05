import { ActionContext } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
import { ReportType, CompType, CardType } from '@/model/types/report';
import { ReportModel } from '@/model/designer/reportProps';
import { FieldType } from '@/model/types/field';
import { saveReport, getFieldMember } from '@/views/reportDesign/api';
import { getReportData } from '@/core/api';

interface State {
  report: ReportType;
  activityCompId: string;
  cardDesignVisible: boolean;
  curCardId: string;
  isLoading: boolean;
}
const state: State = {
  report: {
    ...cloneDeep(ReportModel),
  },
  activityCompId: 'report',
  cardDesignVisible: false,
  curCardId: '',
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
  async saveReport(context: ActionContext<State, any>) {
    const res: any = await saveReport(context.state.report);
    return res;
  },
  async getFieldMember(context: ActionContext<State, any>, params: any) {
    const res: any = await getFieldMember(params);
    return res;
  },
};
const mutations = {
  SetReport(state: State, data: ReportType) {
    state.report = data;
  },
  SetIsLoading(state: State, data: boolean) {
    state.isLoading = data;
  },
  AddComp(state: State, comp: CompType) {
    if (comp.componentType === 'card') {
      const name = comp.foreignConfig.styles?.headline?.name;
      if (name === '标题内容') {
        const cardComps = state.report.comps.filter(
          (it) => it.componentType === 'card',
        );
        comp.foreignConfig.styles.headline.name = `图表${cardComps.length + 1}`;
      }
    }
    if (!state.report.comps.length) {
      state.report.comps.push(comp);
      return;
    }
    let colMax: CompType = state.report.comps[0];
    // 找出纵轴最大的卡片
    state.report.comps.forEach((el) => {
      if (el.h + el.y > colMax.h + colMax.y) {
        colMax = el;
      }
    });
    // 判断最大的卡片有没有同排
    const flag = state.report.comps.find(
      (it) => it.h + it.y === colMax.h + colMax.y && it.i !== colMax.i,
    );
    const colNum = state.report.screenConfig[state.report.screenType].colNum;
    if (flag) {
      comp.y = colMax.h + colMax.y;
    } else {
      comp.x = colMax.w + colMax.x;
      comp.y = colMax.y;
      if (comp.x + comp.w > colNum) {
        comp.x = 0;
        comp.y = colMax.h + colMax.y;
      }
    }
    state.report.comps.push(comp);
  },
  RemoveComp(state: State, id: String) {
    state.report.comps = state.report.comps.filter((it) => it.dataId !== id);
  },
  SetComps(state: State, comps: CompType[]) {
    state.report.comps = comps;
  },
  SetActivityComp(state: State, id: string) {
    state.activityCompId = id;
  },
  ShowCardVisible(state: State, data: string) {
    state.cardDesignVisible = true;
    state.curCardId = data;
  },
  hiddleCardVisible(state: State) {
    state.cardDesignVisible = false;
  },
  updateCompCard(state: State, card: CardType) {
    const comp = state.report.comps.find(
      (it) => it.cardId === card.cardInfo.cardId,
    );
    Object.assign(comp || {}, { props: card });
    state.report.comps = [...state.report.comps];
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
