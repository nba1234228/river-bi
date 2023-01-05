import { Service } from 'egg';

export default class Template extends Service {
  public async sayHi(name: string) {
    // {ctx, app, service, config, logger} = this;
    // ctx.curl 发起网络调用。
    // ctx.service.otherService 调用其他 Service。
    // ctx.db 发起数据库调用等， db 可能是其他插件提前挂载到 app 上的模块。
    // ctx.logger.info('getCategory service:');
    return `this is template, ${name}`;
  }
}
