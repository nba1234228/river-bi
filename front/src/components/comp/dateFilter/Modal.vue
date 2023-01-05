<template>
  <GlobalFilterModal
    v-if="visible"
    v-model:visible="visible"
    title="日期筛选"
    :chartType="chartType"
    :axesList="axesList"
    :axes="axes"
    v-model:dataset="dataset"
    @onSave="onSave"
    @removeAxisItem="removeAxisItem"
    @addAxisItem="addAxisItem"
  />
</template>
<script lang="ts">
import { defineComponent, ref, reactive, computed } from 'vue';
import { useStore } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
import {
  getUUID,
  getControlValueMap,
  GetBizCategory,
  GetAxes,
} from '@/global/preUtils';
import { getMateriel } from '@/core/materielList';
import { CompModel } from '@/model/designer/reportProps';
import { basicControls, headlineControls } from '@/model/designer/fieldControl';
import GlobalFilterModal from '@/components/common/GlobalFilterModal.vue';
export default defineComponent({
  name: 'DateFilterModal',
  components: {
    GlobalFilterModal,
  },
  setup() {
    const store = useStore();
    const chartType = 'dateFilter';
    const visible = ref<boolean>(false);
    const axesList: any = computed(() => GetBizCategory(chartType));
    const axesObj = GetAxes(chartType);
    const axes: any = reactive(axesObj);
    const dataset = ref([]);

    const showModal = (itemData: any) => {
      if (itemData) {
        dataset.value = itemData.serviceData.dataset;
        Object.assign(axes, { ...itemData.serviceData.axes });
      } else {
        axes.dim.value = [];
        // axes.filtrate.value = [];
      }
      visible.value = true;
    };
    const onSave = () => {
      const comp = cloneDeep(CompModel);
      const id = getUUID();
      const materiel = getMateriel(chartType);
      const basic = getControlValueMap(basicControls);
      Object.assign(basic, { borderWidth: 0 });
      Object.assign(comp, {
        dataId: id,
        i: id,
        ...materiel.layout,
        componentType: 'dateFilter',
        serviceData: {
          dataset: dataset.value,
          axes,
          value: [],
          relatedCompId: [],
        },
        foreignConfig: {
          styles: {
            basic,
            headline: getControlValueMap(headlineControls),
          },
        },
      });
      store.commit('reportDesign/AddComp', comp);
    };
    const removeAxisItem = (axisLocation: string, itemFieldId: string) => {
      axes[axisLocation].value = axes[axisLocation].value.filter(
        (it: any) => it.fieldId !== itemFieldId,
      );
    };
    const addAxisItem = (axisLocation: string, bizData: any) => {
      axes[axisLocation].value.push(bizData);
    };

    return {
      visible,
      chartType,
      axesList,
      axes,
      dataset,
      showModal,
      onSave,
      removeAxisItem,
      addAxisItem,
    };
  },
});
</script>

<style lang="less" scoped></style>
