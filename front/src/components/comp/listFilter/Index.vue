<template>
  <div class="list-filter">
    <span class="title-box" :style="{ display: curTitleStyle?.display }">
      <span class="title" :style="curTitleStyle">
        {{ headline?.name }}
      </span>
    </span>
    <a-select
      v-model:value="serviceData.value"
      :options="options"
      mode="multiple"
      :allowClear="true"
      :maxTagCount="5"
      :maxTagTextLength="8"
      :fieldNames="{
        label: 'memberName',
        value: 'memberId',
        options: 'options',
      }"
      placeholder="请选择"
      @change="onChange"
    ></a-select>
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref, computed } from 'vue';
import { transformStyle, responseHandle } from '@/global/preUtils';
import { useStore } from 'vuex';
import eventBus from '@/core/eventBus';

export default defineComponent({
  name: 'ListFilter',
  props: {
    itemData: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, context) {
    const store = useStore();
    const headline: any = computed(
      () => props.itemData.foreignConfig.styles?.headline ?? {},
    );
    const curTitleStyle: any = computed(() => transformStyle(headline.value));
    const serviceData: any = ref({});
    const options: any = ref([]);
    const field = computed(
      () => props.itemData.serviceData?.axes?.dim?.value?.[0],
    );
    const onChange = () => {
      // 通知被关联的卡片出图
      const relatedCompId = props.itemData.serviceData.relatedCompId;
      eventBus.emit('global-filter-change', {
        relatedCompId,
        ...field.value,
        value: serviceData.value.value,
        filterType: 'listFilter',
      });
    };

    watchEffect(async () => {
      if (props.itemData.dataId) {
        serviceData.value = props.itemData.serviceData;
        const tableName = serviceData.value?.dataset?.[1];
        const fieldId = serviceData.value?.axes?.dim?.value?.[0]?.fieldId;
        const periodType =
          serviceData.value?.axes?.dim?.value?.[0]?.extAttr?.periodType;
        if (tableName && fieldId) {
          const res = await store.dispatch('reportDesign/getFieldMember', {
            tableName,
            fieldId,
            periodType,
          });
          responseHandle(res, () => {
            options.value = res.data;
          });
        }
      }
    });

    return {
      curTitleStyle,
      headline,
      serviceData,
      options,
      onChange,
    };
  },
});
</script>

<style lang="less" scoped>
.list-filter {
  flex: 1;
  width: 100%;
  display: flex;
  align-items: center;
  .title-box {
    flex: 0;
    white-space: nowrap;
    padding-right: 8px;
  }
  .ant-select {
    flex: 1;
    margin-right: 24px;
  }
}
</style>
