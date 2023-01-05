<template>
  <div class="data-config">
    <div class="chart-related">
      <h3 class="title">图表关联</h3>
      <div>
        <a-checkbox
          v-model:checked="checkAll"
          :indeterminate="indeterminate"
          @change="onCheckAllChange"
        >
          全部
        </a-checkbox>
      </div>
      <a-checkbox-group
        class="related-group"
        v-model:value="checkedList"
        :options="plainOptions"
      />
    </div>
    <!-- <a-divider />
    <a-checkbox v-model:checked="hasMemory">记忆值</a-checkbox> -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive, toRefs, watch } from 'vue';

export default defineComponent({
  name: 'DataConfig',
  props: {
    comps: {
      type: Array,
      default: () => [],
    },
    curComp: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, context) {
    const hasMemory = computed({
      get: () => props.curComp.serviceData.hasMemory,
      set: (val) => context.emit('updateServiceData', 'hasMemory', val),
    });
    const checkedList = computed({
      get: () => props.curComp.serviceData.relatedCompId,
      set: (val) => context.emit('updateServiceData', 'relatedCompId', val),
    });
    const plainOptions = computed(() => {
      return props.comps
        .filter((it: any) => it.componentType === 'card')
        .map((it: any) => {
          return {
            label: it.foreignConfig.styles?.headline?.name,
            value: it.dataId,
          };
        });
    });
    const checkData = reactive({
      indeterminate: false,
      checkAll: false,
    });
    const onCheckAllChange = (e: any) => {
      checkData.indeterminate = false;
      checkedList.value = e.target.checked
        ? plainOptions.value.map((it) => it.value)
        : [];
    };
    watch(
      () => checkedList.value,
      (val) => {
        checkData.indeterminate =
          !!val.length && val.length < plainOptions.value.length;
        checkData.checkAll = val.length === plainOptions.value.length;
      },
    );
    return {
      hasMemory,
      checkedList,
      ...toRefs(checkData),
      plainOptions,
      onCheckAllChange,
    };
  },
});
</script>

<style lang="less" scoped>
.data-config {
  padding: 16px;
  text-align: left;
  background-color: @rb-background-color;
  .chart-related {
    .title {
      color: @rb-text-color;
      margin-bottom: 8px;
    }
    .related-group {
      .flexColumn(flex-start, flex-start);
      .ant-checkbox-group-item {
        margin-bottom: 8px;
      }
    }
  }
  .ant-divider-horizontal {
    margin: 12px 0;
  }
}
</style>
