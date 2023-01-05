<template>
  <a-config-provider :locale="antdLocale">
    <div id="nav">
      <div id="dragDom" class="drag-dom">
        <div class="drag-dom-label">
          <rb-icon
            :style="{ 'font-size': `${15 * styles.size}px` }"
            v-if="styles.type"
            :type="getIcon(styles.type)"
          />
        </div>
      </div>
      <div class="main">
        <router-view />
      </div>
    </div>
  </a-config-provider>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { setTheme } from '@/global/preUtils';
import { getMateriel } from '@/core/materielList';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

export default defineComponent({
  name: 'App',
  components: {},
  setup() {
    // console.log(window.ENV_CONFIG);
    const store = useStore();

    const language = computed(() => store.state.root.language);
    const antdLocale = computed(() => store.getters['root/locale']);
    const { locale } = useI18n();
    locale.value = language.value;

    const themeType = computed(() => store.state.root.themeType);
    setTheme(themeType.value);

    const styles = computed(() => {
      const component = store.state.root.dragDomData;
      let type = component.componentType;
      if (component.componentType === 'card') {
        type = component.props.cardInfo.chartType;
      }
      const size = component.w > component.h ? component.h : component.w;
      return {
        type,
        size,
      };
    });

    const getIcon = (chartType: string) => {
      const materiel = getMateriel(chartType);
      return materiel?.icon;
    };

    return {
      antdLocale,
      styles,
      getIcon,
    };
  },
});
</script>

<style lang="less">
::-webkit-scrollbar {
  width: @rb-scrollbar-width;
  height: @rb-scrollbar-height;
}
::-webkit-scrollbar-thumb {
  background-color: @rb-scrollbar-color;
  border-radius: @rb-scrollbar-border-radius;
}
::-webkit-scrollbar-thumb:hover {
  background-color: @rb-scrollbar-color-hover;
}
body {
  height: auto;
  p {
    margin-bottom: 0;
  }
}
#app {
  font-family: @rb-font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: @rb-text-color;
  font-size: 14px;
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: @rb-font-family;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: @rb-text-color;
    font-size: 14px;
  }
  #nav {
    .drag-dom {
      display: none;
      pointer-events: none;
      position: fixed;
      outline: 1px solid @rb-primary-color;
      background: @rb-body-background;
      opacity: 0.5;
      z-index: 99;
    }
  }
}
</style>
