import { ref, computed, watchEffect, inject } from 'vue';
import { useStore } from 'vuex';
import { transformStyle, setCompopnentStyle } from '@/global/preUtils';
import { useI18n } from 'vue-i18n';
export const styleHandle = (comps: any, props: any) => {
  const comp = computed(() =>
    comps.find((it: any) => it.dataId === props.itemData.dataId),
  );
  const curStyle: any = ref({});
  watchEffect(() => {
    if (comp.value) {
      const basic = comp.value.foreignConfig.styles?.basic || {};
      curStyle.value = transformStyle(basic);
      setCompopnentStyle(curStyle);
    }
  });

  return {
    curStyle,
  };
};

export const actionHandle = (comps: any, props: any, context: any) => {
  const { t } = useI18n();
  const store = useStore();
  const comp = computed(() =>
    comps.find((it: any) => it.dataId === props.itemData.dataId),
  );
  // let tabs = props.itemData.tabs; // 如果直接使用itemData，tabs改变不会响应
  const activeKey = ref(comp.value.tabs?.[0]?.key || '0');
  const updateActivityCompId: any = inject('updateActivityCompId');
  const getActivityCompId: any = inject('getActivityCompId');
  const activityCompId = computed(() => getActivityCompId());
  // const activityCompId = computed({
  //   get: () => store.state.reportDesign.activityCompId,
  //   set: (val) => (store.state.reportDesign.activityCompId = val),
  // });
  const isActive = computed(
    () => activityCompId.value === props.itemData.dataId,
  );
  const onTabClick = (ev: Event) => {
    ev.stopPropagation();
    if (props.useMode !== 'design') return;
    updateActivityCompId(props.itemData.dataId);
  };
  const add = () => {
    const maxKey: any = comp.value.tabs?.length
      ? Math.max(...comp.value.tabs.map((it: any) => it.key))
      : '1';
    const newKey = `${parseInt(maxKey) + 1}`;
    const tabName = t('stylePanel.newTabName');
    comp.value.tabs.push({ key: newKey, label: tabName });
    // props.itemData.tabs = comp.value.tabs; // 移动端下，2份数据不同步
  };
  const remove = (targetKey: string) => {
    comp.value.tabs = comp.value.tabs.filter(
      (pane: any) => pane.key !== targetKey,
    );
    if (activeKey.value === targetKey) {
      activeKey.value = comp.value.tabs[0].key;
    }
    const list = comps.filter(
      (it: any) =>
        it.parentId !== props.itemData.dataId || it.tabKey !== targetKey,
    );
    context.emit('setComps', list);
  };
  const onEdit = (targetKey: string | MouseEvent, action: string) => {
    if (action === 'add') {
      add();
    } else {
      remove(targetKey as string);
    }
  };
  const dragDomData = computed(() => store.state.root.dragDomData);

  return {
    activeKey,
    isActive,
    onEdit,
    onTabClick,
    dragDomData,
  };
};
