import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

const service = axios.create({
  timeout: 10000,
  baseURL: '/api',
});

// 添加请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    config.params = config.params || {};
    Object.assign(config.params, { _ts: Date.now() });
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

// 添加响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response.data;
    } else {
      return Promise.reject(response.data.message || null);
    }
  },
  (error: any) => {
    return Promise.reject(error);
  },
);

export default service;
