export const selectCategory = `select
  object_id as objectId,
  object_name as objectName,
  db_source_id as dbSourceId,
  unix_timestamp(create_time) as createTime
  from dataset_category
  where db_source_id = :dbSourceId
`;

export const selectList = `select
  object_id as objectId,
  object_name as objectName,
  dataset_category as datasetCategory,
  unix_timestamp(create_time) as createTime
  from dataset
  where dataset_category = :datasetCategory and p_deleted = 0
`;

export const selectField = `select
  c.COLUMN_NAME as fieldId,
  c.COLUMN_COMMENT as fieldName,
  c.DATA_TYPE as type  
  from information_schema.COLUMNS c 
  where c.TABLE_NAME = :tableName
  order by fieldName
`;
