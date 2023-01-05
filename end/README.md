# River BI

智能 BI 分析平台，企业级开源框架 丰富的组件，可快速生成分析报告及大屏报告，还能基于全局筛选器及筛选轴做即席分析。涵盖自定义表格、自定义图表，包含主题颜色、国际化等全局功能。采用 vue3 + nodejs + mysql 技术体系，简单易上手，高性能，快速开发，架构简洁高效，易维护、易扩展

### 线上地址

http://riverbi.site

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### about

此项目和 River BI 客户端 配合使用。（https://gitee.com/chengzhengfa/river-bi）

### Start Project

```bash
1、安装mysql，并配置环境变量
2、安装DBeaver数据库工具
3、DBeaver连接本地mysql服务
4、在DBeaver创建dashboard数据库
5、拉取代码到本地，安装依赖
6、执行seedData里的种子数据sql脚本
7、将config.default.ts文件的mysql配置项种的password（密码）改为自己安装mysql设置的密码
8、启动项目
```

### Npm Scripts
