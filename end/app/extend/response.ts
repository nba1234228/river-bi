'use strict';
// 响应状态码及消息的管理
module.exports = {
  success(data) {
    return {
      code: 0,
      message: 'success',
      data,
    };
  },
  authenticattionError(msg) {
    return {
      code: 400,
      message: msg || '请登录后访问',
    };
  },
  permissionError(msg) {
    return {
      code: 401,
      message: msg || '请求权限接口出错',
    };
  },
  basicAuthError(msg) {
    return {
      code: 402,
      message: msg || '签名校验失败',
    };
  },
  systemError(msg) {
    return {
      code: 500,
      message: msg || '服务器异常',
    };
  },
  paramError(msg) {
    return {
      code: 600,
      message: msg || '参数错误',
    };
  },
  secureError(msg) {
    return {
      code: 700,
      message: msg || '不合法请求',
    };
  },
};
