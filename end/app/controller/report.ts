import { Controller } from 'egg';

// 分组
const sortGroupRule = {
  list: {
    type: 'array',
    required: true,
    allowEmpty: false,
  },
};
const createGroupRule = {
  groupId: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  groupName: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
};
const renameGroupRule = {
  groupId: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  groupName: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
};
const removeGroupRule = {
  groupId: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
};
// 报告
const sortReportRule = {
  list: {
    type: 'array',
    required: true,
    allowEmpty: false,
  },
};
const getReportListRule = {
  groupId: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
};
const createReportRule = {
  groupId: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  reportId: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  reportName: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  comps: {
    type: 'array',
    required: true,
    allowEmpty: false,
  },
  canvas: {
    type: 'object',
    required: true,
    allowEmpty: false,
  },
  screenType: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  screenConfig: {
    type: 'object',
    required: true,
    allowEmpty: false,
  },
};
const renameReportRule = {
  reportId: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  reportName: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
};
const removeReportRule = {
  reportId: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
};
const saveReportRule = {
  reportId: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  reportName: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  comps: {
    type: 'object',
    required: true,
    allowEmpty: true,
  },
  canvas: {
    type: 'object',
    required: true,
    allowEmpty: false,
  },
  screenType: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  screenConfig: {
    type: 'object',
    required: true,
    allowEmpty: false,
  },
};
const getReportRule = {
  reportId: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
};

export default class Report extends Controller {
  // 报告分组
  async sortGroup() {
    const { ctx, service, logger } = this;
    const params = Object.assign({}, ctx.request.body);
    try {
      ctx.validate(sortGroupRule, params);
    } catch (err: any) {
      logger.error(new Error(err.code));
      ctx.body = ctx.response.paramError(err.errors);
      return false;
    }
    const result = await service.report.sortGroup(params);
    ctx.body = ctx.response.success(result);
  }

  async getGroupList() {
    const { ctx, service } = this;
    const params = Object.assign({}, ctx.query, ctx.params);
    const result = await service.report.getGroupList(params);
    ctx.body = ctx.response.success(result);
  }

  async createGroup() {
    const { ctx, service, logger } = this;
    const params = Object.assign({}, ctx.request.body);
    try {
      ctx.validate(createGroupRule, params);
    } catch (err: any) {
      logger.error(new Error(err.code));
      ctx.body = ctx.response.paramError(err.errors);
      return false;
    }
    const result = await service.report.createGroup(params);
    ctx.body = ctx.response.success(result);
  }

  async renameGroup() {
    const { ctx, service, logger } = this;
    const params = Object.assign({}, ctx.request.body);
    try {
      ctx.validate(renameGroupRule, params);
    } catch (err: any) {
      logger.error(new Error(err.code));
      ctx.body = ctx.response.paramError(err.errors);
      return false;
    }
    const result = await service.report.renameGroup(params);
    ctx.body = ctx.response.success(result);
  }

  async removeGroup() {
    const { ctx, service, logger } = this;
    const params = Object.assign({}, ctx.request.body);
    try {
      ctx.validate(removeGroupRule, params);
    } catch (err: any) {
      logger.error(new Error(err.code));
      ctx.body = ctx.response.paramError(err.errors);
      return false;
    }
    if (params.groupId === 'defaultgroup') {
      ctx.body = ctx.response.secureError('默认分组不可删除');
    } else {
      const result = await service.report.removeGroup(params);
      ctx.body = ctx.response.success(result);
    }
  }

  // 报告
  async sortReport() {
    const { ctx, service, logger } = this;
    const params = Object.assign({}, ctx.request.body);
    try {
      ctx.validate(sortReportRule, params);
    } catch (err: any) {
      logger.error(new Error(err.code));
      ctx.body = ctx.response.paramError(err.errors);
      return false;
    }
    const result = await service.report.sortReport(params);
    ctx.body = ctx.response.success(result);
  }

  async getReportList() {
    const { ctx, service, logger } = this;
    const params = Object.assign({}, ctx.query, ctx.params);
    try {
      ctx.validate(getReportListRule, params);
    } catch (err: any) {
      logger.error(new Error(err.code));
      ctx.body = ctx.response.paramError(err.errors);
      return false;
    }
    const result = await service.report.getReportList(params);
    ctx.body = ctx.response.success(result);
  }

  async createReport() {
    const { ctx, service, logger } = this;
    const params = Object.assign({}, ctx.request.body);
    try {
      ctx.validate(createReportRule, params);
    } catch (err: any) {
      logger.error(new Error(err.code));
      ctx.body = ctx.response.paramError(err.errors);
      return false;
    }
    const result = await service.report.createReport(params);
    ctx.body = ctx.response.success(result);
  }

  async renameReport() {
    const { ctx, service, logger } = this;
    const params = Object.assign({}, ctx.request.body);
    try {
      ctx.validate(renameReportRule, params);
    } catch (err: any) {
      logger.error(new Error(err.code));
      ctx.body = ctx.response.paramError(err.errors);
      return false;
    }
    const result = await service.report.renameReport(params);
    ctx.body = ctx.response.success(result);
  }

  async removeReport() {
    const { ctx, service, logger } = this;
    const params = Object.assign({}, ctx.request.body);
    try {
      ctx.validate(removeReportRule, params);
    } catch (err: any) {
      logger.error(new Error(err.code));
      ctx.body = ctx.response.paramError(err.errors);
      return false;
    }
    const result = await service.report.removeReport(params);
    ctx.body = ctx.response.success(result);
  }

  async saveReport() {
    const { ctx, service, logger } = this;
    const params = ctx.request.body;
    try {
      ctx.validate(saveReportRule, params);
    } catch (err: any) {
      logger.error(new Error(err.code));
      ctx.body = ctx.response.paramError(err.errors);
      return false;
    }
    const result = await service.report.saveReport(params);
    ctx.body = ctx.response.success(result);
  }

  async getReportData() {
    const { ctx, service, logger } = this;
    const params = Object.assign({}, ctx.query, ctx.params);
    try {
      ctx.validate(getReportRule, params);
    } catch (err: any) {
      logger.error(new Error(err.code));
      ctx.body = ctx.response.paramError(err.errors);
      return false;
    }
    const result = await service.report.getReportData(params);
    ctx.body = ctx.response.success(result);
  }
}
