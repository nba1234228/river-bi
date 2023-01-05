// This file is created by egg-ts-helper@1.33.0
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportErrorHandler from '../../../app/middleware/errorHandler';
import ExportNotfoundHandler from '../../../app/middleware/notfoundHandler';

declare module 'egg' {
  interface IMiddleware {
    errorHandler: typeof ExportErrorHandler;
    notfoundHandler: typeof ExportNotfoundHandler;
  }
}
