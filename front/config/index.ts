module.exports = {
  'dev:dev': {
    link: {
      CREATIVE: 'http://127.0.0.1:8080',
    },
    port: 8088,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': '/api',
        },
      },
    },
  },
  'dev:test': {
    link: {
      CREATIVE: 'http://127.0.0.1:8080',
    },
    port: 8099,
    proxy: {
      '/api': {
        target: 'https://127.0.0.1:8080',
        changeOrigin: true,
        ws: true,
        secure: false,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
  'build:test': {
    link: {
      CREATIVE: 'http://127.0.0.1:8080',
    },
  },
  'build:prod': {
    link: {
      CREATIVE: 'http://127.0.0.1:8080',
    },
  },
};
