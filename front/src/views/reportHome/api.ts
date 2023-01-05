import ajax from '@/core/ajax';

export const getGroupList = (data: { [key: string]: any } = {}) => {
  return ajax.get('/report/group/list');
};

export const createGroup = (data: { [key: string]: any } = {}) => {
  return ajax.post('/report/group/create', data);
};

export const renameGroup = (data: { [key: string]: any } = {}) => {
  return ajax.post('/report/group/rename', data);
};

export const removeGroup = (data: { [key: string]: any } = {}) => {
  return ajax.post('/report/group/remove', data);
};

export const sortGroup = (data: { [key: string]: any } = {}) => {
  return ajax.post('/report/group/sort', data);
};

// 报告
export const getReportList = (data: { [key: string]: any } = {}) => {
  return ajax.get('/report/list', { params: { ...data } });
};

export const createReport = (data: { [key: string]: any } = {}) => {
  return ajax.post('/report/create', data);
};

export const renameReport = (data: { [key: string]: any } = {}) => {
  return ajax.post('/report/rename', data);
};

export const removeReport = (data: { [key: string]: any } = {}) => {
  return ajax.post('/report/remove', data);
};

export const sortReport = (data: { [key: string]: any } = {}) => {
  return ajax.post('/report/sort', data);
};
