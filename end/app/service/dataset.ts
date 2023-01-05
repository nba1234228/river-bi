import { Service } from 'egg';
import { selectCategory, selectList, selectField } from '../sql/dataset';
import { PeriodTypeMap } from '../constant/index';

export default class Dataset extends Service {
  /**
   * dbSourceId - 数据源类型
   */
  async getCategory(params: { [key: string]: any }) {
    const { ctx, service } = this;
    const { sql, param } = ctx.helper.formatSql(selectCategory, params);
    const pageService: any = service.common.page;
    const res = await pageService.queryTotalList(sql, param);
    ctx.logger.info('getCategory:', sql, params);
    return res;
  }

  async getList(params: { [key: string]: any }) {
    const { ctx, service } = this;
    const { sql, param } = ctx.helper.formatSql(selectList, params);
    ctx.logger.info('getList:', sql, params);
    const pageService: any = service.common.page;
    const res = await pageService.queryTotalList(sql, param);
    return res;
  }

  async getField(params: { [key: string]: any }) {
    const { ctx, service } = this;
    const { isNumericValue, isPeriod } = ctx.helper;
    const { sql, param } = ctx.helper.formatSql(selectField, params);
    ctx.logger.info('getField:', sql, params);
    const pageService: any = service.common.page;
    const res = await pageService.queryTotalList(sql, param);
    res.list = res.list
      .filter((it: any) => it.fieldId !== 'id')
      .map((it: any) => {
        return {
          fieldId: it.fieldId,
          fieldName: it.fieldName,
          isMeasure: isNumericValue(it.type),
          isPeriod: isPeriod(it.type),
        };
      });
    return res;
  }

  async getFieldMember(params: { [key: string]: any }) {
    const { ctx, app } = this;
    let sqlStr = '';
    if (params.periodType) {
      const dateStr = PeriodTypeMap[params.periodType];
      const formatStr = `date_format(${params.fieldId}, "${dateStr}")`;
      sqlStr = `select ${formatStr} as memberId, ${formatStr} as memberName
        from ${params.tableName} group by ${formatStr} order by memberId`;
    } else {
      sqlStr = `select ${params.fieldId} as memberId, ${params.fieldId} as memberName from ${params.tableName} group by ${params.fieldId} order by memberId`;
    }
    ctx.logger.info('getFieldMember:', sqlStr, params);
    const res = await app.mysql.query(sqlStr);
    return res;
  }
}
