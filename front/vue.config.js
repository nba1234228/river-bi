const path = require('path');
const configs = require('./config/index.ts');
const env = process.argv.slice(-1)[0];
const ENV_CONFIG = configs[env] || {};
const productionFlag = process.env.NODE_ENV === 'production';

const cacheGroups = {
  AntDesign: {
    name: 'vendor-antd',
    test: /ant-design-vue/,
    priority: 20,
    chunks: 'async',
  },
  Echarts: {
    name: 'vendor-echarts',
    test: /echarts/,
    priority: 30,
    chunks: 'async',
  },
  vendors: {
    test: /[\\/]node_modules[\\/]/,
    priority: -10,
  },
  default: {
    minChunks: 2,
    priority: -20,
    reuseExistingChunk: true,
  },
};
module.exports = {
  css: {
    // sourceMap: !productionFlag,
    loaderOptions: {
      less: {
        // modifyVars: require(resolve("src/assets/styles/themeVar")),
        javascriptEnabled: true,
      },
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/assets/styles/global.less')],
    },
  },
  configureWebpack: (config) => {
    config.devtool = productionFlag ? 'none' : 'source-map'; // eval-cheap-module-source-map导致报错信息位置不匹配
  },
  chainWebpack: (config) => {
    config.plugin('html').tap((args) => {
      args[0].title = 'River BI';
      return args;
    });
    // 添加自定义变量
    config.plugin('define').tap((args) => {
      args[0]['process.env'].ENV_CONFIG = JSON.stringify(ENV_CONFIG);
      return args;
    });
    // 去除生产环境cons
    // config.optimization.minimizer('terser').tap((args) => {
    //   args[0].terserOptions.compress.drop_console = true;
    //   return args;
    // });
    // 分割代码
    if (productionFlag) {
      config.optimization.splitChunks({
        minSize: 30000,
        minChunks: 1,
        chunks: 'all',
        cacheGroups,
      });
    }
    config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js');
    // 打包分析
    if (process.env.use_analyzer) {
      config
        .plugin('webpack-bundle-analyzer')
        .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin);
    }
  },
  // 是否为 Babel 或 TypeScript 使用 thread-loader。该选项在系统的 CPU 有多于一个内核时自动启用，仅作用于生产构建。
  parallel: require('os').cpus().length > 1,
  devServer: {
    host: '0.0.0.0',
    port: ENV_CONFIG.port || '8088',
    https: false,
    open: true,
    disableHostCheck: true,
    proxy: ENV_CONFIG.proxy || {},
  },
};
