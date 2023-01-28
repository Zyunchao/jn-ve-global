# Git 提交日志规范

框架采用 Commit message [Angular 规范](https://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

:::danger

不符合规范的提交日志，将不予通过，无论命令输入还是编辑器工具可视化操作

:::

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

## 示例

```shell
git commit -m 'fix(account): 修复xxx的bug'
git commit -m 'refactor: 重构整个项目'
```
