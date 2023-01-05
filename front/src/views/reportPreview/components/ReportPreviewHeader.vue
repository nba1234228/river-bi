<template>
  <div class="report-preview-header">
    <div class="report-preview-header-left">
      <span class="header-logo">{{ $t(`reportHeader.riverBI`) }}</span>
      <span class="header-title" @click="onToReport">{{
        $t(`reportHeader.dashboard`)
      }}</span>
      <a-divider class="divider" type="vertical" />
      <span class="name">{{ reportName }}</span>
    </div>
    <div class="report-preview-header-right">
      <div v-if="!isMobile" class="layout-box">
        <p
          class="item"
          :class="{ active: screenType === 'pc' }"
          @click="screenType = 'pc'"
        >
          <rb-icon type="icon_rb-pc" />
        </p>
        <p
          class="item"
          :class="{ active: screenType === 'mobile' }"
          @click="screenType = 'mobile'"
        >
          <rb-icon type="icon_rb-mobile" />
        </p>
      </div>
      <a-space :size="24">
        <div class="action-btn" @click="onActionBtnClick('edit')">
          <rb-icon type="icon_rb-edit" />
          <span>{{ $t(`designHeader.edit`) }}</span>
        </div>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { isMobile } from '@/global/preUtils';

export default defineComponent({
  name: 'ReportPreviewHeader',
  components: {},
  setup(props, context) {
    const store = useStore();
    const router = useRouter();
    const reportName = computed(
      () => store.state.reportPreview.report.reportName,
    );
    const screenType = computed({
      get: () => store.state.reportPreview.report.screenType,
      set: (val) => (store.state.reportPreview.report.screenType = val),
    });
    const onToReport = () => {
      router.push({ path: '/reportHome' });
    };
    const onActionBtnClick = (type: string) => {
      if (type === 'edit') {
        router.push({
          path: '/reportDesign',
          query: {
            reportId: store.state.reportPreview.report.reportId,
            reportName: reportName.value,
          },
        });
      }
    };

    return {
      isMobile,
      reportName,
      screenType,
      onToReport,
      onActionBtnClick,
    };
  },
});
</script>

<style lang="less" scoped>
.report-preview-header {
  .flexRow();
  padding: 0 32px;
  height: 48px;
  background-color: @rb-primary-color;
  color: @rb-text-color-light;
  white-space: nowrap;
  z-index: 2;
  &-left {
    line-height: 48px;
    .flexRow();
    .header-logo {
      font-family: cursive;
      font-size: 22px;
      padding-right: 16px;
    }
    .header-title {
      padding-right: 8px;
      cursor: pointer;
    }
    .divider {
      border-color: @rb-text-color-light;
    }
    .name {
      padding-left: 8px;
    }
  }
  &-right {
    font-size: 12px;
    .flexRow();
    .layout-box {
      .flexRow();
      width: 80px;
      height: 32px;
      margin-right: 36px;
      border: 1px solid @rb-text-color-light;
      border-radius: 4px;
      .item {
        width: 40px;
        height: 100%;
        text-align: center;
        &.active {
          background-color: @rb-primary-5;
          border-radius: 4px;
          .rb-icon {
            opacity: 1;
          }
        }
        &:hover {
          background-color: @rb-menu-color;
        }
        .rb-icon {
          line-height: 32px;
          font-size: 16px;
          color: @rb-body-background;
          opacity: 0.5;
        }
      }
    }
    .action-btn {
      .flexColumn(flex-start, center);
      cursor: pointer;
      .rb-icon {
        font-size: 16px;
      }
    }
  }
  :deep .ant-space-item {
    padding: 2px 4px;
    &:hover {
      background-color: @rb-menu-color;
    }
  }
}
</style>
