// 分页查询服务
'use strict';
import { Service } from 'egg';

export default class PageService extends Service {
  async queryPageList(sql, params, no, size) {
    const { app } = this;
    const pageNo = parseInt(no) || 1;
    const pageSize = parseInt(size) || 10;
    params = params || [];
    const totalSize = await this.queryTotal(sql, params);
    const totalPage = this.computeTotalPage(totalSize, pageSize);
    if (totalPage === 0) {
      return {
        pagination: {
          size: pageSize,
          page: pageNo,
          total: totalSize,
          totalPage,
        },
        list: [],
      };
    }
    const queryPageNo = this.computeQueryPageNo(totalPage, pageNo);
    const start = pageSize * (queryPageNo - 1);
    const querySql = `${sql} limit ${start}, ${pageSize}`;
    const list = await app.mysql.query(querySql, params);
    return {
      pagination: {
        size: pageSize,
        page: pageNo,
        total: totalSize,
        totalPage,
      },
      list,
    };
  }
  async queryTotalList(sql, params = []) {
    const { app } = this;
    const total = await this.queryTotal(sql, params);
    const list = await app.mysql.query(sql, params);
    return {
      list,
      total,
    };
  }
  async queryTotal(sqls, params = []) {
    const { ctx, app } = this;
    const sqlTotal = `select count(1) as total from (${sqls}) _t`;
    const { sql, param } = ctx.helper.formatSql(sqlTotal, params);
    ctx.logger.info('queryTotal:', sql, params);
    const result = await app.mysql.query(sql, param);
    return result[0].total;
  }
  computeTotalPage(totalSize, pageSize) {
    const remainder = totalSize % pageSize;
    const page = Math.floor(totalSize / pageSize);
    return remainder === 0 ? page : page + 1;
  }
  computeQueryPageNo(totalPage, pageNo) {
    return pageNo < 1 ? 1 : pageNo > totalPage ? totalPage : pageNo;
  }
}
