<template>
  <div class="x-lazy">
    <slot v-bind="{ ...$attrs }" v-if="isVisible" />
  </div>
</template>

<script>
const isIE = 'ActiveXObject' in window;
// 进入可视区才会加载
const initIntersectionObserver = () => {
  // if (isIE) return;
  // 只需要创建一次
  if (!window.xLazyIO) {
    const lazyIO = {
      els: [],
      io: null,
    };
    try {
      // 监听回调
      const callback = (entries) => {
        entries.forEach((item) => {
          // 出现到可视区
          if (item.isIntersecting) {
            lazyIO.unobserve(item.target);
          }
        });
      };
      lazyIO.io = new IntersectionObserver(callback);
    } catch (err) {}

    lazyIO.getElByDom = (dom) => {
      const item = lazyIO.els.find((r) => r.$el === dom);
      if (item) return item;
      return null;
    };
    lazyIO.removeEl = (el) => {
      const index = lazyIO.els.findIndex((r) => r === el);
      if (index > -1) {
        lazyIO.els.splice(index, 1);
      }
    };
    lazyIO.observe = (el) => {
      lazyIO.els.push(el);
      lazyIO.io.observe(el.$el);
    };
    lazyIO.unobserve = (dom) => {
      const el = lazyIO.getElByDom(dom);
      lazyIO.io.unobserve(dom);
      if (el) {
        el.show();
        lazyIO.removeEl(el);
      }
    };
    window.xLazyIO = lazyIO;
  }
};

export default {
  name: 'LazyWrapper',
  inheritAttrs: false,
  data() {
    return {
      isVisible: false,
    };
  },
  props: {
    vdrItem: {
      type: Object,
    },
  },
  beforeCreate() {
    initIntersectionObserver();
  },
  mounted() {
    // if (!isIE) window.xLazyIO.observe(this);
    window.xLazyIO.observe(this);
  },
  beforeUnmount() {
    // if (!isIE) window.xLazyIO.unobserve(this.$el);
    window.xLazyIO.unobserve(this.$el);
  },
  methods: {
    show() {
      this.isVisible = true;
    },
  },
};
</script>
<style lang="less" scoped>
.x-lazy {
  width: 100%;
  height: 100%;
}
</style>
