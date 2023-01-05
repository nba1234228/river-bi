import ajax from '@/core/ajax';

export const saveReport = (data: { [key: string]: any } = {}) => {
  return ajax.post('/report/save', data);
};

export const getFieldMember = (data: { [key: string]: any } = {}) => {
  return ajax.get('/dataset/field/member', { params: { ...data } });
};
