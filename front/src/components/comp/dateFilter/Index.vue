<template>
  <div class="list-filter">
    <span class="title-box" :style="{ display: curTitleStyle?.display }">
      <span class="title" :style="curTitleStyle">
        {{ headline?.name }}
      </span>
    </span>
    <a-range-picker
      format="YYYY-MM-DD"
      valueFormat="YYYY-MM-DD"
      v-model:value="serviceData.value"
      @openChange="onOpenChange"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, watchEffect, ref, computed } from 'vue';
import { transformStyle } from '@/global/preUtils';
import eventBus from '@/core/eventBus';

export default defineComponent({
  name: 'Table',
  props: {
    itemData: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, context) {
    const headline: any = ref({});
    const curTitleStyle: any = ref({});
    const serviceData: any = ref({});
    const field = computed(
      () => props.itemData.serviceData?.axes?.dim?.value?.[0],
    );
    const onOpenChange = (status: boolean) => {
      if (!status) {
        // 通知被关联的卡片出图
        const relatedCompId = props.itemData.serviceData.relatedCompId;
        eventBus.emit('global-filter-change', {
          relatedCompId,
          ...field.value,
          value: serviceData.value.value,
          filterType: 'dateFilter',
        });
      }
    };

    watchEffect(() => {
      if (props.itemData.dataId) {
        headline.value = props.itemData.foreignConfig.styles?.headline ?? {};
        curTitleStyle.value = transformStyle(headline.value);
        serviceData.value = props.itemData.serviceData;
      }
    });

    return {
      serviceData,
      curTitleStyle,
      headline,
      onOpenChange,
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
  .ant-picker {
    flex: 1;
    margin-right: 24px;
  }
}
</style>
