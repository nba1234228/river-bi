import ajax from '@/core/ajax';

export const editCard = (data: { [key: string]: any } = {}) => {
  return ajax.get('/card/edit', { params: { ...data } });
};

export const createCard = (data: { [key: string]: any } = {}) => {
  return ajax.post('/card/create', data);
};

export const saveCardInfo = (data: { [key: string]: any } = {}) => {
  return ajax.post('/card/save/cardInfo', data);
};

export const saveAxes = (data: { [key: string]: any }) => {
  return ajax.post('/card/save/axes', data);
};

export const saveCard = (data: { [key: string]: any }) => {
  return ajax.post('/card/save', data);
};
