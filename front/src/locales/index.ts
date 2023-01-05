import { createI18n } from 'vue-i18n';
import zhCN from './zhCN';
import enUS from './enUS';

const messages = {
  'en-us': enUS,
  'zh-cn': zhCN,
};

const language = (navigator.language || 'zh-cn').toLocaleLowerCase(); // 这是获取浏览器的语言
const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: localStorage.getItem('language') || language, // 首先从缓存里拿，没有的话就用浏览器语言，
  fallbackLocale: 'zh-cn', // 设置备用语言
  messages,
});

export default i18n;
