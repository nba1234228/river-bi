<template>
  <div class="tab-custom-style">
    <a-collapse activeKey="1">
      <a-collapse-panel key="1" header="tab页签">
        <div class="item" v-for="(tab, index) in tabs" :key="tab.key">
          <span class="label">页签名称{{ index + 1 }}</span>
          <a-input
            class="input-control"
            v-model:value="tab.label"
            size="small"
          ></a-input>
        </div>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import InputControl from '@/components/control/Input.vue';

export default defineComponent({
  name: 'TabCustomStyle',
  components: {
    InputControl,
  },
  props: {
    tabs: {
      type: Array as any,
      default: () => [],
    },
  },
  setup(props, context) {
    return {};
  },
});
</script>

<style lang="less" scoped>
.tab-custom-style {
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
  .item {
    .flexRow();
    height: 30px;
    line-height: 30px;
    margin-bottom: 10px;
    &:last-child {
      margin-bottom: 0;
    }
    .label {
      flex: 0;
      margin-right: 10px;
      min-width: 70px;
      font-size: 12px;
      line-height: 16px;
      word-break: break-all;
    }
    .input-control {
      width: 100%;
      font-size: 12px;
      line-height: 22px;
      border-radius: 4px;
    }
  }
}
</style>
