import { Controller } from 'egg';

// const categoryRule = {
//   dbSourceId: {
//     type: 'string',
//     required: true,
//     allowEmpty: false,
//   },
// tab: { type: 'enum', values: ['ask', 'share', 'job'], required: false },
// id: {
//   type: 'string',
//   required: true,
//   allowEmpty: false,
//   format: /^\d+$/,
// },
// };

export default class Template extends Controller {
  public async index() {
    // ctx.headers，ctx.header，ctx.request.headers，ctx.request.header：这几个方法是等价的，都是获取整个 header 对象
    // 我们建议用 ctx.get(name) 而不是 ctx.headers['name']，因为前者会自动处理大小写
    // ctx.cookies.get('count')
    // 校验 `ctx.request.body query params` 是否符合我们预期的格式
    // 错误日志记录，直接会将错误日志完整堆栈信息记录下来，并且输出到 errorLog 中
    // 为了保证异常可追踪，必须保证所有抛出的异常都是 Error 类型，因为只有 Error 类型才会带上堆栈信息，定位到问题。
    // ctx.logger.error(new Error('whoops'));
    const { ctx } = this;
    ctx.body = await ctx.service.template.sayHi('!');
  }
}
