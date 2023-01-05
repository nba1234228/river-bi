import { Controller } from 'egg';

const getCardRule = {
  cardId: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  filters: {
    type: 'object',
    required: false,
    allowEmpty: true,
  },
};
const saveAxesRule = {
  cardId: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  axisLocation: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  axisLabel: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  fieldId: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  fieldName: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  aliasName: {
    type: 'string',
    required: false,
  },
  // isMeasure: {
  //   // type: ['boolean', 'number'],
  //   // required: true,
  //   allowEmpty: false,
  // },
  // isPeriod: {
  //   // type: ['boolean', 'number'],
  //   required: false,
  // },
  periodType: {
    type: 'string',
    required: false,
  },
  extAttr: {
    type: 'object',
    required: false,
  },
  pos: {
    type: 'number',
    required: false,
  },
};
const saveCardInfoRule = {
  cardId: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  cardName: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  chartType: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  dbSourceId: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  datasetCategory: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  datasetId: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
};
const saveCardRule = {
  cardId: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  cardName: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  dbSourceId: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  datasetCategory: {
    type: 'string',
    required: false,
    allowEmpty: true,
  },
  dataSourceType: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  datasetId: {
    type: 'string',
    required: false,
    allowEmpty: true,
  },
  cardAttr: {
    type: 'object',
    required: true,
    allowEmpty: false,
  },
  styles: {
    type: 'object',
    required: true,
    allowEmpty: false,
  },
  chartType: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
  foreignConfig: {
    type: 'object',
    required: true,
    allowEmpty: false,
  },
  staticJson: {
    type: 'object',
    required: false,
    allowEmpty: true,
  },
};
const getChartDataRule = {
  cardId: {
    type: 'string',
    required: true,
    allowEmpty: false,
  },
};

export default class Card extends Controller {
  async getList() {
    const { ctx, service } = this;
    const params = Object.assign({}, ctx.query, ctx.params);
    const result = await service.card.getList(params);
    ctx.body = ctx.response.success(result);
  }

  async editCard() {
    const { ctx, service, logger } = this;
    const params = Object.assign({}, ctx.query, ctx.params);
    try {
      ctx.validate(getCardRule, params);
    } catch (err: any) {
      logger.error(new Error(err.code));
      ctx.body = ctx.response.paramError(err.errors);
      return false;
    }
    const result = await service.card.editCard(params);
    ctx.body = ctx.response.success(result);
  }

  async createCard() {
    const { ctx, service } = this;
    const result = await service.card.createCard();
    ctx.body = ctx.response.success(result);
  }

  async saveAxes() {
    const { ctx, service, logger } = this;
    const { cardId, axes } = ctx.request.body;
    for (const item of axes) {
      try {
        ctx.validate(saveAxesRule, item);
      } catch (err: any) {
        logger.error(new Error(err.code));
        ctx.body = ctx.response.paramError(err.errors);
        return false;
      }
    }
    const result = await service.card.saveAxes(cardId, axes);
    ctx.body = ctx.response.success(result);
  }

  async saveCardInfo() {
    const { ctx, service, logger } = this;
    const params = ctx.request.body;
    try {
      ctx.validate(saveCardInfoRule, params);
    } catch (err: any) {
      logger.error(new Error(err.code));
      ctx.body = ctx.response.paramError(err.errors);
      return false;
    }
    const result = await service.card.saveCardInfo(params);
    ctx.body = ctx.response.success(result);
  }

  async saveCard() {
    const { ctx, service, logger } = this;
    const params = ctx.request.body;
    try {
      ctx.validate(saveCardRule, params);
    } catch (err: any) {
      logger.error(new Error(err.code));
      ctx.body = ctx.response.paramError(err.errors);
      return false;
    }
    const result = await service.card.saveCard(params);
    ctx.body = ctx.response.success(result);
  }

  async getChartData() {
    const { ctx, service, logger } = this;
    const params = ctx.request.body;
    try {
      ctx.validate(getChartDataRule, params);
    } catch (err: any) {
      logger.error(new Error(err.code));
      ctx.body = ctx.response.paramError(err.errors);
      return false;
    }
    const result = await service.card.getChartData(params);
    ctx.body = ctx.response.success(result);
  }
}
