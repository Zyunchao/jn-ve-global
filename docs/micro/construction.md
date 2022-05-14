# 框架结构

## 基座应用

目录树

```zsh
├── README.md 
├── babel.config.js # babel 配置文件
├── lint-staged.config.js # git 钩子
├── nodesrc # 快捷创建模块脚本（待完善）
│   ├── modules
│   ├── start.ts
│   ├── templates
│   └── utils
├── package.json # 依赖表、项目信息
├── postcss.config.js # postcss 配置、适配、px2rem等
├── public # 静态资源目录
│   ├── favicon.ico # 图标
│   ├── index.html # 主文件
│   ├── lib # 共享依赖资源
│   ├── microApps # 微应用注册模块
│   └── server.js # 生产环境的服务路径配置
├── src # 源码文件夹
│   ├── @types # 项目类型、实体类等
│   │   ├── Request.ts # api 配置类型
│   │   ├── Response.ts # 响应结构基本类型
│   │   ├── Route.ts # vue-router 的路由配置对象
│   │   ├── entity # 实体类
│   │   └── validator # 校验表
│   ├── App.vue # 主 vue 文件
│   ├── api # 后台接口配置模块文件夹
│   │   ├── base.ts # 将配置对象映射成请求函数的主文件
│   │   ├── index.ts # 主文件，主要用来统筹模块，暴露模块等
│   │   ├── modules # 业务接口模块文件夹
│   │   └── prefix.ts # 前缀配置
│   ├── assets # 项目静态资源目录
│   │   ├── data # 一些数据（假数据）
│   │   ├── images # 图片
│   │   └── styles # 全局 css、变量、覆盖主题等
│   ├── components # 项目内组件 
│   │   ├── business # 业务组件存放目录
│   │   └── global # 全局组件存放目录
│   ├── directives # vue 自定义指令存放目录
│   │   ├── auth.ts # 按钮鉴权指令
│   │   └── index.ts # 自动化注册文件
│   ├── global.d.ts # ts 声明文件
│   ├── hooks # 自定义 hook（同 mixins）
│   ├── http # 请求封装模块目录
│   │   ├── constant # 常量
│   │   ├── index.ts # 抛出请求实例等
│   │   ├── interceptors # 拦截器处理函数
│   │   ├── proxys # 代理配置
│   │   └── utils.ts # http 模块的工具
│   ├── main.ts # 主入口
│   ├── microApp # 微应用运行依赖模块（基座应用不同于微应用，微应用包含较多必须的运行模块）
│   │   └── register.ts # 微应用执行注册文件
│   ├── mixins # mixins（混入）
│   │   ├── businessModuleMixin.ts # 业务模块基础混入
│   │   └── navTo.ts # 基座应用路由跳转方法，内含 hook 使用，所以采用混入的形式
│   ├── plugins # 查件（暂时无用）
│   ├── router # 路由模块
│   │   ├── backEnd.ts # 动态路由加载模块
│   │   ├── common # 公共路由存放目录
│   │   │   ├── index.ts # 抛出公共路由等
│   │   │   ├── microAppBaseRoute.ts # 自动化注册微应用的保险路由等，如 /uums/:page*
│   │   │   └── my.ts # 个人中心模块等
│   │   ├── frontEnd.ts # 静态路由自动化转换、引入等
│   │   ├── index.ts # 统筹路由模块、导航守卫、动态添加路由等
│   │   └── modules # 业务模块路由存放目录
│   ├── shims-vue.d.ts # ts 声明文件
│   ├── source.d.ts # ts 声明文件
│   ├── store # vuex 全局状态管理
│   │   ├── index.ts # 自动化引入、注册、转换
│   │   ├── interface # 接口类型
│   │   │   ├── AppFuncTree.ts # 包含应用功能树（注册路由、菜单树、权限树）等
│   │   │   ├── CurrentStatus.ts # 当前系统的一些状态全局保存
│   │   │   ├── CurrentUserInfo.ts # 当前登录人的一些信息
│   │   │   ├── LoginInfo.ts # 登录信息
│   │   │   ├── RootStateTypes.ts # 根 Store 的类型
│   │   │   ├── SysDict.ts # 系统字典类型
│   │   │   └── index.ts # 抛出各类型
│   │   └── modules # 接口实现
│   ├── utils # 工具函数存放文件夹
│   └── views # 页面文件夹
├── tsconfig.json # ts 配置
└── vue.config.js # vue-cli 配置文件

```

截图

![基座应用目录](/images/realize/基座应用目录.png)

## 微应用

```zsh
├── README.md
├── babel.config.js
├── lint-staged.config.js
├── nodesrc
│   ├── modules
│   ├── start.ts
│   ├── templates
│   └── utils
├── package.json
├── postcss.config.js
├── public
│   ├── favicon.ico
│   ├── index.html
│   ├── microApps
│   └── server.js
├── src
│   ├── @types
│   │   ├── Request.ts
│   │   ├── Response.ts
│   │   ├── Route.ts
│   │   ├── entity # 实体类
│   │   │   ├── root # uums 的一些实体类，uums 属于基本系统，包含一些关键信息，如机构、应用、角色等
                     # 所以在每个微应用都添加了 uums 的实体类
│   │   └── validator
│   ├── App.vue
│   ├── api
│   │   ├── base.ts
│   │   ├── index.ts
│   │   ├── modules
│   │   └── prefix.ts
│   ├── assets
│   │   ├── data
│   │   ├── images
│   │   └── styles
│   ├── components
│   │   ├── business # 业务组件
│   │   │   ├── remoteMicroAppComponent # 加载远程组件的组件
│   │   └── global # 全局组件
│   │   │   ├── index.ts # 自动化注册
│   │   │   └── lodingShade
│   ├── directives # 自定义指令
│   │   ├── auth.ts
│   │   └── index.ts
│   ├── global.d.ts
│   ├── main.ts
│   ├── microApp # 微应用运行依赖模块，不同于基座应用，微应用的运行模块做的事情比较多
│   │   ├── currentMicroTagName.ts # 用来定义当前应用的 micro-app-xx 标签，用来嵌套应用（物料提供者）的使用
│   │   ├── httpInterceptors.ts # 请求拦截处理函数（来自基座应用）
│   │   ├── lifecycle.ts # 生命周期
│   │   ├── navTo.ts # 微应用跳转应用的封装方法
│   │   ├── parentDataMsgHandle.ts # 接收基座应用的各种数据
│   │   ├── register.ts # 注册微应用（嵌套应用）
│   │   ├── routeMode.ts # 路由模式，来自基座应用
│   │   ├── sendData.ts # 发送数据（发给基座，发给子）方法封装
│   │   └── setLocalStore.ts # 设置当前应用的全局状态管理
│   ├── mixins
│   │   └── businessModuleMixin.ts
│   ├── router # 路由模块，与基座应用差异较大
│   │   ├── backEnd.ts # 动态路由配置，依赖基座应用
│   │   ├── common # 公共路由、模糊路由、暴露出的组件路由（物料提供者）
│   │   │   ├── blurry.ts
│   │   │   ├── exposes.ts
│   │   │   ├── index.ts
│   │   │   └── utils.ts
│   │   ├── frontEnd.ts # 静态路由处理
│   │   ├── index.ts # 抛出路由实例，导航守卫等
│   │   └── modules
│   ├── shims-vue.d.ts
│   ├── source.d.ts
│   ├── store # 全局状态管理（每个系统都有自己的 vuex 实例，微应用的 vuex 不需要持久化）
│   │   ├── index.ts # 自动化引入、注册
│   │   ├── interface # 接口
│   │   │   ├── AppFuncTree.ts # 当前系统的路由等
│   │   │   ├── CurrentStatus.ts # 当前系统的状态
│   │   │   ├── CurrentUserInfo.ts # 登录人信息 
│   │   │   ├── LoginInfo.ts # 登录信息
│   │   │   ├── RootStateTypes.ts
│   │   │   ├── SysDict.ts # 字典表
│   │   │   └── index.ts
│   │   └── modules # 实现
│   │   │   ├── appFuncTree.ts
│   │   │   ├── currentStatus.ts
│   │   │   ├── currentUserInfo.ts
│   │   │   ├── loginInfo.ts
│   │   │   └── sysDict.ts
│   ├── utils # 工具库
│   └── views # 页面
├── tsconfig.json
└── vue.config.js
```

截图

![微应用目录](/images/realize/微应用目录.png)
