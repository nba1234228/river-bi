import 'egg';

declare module 'egg' {
  // 扩展 context
  interface Context {}
  // 扩展 Application
  interface Application {}
  // 扩展 Response
  interface Response {
    paramError: Function;
    success: Function;
    permissionError: Function;
    basicAuthError: Function;
    systemError: Function;
    paramError: Function;
    secureError: Function;
  }
}
