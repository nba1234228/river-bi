<template>
  <div class="tab-top-filter">
    <div class="valueType-box">
      <a-radio-group
        name="typeGroup"
        v-model:value="curFiltrateCondition.valueType"
        :options="valueTypeOption"
      />
    </div>
    <div class="select-box">
      <div class="select-box-group">
        <a-select
          ref="select"
          v-model:value="curFiltrateCondition.topFilterId"
          :options="fieldOptions"
          :disabled="curFiltrateCondition.valueType === 'none'"
        ></a-select>
        <a-select
          ref="select"
          v-model:value="curFiltrateCondition.aggregationType"
          :options="aggregationOptions"
          :disabled="curFiltrateCondition.valueType === 'none'"
        ></a-select>
      </div>
      <div class="select-box-group">
        <a-select
          ref="select"
          v-model:value="curFiltrateCondition.extremaType"
          :options="extremaOptions"
          :disabled="curFiltrateCondition.valueType === 'none'"
        ></a-select>
        <a-input-number
          v-model:value="curFiltrateCondition.limit"
          :formatter="(value) => `${value}个`"
          :parser="(value) => value.replace('个', '')"
          :min="1"
          :max="100"
          :disabled="curFiltrateCondition.valueType === 'none'"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue';
import { Aggregation } from '@/components/cardDesign/constant';

export default defineComponent({
  name: 'TabTopFilter',
  components: {},
  props: {
    filtrateCondition: {
      type: Object,
      default: () => ({}),
    },
    fields: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    const curFiltrateCondition = computed({
      get: () => props.filtrateCondition,
      set: (val) => context.emit('update:filtrateCondition', val),
    });
    const valueTypeOption = [
      { label: '无', value: 'none' },
      { label: '依据', value: 'condition' },
    ];
    const fieldOptions = computed(() => {
      const fieldOption = props.fields
        .filter((it: any) => it.isMeasure)
        .map((it: any) => {
          return {
            label: it.fieldName,
            value: it.fieldId,
          };
        });
      if (fieldOption.length && !curFiltrateCondition.value.topFilterId) {
        // curFiltrateCondition.value.topFilterId = fieldOption[0].value;
        Object.assign(curFiltrateCondition.value, {
          topFilterId: fieldOption[0].value,
        });
      }
      return fieldOption;
    });
    const aggregationOptions = (Aggregation.children || []).map((it: any) => {
      return {
        label: it.label,
        value: it.key,
      };
    });
    const extremaOptions = [
      { label: '最大', value: 'desc' },
      { label: '最小', value: 'asc' },
    ];

    return {
      curFiltrateCondition,
      valueTypeOption,
      fieldOptions,
      aggregationOptions,
      extremaOptions,
    };
  },
});
</script>

<style lang="less" scoped>
.tab-top-filter {
  .valueType-box {
    margin-bottom: 20px;
  }
  :deep .select-box {
    overflow-y: auto;
    &-group {
      .flexRow(space-between, flex-start);
      margin-bottom: 16px;
      .ant-select,
      .ant-input-number {
        // width: 100%;
        flex: 0 1 48%;
      }
    }
  }
}
</style>
