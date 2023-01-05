<template>
  <div
    class="design-set"
    :style="{ width: `${width}px`, 'min-width': `${width}px` }"
  >
    <a-tabs v-model:activeKey="activeKey" centered :tabBarGutter="64">
      <a-tab-pane
        v-if="['listFilter', 'dateFilter'].includes(curComp?.componentType)"
        key="setting"
        :tab="$t(`propSetType.setting`)"
      >
        <data-config
          :comps="comps"
          :curComp="curComp"
          @updateServiceData="updateServiceData"
        ></data-config>
      </a-tab-pane>
      <a-tab-pane key="style" :tab="$t(`propSetType.style`)" force-render>
        <style-config :styles="styles">
          <component :is="customStyleComp" :tabs="curComp.tabs"></component>
        </style-config>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect, shallowRef } from 'vue';
import { useStore } from 'vuex';
import { getMateriel } from '@/core/materielList';
import DataConfig from '@/views/reportDesign/components/DataConfig.vue';
import StyleConfig from '@/views/reportDesign/components/StyleConfig.vue';

export default defineComponent({
  name: 'DesignSet',
  components: {
    DataConfig,
    StyleConfig,
  },
  props: {
    width: {
      type: Number,
      default: 288,
    },
  },
  setup() {
    const store = useStore();
    const activityCompId = computed(
      () => store.state.reportDesign.activityCompId,
    );
    const activeKey = ref('style');
    const comps = computed(() => store.state.reportDesign.report.comps);
    const canvas = computed(() => store.state.reportDesign.report.canvas);
    const screen = computed(() => store.getters['reportDesign/screen']);

    const styles = ref<any>({});
    const curComp = ref<any>({});
    const customStyleComp = shallowRef();
    watchEffect(async () => {
      if (activityCompId.value === 'report') {
        styles.value = {
          ...canvas.value,
          layout: screen.value,
        };
      } else {
        curComp.value = comps.value.find(
          (it: any) => it.dataId === activityCompId.value,
        );
        const materiel = getMateriel(curComp.value.componentType);
        if (materiel && materiel.customStyleComp) {
          const comp = await materiel.customStyleComp();
          customStyleComp.value = comp?.default;
        } else {
          customStyleComp.value = null;
        }
        if (curComp.value) {
          const curStyles = curComp.value.foreignConfig.styles ?? {};
          styles.value = curStyles;
        }
      }
      if (
        !['listFilter', 'dateFilter'].includes(curComp.value?.componentType)
      ) {
        activeKey.value = 'style';
      }
    });

    const updateServiceData = (key: string, value: any) => {
      curComp.value.serviceData[key] = value;
    };
    return {
      activeKey,
      activityCompId,
      curComp,
      customStyleComp,
      comps,
      styles,
      updateServiceData,
    };
  },
});
</script>

<style lang="less" scoped>
.design-set {
  flex: 0;
  height: 100%;
  border-left: 1px solid @rb-border-color-base;
  background-color: @rb-background-color;
  transition: all 0.3s;
  :deep .ant-tabs {
    height: 100%;
    .ant-tabs-nav {
      margin-bottom: 0;
      background-color: @rb-body-background;
    }
    .ant-tabs-content {
      height: 100%;
    }
  }
}
</style>
