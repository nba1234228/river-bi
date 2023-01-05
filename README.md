# River BI

智能 BI 分析平台，企业级开源框架 丰富的组件，可快速生成分析报告及大屏报告，还能基于全局筛选器及筛选轴做即席分析。涵盖自定义表格、自定义图表，包含主题颜色、国际化等全局功能。采用 vue3 + nodejs + mysql 技术体系，简单易上手，高性能，快速开发，架构简洁高效，易维护、易扩展

### 线上地址

http://riverbi.site

### format

.prettierrc for on save auto format and package.json's eslintConfig for eslint

### about

此项目 前后端 配合使用

### 规范

1. 颜色统一使用变量值，方便主题切换及和其他平台统一
2. 引用 vue 文件，一律添加.vue 后缀
3. 禁止使用 JSON 做深拷贝，统一使用 loadsh
4. 禁止使用$parent，$children，parentNode，childNode 以及第一个、最后一个、上下一个兄弟节点的找 dom 方式等
5. 禁止使用第三方插件图标，统一使用 iconfont 项目图标
6. 推荐使用可选链语法
7. 不用从 getCurrentInstance 中获取 ctx 使用，生产环境下 ctx 获取不到 vue 属性，请使用 proxy


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
