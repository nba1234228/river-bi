import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, config } = app;
  const prefix = config.apiPrefix;
  router.get('/', controller.template.index);
  // 数据集
  router.get(`${prefix}/dataset/category`, controller.dataset.getCategory);
  router.get(`${prefix}/dataset/list`, controller.dataset.getList);
  router.get(`${prefix}/dataset/field`, controller.dataset.getField);
  router.get(
    `${prefix}/dataset/field/member`,
    controller.dataset.getFieldMember,
  );
  // 卡片
  router.get(`${prefix}/card/list`, controller.card.getList);
  router.get(`${prefix}/card/edit`, controller.card.editCard);
  router.post(`${prefix}/card/create`, controller.card.createCard);
  router.post(`${prefix}/card/save/axes`, controller.card.saveAxes);
  router.post(`${prefix}/card/save/cardInfo`, controller.card.saveCardInfo);
  router.post(`${prefix}/card/save`, controller.card.saveCard);
  // 报告分组
  router.post(`${prefix}/report/group/sort`, controller.report.sortGroup);
  router.get(`${prefix}/report/group/list`, controller.report.getGroupList);
  router.post(`${prefix}/report/group/create`, controller.report.createGroup);
  router.post(`${prefix}/report/group/rename`, controller.report.renameGroup);
  router.post(`${prefix}/report/group/remove`, controller.report.removeGroup);
  // 报告
  router.post(`${prefix}/report/sort`, controller.report.sortReport);
  router.get(`${prefix}/report/list`, controller.report.getReportList);
  router.post(`${prefix}/report/create`, controller.report.createReport);
  router.post(`${prefix}/report/rename`, controller.report.renameReport);
  router.post(`${prefix}/report/remove`, controller.report.removeReport);
  router.post(`${prefix}/report/save`, controller.report.saveReport);
  router.get(`${prefix}/report/get/data`, controller.report.getReportData);
  // 出图
  router.post(`${prefix}/chart/get/data`, controller.card.getChartData);
};
