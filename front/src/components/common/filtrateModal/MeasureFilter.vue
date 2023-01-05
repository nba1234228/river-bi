<template>
  <div class="measure-filter">
    <div>
      <a-select
        ref="select"
        v-model:value="curFiltrateCondition.valueType"
        :options="operatorOption"
      ></a-select>
      <a-input-number
        :formatter="(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')"
        :parser="(value) => value.replace(/\$\s?|(,*)/g, '')"
        v-model:value="curFiltrateCondition.operatorValue"
      />
    </div>
    <!-- <div>
      <rb-icon-button type="icon_rb-add"></rb-icon-button>
      <span>添加条件</span>
    </div> -->
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import { OperatorOption } from '@/components/cardDesign/constant';

export default defineComponent({
  name: 'MeasureFilter',
  components: {},
  props: {
    filtrateCondition: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, context) {
    const curFiltrateCondition = computed({
      get: () => props.filtrateCondition,
      set: (val) => context.emit('update:filtrateCondition', val),
    });
    const operatorOption = OperatorOption;

    return {
      operatorOption,
      curFiltrateCondition,
    };
  },
});
</script>

<style lang="less" scoped>
.measure-filter {
  padding: 50px 100px;
  .ant-select {
    width: 200px;
    margin-right: 16px;
  }
  .ant-input-number {
    width: 200px;
  }
}
</style>
