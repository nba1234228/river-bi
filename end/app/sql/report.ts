export const sortGroup = `update report_category set
  pos = :pos
  where object_id = :groupId
`;
export const getGroupList = `select object_id as groupId, object_name as groupName, pos
  from report_category
  order by pos
`;
export const createGroup = `insert into report_category
  (object_id, object_name)
  values (:groupId, :groupName)
`;
export const renameGroup = `update report_category set
  object_name = :groupName
  where object_id = :groupId
`;
export const removeGroup = `delete from report_category
  where object_id = :groupId
`;

export const sortReport = `update report set
  group_id = :groupId,
  pos = :pos
  where object_id = :reportId
`;
export const getReportList = `select
  object_id as reportId,
  object_name as reportName,
  group_id as groupId,
  pos
  from report
  where group_id = :groupId
  order by pos
`;
export const createReport = `insert into report
  (object_id, object_name, group_id, comps, canvas, screen_type, screen_config)
  values (:reportId, :reportName, :groupId, :comps, :canvas, :screenType, :screenConfig)
`;
export const renameReport = `update report set
  object_name = :reportName
  where object_id = :reportId
`;
export const removeReport = `delete from report
  where object_id = :reportId
`;
export const saveReport = `update report set
  object_name = :reportName,
  comps = :comps,
  canvas = :canvas,
  screen_type = :screenType,
  screen_config = :screenConfig
  where object_id = :reportId
`;
export const getReportData = `select
  object_id as reportId,
  object_name as reportName,
  comps as comps,
  canvas as canvas,
  screen_type as screenType,
  screen_config as screenConfig
  from report
  where object_id = :reportId
`;

export const queryCards = `select
  object_id as cardId,
  card_name as cardName,
  db_source_id as dbSourceId,
  dataset_category as datasetCategory,
  data_source_type as dataSourceType,
  dataset_id as datasetId,
  card_attr as cardAttr,
  styles as styles,
  static_json as staticJson,
  card_type as cardType,
  chart_type as chartType,
  foreign_config as foreignConfig,
  create_by as createBy,
  create_time as createTime,
  update_by as updateBy,
  update_time as updateTime
  from card
  where object_id = :cardId
`;
