import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;
  Object.assign(config, {
    keys: appInfo.name + '_1665920728404_4251', // use for cookie sign key, should change to your own and keep security
    apiPrefix: '/api',
    proxy: true,
    maxProxyCount: 1,
    ipHeaders: 'x-forwarded-for',
    hostHeaders: 'Host',
    middleware: ['errorHandler', 'notfoundHandler'], // 加载 errorHandler 中间件
    errorHandler: {
      match: '/api', // 只对 /api 前缀的 url 路径生效
    },
    mysql: {
      client: {
        // 单数据库信息配置
        host: '127.0.0.1', // host
        port: '3306', // 端口号
        user: 'root', // 用户名
        password: 'fa123456', // 密码
        database: 'dashboard', // 数据库名
        tinyInt1isBit: true,
      },
      app: true, // 是否加载到 app 上，默认开启
      agent: false, // 是否加载到 agent 上，默认关闭
    },
    logger: {
      outputJSON: true,
    },
    onerror: {
      all(err, ctx) {
        ctx.body = ctx.response.systemError(err);
      },
    },
    // cors: {
    //   origin(ctx) {
    //     return ctx.request.get('origin');
    //   },
    //   credentials: true,
    //   allowMethods: 'GET,POST,PUT,DELETE,HEAD,PATCH,OPTIONS',
    // },
    // multipart: {
    //   mode: 'file',
    //   fileSize: '50mb',
    //   fields: '100',
    //   fileExtensions: [],
    // },
    security: {
      csrf: {
        enable: false,
      },
      methodnoallow: {
        enable: false,
      },
      xframe: {
        enable: false,
      },
    },
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`, // 以下自行配置
  });
  return {
    ...config,
  };
};
