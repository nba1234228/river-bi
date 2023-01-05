import { watchEffect, ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useStore } from 'vuex';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
import { isMobile, transformStyle } from '@/global/preUtils';

export const storeData = (moduleName: string, className: string) => {
  const store = useStore();
  const responsive = computed(
    () => store.state[moduleName].report.screenType === 'mobile',
  );
  const isLoading = computed(() => store.state[moduleName].isLoading);
  const activityCompId = computed({
    get: () => store.state[moduleName].activityCompId,
    set: (val) => store.commit(`${moduleName}/SetActivityComp`, val),
  });
  const comps = computed(() => store.state[moduleName].report.comps);
  const curStyle = computed(() => {
    const background = store.state[moduleName].report.canvas.background;
    const backgroundStyle = transformStyle(background);
    return {
      ...backgroundStyle,
      padding: `${outYMargin.value}px ${outXMargin.value}px`,
    };
  });
  const getterName = moduleName + '/screen';
  const rowHeight = computed(() => store.getters[getterName].rowHeight);
  const xMargin = computed(() => store.getters[getterName].xMargin);
  const yMargin = computed(() => store.getters[getterName].yMargin);
  const outXMargin = computed(() => store.getters[getterName].outXMargin);
  const outYMargin = computed(() => store.getters[getterName].outYMargin);
  const colNum = computed(() => store.getters[getterName].colNum);
  const previewCardList: any = ref([]);
  const colWidth = ref(0);

  // 监听pc/手机模式
  watchEffect(() => {
    const screenType = store.state[moduleName].report.screenType;
    if (screenType === 'mobile' && !isMobile) {
      Object.assign(curStyle.value, {
        width: '540px',
      });
    } else {
      Object.assign(curStyle.value, {
        width: 'auto',
      });
    }
  });

  watchEffect(() => {
    previewCardList.value = comps.value.filter((it: any) => !it.parentId);
  });

  const getTabCardList = debounce(
    (item: any) => {
      return comps.value.filter((it: any) => it.parentId === item.dataId);
    },
    500,
    { leading: true, trailing: true },
  );

  let setColWidth = () => {
    const dom: any = document.querySelector(className);
    let width = dom.getBoundingClientRect().width;
    // 减去外边距
    width = width - outXMargin.value * 2;
    const colWid =
      (width - xMargin.value - colNum.value * xMargin.value) / colNum.value;
    colWidth.value = colWid;
  };

  onMounted(() => {
    setColWidth = throttle(setColWidth, 100);
    window.addEventListener('resize', setColWidth);
    setColWidth();
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', setColWidth);
  });

  return {
    responsive,
    isLoading,
    curStyle,
    rowHeight,
    xMargin,
    yMargin,
    outXMargin,
    colNum,
    colWidth,
    previewCardList,
    getTabCardList,
    activityCompId,
    comps,
  };
};
