import { ref } from 'vue';
import cloneDeep from 'lodash/cloneDeep';
import type { AntTreeNodeDropEvent, TreeProps } from 'ant-design-vue/es/tree';
import { responseHandle } from '@/global/preUtils';

type TreeDataItem = { [key: string]: any; key: string };

export const gData = ref<any>([]);

export const onDropFn = async (info: AntTreeNodeDropEvent, store: any) => {
  const dropKey = info.node.key;
  const dragKey = info.dragNode.key;
  const dropPos = (info.node.pos as any).split('-');
  const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

  const loop = (
    data: TreeProps['treeData'],
    key: string | number,
    callback: any,
  ) => {
    (data as any).forEach((item: any, index: number) => {
      if (item.key === key) {
        return callback(item, index, data);
      }
      if (item.children) {
        return loop(item.children, key, callback);
      }
    });
  };
  const data = cloneDeep(gData.value);

  let dragObj: TreeDataItem = { key: '' };
  if (!info.dropToGap && !info.node.isParent) return;
  if (
    !info.dropToGap ||
    ((info.node.children || []).length > 0 &&
      info.node.expanded &&
      dropPosition === 1)
  ) {
    if (!info.dragNode.parentKey) return;
    loop(
      data,
      dragKey,
      (item: TreeDataItem, index: number, arr: TreeProps['treeData']) => {
        (arr as any).splice(index, 1);
        dragObj = item;
      },
    );
    loop(data, dropKey, (item: TreeDataItem) => {
      item.children = item.children || [];
      item.children.unshift(dragObj);
    });
  } else {
    if (
      (info.dragNode.parentKey && info.node.isParent) ||
      (!info.dragNode.parentKey && info.node.parentKey)
    ) {
      return;
    }
    loop(
      data,
      dragKey,
      (item: TreeDataItem, index: number, arr: TreeProps['treeData']) => {
        (arr as any).splice(index, 1);
        dragObj = item;
      },
    );
    let ar: TreeProps['treeData'] = [];
    let i = 0;
    loop(
      data,
      dropKey,
      (item: TreeDataItem, index: number, arr: TreeProps['treeData']) => {
        ar = arr;
        i = index;
      },
    );
    if (dropPosition === -1) {
      ar.splice(i, 0, dragObj);
    } else {
      ar.splice(i + 1, 0, dragObj);
    }
  }
  let res = {};
  if (info.dragNode.parentKey) {
    // 报告排序
    const group = data.find((it: any) => {
      if (it.children.find((el: any) => el.key === info.dragNode.key)) {
        return true;
      }
    });
    const list: any = [];
    const children = group?.children;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        list.push({
          groupId: group?.key,
          reportId: children[i].key,
          pos: i,
        });
      }
    }
    res = await store.dispatch('reportHome/sortReport', {
      list: list,
    });
  } else {
    // 分组排序
    const list: any = [];
    for (let i = 0; i < data.length; i++) {
      list.push({
        groupId: data[i].key,
        pos: i,
      });
    }
    res = await store.dispatch('reportHome/sortGroup', {
      list,
    });
  }
  responseHandle(res, () => {
    gData.value = data;
  });
};
