<template>
  <div :class="['multivalue', flexLayout.groupLayout]">
    <div
      :class="['item', flexLayout.numberLayout]"
      v-for="item in options.value"
      :key="item.key"
    >
      <p class="val">
        <span :style="dataLabel" class="name">{{ item.name }}</span>
        <span :style="getValueStyle" class="value">{{
          formatNumToThous(item.value)
        }}</span>
      </p>
      <div :class="['compare', flexLayout.compareLayout]">
        <p class="compare-item alike" v-if="options.option.hasAlike">
          <span class="name">同比</span>
          <span class="value">{{ item.alike || '12.22%' }}</span>
          <!-- '-' -->
          <rb-icon
            :class="true ? 'rise' : 'descend'"
            :type="true ? 'icon_rb-rise' : 'icon_rb-descend'"
          />
        </p>
        <p class="compare-item chain" v-if="options.option.hasChain">
          <span class="name">环比</span>
          <span class="value">{{ item.chain || '5.5%' }}</span>
          <rb-icon
            :class="false ? 'rise' : 'descend'"
            :type="false ? 'icon_rb-rise' : 'icon_rb-descend'"
          />
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import { formatNumToThous } from '@/global/preUtils';

export default defineComponent({
  name: 'Multivalue',
  props: {
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props, context) {
    const flexLayout = computed(() => {
      const flexLayout = props.options?.flexLayout ?? {};
      return flexLayout;
    });
    const dataLabel = computed(() => {
      const dataLabel = props.options?.dataLabel ?? {};
      return dataLabel;
    });
    const getValueStyle = computed(() => {
      const dataLabel = props.options?.dataLabel ?? {};
      return {
        color: dataLabel.valueColor,
        'font-size': dataLabel.valueFontSize,
        'font-weight': dataLabel.valueFontWeight,
      };
    });

    return {
      flexLayout,
      dataLabel,
      getValueStyle,
      formatNumToThous,
    };
  },
});
</script>

<style lang="less" scoped>
.multivalue {
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 10px;
  overflow: auto;
  &.row {
    .flexRow(center, center);
    .item {
      margin-right: 20px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
  &.column {
    .flexColumn(center, center);
    .item {
      margin-bottom: 40px;
    }
  }
  .item {
    &.row {
      .flexRow(center, center);
      .val {
        margin-right: 20px;
        &:last-child {
          margin-right: 0;
        }
      }
    }
    &.column {
      .flexColumn(center, center);
    }
    &:last-child {
      margin-bottom: 0;
    }
    .val {
      .flexColumn(center, center);
      .value {
        font-size: 40px;
      }
    }
    .compare {
      &.row {
        .flexRow(center, center);
        .compare-item.alike {
          margin-right: 8px;
        }
      }
      &.columnCenter {
        .flexColumn(center, center);
      }
      &.columnLeft {
        .flexColumn(center, flex-start);
      }
      &.columnRight {
        .flexColumn(center, flex-end);
      }
      &-item {
        .flexRow(center, center);
        text-align: left;
        // margin-right: 20px;
        .name {
          white-space: nowrap;
          color: @rb-label-color;
          padding-right: 4px;
        }
        .rb-icon {
          font-size: 18px;
        }
        .rise {
          color: @rb-error-color;
        }
        .descend {
          color: @rb-success-color;
        }
      }
    }
  }
}
</style>
