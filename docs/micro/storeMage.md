# 仓库管理

:::tip

前端整体开发模式为:

基座应用部署到指定服务下，基座应用采用生产模式，这样一来，各组开发就不需要关心基座应用了

也不需要本地启动基座应用了

故：只对各项目组开放微前端框架

:::

:::tip

由于基座应用采用生产模式，微应用采用开发模式，故开发模式下的微应用的热更新将失效

:::

## 地址

* SSH:
    > git@gitlab.jsjngf.com:jsjngf/microapptemplate.git

* HTTP
    > http://gitlab.jsjngf.com/jsjngf/microapptemplate.git

## 个人仓库绑定两个远程仓库

:::tip

在未来，微应用框架是需要迭代升级的，每位开发拿到微应用框架时，应该将自己的本地仓库维持和微应用框架原始仓库的关联

故：一个本地微应用仓库，需要绑定两个远程仓库

* 微应用原始仓库（用来拉取更新）
* 项目组项目仓库（项目组维护）

:::

## 步骤

### 1. 拉取代码

```shell
git clone git@gitlab.jsjngf.com:jsjngf/microapptemplate.git
```

### 2. 修改微应用框架原始仓库远程仓库的名称

```zsh
git remote rename origin micro-source
```

### 3. 查看绑定的远程仓库

```zsh
git remote -vv

# 输出
micro-source    git@gitlab.jsjngf.com:jsjngf/microapptemplate.git (fetch)
micro-source    git@gitlab.jsjngf.com:jsjngf/microapptemplate.git (push)
```

### 4. 修改原始仓库的推送权限

:::danger

禁止所有人向微应用框架原始仓库推送，防止误操作，将原始仓库的 push url 改掉

:::

```zsh
git remote set-url --push micro-source null

# 查看权限
git remote -vv
# 输出
micro-source    git@gitlab.jsjngf.com:jsjngf/microapptemplate.git (fetch)
micro-source    null (push)
```

### 5. 添加自己项目组的仓库

```zsh
# 后面的地址改成自己组的项目的地址
git remote add origin git@gitlab.jsjngf.com:regional-finance/guarantee/guarantee_front.git

# 查看本地仓库绑定的远程仓库信息
git remote -vv

# 输出
micro-source    git@gitlab.jsjngf.com:jsjngf/microapptemplate.git (fetch)
micro-source    null (push)
origin  git@gitlab.jsjngf.com:regional-finance/guarantee/guarantee_front.git (fetch)
origin  git@gitlab.jsjngf.com:regional-finance/guarantee/guarantee_front.git (push)
```

### 6. 修改分支默认绑定

```zsh
# 查看分支绑定的远程分支
git branch -vv 

# 输出，[] 中标识目前分支所绑定的远程分支为初始仓库的分支
* master 1fc36a6 [micro-source/master] 清空样例页面；

# 修改当前分支绑定的远程分支
git branch --set-upstream-to=origin/远程分支名称

# 或

# 需要将分支的默认绑定修改为自己项目组仓库的分支，可通过首次推送，绑定默认分支，master -> origin master
git push -u origin master
```

### 7. 更新微应用框架

当微应用框架需要更新时，我会及时通知到前端同事

```zsh
git pull micro-source master
```

:::tip
在拉取微应用原始仓库内容时，可能会有冲突
:::
