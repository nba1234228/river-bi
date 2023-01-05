// app/middleware/notfoundHandler.js
module.exports = () => {
  return async function notFoundHandler(ctx, next) {
    await next();
    if (ctx.status === 404 && !ctx.body) {
      if (ctx.acceptJSON) {
        ctx.body = {
          code: 404,
          message: 'Not Found',
        };
      } else {
        ctx.body = '<h1>Page Not Found</h1>';
      }
    }
  };
};
