import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import type { CascaderProps } from 'ant-design-vue';
import { responseHandle } from '@/global/preUtils';

export const datasetHandle = () => {
  const store = useStore();
  const datasetOptions = ref([]);
  const fieldData = ref<any>([]);

  const getDatasetCategory = async () => {
    const res = await store.dispatch('root/getDatasetCategory');
    responseHandle(res, () => {
      datasetOptions.value = res.data.list?.map((it: any) => {
        return {
          label: it.objectName,
          value: it.objectId,
          isLeaf: false,
        };
      });
    });
  };

  const getDataset: CascaderProps['loadData'] = async (selectedOptions) => {
    const targetOption = selectedOptions[selectedOptions.length - 1];
    // 数据集已加载，则不重复加载
    if (targetOption.children) return;
    targetOption.loading = true;
    const res = await store.dispatch('root/getDataset', {
      datasetCategory: targetOption.value,
    });
    targetOption.loading = false;
    responseHandle(res, () => {
      targetOption.children = res.data.list?.map((it: any) => {
        return {
          label: it.objectName,
          value: it.objectId,
        };
      });
      datasetOptions.value = [...datasetOptions.value];
    });
  };

  const onDatasetSelect = async (value: string[]) => {
    const tableName = value[1];
    if (tableName) {
      const res = await store.dispatch('root/getField', {
        tableName,
      });
      responseHandle(res, () => {
        fieldData.value = res.data.list ?? [];
      });
    } else {
      fieldData.value = [];
    }
  };

  return {
    datasetOptions,
    fieldData,
    getDatasetCategory,
    getDataset,
    onDatasetSelect,
  };
};
