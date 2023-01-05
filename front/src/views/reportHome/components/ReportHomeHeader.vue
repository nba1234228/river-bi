<template>
  <div class="report-home-header">
    <div class="report-home-header-left">
      <span class="header-logo">{{ $t(`reportHeader.riverBI`) }}</span>
      <span class="header-title">{{ $t(`reportHeader.dashboard`) }}</span>
    </div>
    <div class="report-home-header-right">
      <a-popover
        trigger="click"
        overlayClassName="report-home-header-popover"
        :getPopupContainer="getPopupContainer"
        placement="topLeft"
      >
        <template #title>
          <div class="popover-title">
            <rb-icon type="icon_rb-user" />
            <span class="title-text">13929979999</span>
          </div>
        </template>
        <template #content>
          <div class="item-group theme">
            <label class="label">{{ $t(`reportHeader.theme`) }}</label>
            <!-- @change="onThemeChange"   @change="onLanguageChange"-->
            <a-radio-group v-model:value="themeType">
              <a-radio-button value="skyBlue">
                {{ $t(`reportHeader.skyBlue`) }}
              </a-radio-button>
              <a-radio-button value="peacockGreen">
                {{ $t(`reportHeader.peacockGreen`) }}
              </a-radio-button>
            </a-radio-group>
          </div>
          <div class="item-group language">
            <label class="label">{{ $t(`reportHeader.language`) }}</label>
            <a-radio-group v-model:value="language">
              <a-radio-button value="zh-cn">
                {{ $t(`reportHeader.chinese`) }}
              </a-radio-button>
              <a-radio-button value="en-us">
                {{ $t(`reportHeader.english`) }}
              </a-radio-button>
            </a-radio-group>
          </div>
        </template>
        <rb-icon type="icon_rb-user" />
      </a-popover>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useI18n } from 'vue-i18n';
import { setTheme, getPopupContainer } from '@/global/preUtils';

export default defineComponent({
  name: 'ReportHomeHeader',
  setup() {
    const store = useStore();
    const themeType = computed({
      get: () => store.state.root.themeType,
      set: (val) => {
        setTheme(val);
        localStorage.setItem('themeType', val);
        store.commit('root/SetThemeType', val);
      },
    });

    const { locale } = useI18n();
    const language = computed({
      get: () => store.state.root.language,
      set: (val) => {
        locale.value = val;
        localStorage.setItem('language', val);
        store.commit('root/SetLocale', val);
      },
    });

    return {
      themeType,
      language,
      getPopupContainer,
    };
  },
});
</script>

<style lang="less" scoped>
.report-home-header {
  .flexRow();
  padding: 0 32px;
  height: 48px;
  line-height: 48px;
  background-color: @rb-primary-color;
  color: @rb-text-color-light;
  z-index: 2;
  &-left {
    .flexRow();
    .header-logo {
      font-family: cursive;
      font-size: 22px;
      padding-right: 16px;
    }
  }
  &-right {
    .flexRow();
    .report-home-header-popover {
      .popover-title {
        .title-text {
          padding-left: 8px;
        }
      }
      .item-group {
        .flexColumn(flex-start, flex-start);
        padding-bottom: 8px;
        &:last-child {
          padding-bottom: 0;
          border-bottom: none;
        }
        .label {
          margin-bottom: 4px;
        }
      }
    }
  }
}
</style>
