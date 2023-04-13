# 创建根项目

所谓的根项目，就是以 `monorepo` 为单位的一个项目模板，在安装完 `jn-micro-cli` 后

1. 进入想要创建项目的目录

2. 在其目录下，执行命令：

```shell
jn-micro create <name>
# `<name>` 为项目名称
```

![run](/images/micro-cli/jn-micro-cli-run.png)

3. 回车后，按照交互命令输入配置项：

![config](/images/micro-cli/jn-micro-cli-input-config.png)

4. 回车后，进入模版下载阶段：

![download](/images/micro-cli/download.png)

5. 等待成功后的输出：

![success](/images/micro-cli/success.png)

6. 成功后，会在当前目录看到对应的项目，项目结构

![pro-dir](/images/micro-cli/project-dir.png)

:::tip

截止目前，你获得了一个全新的 微应用 monorepo 项目，并且不在需要你任何改动，可以直接进行开发了

:::

可以查看原先需要手动配置的地方，已经依据创建命令输入的信息，自动改掉了

![configed](/images/micro-cli/configed.png)
