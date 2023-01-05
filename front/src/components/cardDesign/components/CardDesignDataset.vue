<template>
  <div
    class="card-design-dataset"
    :style="{
      width: `${width}px`,
      'min-width': `${width}px`,
      padding: `${width ? 16 : 0}px`,
    }"
  >
    <h3 class="dataset-title">
      <span
        class="type-name dataset"
        :class="{ active: dataSourceType === 'dataset' }"
        @click="onDsTypeChange('dataset')"
      >
        数据集
      </span>
      <span
        class="type-name"
        :class="{ active: dataSourceType === 'staticJson' }"
        @click="onDsTypeChange('staticJson')"
      >
        静态json
      </span>
    </h3>
    <div class="dataset-box" v-if="dataSourceType === 'dataset'">
      <a-cascader
        class="dataset-select"
        v-model:value="dataset"
        :options="datasetOptions"
        :load-data="getDataset"
        @change="onDatasetSelect"
        size="small"
        placeholder="请选择"
      />
      <div class="dim">
        <h3 class="title">维度</h3>
        <div class="content">
          <div class="name" @click="dimFolded = !dimFolded">
            <rb-icon v-if="dimFolded" type="icon_rb-arrow-right" />
            <rb-icon v-else type="icon_rb-arrow-down" />
            <span class="text">数据集名称</span>
          </div>
          <ul :class="{ list: true, folded: dimFolded }">
            <li
              v-for="it in dimData"
              :key="it.fieldId"
              draggable="true"
              @dragstart="(ev) => onDragstart(ev, it, 'dim')"
              class="item"
            >
              <rb-icon type="icon_rb-text" />
              <span class="text">{{ it.fieldName }}</span>
            </li>
          </ul>
        </div>
      </div>
      <a-divider class="divider" />
      <div class="measure">
        <h3 class="title">度量</h3>
        <div class="content">
          <div class="name" @click="measureFolded = !measureFolded">
            <rb-icon v-if="measureFolded" type="icon_rb-arrow-right" />
            <rb-icon v-else type="icon_rb-arrow-down" />
            <span class="text">数据集名称</span>
          </div>
          <ul :class="{ list: true, folded: measureFolded }">
            <li
              v-for="it in measureData"
              :key="it.fieldId"
              draggable="true"
              @dragstart="(ev) => onDragstart(ev, it, 'measure')"
              class="item"
            >
              <rb-icon type="icon_rb-data" />
              <span class="text">{{ it.fieldName }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <template v-if="dataSourceType === 'staticJson'">
      <VueCodemirror v-model:staticJson="staticJson" />
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watchEffect } from 'vue';
import { useStore } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
import { datasetHandle } from '@/handle/datasetHandle';
import { Modal } from 'ant-design-vue';
import { getMateriel } from '@/core/materielList';
import VueCodemirror from '@/global/components/VueCodemirror.vue';

export default defineComponent({
  name: 'CardDesignDataset',
  components: {
    VueCodemirror,
  },
  props: {
    width: {
      type: Number,
      default: 192,
    },
    baseWidth: {
      type: Number,
      default: 192,
    },
    datasetJsonWidth: {
      type: Number,
      default: 500,
    },
  },
  setup(props, context) {
    const store = useStore();
    const chartType = computed(
      () => store.state.cardDesign.card.cardInfo.chartType,
    );
    const dataset = computed({
      get: () => {
        const datasetCategory =
          store.state.cardDesign.curDataset.datasetCategory;
        const datasetId = store.state.cardDesign.curDataset.datasetId;
        if (datasetCategory && datasetId) {
          return [datasetCategory, datasetId];
        } else {
          return [];
        }
      },
      set: (val) =>
        store.commit('cardDesign/SetCurDataset', {
          datasetCategory: val[0],
          datasetId: val[1],
        }),
    });
    const axesVal = computed(() => {
      const axes = store.state.cardDesign.card.axes;
      const axesValue = Object.keys(axes).reduce((total: any, key: string) => {
        total.push(...(axes[key].value ?? []));
        return total;
      }, []);
      return axesValue;
    });
    const {
      datasetOptions,
      fieldData,
      getDatasetCategory,
      getDataset,
      onDatasetSelect,
    } = datasetHandle();
    getDatasetCategory();

    const tempJson = ref({});
    const staticJson = computed({
      get: () => store.state.cardDesign.card.staticJson,
      set: (val) => {
        // 防止数据未刷新，图表刷新
        if (
          JSON.stringify(val) !==
          JSON.stringify(store.state.cardDesign.card.staticJson)
        ) {
          store.commit('cardDesign/SetStaticJson', val);
        }
      },
    });
    const dataSourceType = computed({
      get: () => store.state.cardDesign.card.cardInfo.dataSourceType,
      set: (val) =>
        store.commit('cardDesign/SetCardInfoItem', { dataSourceType: val }),
    });
    const setStaticJson = async () => {
      const materiel = getMateriel(chartType.value);
      const json = await materiel?.staticJson();
      staticJson.value = json?.StaticJson;
      tempJson.value = cloneDeep(json?.StaticJson);
    };
    const setWidth = (type: string) => {
      const width =
        type === 'dataset' ? props.baseWidth : props.datasetJsonWidth;
      context.emit('update:width', width);
      dataSourceType.value = type;
    };
    const onDsTypeChange = async (type: string) => {
      if (dataSourceType.value === type) return;
      if (type === 'dataset') {
        if (
          staticJson.value.seriesData &&
          JSON.stringify(tempJson.value) !== JSON.stringify(staticJson.value)
        ) {
          Modal.confirm({
            title: '确定切换?',
            content: '切换后数据会清空，请确认!',
            onOk() {
              staticJson.value = {};
              setWidth(type);
            },
          });
        } else {
          staticJson.value = {};
          setWidth(type);
        }
      } else if (type === 'staticJson') {
        if (axesVal.value.length) {
          Modal.confirm({
            title: '确定切换?',
            content: '切换后数据会清空，请确认!',
            onOk() {
              store.commit('cardDesign/ClearAxes');
              setStaticJson();
              setWidth(type);
            },
          });
        } else {
          setStaticJson();
          setWidth(type);
        }
      }
    };

    const dimData = computed(() =>
      fieldData.value.filter((it: any) => !it.isMeasure),
    );
    const measureData = computed(() =>
      fieldData.value.filter((it: any) => it.isMeasure),
    );

    watchEffect(() => {
      if (dataset.value[0] && dataset.value[1]) {
        onDatasetSelect(dataset.value);
      }
    });

    const onDragstart = (ev: any, it: any, datasetDropFieldType: string) => {
      const bizData = cloneDeep(it);
      window.datasetDropFieldType = datasetDropFieldType;
      ev.dataTransfer.setData('bizData', JSON.stringify(bizData));
    };

    return {
      dataSourceType,
      staticJson,
      onDsTypeChange,
      dataset,
      datasetOptions,
      dimData,
      measureData,
      dimFolded: ref(false),
      measureFolded: ref(false),
      getDataset,
      onDatasetSelect,
      onDragstart,
    };
  },
});
</script>

<style lang="less" scoped>
.card-design-dataset {
  .flexColumn(flex-start, flex-start);
  flex: 0;
  height: 100%;
  text-align: left;
  border-right: 1px solid @rb-border-color-base;
  background-color: @rb-body-background;
  overflow: hidden;
  transition: all 0.3s;
  .dataset-title {
    line-height: 24px;
    font-family: PingFangSC-Medium;
    white-space: nowrap;
    .type-name {
      display: inline-block;
      font-weight: 600;
      cursor: pointer;
      &.dataset {
        margin-right: 12px;
      }
      &.active {
        color: @rb-primary-color;
      }
    }
  }
  .dataset-box {
    .flexColumn(flex-start, flex-start);
    width: 100%;
    height: 100%;
    .dataset-select {
      width: 100%;
      margin: 16px 0;
      white-space: nowrap;
    }
    .ant-divider {
      margin: 16px 0;
    }
    .dim,
    .measure {
      flex: 1;
      width: 100%;
      height: 224px;
      .title {
        line-height: 22px;
        font-weight: 600;
        color: @rb-text-color-secondary;
        white-space: nowrap;
      }
      .content {
        height: calc(100% - 22px);
        overflow-y: auto;
        .name {
          font-size: 12px;
          line-height: 20px;
          white-space: nowrap;
          cursor: pointer;
          .rb-icon {
            color: @rb-text-color-secondary;
          }
          .text {
            padding-left: 4px;
            white-space: nowrap;
          }
        }
        .list {
          height: calc(100% - 22px);
          overflow-y: auto;
          // height: auto;
          font-size: 12px;
          transition: all 0.2s;
          &.folded {
            height: 0;
          }
          .item {
            padding: 0 8px;
            line-height: 26px;
            white-space: nowrap;
            cursor: copy;
            &:hover {
              background-color: @rb-table-header-bg;
            }
            .rb-icon {
              margin-right: 4px;
              color: @rb-link-color;
              cursor: copy;
            }
          }
        }
      }
    }
    .measure {
      .rb-icon {
        color: @rb-success-color;
      }
    }
  }
}
</style>
