<template>
  <div class="card-design-preview">
    <card-design-biz v-if="dataSourceType === 'dataset'"></card-design-biz>
    <card-design-view :style="style"></card-design-view>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import CardDesignBiz from '@/components/cardDesign/components/CardDesignBiz.vue';
import CardDesignView from '@/components/cardDesign/components/CardDesignView.vue';

export default defineComponent({
  name: 'CardDesignPreview',
  components: {
    CardDesignBiz,
    CardDesignView,
  },
  props: {
    datasetWidth: {
      type: Number,
      default: 0,
    },
    chartWidth: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const store = useStore();
    const dataSourceType = computed(
      () => store.state.cardDesign.card.cardInfo.dataSourceType,
    );
    const style = computed(() => {
      // 用于控制宽度最大值，防止两侧收放时抖动
      return {
        'max-width': `calc(100vw - ${
          props.datasetWidth + props.chartWidth + 184 + 16 + 32 + 32
        }px + ${dataSourceType.value === 'dataset' ? 0 : 184 + 16}px)`,
      };
    });

    return {
      style,
      dataSourceType,
    };
  },
});
</script>

<style lang="less" scoped>
.card-design-preview {
  .flexRow();
  flex: 1;
  height: 100%;
  padding: 16px 32px;
}
</style>
