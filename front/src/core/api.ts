import ajax from '@/core/ajax';

export const getChartData = (data: { [key: string]: any }) => {
  return ajax.post('/chart/get/data', data);
};

export const getReportData = (data: { [key: string]: any } = {}) => {
  return ajax.get('/report/get/data', { params: { ...data } });
};

export const getDatasetCategory = (data: { [key: string]: any } = {}) => {
  return ajax.get('/dataset/category', { params: { dbSourceId: 'N1' } });
};

export const getDataset = (data: { [key: string]: any } = {}) => {
  return ajax.get('/dataset/list', { params: { ...data } });
};

export const getField = (data: { [key: string]: any } = {}) => {
  return ajax.get('/dataset/field', { params: { ...data } });
};

export const getCardList = (data: { [key: string]: any } = {}) => {
  return ajax.get('/card/list', { params: { ...data } });
};
