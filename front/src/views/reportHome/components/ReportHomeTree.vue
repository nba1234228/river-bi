<template>
  <div class="report-home-tree" :style="{ width: `${width}px` }">
    <a-input-search
      v-model:value="searchValue"
      @search="onSearch"
      class="report-home-search"
      placeholder="请输入"
    />
    <a-tree
      class="draggable-tree"
      draggable
      block-node
      :tree-data="gData"
      :load-data="onLoadData"
      :autoExpandParent="true"
      v-model:expandedKeys="expandedKeys"
      v-model:selectedKeys="selectedKeys"
      @drop="onDrop"
      @select="onReportSelect"
    >
      <template #title="{ dataRef }">
        <div class="tree-item">
          <div class="item-left">
            <rb-icon v-if="dataRef.isParent" type="icon_rb-folder" />
            <rb-icon v-else type="icon_rb-report" />
            <span class="item-title">{{ dataRef.title }}</span>
          </div>
          <a-dropdown
            overlayClassName="tree-dropdown"
            :getPopupContainer="getPopupContainer"
            placement="bottomRight"
            :trigger="['click']"
          >
            <a class="ant-dropdown-link" @click="onDropdownClick">
              <rb-icon class="item-more" type="icon_rb-more" />
            </a>
            <template #overlay>
              <a-menu @click="(menuInfo) => onActionSelect(menuInfo, dataRef)">
                <template v-if="dataRef.isParent">
                  <a-menu-item
                    v-for="it in treeFolderActions"
                    :item="dataRef"
                    :key="it.key"
                  >
                    {{ it.label }}
                  </a-menu-item>
                </template>
                <template v-else>
                  <a-menu-item
                    v-for="it in treeFileActions"
                    :item="dataRef"
                    :key="it.key"
                  >
                    {{ it.label }}
                  </a-menu-item>
                </template>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </template>
    </a-tree>
  </div>
  <tree-modal
    v-model:visible="visible"
    :title="modalTitle"
    ref="treeModal"
    @onOk="onOk"
  ></tree-modal>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  getCurrentInstance,
  onBeforeMount,
} from 'vue';
import { useStore } from 'vuex';
import { message, Modal } from 'ant-design-vue';
import { getPopupContainer, getUUID, responseHandle } from '@/global/preUtils';
import {
  TreeFolderActions,
  TreeFileActions,
} from '@/views/reportHome/constant';
import { onDropFn, gData } from '@/views/reportHome/handle';
import TreeModal from '@/views/reportHome/components/TreeModal.vue';

export default defineComponent({
  name: 'ReportHomeTree',
  components: {
    TreeModal,
  },
  props: {
    width: {
      type: Number,
      default: 200,
    },
  },
  setup() {
    const { proxy } = getCurrentInstance() as any;
    const store = useStore();
    const onReportSelect = (keys: string[], ev: any) => {
      if (keys[0]) {
        store.commit('reportHome/SetCurReportId', keys[0]);
        store.commit('reportHome/SetCurReportName', ev.node.title);
        store.dispatch('reportHome/getReportData', keys[0]);
      }
    };

    const expandedKeys = ref<(string | number)[]>([]);
    const selectedKeys = ref<(string | number)[]>([]);
    const searchValue = ref<string>('');
    const visible = ref(false);
    const modalTitle = ref('');
    const curKey = ref('');
    const curItem: any = ref({});

    const onSearch = (searchValue: string) => {};

    const onActionSelect = async (menuInfo: any, item: any) => {
      curKey.value = menuInfo.key;
      curItem.value = item;
      switch (menuInfo.key) {
        case 'createGroup':
          visible.value = true;
          modalTitle.value = '分组';
          proxy.$refs.treeModal.initName('');
          break;
        case 'createReport':
          visible.value = true;
          modalTitle.value = '报告';
          proxy.$refs.treeModal.initName('');
          break;
        case 'design':
          window.open(`/#/reportDesign?reportId=${curItem.value.key}`); // 数据需要重新请求
          break;
        case 'rename':
          visible.value = true;
          if (curItem.value.parentKey) {
            modalTitle.value = '分组';
          } else {
            modalTitle.value = '报告';
          }
          proxy.$refs.treeModal.initName(item.title);
          break;
        case 'remove':
          if (curItem.value.key === 'default') {
            return message.warning('默认分组不可删除');
          }
          if (curItem.value.children?.length) {
            return message.warning('该分组下有报告，不可删除');
          }
          Modal.confirm({
            title: '确定删除?',
            content: `确定删除${
              curItem.value.parentKey ? '该报告' : '该分组'
            }，请确认!`,
            async onOk() {
              if (curItem.value.parentKey) {
                // 删除报告
                const res = await store.dispatch(
                  'reportHome/removeReport',
                  curItem.value.key,
                );
                responseHandle(res, () => {
                  const parent: any = gData.value.find(
                    (it: any) => it.key === curItem.value.parentKey,
                  );
                  if (parent) {
                    parent.children = parent.children.filter(
                      (it: any) => it.key !== curItem.value.key,
                    );
                  }
                });
              } else {
                // 删除分组
                const res = await store.dispatch(
                  'reportHome/removeGroup',
                  curItem.value.key,
                );
                responseHandle(res, () => {
                  gData.value = gData.value.filter(
                    (it: any) => it.key !== curItem.value.key,
                  );
                });
              }
            },
          });
          break;
        default:
          break;
      }
    };

    const onOk = async (title: string) => {
      const key = getUUID();
      let res = {};
      switch (curKey.value) {
        case 'createGroup':
          res = await store.dispatch('reportHome/createGroup', {
            groupId: key,
            groupName: title,
          });
          responseHandle(res, () => {
            gData.value.push({
              title,
              key,
              selectable: false,
              isParent: true,
            });
          });
          break;
        case 'createReport':
          res = await store.dispatch('reportHome/createReport', {
            groupId: curItem.value.key,
            reportId: key,
            reportName: title,
          });
          responseHandle(res, () => {
            !curItem.value.children && (curItem.value.children = []);
            curItem.value.children.push({
              title,
              key,
              reportId: key,
              parentKey: curItem.value.key,
              isLeaf: true,
            });
          });
          break;
        case 'rename':
          if (curItem.value.parentKey) {
            res = await store.dispatch('reportHome/renameReport', {
              reportId: curItem.value.key,
              reportName: title,
            });
          } else {
            res = await store.dispatch('reportHome/renameGroup', {
              groupId: curItem.value.key,
              groupName: title,
            });
          }
          responseHandle(res, () => (curItem.value.title = title));
          break;
        default:
          break;
      }
    };

    const onLoadData = async (treeNode: any) => {
      if (treeNode.dataRef.children) {
        return;
      }
      const res = await store.dispatch('reportHome/getReportList', {
        groupId: treeNode.key,
      });
      responseHandle(res, () => {
        treeNode.dataRef.children = res.data.map((it: any) => {
          return {
            title: it.reportName,
            key: it.reportId,
            parentKey: treeNode.key,
            isLeaf: true,
          };
        });
        gData.value = [...gData.value];
      });
    };

    const onDrop = (info: any) => {
      onDropFn(info, store);
    };

    const onDropdownClick = (ev: Event) => {
      ev.stopPropagation();
    };

    onBeforeMount(async () => {
      const res = await store.dispatch('reportHome/getGroupList', {});
      responseHandle(res, async () => {
        gData.value = res.data.map((it: any) => {
          return {
            title: it.groupName,
            key: it.groupId,
            isParent: true, // 控制为文件夹
            selectable: false, // 控制文件夹不能被选中
            // children: [], // 不能加children属性，否则展开不会加载
          };
        });
        let title = '';
        let selectedKey = '';
        // 如果第一分组有数据，则请求第一分组报告
        if (res.data[0].groupId) {
          const res1 = await store.dispatch('reportHome/getReportList', {
            groupId: res.data[0].groupId,
          });
          gData.value[0].children = res1.data.map((it: any) => {
            return {
              title: it.reportName,
              key: it.reportId,
              parentKey: res.data[0].groupId,
              isLeaf: true,
            };
          });
          if (res1.data[0]) {
            selectedKey = res1.data[0].reportId;
            title = res1.data[0].reportName;
          }
        }
        const firstEl = gData.value[0];
        expandedKeys.value = [firstEl?.key ?? ''];
        selectedKeys.value = [selectedKey];
        onReportSelect([selectedKey], { node: { title } });
      });
    });

    return {
      expandedKeys,
      selectedKeys,
      searchValue,
      gData,
      onDrop,
      treeFolderActions: reactive(TreeFolderActions),
      treeFileActions: reactive(TreeFileActions),
      getPopupContainer,
      onSearch,
      onReportSelect,
      onDropdownClick,
      onActionSelect,
      visible,
      modalTitle,
      onOk,
      onLoadData,
    };
  },
});
</script>

<style lang="less" scoped>
.report-home-tree {
  width: 200px;
  height: 100%;
  padding: 10px 0;
  border-right: 1px solid @rb-border-color-base;
  background-color: @rb-body-background;
  overflow-y: auto;
  transition: width 0.5s;
  .report-home-search {
    margin-bottom: 8px;
    padding: 0 8px;
  }
  :deep .draggable-tree {
    text-align: left;
    .tree-item {
      .flexRow();
      &:hover {
        .item-more {
          visibility: visible;
        }
      }
      .item-left {
        .flexRow();
        white-space: nowrap;
        .item-title {
          padding-left: 4px;
          display: inline-block;
          max-width: 115px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
      .item-more {
        visibility: hidden;
        // color: @rb-primary-color;
      }
    }
    .tree-dropdown {
      width: 100px;
    }
  }
}
</style>
