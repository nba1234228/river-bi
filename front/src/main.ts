import { createApp } from 'vue';
import { message } from 'ant-design-vue';
import registerAntdComp from '@/global/antd/index';
import 'ant-design-vue/dist/antd.variable.min.css';
import '@/assets/styles/reset.css';
import VueGridLayout from 'vue-grid-layout';
import App from '@/App.vue';
import router from '@/core/router';
import store from '@/core/store';
import globalUse from '@/global';
import i18n from '@/locales/index';

// 防止弹出大量消息
message.config({
  duration: 2,
  maxCount: 1,
});

const app = createApp(App);
globalUse(app);
registerAntdComp(app);

window.ENV_CONFIG = process.env.ENV_CONFIG;

app.use(VueGridLayout).use(i18n).use(store).use(router).mount('#app');
