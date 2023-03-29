# Monorepo

Monorepo 可以理解为一种基于仓库的代码管理策略，它提出将多个代码工程“独立”的放在一个仓库里的管理模式，其中“独立”这个词非常重要，每个代码工程在逻辑上是可以独立运行开发以及维护管理的。Monorepo在实际场景中的运用可以非常宽泛，甚至有企业将它所有业务和不同方向语言的代码放在同一个仓库中管理，当然，这样的运用方式对企业的仓库底层能力要求相当高。因此，更多的Monorepo实践会根据业务和职能范围来进行组织。

![mono](/images/monorepo/mono-mutil.png)

## 谁在用？

Monorepo这个概念的提出已经有很长的历史，但直到最近几年，随着技术的更新迭代，以及各项工具链的完善，逐渐开始成为一个热门的话题，很多大型的互联网公司都在采取这样的代码管理策略，比如 `Google、Facebook、Uber、MicroSoft` 等。

也有很多著名的前端开源库选择用这种方式来构建和管理自己的代码，比如 `Vue、React、Vite、Babel、Element-plus` 等。

## 为何用？

Monorepo 解决了哪些项目代码管理上的问题，让这么多大型厂商和开源项目都纷纷尝试并投身其中？回答这个问题前，我们需要先引出另外两种较为普遍的管理策略： `Single-repo Monolith` 和 `Multirepo` ，目前大部分项目所使用的都是这两种管理策略。

接下来我们通过对比，来逐步探索对Monorepo的理解以及使用它的原因。

![msm](/images/monorepo/mmm.png)

从图中我们来分析三种策略在架构模式上核心的不同点：

* Monorepo：只有一个仓库，并且把项目拆分多个独立的代码工程进行管理，而代码工程之间可以通过相应的工具简单的进行代码共享。
* Single-repo Monolith：同样也只有一个仓库，而它并不会独立的分割每个代码工程，而是让他们成为一体来进行开发管理，模块的拆分取决于代码工程的设计。
* Multi-repo：则是通过建立多个仓库，每个仓库包含拆分好的代码工程，而仓库间的调用共享则是通过NPM或者其他代码引用的方式进行。

虽然这样可以简单的区别三种策略，而实际情况下，这三种策略其实是可以相互转换，相互包含的。一个Monorepo里可以包含多个以Single-repo Monolith形式组织的代码。Multi-repo中的每个repo都可以是一个Monorepo等等。

## 场景分析

除了从架构概念上的区分外，这里再构造一个简单前端场景：

假设现在有两个可以逻辑上被分割的项目 Project1 和 Project2 以及他们共用的一个公共库lib。

在这个假设的场景中，我们通过实际的代码目录组织和相互引用方式来更加直观的展示三种策略的不同：

### Single-repo Monolith

在Single-repo Monolith这个策略下，Project和lib都会被组织在一个仓库当中，并会将两个Projects中代码进行杂糅，放在同一个代码工程当中，
而lib代码会放在该工程目录下，两个Projects可以简单的通过路径去引用，也可以通过工具设置绝对地址alias来方便引入。最终整个项目会共同构建并部署。

```ts
// Repository - monolith
.
├── package.json
├── src/
│   ├── views/
|   |   ├── project1/
|   |   ├── project2/
│   ├── router/
|   |   ├── project1/
|   |   ├── project2/
|   ├── ...
│   └── lib/
└── README.md
 
 
// 代码共享 package1/example.js
import {method} from '../../lib';
 
// script引入共享
<script src="@static/lib/index.js"></script>
```

### Multi-repo

在Multi-repo这个策略下，两个Project会单独成立代码工程放入两个仓库当中。而lib也会独立成库进行开发，并通过构建后进行NPM发包，两个Projects需要通过NPM的形式安装和更新lib。最终项目分别独立打包并进行部署。

```ts
// Repository - project1
.
├── node_modules/
├── package.json
├── src/
│   ├── views/
│   ├── router/
|   ├── ...
├── README.md
  
// Repository - project2
.
├── node_modules/
├── package.json
├── src/
│   ├── views/
│   ├── router/
|   ├── ...
├── README.md
 
// Repository - lib
.
├── node_modules/
├── package.json
├── src
|   ├── ...
├── README.md
 
// 代码共享
- lib进行发包，比如包名为 @my-scope/lib
- 进入Package1 或 Package2 进行npm install 或 npm update
- 在代码中引入
import {method} from '@my-scope/lib';
```

### Monorepo

在Monorepo这个策略下，将会把两个Projects和一个lib统一放到packages目录下面，每个都会作为独立的包进行开发运行，公用依赖可以放在一级的node_module中，各个package也可以有自己独有的依赖。这里以Pnpm为例来展示，在pnpm-workspace.yaml里配置把packages下的所有包视为子项目，纳入包管理。在lib目录下的pacakge.json中为其添name，同时添加到一级目录的package.json当中，即可被两个Projects引用，而无需进行发包操作。

```ts
// Repository - monorepo
.
├── node_modules/
├── package.json
├── packages/
│   ├── pacakge1/
|   |   ├── src/
|   |   ├── README.md
|   |   ├── node_modules/
|   |   ├── pacakge.json
│   ├── package2/
|   |   ├── src/
|   |   ├── README.md
|   |   ├── node_modules/
|   |   ├── pacakge.json
│   └── lib/
|   |   ├── src/
|   |   ├── README.md
|   |   ├── node_modules/
|   |   ├── pacakge.json
├── README.md
├── pnpm-workspace.yaml
 
// pnpm-workspace.yaml
packages:
  - 'packages/*'
 
// 代码共享
- 假设 lib 的包名为 @my-scope/lib，无需发包至NPM
- 在一级目录的 package.json 添加包名 @my-scope/lib: "workspace:*"
- 在两个 projects 中的代码中引入
import {method} from '@my-scope/lib';
```

## 发展趋势分析

通过两组形式的对比，对Monorepo策略应该有了基础的了解，这里回过头来解答一下开头提出的问题，“为何用Monorepo”

### Monolith时期

Monolith这种模式是最早开发人员所使用的仓库架构模式，当时的前端功能还很简单，还没有过多的框架出现，仅仅是HTML，CSS的编写以及加上简单的JS逻辑。在那个时期，项目的前后端还杂糅在一起，类似JSP的开发模式被广泛应用，因此前后端的代码会集中在一个仓库里，最终页面会由后端进行渲染，仓库代码也会整体进行构建和部署。

而往后发展，Web能力开始变得越来越强大，前端能做到的事情逐渐变多，对应的工程也越来越复杂，AJAX的应用催生了前后端分离的概念。顺应趋势，前端开始将整体模块单独抽离形成仓库进行管理，到这里我们开始看到了Multi-repo的影子，但前端的代码依旧会统一在一个仓库里进行开发和管理。

随着前端功能还在不断的增多，更多的依赖被引入到仓库中，使得仓库越来越臃肿，特别在当时NPM还没被应用时，前端往往会去各个开源库官网或GitHub上下载文件并放入自己的项目当中。因此，在Single-repo Monolith架构下，对开发人员代码架构组织能力要求越来越高，同时扩展性和维护性也变得越来越低。

### Multi-repo时期

Multi-repo的流行很大程度上是为了解决这种模块高度耦合，代码臃肿的情况，开发者们开始更加倾向将整个业务项目进行拆分，独立进行管理。

伴随着当时Web环境质的飞跃，SPA框架的流行，对应Bundle工具的产生，npm的流行以及ES，Commonjs模块化的代码引入方式天然的为分割代码模块提供了良好的时机。这使得更多开发人员将工具代码单独成库并发布成包，并将庞大的业务进行拆分，每个业务模块建立单独的库由各自团队负责开发以及维护，各种包都通过npm来进行共享。

然而随着模块拆分不断的增多，开发者们又发现过多的仓库加大了维护的成本，新的项目环境搭建，和涉及整体业务的重构和依赖同步都将变得繁琐，此时回归单repo的概念又开始兴起。因此，已经被提出很久的Monorepo开始浮出水面，应运而生的工具也开始占据了一席之地。

### Monorepo时期

Monorepo的出现开始解决环境及依赖统一的问题，代码之间的共享也不再强依赖于NPM来进行。既保留了Monolith单仓环境维护的便利性，同时满足Multi-repo对于项目解耦的独立开发管理。

而后类似lerna+yarn的包管理方案的出现让Monorepo拥有了较为完整的解决方案，并伴随着新兴的技术Pnpm，Changesets，Turborepo的不断推出，Monorepo的整个管理流程变得越来越完善和简单，也逐渐被很多开发者所采用。

## Monorepo 优劣分析

### 优势

* 统一管理：由于只有一个仓库，所有的配置都可以统一进行管理，而无需为不同项目重复构建环境，包括通用的代码规范检测，相同的测试框架，以及统一的CI/CD构建流程等。

* 原子提交：这一点也是建立在统一管理的基础之上，使用原子提交轻松重构全局特性，而无需为每个repo执行拉取请求找出构建更改的顺序。这样可以简单的保持所有项目的全局特性是统一的，并且交由专人进行维护升级，而各个代码工程的开发者无需过度关注。

* 简单依赖：多个代码工程的相同依赖可以提升至根目录进行管理，大大减少重复安装所带来的空间浪费。同时，代码工程之间也可以在保持隔离的同时相互引用，而无需在构建时依次构建相关依赖包并重新发布。

* 文化开放：由于使用相同的代码库，所有开发者都能够浏览以及提交代码，在一定程度上也会激励团队成员共建可复用的组件及工具方法。

### 问题

* 权限问题：由于单仓的管理模式，使用Monorepo将无法简单的控制各个模块代码的访问限制，任何有权限访问该仓库的人员将有权限访问所有的代码工程，这可能会导致部分安全问题。

* 性能问题：当仓库的代码规模非常的巨大，达到GB/TB的级别，会增大开发环境的代码下载成本，以及本地硬盘的压力，执行git status也可能需要花费数秒甚至数分钟的时间。并且，当代码工程很多且活跃数量也很多的情况，会加大分支管理策略和各个代码工程版本管理的压力。

## 适用场景思考

说到适用场景，是很难用一刀切的方式来决定合适或者不合适，实际情况需要考虑的问题往往是非常复杂的。这里，总结比较常见的问题，并结合Monorepo的优劣势来做出决策，选择是否采用Monorepo来管理团队的代码：

* 项目的代码规模如何？
* 项目的开发人员规模如何？
* 项目是否依赖权限管理？
* 项目的技术栈是否统一？
* 公司文化是否鼓励团队进行合作？

当逐条去回答上面提出的问题后，我们可以得出一个粗略的Monorepo使用场景的总结：

* 代码规模相对来说不会太大，包括代码数据量和packages量。
* 代码并不涉及机密性核心技术，无需做较强的权限管理。
* 代码的技术选择相对统一，可复用性强。
* 公司文化鼓励协同合作，共建代码。
