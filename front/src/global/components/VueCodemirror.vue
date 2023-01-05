<template>
  <div class="vue-codemirror">
    <codemirror
      v-model="code"
      class="codemirror-wrap"
      :class="{ error: lintFalse }"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @blur="onBlur"
      placeholder="请输入配置数据..."
    />
    <rb-icon class="btn" @click="onFormat" type="icon_rb-code" title="格式化" />
    <span class="tip">{{ lintTip }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, watchEffect } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { json } from '@codemirror/lang-json';

export default defineComponent({
  name: 'VueCodemirror',
  components: {
    Codemirror,
  },
  props: {
    staticJson: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, context) {
    const extensions = [json()];
    const lintFalse = ref(false);
    const lintTip = ref('');
    const code = ref<any>({});
    watchEffect(() => {
      const staticJson = JSON.stringify(props.staticJson, null, 2);
      code.value = staticJson;
    });

    const onBlur = (ev: any) => {
      try {
        const val = JSON.parse(code.value);
        context.emit('update:staticJson', val);
        lintFalse.value = false;
      } catch (error) {
        lintFalse.value = true;
        lintTip.value = '数据格式错误';
      }
    };
    const onFormat = () => {
      try {
        code.value = JSON.stringify(JSON.parse(code.value), null, 2);
        lintFalse.value = false;
      } catch (error) {
        lintFalse.value = true;
        lintTip.value = '数据格式错误';
      }
    };

    return {
      code,
      extensions,
      lintFalse,
      lintTip,
      onBlur,
      onFormat,
    };
  },
});
</script>

<style scoped lang="less">
.vue-codemirror {
  width: 100%;
  height: 97%;
  position: relative;
  text-align: left;
  .codemirror-wrap {
    height: 100%;
    :deep .cm-editor {
      border: 1px solid #e1e5eb;
      height: 100%;
      .cm-gutters {
        border-right: 1px solid #e1e5eb;
        color: #8894a8;
        background-color: #f5f7fa;
      }
      .cm-content {
        color: #1a253b;
      }
    }
    &.error {
      :deep .cm-editor {
        border-color: #f40;
      }
    }
  }
  .btn {
    position: absolute;
    right: 4px;
    top: 2px;
    cursor: pointer;
    &:hover {
      color: #1377eb;
    }
  }
  .tip {
    font-size: 12px;
    color: #f54645;
  }
}
</style>
