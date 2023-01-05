<template>
  <div class="card-item" @click="onCheck">
    <component :is="curComp" :options="curOptions"></component>
    <div class="check-box" v-if="checkListId.includes(card.cardId)">
      <rb-icon class="btn" type="icon_rb-check" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, shallowRef, watch } from 'vue';
import { useStore } from 'vuex';
import cloneDeep from 'lodash/cloneDeep';
import { getMateriel } from '@/core/materielList';
import {
  transformStyleToOption,
  TransformAxesToEchartData,
  TransformStaticJsonToEchartData,
  responseHandle,
} from '@/global/preUtils';

export default defineComponent({
  name: 'CardItem',
  components: {},
  props: {
    card: {
      type: Object,
      default: () => ({}),
    },
    checkList: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, context) {
    const store = useStore();
    const checkListId = computed(() =>
      props.checkList.map((it: any) => it.cardId),
    );
    const curComp: any = shallowRef();
    const curOptions = ref({});
    const defaultOption = ref({});
    watch(
      () => props.card,
      async () => {
        const materiel = getMateriel(props.card.chartType);
        const component = await materiel?.component();
        curComp.value = component?.default;
        const options = await materiel?.options();
        curOptions.value = cloneDeep(options?.default);
        defaultOption.value = cloneDeep(options?.default);
        transformStyleToOption(curOptions.value, props.card.styles);

        if (props.card.dataSourceType === 'staticJson') {
          curOptions.value = TransformStaticJsonToEchartData(
            props.card.chartType,
            curOptions.value,
            props.card.staticJson,
            defaultOption.value,
          );
        } else if (props.card.dataSourceType === 'dataset') {
          const res = await store.dispatch('root/getChartData', {
            cardId: props.card.cardId,
          });
          responseHandle(res, () => {
            curOptions.value = TransformAxesToEchartData(
              props.card.chartType,
              curOptions.value,
              res,
              defaultOption.value,
            );
          });
        }
      },
      { deep: true, immediate: true },
    );
    const onCheck = () => {
      let list = [];
      if (checkListId.value.includes(props.card.cardId)) {
        list = props.checkList.filter(
          (card: any) => card.cardId !== props.card.cardId,
        );
      } else {
        list = props.checkList.concat(props.card);
      }
      context.emit('update:checkList', list);
    };

    return {
      curComp,
      curOptions,
      checkListId,
      onCheck,
    };
  },
});
</script>

<style lang="less" scoped>
.card-item {
  position: relative;
  width: 300px;
  height: 300px;
  margin-bottom: 12px;
  border: 1px solid @rb-border-color-base;
  cursor: pointer;
  &:last-child {
    margin-bottom: 0;
  }
  .check-box {
    position: absolute;
    right: 0;
    bottom: 0;
    width: 26px;
    border-top-left-radius: 20px;
    background-color: @rb-primary-color;
    .btn {
      margin-left: 8px;
      color: @rb-body-background;
    }
  }
}
</style>
