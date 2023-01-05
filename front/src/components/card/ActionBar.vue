<template>
  <div class="action-bar">
    <a-dropdown
      overlayClassName="design-action-bar-dropdown"
      :trigger="['click']"
      placement="bottomRight"
    >
      <rb-icon-button type="icon_rb-more" @click="onDropdownClick" />
      <template #overlay>
        <a-menu @click="onSelect">
          <template v-for="it in barMenu" :key="it.key">
            <a-menu-item v-if="!it.children" :key="it.key">
              <rb-icon :type="it.icon" />
              <span>{{ it.label }}</span>
            </a-menu-item>
            <a-sub-menu v-else :title="it.label">
              <template #icon>
                <rb-icon :type="it.icon" />
              </template>
              <a-menu-item v-for="item in it.children" :key="item.key">
                <rb-icon :type="item.icon" />
                <span>{{ item.label }}</span>
              </a-menu-item>
            </a-sub-menu>
          </template>
        </a-menu>
      </template>
    </a-dropdown>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import { message, Modal } from 'ant-design-vue';
import eventBus from '@/core/eventBus';
import { BarMenu } from '@/components/card/constant';

export default defineComponent({
  name: 'ActionBar',
  components: {},
  props: {
    itemData: {
      type: Object,
      default: () => ({}),
    },
    useMode: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const store = useStore();
    const barMenu = computed(() => {
      if (props.useMode === 'running') {
        return BarMenu.filter((it) => ['export', 'full'].includes(it.key));
      }
      return BarMenu;
    });
    const onSelect = (menuInfo: any) => {
      switch (menuInfo.key) {
        case 'remove':
          Modal.confirm({
            title: '确定删除?',
            content: '确定删除该组件，请确认!',
            onOk() {
              store.commit('reportDesign/RemoveComp', props.itemData?.dataId);
            },
          });
          break;
        case 'edit':
          if (props.itemData.cardId) {
            store.commit('reportDesign/ShowCardVisible', props.itemData.cardId);
          } else {
            eventBus.emit('global-filter-modal-show', {
              filterType: props.itemData.componentType,
              itemData: props.itemData,
            });
          }
          break;
        case 'exportImage':
        case 'exportPDF':
          message.info('暂不支持导出！');
          break;
        case 'full':
          message.info('开发中...');
          break;
        default:
          break;
      }
    };
    const onDropdownClick = (ev: Event) => {
      ev.stopPropagation();
    };

    return {
      barMenu,
      onSelect,
      onDropdownClick,
    };
  },
});
</script>

<style lang="less">
.design-action-bar-dropdown {
  width: 160px;
  .ant-dropdown-menu-submenu {
    width: 160px;
  }
  .rb-icon {
    font-size: 14px;
    margin-right: 12px;
  }
}
</style>
<style lang="less" scoped>
.action-bar {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 99;
}
</style>
