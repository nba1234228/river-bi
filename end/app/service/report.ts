import { Service } from 'egg';
import {
  sortGroup,
  getGroupList,
  createGroup,
  renameGroup,
  removeGroup,
  sortReport,
  getReportList,
  createReport,
  renameReport,
  removeReport,
  saveReport,
  getReportData,
  queryCards,
} from '../sql/report';

export default class Report extends Service {
  async sortGroup(params: { [key: string]: any }) {
    const { ctx, app } = this;
    const promiseArr: any = [];
    params.list.forEach((item) => {
      const { sql, param } = ctx.helper.formatSql(sortGroup, item);
      ctx.logger.info('sortGroup:', sql, param);
      promiseArr.push(
        new Promise(async (resolve) => {
          const res = await app.mysql.query(sql, param);
          resolve(res);
        }),
      );
    });
    await Promise.all(promiseArr);
    return null;
  }

  async getGroupList(params: { [key: string]: any }) {
    const { ctx, app } = this;
    const { sql, param } = ctx.helper.formatSql(getGroupList, params);
    ctx.logger.info('getGroupList:', sql, params);
    const res = await app.mysql.query(sql, param);
    return res;
  }

  async createGroup(params: { [key: string]: any }) {
    const { ctx, app } = this;
    const { sql, param } = ctx.helper.formatSql(createGroup, params);
    ctx.logger.info('createGroup:', sql, params);
    await app.mysql.query(sql, param);
    return {
      groupId: params.groupId,
      groupName: params.groupName,
    };
  }

  async renameGroup(params: { [key: string]: any }) {
    const { ctx, app } = this;
    const { sql, param } = ctx.helper.formatSql(renameGroup, params);
    ctx.logger.info('renameGroup:', sql, params);
    await app.mysql.query(sql, param);
    return null;
  }

  async removeGroup(params: { [key: string]: any }) {
    const { ctx, app } = this;
    const { sql, param } = ctx.helper.formatSql(removeGroup, params);
    ctx.logger.info('removeGroup:', sql, params);
    await app.mysql.query(sql, param);
    return null;
  }

  async sortReport(params: { [key: string]: any }) {
    const { ctx, app } = this;
    const promiseArr: any = [];
    params.list.forEach((item) => {
      const { sql, param } = ctx.helper.formatSql(sortReport, item);
      ctx.logger.info('sortReport:', sql, param);
      promiseArr.push(
        new Promise(async (resolve) => {
          const res = await app.mysql.query(sql, param);
          resolve(res);
        }),
      );
    });
    await Promise.all(promiseArr);
    return null;
  }

  async getReportList(params: { [key: string]: any }) {
    const { ctx, app } = this;
    const { sql, param } = ctx.helper.formatSql(getReportList, params);
    ctx.logger.info('getReportList:', sql, params);
    const res = await app.mysql.query(sql, param);
    return res;
  }

  async createReport(params: { [key: string]: any }) {
    const { ctx, app } = this;
    const formatParams = ctx.helper.toJsonString(params);
    const { sql, param } = ctx.helper.formatSql(createReport, formatParams);
    ctx.logger.info('createReport:', sql, param);
    await app.mysql.query(sql, param);
    return {
      reportId: params.reportId,
      reportName: params.reportName,
    };
  }

  async renameReport(params: { [key: string]: any }) {
    const { ctx, app } = this;
    const { sql, param } = ctx.helper.formatSql(renameReport, params);
    ctx.logger.info('renameReport:', sql, params);
    await app.mysql.query(sql, param);
    return null;
  }

  async removeReport(params: { [key: string]: any }) {
    const { ctx, app } = this;
    const { sql, param } = ctx.helper.formatSql(removeReport, params);
    ctx.logger.info('removeReport:', sql, params);
    await app.mysql.query(sql, param);
    return null;
  }

  async saveReport(params: { [key: string]: any }) {
    const { ctx, app } = this;
    const formatParams = ctx.helper.toJsonString(params);
    const { sql, param } = ctx.helper.formatSql(saveReport, formatParams);
    ctx.logger.info('saveReport:', sql, params);
    const res = await app.mysql.query(sql, param);
    return res;
  }

  async getReportData(params: { [key: string]: any }) {
    const { ctx, app } = this;
    const { sql, param } = ctx.helper.formatSql(getReportData, params);
    ctx.logger.info('getReportData:', sql, params);
    // 查询报告
    const res = await app.mysql.query(sql, param);
    const report = ctx.helper.toJsonObj(res[0]);
    // 查询卡片
    const comps = report.comps;
    const promiseArr: any = [];
    comps.forEach((comp) => {
      const cardId = comp.cardId;
      if (cardId) {
        const { sql, param } = ctx.helper.formatSql(queryCards, { cardId });
        ctx.logger.info('queryCards:', sql, param);
        promiseArr.push(
          new Promise(async (resolve) => {
            const res = await app.mysql.query(sql, param);
            const formatRes = ctx.helper.toJsonObj(res[0]) || {};
            const {
              cardId,
              chartType,
              cardName,
              dbSourceId,
              datasetCategory,
              dataSourceType,
              datasetId,
              axes,
              cardAttr,
              styles,
              staticJson,
              foreignConfig,
              options,
            } = formatRes;
            const cardInfo = {
              cardId,
              chartType,
              cardName,
              dbSourceId,
              datasetCategory,
              dataSourceType,
              datasetId,
            };
            comp.props = {
              cardInfo,
              axes,
              cardAttr,
              styles,
              staticJson,
              foreignConfig,
              options,
            };
            resolve(res);
          }),
        );
      }
    });
    await Promise.all(promiseArr);
    return report;
  }
}
