# 环境变量

环境变量即为当前系统的一些配置属性

详情请参考 [Vue-cli 模式和环境变量](https://cli.vuejs.org/zh/guide/mode-and-env.html)

:::tip

每人应在自己的项目代码中，添加 .env.local 文件，用来配置自己的开发环境变量，git 自动忽略，避免变量冲突

:::

## 基座应用配置

```zsh
VUE_APP_TITLE=地方金融科技平台

# 基础请求地址
VUE_APP_BASE_REQ_URL=http://172.31.33.87:20000

# 后台网关代理
#VUE_APP_KINSO_ROUTE=kinso-basic-resources-server:1234
VUE_APP_KINSO_ROUTE=
# ClintId（登录使用）
VUE_APP_CLIENT_ID=9999
VUE_APP_CLIENT_SECRET=1234567

# 配置是否需要登录鉴权（仅做为静态页面调试）
VUE_APP_NEED_LOGIN=true

# 路由配置方式（后端 | 前端）"backEnd" | "frontEnd"
VUE_APP_ROUTE_MODE=frontEnd

# 轮询间隔（分钟）
VUE_APP_POLL_TIME=2

# 发送验证码的间隔（秒）
VUE_APP_SEND_VALID=60
```

## 微应用配置

一些关键变量，需要与基座应用统一，故取消了微应用的配置，转为接收基座应用的配置

```zsh
VUE_APP_TITLE=地方金融科技平台

# 后台网关代理（微应用的 axios 是独立的，请求头的添加也是独立的）
VUE_APP_KINSO_ROUTE=

# 请求超时数值（秒）
VUE_APP_REQ_TIMEOUT=3
```
