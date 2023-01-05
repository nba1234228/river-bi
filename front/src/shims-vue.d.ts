/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module 'vue-grid-layout';
declare module 'lodash/*';
declare module 'colorpicker-v3';
declare module 'vue-codemirror';
declare module '@codemirror/*';

// 针对 Window 参数进行申明
interface Window {
  ENV_CONFIG: { [key: string]: any };
  ResizeObserver;
  datasetDropFieldType: string;
}
