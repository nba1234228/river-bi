<template>
  <div class="design-header">
    <div class="design-header-left">
      <span class="header-logo">{{ $t(`reportHeader.riverBI`) }}</span>
      <span class="header-title" @click="onToReport">{{
        $t(`reportHeader.dashboard`)
      }}</span>
      <a-divider class="divider" type="vertical" />
      <span class="name">{{ reportName }}</span>
    </div>
    <div v-if="!isMobile" class="design-header-center">
      <a-space :size="32">
        <a-dropdown :trigger="['click']">
          <div class="center-group">
            <div class="item-top">
              <rb-icon type="icon_rb-chart" />
            </div>
            <div class="item-bottom">
              <span class="name">{{ $t(`designHeader.chartCard`) }}</span>
              <rb-icon type="icon_rb-arrow-down" />
            </div>
          </div>
          <template #overlay>
            <a-menu @click="onDropdownSelect">
              <a-menu-item key="createChartCard">
                <rb-icon type="icon_rb-card" />
                {{ $t(`designHeader.createChartCard`) }}
              </a-menu-item>
              <a-menu-item key="addChartCard">
                <rb-icon type="icon_rb-cards" />
                {{ $t(`designHeader.addChartCard`) }}
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <a-dropdown :trigger="['click']">
          <div class="center-group">
            <div class="item-top">
              <rb-icon type="icon_rb-filter" />
            </div>
            <div class="item-bottom">
              <span class="name">{{ $t(`designHeader.filtrate`) }}</span>
              <rb-icon type="icon_rb-arrow-down" />
            </div>
          </div>
          <template #overlay>
            <a-menu @click="onDropdownSelect">
              <a-menu-item key="listFilter">
                <rb-icon type="icon_rb-list-filter" />
                {{ $t(`designHeader.listFilter`) }}
              </a-menu-item>
              <a-menu-item key="dateFilter">
                <rb-icon type="icon_rb-date-filter" />
                {{ $t(`designHeader.dateFilter`) }}
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
        <div class="center-group" @click="onGroupClick('tabComponent')">
          <div class="item-top">
            <rb-icon type="icon_rb-tab" />
          </div>
          <span class="name">{{ $t(`designHeader.tabComponent`) }}</span>
        </div>
        <div class="center-group" @click="onGroupClick('headerH1')">
          <div class="item-top">
            <rb-icon type="icon_rb-headline" />
          </div>
          <span class="name">{{ $t(`designHeader.headerH1`) }}</span>
        </div>
      </a-space>
    </div>
    <div class="design-header-right">
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
        <div class="action-btn" @click="onActionBtnClick('preview')">
          <rb-icon type="icon_rb-preview" />
          <span>{{ $t(`designHeader.preview`) }}</span>
        </div>
        <div class="action-btn" @click="onActionBtnClick('save')">
          <rb-icon type="icon_rb-save" />
          {{ $t(`designHeader.save`) }}
        </div>
      </a-space>
    </div>
    <AddCardModal v-model:addCardModalVisible="addCardModalVisible" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import cloneDeep from 'lodash/cloneDeep';
import { MenuProps, message } from 'ant-design-vue';
import {
  getUUID,
  getControlValueMap,
  responseHandle,
  isMobile,
} from '@/global/preUtils';
import { getMateriel } from '@/core/materielList';
import { CompModel } from '@/model/designer/reportProps';
import eventBus from '@/core/eventBus';
import { basicControls, headlineControls } from '@/model/designer/fieldControl';
import AddCardModal from '@/views/reportDesign/components/AddCardModal.vue';

export default defineComponent({
  name: 'DesignHeader',
  components: {
    AddCardModal,
  },
  setup(props, context) {
    const store = useStore();
    const router = useRouter();
    const reportName = computed(
      () => store.state.reportDesign.report.reportName,
    );
    const screenType = computed({
      get: () => store.state.reportDesign.report.screenType,
      set: (val) => (store.state.reportDesign.report.screenType = val),
    });
    const addCardModalVisible = ref(false);
    const onDropdownSelect: MenuProps['onClick'] = (menuInfo) => {
      switch (menuInfo.key) {
        case 'createChartCard':
          store.commit('reportDesign/ShowCardVisible', ''); // 要传空值
          break;
        case 'addChartCard':
          addCardModalVisible.value = true;
          break;
        case 'listFilter':
          eventBus.emit('global-filter-modal-show', {
            filterType: 'listFilter',
            itemData: null,
          });
          break;
        case 'dateFilter':
          eventBus.emit('global-filter-modal-show', {
            filterType: 'dateFilter',
            itemData: null,
          });
          break;
        default:
          break;
      }
    };
    const onGroupClick = (type: string) => {
      let comp;
      let foreignConfig;
      const id = getUUID();
      switch (type) {
        case 'tabComponent':
          comp = cloneDeep(CompModel);
          foreignConfig = {
            styles: {
              basic: getControlValueMap(basicControls),
            },
          };
          Object.assign(comp, {
            tabs: [{ key: '1', label: '新页签' }],
            componentType: 'tab',
            minH: 12,
          });
          break;
        case 'headerH1':
          comp = cloneDeep(CompModel);
          const materiel = getMateriel('headerH1');
          foreignConfig = {
            styles: {
              basic: getControlValueMap(basicControls),
              headline: getControlValueMap(headlineControls),
            },
          };
          Object.assign(comp, {
            ...materiel.layout,
            componentType: 'headerH1',
          });
          break;
        default:
          break;
      }
      Object.assign(comp, {
        foreignConfig,
        dataId: id,
        i: id,
      });
      store.commit('reportDesign/AddComp', comp);
    };
    const onToReport = () => {
      router.push({ path: '/reportHome' });
    };
    const onActionBtnClick = async (type: string) => {
      let res = {};
      switch (type) {
        case 'preview':
          res = await store.dispatch('reportDesign/saveReport');
          responseHandle(res, () => {
            router.push({
              path: '/reportPreview',
              query: {
                reportId: store.state.reportDesign.report.reportId,
                reportName: store.state.reportDesign.report.reportName,
              },
            });
          });
          break;
        case 'save':
          res = await store.dispatch('reportDesign/saveReport');
          responseHandle(res, () => {
            message.success('保存成功');
          });
          break;
        default:
          break;
      }
    };

    return {
      isMobile,
      reportName,
      screenType,
      addCardModalVisible,
      onDropdownSelect,
      onGroupClick,
      onToReport,
      onActionBtnClick,
    };
  },
});
</script>

<style lang="less" scoped>
.design-header {
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
  &-center {
    font-size: 12px;
    .center-group {
      .flexColumn(flex-start, center);
      cursor: pointer;
      .item-top {
        .rb-icon {
          font-size: 16px;
          margin-bottom: 4px;
        }
      }
      .item-bottom {
        line-height: 12px;
        .flexRow();
        .name {
          line-height: 12px;
          padding-right: 4px;
        }
      }
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
