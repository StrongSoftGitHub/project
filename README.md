# project-cli

> 基于webpack模板改造，一个适合项目集成的脚手架。

### 脚手架优化点

1. 构建速度
2. 首屏加载速度

### 功能

1. 基础登录功能
2. 动态路由生成
3. 基础菜单
4. 基础布局
5. 模块配置注入机制

### 使用

如果还没安装过vue-cli，请执行：

``` bash
npm install -g vue-cli
```

初始化项目脚手架：
``` bash
vue init StrongSoftGitHub/project-cli my-project[格式：合同号+项目名称+cli，如综合信息平台：2017386-integrated-information-platform-cli）]
```

### 常用命令

- 安装依赖：npm install
- 启动本地服务器：npm run dev
- 代码规范检测：npm run lint
- 自动修复代码规范问题：npm run fix