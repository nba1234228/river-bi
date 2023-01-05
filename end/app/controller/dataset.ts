import { Controller } from 'egg';

const categoryRule = {
  dbSourceId: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
};
const listRule = {
  datasetCategory: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
};
const fieldRule = {
  tableName: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
};
const getFieldMemberRule = {
  tableName: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  fieldId: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  periodType: {
    type: 'string',
    required: false,
    allowEmpty: true,
  },
};

export default class Dataset extends Controller {
  async getCategory() {
    const { ctx, service, logger } = this;
    const params = Object.assign({}, ctx.query, ctx.params);
    try {
      ctx.validate(categoryRule, params);
    } catch (err: any) {
      logger.error(new Error(err.code));
      ctx.body = ctx.response.paramError(err.errors);
      return false;
    }
    const result = await service.dataset.getCategory(params);
    ctx.body = ctx.response.success(result);
  }

  async getList() {
    const { ctx, service, logger } = this;
    const params = Object.assign({}, ctx.query, ctx.params);
    try {
      ctx.validate(listRule, params);
    } catch (err: any) {
      logger.error(new Error(err.code));
      ctx.body = ctx.response.paramError(err.errors);
      return false;
    }
    const result = await service.dataset.getList(params);
    ctx.body = ctx.response.success(result);
  }

  async getField() {
    const { ctx, service, logger } = this;
    const params = Object.assign({}, ctx.query, ctx.params);
    try {
      ctx.validate(fieldRule, params);
    } catch (err: any) {
      logger.error(new Error(err.code));
      ctx.body = ctx.response.paramError(err.errors);
      return false;
    }
    const result = await service.dataset.getField(params);
    ctx.body = ctx.response.success(result);
  }

  async getFieldMember() {
    const { ctx, service, logger } = this;
    const params = Object.assign({}, ctx.query, ctx.params);
    try {
      ctx.validate(getFieldMemberRule, params);
    } catch (err: any) {
      logger.error(new Error(err.code));
      ctx.body = ctx.response.paramError(err.errors);
      return false;
    }
    const result = await service.dataset.getFieldMember(params);
    ctx.body = ctx.response.success(result);
  }
}
