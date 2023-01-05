<template>
  <div class="report-value-set">
    <a-collapse v-model:activeKey="activeKey">
      <a-collapse-panel v-for="key in categoryStylesKey" :key="key">
        <template #header>
          <div class="item-header">
            <span>{{ $t(`stylePanel.${key}`) }}</span>
            <SwitchControl
              v-if="category[key].hasVisible"
              size="small"
              v-bind="getControl(category[key].controlKey)?.propData || {}"
              :value="stylesRefer[key][category[key].controlKey]"
              :controls="stylesRefer[key]"
              :controlKey="category[key].controlKey"
              @updateValue="updateValue"
            />
          </div>
        </template>
        <template
          v-for="fieldKey in getFieldStylesKey(styles[key])"
          :key="fieldKey"
        >
          <div v-if="filterControl(fieldKey)" class="control-item">
            <label class="control-item-label">
              {{ $t(`stylePanel.${fieldKey}`) }}
            </label>
            <component
              :is="getControl(fieldKey).controlType"
              v-bind="getControl(fieldKey).propData || {}"
              :value="styles[key][fieldKey]"
              :controls="styles[key]"
              :controlKey="fieldKey"
              @updateValue="updateValue"
            ></component>
          </div>
        </template>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue';
import { Modal } from 'ant-design-vue';
import fieldCategory from '@/model/designer/fieldCategory';
import allControls from '@/model/designer/fieldControl';
import InputControl from '@/components/control/Input.vue';
import InputNumberControl from '@/components/control/InputNumber.vue';
import SelectControl from '@/components/control/Select.vue';
import SwitchControl from '@/components/control/Switch.vue';
import ColorPickerControl from '@/components/control/ColorPicker.vue';

export default defineComponent({
  name: 'ReportValueSet',
  components: {
    InputControl,
    InputNumberControl,
    SelectControl,
    SwitchControl,
    ColorPickerControl,
  },
  props: {
    styles: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const activeKey = ref(['basic']);
    const stylesRefer = ref(props.styles);
    const categoryStylesKey = ref<any>([]);
    const category: any = ref(fieldCategory);
    watchEffect(() => {
      activeKey.value = Object.keys(props.styles) ?? ['basic'];
      stylesRefer.value = props.styles;
      categoryStylesKey.value = Object.keys(props.styles).sort(
        (a: any, b: any) => category.value[a]?.pos - category.value[b]?.pos,
      );
    });
    const getControl = (key: any) => {
      return allControls[key];
    };
    const getFieldStylesKey = (group: any) => {
      return Object.keys(group).sort(
        (a: any, b: any) => getControl(a)?.pos - getControl(b)?.pos,
      );
    };
    const filterControl = (field: any) => {
      return !getControl(field).inHead && field !== 'colNum';
    };
    const updateValue = (val: any, key: string, controls: any) => {
      if (key === 'colNum') {
        Modal.confirm({
          title: '确定更改?',
          content: '布局调整，需要手动调整卡片位置，请确认!',
          onOk() {
            controls[key] = val;
          },
        });
      } else {
        controls[key] = val;
      }
    };

    return {
      activeKey,
      categoryStylesKey,
      stylesRefer,
      category,
      filterControl,
      getControl,
      getFieldStylesKey,
      updateValue,
    };
  },
});
</script>

<style lang="less" scoped>
.report-value-set {
  text-align: left;
  :deep .ant-collapse {
    border: none;
    .ant-collapse-header {
      padding: 8px 16px;
      background-color: @rb-background-color;
      .item-header {
        .flexRow();
        flex: 1;
      }
    }
  }
  .control-item {
    .flexRow();
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
    &-label {
      flex: 0;
      margin-right: 10px;
      min-width: 70px;
      font-size: 12px;
      line-height: 16px;
      word-break: break-all;
    }
  }
}
</style>
