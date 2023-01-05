import components from '@/global/components/index';
import directives from '@/global/directives/index';
import mixins from '@/global/mixins/index';
import plugins from '@/global/plugins/index';

const globalUse = (app: any) => {
  // 注册全局组件
  components.forEach((component) => {
    app.component(component.name, component);
  });
  // 注册全局指令
  Object.keys(directives).forEach((key: string) => {
    app.directive(key, directives[key]);
  });
  // 注册全局mixin
  mixins.forEach((mixin) => {
    app.mixin(mixin);
  });
  // 注册全局插件
  plugins.forEach((plugin) => {
    if (plugin.name) {
      app.use(plugin[plugin.name], plugin.options);
    }
  });
};

export default globalUse;
