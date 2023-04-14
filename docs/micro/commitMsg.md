# Git 提交日志规范

框架采用 Commit message [Angular 规范](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

类型|描述
-----|-----
build |  编译相关的修改，例如发布版本、对项目构建或者依赖的改动
chore |   改变构建流程、或者增加依赖库、工具等
ci |   持续集成修改
docs |   文档修改
feat |   新增功能
fix |   修复缺陷
perf |   优化相关，比如提升性能、体验
refactor |   代码重构
revert |   回退版本
style |   样式修改
test |   测试用例修改

## 框架交互式命令

基于 `monorepo` 微应用框架项目

1. 先将修改的内容添加到暂存区[git add命令](https://www.runoob.com/git/git-add.html)
    - 也可以使用编辑器的 git 交互界面提交到暂存区

2. 在项目根目录（第一层）下，执行命令：

```shell
pnpm cm
```

3. 随后出现交互，选择更改的类型

![pnpm-cm](/images/micro/pnpm-cm-1.png)

4. 一路回车，在第二个输入此次提交的日志

```shell
? Select the type of change that you're committing: test:  Adding missing tests or correcting existing tests
? What is the scope of this change (e.g. component or file name): (press enter to skip) 
? Write a short, imperative tense description of the change (max 94 chars):
 (6) 测试提交规范
? Provide a longer description of the change: (press enter to skip)
 
? Are there any breaking changes? No
? Does this change affect any open issues? No

# ？ 这个变化的范围是什么(例如组件或文件名):(按enter键跳过) 
# ？ 写一个简短的祈使式的变更描述(最多94个字符): 
# (6) 测试提交规范 
# ？ 提供更长的变更描述:(按enter键跳过) 
 
# ？ 有什么突破性的变化吗?没有 
# ？ 这一变化是否影响到任何悬而未决的问题?没有
```
