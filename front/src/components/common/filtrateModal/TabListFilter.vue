<template>
  <div class="tab-list-filter">
    <div class="valueType-box">
      <a-radio-group
        name="typeGroup"
        v-model:value="curFiltrateCondition.valueType"
        :options="valueTypeOption"
        @change="onValueTypeChange"
      />
    </div>
    <div class="select-box">
      <a-checkbox-group
        name="selectGroup"
        class="select-box-group"
        v-model:value="curFiltrateCondition.selectKey"
        :options="fieldMemberOption"
        :disabled="curFiltrateCondition.valueType === 'all'"
      >
      </a-checkbox-group>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, watchEffect, ref } from 'vue';

export default defineComponent({
  name: 'TabListFilter',
  components: {},
  props: {
    filtrateCondition: {
      type: Object,
      default: () => ({}),
    },
    fieldMember: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    const curFiltrateCondition = computed({
      get: () => props.filtrateCondition,
      set: (val) => context.emit('update:filtrateCondition', val),
    });
    const fieldMemberOption = computed(() => {
      return props.fieldMember.map((it: any) => {
        return {
          label: it.memberName,
          value: it.memberId,
        };
      });
    });
    const valueTypeOption = [
      { label: '全部', value: 'all' },
      { label: '包含', value: 'included' },
      { label: '排除', value: 'excluded' },
    ];
    const onValueTypeChange = () => {
      if (curFiltrateCondition.value.valueType === 'all') {
        curFiltrateCondition.value.selectKey = fieldMemberOption.value.map(
          (it: any) => it.value,
        );
      }
    };
    watchEffect(() => {
      if (fieldMemberOption.value.length) {
        onValueTypeChange();
      }
    });

    return {
      curFiltrateCondition,
      valueTypeOption,
      fieldMemberOption,
      onValueTypeChange,
    };
  },
});
</script>

<style lang="less" scoped>
.tab-list-filter {
  .valueType-box {
    margin-bottom: 20px;
  }
  :deep .select-box {
    overflow-y: auto;
    &-group {
      .flexColumn(flex-start, flex-start);
      .ant-checkbox-group-item {
        margin-bottom: 10px;
      }
    }
  }
}
</style>
