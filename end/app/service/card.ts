import { Service } from 'egg';
import {
  getList,
  queryOriginCard,
  copyToTempCard,
  queryOriginAxes,
  queryTempCardId,
  createCard,
  deleteAxes,
  saveAxis,
  saveCardInfo,
  saveCard,
  getCardDataset,
  queryAxes,
} from '../sql/card';
import { ActionLabelValueMap, PeriodTypeMap } from '../constant/index';

// 根据维度和系列分组去重
function getGroupBy(sql: string, list) {
  if (list.length) {
    sql += ' group by';
    for (let i = 0; i < list.length; i++) {
      if (i === list.length - 1) {
        sql += ` ${list[i]}`;
      } else {
        sql += ` ${list[i]},`;
      }
    }
  }
  return sql;
}
// 按日期粒度查询
function getDateSql(it: any) {
  let dateSql = '';
  let dateStr = '';
  if (it.isPeriod) {
    const periodType = it.extAttr.periodType;
    dateStr = PeriodTypeMap[periodType];
    dateSql = `date_format(${it.fieldId}, "${dateStr}") as ${it.fieldId}`;
  }
  return { dateSql, field: `date_format(${it.fieldId}, "${dateStr}")` };
}

export default class Card extends Service {
  async getList(params: { [key: string]: any }) {
    const { ctx, app } = this;
    const { sql, param } = ctx.helper.formatSql(getList, params);
    ctx.logger.info('getList:', sql, params);
    let res: any = await app.mysql.query(sql, param);
    res = res.map((it: any) => {
      const item = ctx.helper.toJsonObj(it) || {};
      return item;
    });
    return res;
  }

  async editCard(params: { [key: string]: any }) {
    const { ctx, app } = this;
    // 编辑时，先同步card原始数据到临时数据；删除axes临时数据；根据原始数据，生成一份axes临时数据；保存时，同步card、axes到原始数据
    const axes: any = {
      dim: {
        axisLabel: '维度',
        axisLocation: 'dim',
        value: [],
      },
      measure: {
        axisLabel: '度量',
        axisLocation: 'measure',
        value: [],
      },
      legend: {
        axisLabel: '系列',
        axisLocation: 'legend',
        value: [],
      },
      filtrate: {
        axisLabel: '筛选',
        axisLocation: 'filtrate',
        value: [],
      },
    };
    let tempCardId = '';
    // 查询card原始数据
    const { sql, param } = ctx.helper.formatSql(queryOriginCard, params);
    ctx.logger.info('queryOriginCard:', sql, params);
    const res = await app.mysql.query(sql, param);
    {
      if (res[0]) {
        // 同步到card临时数据
        const { sql, param } = ctx.helper.formatSql(copyToTempCard, res[0]);
        await app.mysql.query(sql, param);
      }
      // 查询axes原始数据
      const { sql, param } = ctx.helper.formatSql(queryOriginAxes, params);
      const axesRes: any = await app.mysql.query(sql, param);
      // 查询临时数据cardId
      {
        const { sql, param } = ctx.helper.formatSql(queryTempCardId, params);
        const res = await app.mysql.query(sql, param);
        tempCardId = res[0]?.tempCardId ?? '';
      }
      // 更新临时数据axes
      if (axesRes[0]) {
        axesRes.forEach((axis) => {
          const value = ctx.helper.toJsonObj(axis) || {};
          axes[axis.axisLocation].value.push(value);
        });
        this.saveAxes(tempCardId, axesRes);
      }
    }
    const value = ctx.helper.toJsonObj(res[0]) || {};
    // 返回临时数据cardId
    Object.assign(value, { cardId: tempCardId });
    return {
      axes,
      ...value,
    };
  }

  async createCard() {
    const { ctx, app } = this;
    const objectId = ctx.helper.getUuid();
    const params = { objectId, originCardId: '' };
    // 原始卡片
    const { sql, param } = ctx.helper.formatSql(createCard, params);
    ctx.logger.info('createCard:', sql, params);
    await app.mysql.query(sql, param);
    let temObjectId = '';
    {
      // 临时卡片
      temObjectId = ctx.helper.getUuid();
      const params = { objectId: temObjectId, originCardId: objectId };
      const { sql, param } = ctx.helper.formatSql(createCard, params);
      await app.mysql.query(sql, param);
    }
    return { cardId: temObjectId };
  }

  async saveAxes(cardId: string, axes: { [key: string]: any }[]) {
    const { ctx, app } = this;
    const { sql, param } = ctx.helper.formatSql(deleteAxes, { cardId });
    ctx.logger.info('deleteAxes:', sql, param);
    await app.mysql.query(sql, param);
    const promiseArr: any = [];
    axes.forEach((axis) => {
      const objectId = ctx.helper.getUuid();
      const data = Object.assign(axis, { objectId, cardId });
      const formatParams = ctx.helper.toJsonString(data);
      const { sql, param } = ctx.helper.formatSql(saveAxis, formatParams);
      ctx.logger.info('saveAxes:', sql, param);
      promiseArr.push(
        new Promise(async (resolve) => {
          const res = await app.mysql.query(sql, param);
          resolve(res);
        }),
      );
    });
    return Promise.all(promiseArr).then((values) => {
      return { values };
    });
  }

  async saveCardInfo(params: { [key: string]: any }) {
    const { ctx, app } = this;
    const { sql, param } = ctx.helper.formatSql(saveCardInfo, params);
    ctx.logger.info('saveCardInfo:', sql, param);
    await app.mysql.query(sql, param);
    return {};
  }

  async saveCard(params: { [key: string]: any }[]) {
    const { ctx, app } = this;
    const formatParams = ctx.helper.toJsonString(params);
    // 保存临时数据
    const { sql, param } = ctx.helper.formatSql(saveCard, formatParams);
    ctx.logger.info('saveCard:', sql, param);
    await app.mysql.query(sql, param);
    // 保存原始数据
    let originCardId = '';
    {
      // 保存card信息
      const res: any = await app.mysql.query(
        'select origin_card_id as originCardId from card where object_id = ?',
        [formatParams.cardId],
      );
      originCardId = res[0]?.originCardId;
      if (originCardId) {
        Object.assign(formatParams, { cardId: originCardId });
        const { sql, param } = ctx.helper.formatSql(saveCard, formatParams);
        ctx.logger.info('saveCard:origin', sql, param);
        await app.mysql.query(sql, param);
      }
      // 保存轴信息
      // 查询axes临时数据
      const { sql, param } = ctx.helper.formatSql(queryOriginAxes, params);
      const axesRes: any = await app.mysql.query(sql, param);
      // 生成axes原始数据
      this.saveAxes(originCardId, axesRes);
    }
    return {
      cardId: originCardId,
    };
  }

  async getChartData(params: { [key: string]: any }) {
    const { ctx, app } = this;
    let datasetId = '';
    // 查询数据集id
    {
      const { sql, param } = ctx.helper.formatSql(getCardDataset, params);
      const res: any = await app.mysql.query(sql, param);
      datasetId = res[0]?.datasetId;
    }
    // 查询cardId是否 原始数据id，如果是，替换成临时数据id
    {
      const res: any = await app.mysql.query(
        'select object_id as cardId from card where origin_card_id = ?',
        [params.cardId],
      );
      if (res[0]?.cardId) {
        Object.assign(params, { cardId: res[0]?.cardId });
      }
    }
    // 查询轴信息
    const { sql, param } = ctx.helper.formatSql(queryAxes, params);
    const axesRes: any = await app.mysql.query(sql, param);
    ctx.logger.info('queryAxes:', sql, param);
    const axes: any = {
      dim: [],
      measure: [],
      legend: [],
      filtrate: [],
    };
    axesRes.forEach(async (axis) => {
      const value = ctx.helper.toJsonObj(axis) || {};
      axes[axis.axisLocation].push(value);
    });
    if (!axes.dim.length && !axes.measure.length && !axes.legend.length) {
      return {
        ...axes,
        data: [],
      };
    }
    // 查询轴数据
    const axisType = axesRes.map((axis) => axis.axisLocation);
    let sqlStr = 'select';
    const queryParams = {
      tableName: datasetId,
    };
    const dimFields: any = [];
    const measureFields: any = [];
    const seriesFields: any = [];

    const allDimId = axes.dim.map((it: any) => it.fieldId);
    if (axisType.includes('dim')) {
      axes.dim.forEach((it) => {
        const { dateSql, field } = getDateSql(it);
        if (dimFields.length) {
          sqlStr += `, ${dateSql || it.fieldId}`;
        } else {
          sqlStr += ` ${dateSql || it.fieldId}`;
        }
        dimFields.push(dateSql ? field : it.fieldId);
        // Object.assign(queryParams, { [it.fieldId]: it.fieldId });
      });
    }
    if (axisType.includes('legend')) {
      const promiseArr: any = [];
      for (let i = 0; i < axes.legend.length; i++) {
        const it: any = axes.legend[i];
        const { dateSql, field } = getDateSql(it);
        if (!allDimId.includes(it.fieldId)) {
          if (!axes.dim.length && i === 0) {
            sqlStr += ` ${dateSql || it.fieldId}`;
          } else {
            sqlStr += `, ${dateSql || it.fieldId}`;
          }
          seriesFields.push(dateSql ? field : it.fieldId);
        }
        // Object.assign(queryParams, { [it.fieldId]: it.fieldId });

        const itSql = `select ${dateSql || it.fieldId} from ${
          queryParams.tableName
        } group by ${dateSql ? field : it.fieldId} order by ${
          dateSql ? field : it.fieldId
        }`;
        const { sql, param } = ctx.helper.formatSql(itSql, {
          [it.fieldId]: it.fieldId,
          tableName: datasetId,
        });
        ctx.logger.info('legend query:', sql, param);
        promiseArr.push(
          new Promise(async (resolve) => {
            const itRes: any = await app.mysql.query(sql, param);
            it.ele = itRes.map((item) => item[it.fieldId]);
            resolve(itRes);
          }),
        );
      }
      await Promise.all(promiseArr);
    }
    if (axisType.includes('measure')) {
      for (let i = 0; i < axes.measure.length; i++) {
        const it: any = axes.measure[i];
        const valueType = it.extAttr.aggregation;
        if (valueType === 'distinctCount') {
          if (!axes.dim.length && !axes.legend.length && i === 0) {
            sqlStr += ` count(distinct ${it.fieldId}) as ${it.fieldId}`;
          } else {
            sqlStr += `, count(distinct ${it.fieldId}) as ${it.fieldId}`;
          }
        } else {
          if (!axes.dim.length && !axes.legend.length && i === 0) {
            sqlStr += ` ${valueType}(${it.fieldId}) as ${it.fieldId}`;
          } else {
            sqlStr += `, ${valueType}(${it.fieldId}) as ${it.fieldId}`;
          }
        }
        measureFields.push(it.fieldId);
        // Object.assign(queryParams, { [it.fieldId]: it.fieldId });
      }
    }
    sqlStr += ` from ${queryParams.tableName}`;
    // 如果筛选轴有维度，则用where过滤
    let curSqlStr = '';
    if (axisType.includes('filtrate')) {
      for (let i = 0; i < axes.filtrate.length; i++) {
        const it = axes.filtrate[i];
        const { listFilter, topFilter, measureFilter } =
          it.extAttr.filtrateCondition;
        if (
          (listFilter?.valueType && listFilter?.valueType !== 'all') ||
          (topFilter?.valueType && topFilter?.valueType !== 'none') ||
          (measureFilter?.valueType && measureFilter?.valueType !== 'none')
        ) {
          curSqlStr = sqlStr;
          // 将date_format去掉，避免重复对时间聚合
          curSqlStr = curSqlStr.replace(/date_format\([^()]+\) as/g, '');
          const it: any = axes.filtrate[i];
          if (it.isMeasure) {
            // 根据维度和系列分组去重
            const dimSeriesFields = dimFields.concat(seriesFields);
            curSqlStr = getGroupBy(curSqlStr, dimSeriesFields);
            const { valueType, operatorValue } = measureFilter;
            curSqlStr += ` having ${it.extAttr.aggregation}(${it.fieldId}) ${ActionLabelValueMap[valueType]} ${operatorValue}`;
          } else {
            if (
              listFilter?.selectKey?.length &&
              listFilter.valueType !== 'all'
            ) {
              let dateSql = '';
              if (it.isPeriod) {
                const periodType = it.extAttr.periodType;
                const dateStr = PeriodTypeMap[periodType];
                dateSql = `date_format(${it.fieldId}, "${dateStr}")`;
              }
              if (listFilter.valueType === 'included') {
                curSqlStr += ` where ${dateSql || it.fieldId} in(`;
              } else if (listFilter.valueType === 'excluded') {
                curSqlStr += ` where ${dateSql || it.fieldId} not in(`;
              }
              const len = listFilter.selectKey.length;
              for (let i = 0; i < len; i++) {
                const el = listFilter.selectKey[i];
                curSqlStr += i === len - 1 ? `'${el}'` : `'${el}', `;
              }
              curSqlStr += ')';
            }
            const dimSeriesFields = dimFields.concat(seriesFields);
            curSqlStr = getGroupBy(curSqlStr, dimSeriesFields);
            if (topFilter.valueType !== 'none') {
              const { topFilterId, aggregationType, extremaType, limit } =
                topFilter;
              curSqlStr += ` order by ${aggregationType}(${topFilterId}) ${extremaType} limit ${limit}`;
            }
          }
          const splitSqlStr = sqlStr.split(queryParams.tableName);
          sqlStr = `${splitSqlStr[0]} (${curSqlStr}) axisfiltrate ${
            splitSqlStr[1] || ''
          }`;
        }
      }
    }
    // 根据维度和系列分组去重
    const dimSeriesFields = dimFields.concat(seriesFields);
    sqlStr = getGroupBy(sqlStr, dimSeriesFields);
    {
      // 如果有全局筛选器，则先查询全局筛选作为子查询
      let globalFilterSql = `select * from ${queryParams.tableName}`;
      if (params?.filters?.length) {
        params.filters.forEach((curFilter: any, index: number) => {
          const { isPeriod, value, filterType, fieldId, extAttr } = curFilter;
          if (filterType === 'listFilter' && value.length) {
            let dateSql = '';
            if (isPeriod) {
              const periodType = extAttr.periodType;
              const dateStr = PeriodTypeMap[periodType];
              dateSql = `date_format(${fieldId}, "${dateStr}")`;
            }
            if (index === 0) {
              globalFilterSql += ` where ${dateSql || fieldId} in(`;
            } else {
              globalFilterSql += ` and ${dateSql || fieldId} in(`;
            }
            value.forEach((el, idx) => {
              globalFilterSql +=
                idx === value.length - 1 ? `'${el}')` : `'${el}', `;
            });
          } else if (filterType === 'dateFilter' && value.length) {
            if (index === 0) {
              globalFilterSql += ` where ${fieldId} >= '${value[0]}' and ${fieldId} <= '${value[1]}'`;
            } else {
              globalFilterSql += ` and ${fieldId} >= '${value[0]}' and ${fieldId} <= '${value[1]}'`;
            }
          }
        });
        ctx.logger.info('global filter query:', globalFilterSql);
      }
      // 从全局筛选作为子查询中 查询
      if (params?.filters?.length) {
        const splitSqlStr = sqlStr.split(queryParams.tableName);
        sqlStr = `${splitSqlStr[0]} (${globalFilterSql}) globalfilter ${
          splitSqlStr[1] || ''
        }`;
      }
      const { sql, param } = ctx.helper.formatSql(sqlStr, queryParams);
      ctx.logger.info('getChartData:', sql, queryParams);
      const res: any = await app.mysql.query(sql, param);
      // 根据筛选轴过滤后的数据，对维度字段进行过滤
      let suffix = `${queryParams.tableName}`;
      // if (axisType.includes('filtrate')) {
      suffix = `(${sqlStr}) dimfilter`;
      // }
      const promiseArr: any = [];
      for await (const it of axes.dim) {
        // 如果筛选轴有值，则按筛选轴排序
        const dimSql = `select ${it.fieldId} from ${suffix} group by ${
          it.fieldId
        } ${curSqlStr ? '' : 'order by ' + it.fieldId}`;
        promiseArr.push(
          new Promise(async (resolve) => {
            const itRes: any = await app.mysql.query(dimSql);
            it.ele = itRes.map((item) => item[it.fieldId]);
            resolve(itRes);
          }),
        );
      }
      await Promise.all(promiseArr);
      return {
        ...axes,
        data: res || [],
      };
    }
  }
}
