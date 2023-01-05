export const getList = `select
  object_id as cardId,
  card_name as cardName,
  db_source_id as dbSourceId,
  dataset_category as datasetCategory,
  data_source_type as dataSourceType,
  dataset_id as datasetId,
  card_attr as cardAttr,
  styles as styles,
  static_json as staticJson,
  chart_type as chartType,
  foreign_config as foreignConfig
  from card
  where origin_card_id is null or trim(origin_card_id) = ''
`;

export const queryOriginCard = `select
  object_id as originCardId,
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
export const copyToTempCard = `update card set
  card_name = :cardName,
  db_source_id = :dbSourceId,
  dataset_category = :datasetCategory,
  data_source_type = :dataSourceType,
  dataset_id = :datasetId,
  card_attr = :cardAttr,
  styles = :styles,
  static_json = :staticJson,
  card_type = :cardType,
  chart_type = :chartType,
  foreign_config = :foreignConfig,
  create_by = :createBy,
  create_time = :createTime,
  update_by = :updateBy,
  update_time = :updateTime
  where origin_card_id = :originCardId
`;
export const queryTempCardId = `select
  object_id as tempCardId
  from card
  where origin_card_id = :cardId 
`;
export const queryOriginAxes = `select 
  card_id as cardId,
  axis_location as axisLocation,
  axis_label as axisLabel,
  field_id as fieldId,
  field_name as fieldName,
  alias_name as aliasName,
  is_measure as isMeasure,
  is_period as isPeriod,
  period_type as periodType,
  ext_attr as extAttr,
  pos,
  create_by as createBy,
  create_time as createTime,
  update_by as updateBy,
  update_time as updateTime
  from card_axis
  where card_id = :cardId
  order by pos
`;

export const createCard = `insert into card
  (object_id, origin_card_id)
  values (:objectId, :originCardId)
`;
export const deleteAxes = `delete from card_axis
  where card_id = :cardId
`;
export const saveAxis = `insert into card_axis
  (object_id, card_id, axis_location, axis_label,
    field_id, field_name, alias_name, is_measure,
    is_period, period_type, ext_attr, pos)
  values (:objectId, :cardId, :axisLocation, :axisLabel,
    :fieldId, :fieldName, :aliasName, :isMeasure,
    :isPeriod, :periodType, :extAttr, :pos)
`;
export const saveCardInfo = `update card set
  chart_type = :chartType,
  card_name = :cardName,
  db_source_id = :dbSourceId,
  dataset_category = :datasetCategory,
  data_source_type = :dataSourceType,
  dataset_id = :datasetId
  where object_id = :cardId
`;
export const saveCard = `update card set
  card_name = :cardName,
  db_source_id = :dbSourceId,
  dataset_category = :datasetCategory,
  data_source_type = :dataSourceType,
  dataset_id = :datasetId,
  card_attr = :cardAttr,
  styles = :styles,
  static_json = :staticJson,
  chart_type = :chartType,
  foreign_config = :foreignConfig
  where object_id = :cardId
`;
export const queryAxes = `select 
  object_id as objectId,
  card_id as cardId,
  axis_location as axisLocation,
  axis_label as axisLabel,
  field_id as fieldId,
  field_name as fieldName,
  alias_name as aliasName,
  is_measure as isMeasure,
  is_period as isPeriod,
  period_type as periodType,
  ext_attr as extAttr,
  pos
  from card_axis
  where card_id = :cardId
  order by pos
`;
export const getCardDataset = `select dataset_id as datasetId from card
  where object_id = :cardId
`;
