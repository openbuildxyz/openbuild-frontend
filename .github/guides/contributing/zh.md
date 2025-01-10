[English](./en.md) | 简体中文

# 贡献指南

很高兴你能出现在这里！想必一定是对为本项目贡献聪明才智或从项目代码中学到必要能力而感兴趣，对吧？

在开始大展身手之前，为保证能顺利地参与共建及异步协作，请按顺序通读下列所有内容（已看过并熟悉了解的可跳过）：

- [行为规范](https://openbuildxyz.github.io/eco/zh/guides/code-of-conduct/)
- [协作指南](https://github.com/openbuildxyz/.github/blob/main/docs/collaboration/zh.md)
- [技术栈](#技术栈)
- [环境准备](#环境准备)
- [目录结构](#目录结构)
- [文件引用](#文件引用)
- [编码风格](#编码风格)

来让我们开始吧！

## 技术栈

整个项目以 [React](https://react.dev/)、[Next.js](https://nextjs.org/)、[Tailwind CSS](https://tailwindcss.com/) 作为底层依赖，其他用到的库主要有：

- 工具
  - [Lodash](https://lodash.com/)
  - [validator.js](https://github.com/validatorjs/validator.js)
  - [Nano ID](https://zelark.github.io/nano-id-cc/)
- 数据处理
  - [React Redux](https://react-redux.js.org/)
  - [React Hook Form](https://www.react-hook-form.com/)
- UI
  - [Heroicons](https://heroicons.com/)
  - [Headless UI](https://headlessui.com/v1)
  - [daisyUI](https://daisyui.com/)
  - [NextUI](https://nextui.org/)
  - [Novel](https://novel.sh)
  - [ByteMD](https://bytemd.js.org/)
  - [SurveyJS](https://surveyjs.io/)
- 动画
  - [aos](https://michalsnik.github.io/aos/)
  - [Animate.css](https://animate.style/)
  - [Framer Motion](https://www.framer.com/motion/)
- Web3
  - [RainbowKit](https://www.rainbowkit.com/)
  - [Wagmi](https://wagmi.sh/)

## 环境准备

确保本地 Node.js 版本号符合 [`package.json`](../../../package.json) 中 `engines` 字段所指定的，在根目录用包管理器安装依赖，建议使用 [pnpm](https://pnpm.io)。

在根目录执行 `cp .env.example .env` 或 `cp .env.example .env.local` 以使运行应用所需环境变量能够正常注入：

| 变量名 | 作用 | 是否必需 |
| --- | --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` |  | 是 |
| `NEXT_PUBLIC_APP_URL` |  | 是 |
| `NEXTAUTH_URL` |  | 是 |
| `NEXTAUTH_SECRET` |  | 是 |
| `NEXT_PUBLIC_GITHUB_ID` |  | 用 GitHub 账号授权时 |
| `NEXT_PUBLIC_GOOGLE_ID` |  | 用 Google 账号授权时 |
| `NEXT_PUBLIC_ASPECTA_ID` |  | 展示 [Aspecta](https://aspecta.id) 的数据时 |
| `NEXT_PUBLIC_GA_ID` |  | 做流量统计时 |
| `NEXT_PUBLIC_GA_KEY` |  | - |

根据需要正确设置相应环境变量后，执行 npm scripts 中的 `start` 命令（如 `pnpm start`），即可在本地启动应用开始调试啦！

## 目录结构

虽说该项目是基于 Next.js 进行开发，但在文件组织上尽可能地不去使用其默认推荐的目录结构，也不同于其他前端项目常见的目录结构。

取而代之，采用的是以领域驱动设计思想为指引的[「模块化」目录结构划分模式](https://ourai.ws/posts/patterns-of-directory-structure-in-frontend-projects/#section-4)，以此为基础根据 Next.js 的限制进行些许兼容适配：

```
project/src
   ├── app
   │   └── ...
   ├── domain
   │   └── [domain-specific-module]
   │       ├── views
   │       │   ├── [detail-view]
   │       │   │   ├── [DetailViewComponent].js
   │       │   │   ├── ...
   │       │   │   └── index.js
   │       │   ├── [form-view]
   │       │   │   ├── [FormViewComponent].js
   │       │   │   ├── ...
   │       │   │   └── index.js
   │       │   └── [list-view]
   │       │       ├── [ListViewComponent].js
   │       │       ├── ...
   │       │       └── index.js
   │       ├── widgets
   │       │   └── [domain-specific-widget]
   │       │       └── ...
   │       ├── helper.js
   │       ├── index.js
   │       ├── model.js
   │       ├── repository.js
   │       └── ...
   ├── entry
   │   └── ...
   ├── shared
   │   └── ...
   └── ...
```

这样一来，大幅削弱了 [`app`](https://nextjs.org/docs/app) 的重要性，使其「退化」成较为单纯的 URL 与视图路由，而其他文件夹的职责为：

- `shared`——具体业务、页面无关的脚本、样式、图片等，基本是全局可复用的；
- `domain`——具体业务相关的脚本、样式、图片等，专注业务逻辑处理与关联数据的渲染，按业务域进行拆分；
- `entry`——具体页面相关的脚本、样式、图片等，专注纯页面层面的渲染与交互。

由于整个项目的目录结构还在重构调整中，在 `src` 文件夹中会看到上面没列出的文件夹；在做新功能时，要尽量避免在遗留代码中新增内容，而应当是在上述目录结构中。

**在正式开始提交代码前，请先仔细查看了解上述目录结构。**

## 文件引用

为避免依赖关系混乱和循环依赖，在文件引用层面有所限制，基本规则是：

1. `src/*` 文件夹，`*` 部分相同时使用相对路径；
2. 相异时，`shared` 文件夹的用 `@/*`，其他用 `#/*`；
3. `public` 文件夹下的用 `public/*`；
4. `src/*` 文件夹「纯净度」排序为 `shared` > `domain` > `entry` > `app`，「纯净度」高的禁止引用低的。

`src/*` 文件夹（不含遗留目录结构）的详细引用规则如下——

### `shared` 文件夹

| 可引用文件夹 | 引用方式 |
| --- | --- |
| `public` | `public/*` |
| `shared` | 相对路径 |

### `domain` 文件夹

| 可引用文件夹 | 引用方式 |
| --- | --- |
| `public` | `public/*` |
| `shared` | `@/*` |
| `domain` | 相对路径 |
| 其他非 `entry` 和 `app` | `#/*` |

### `entry` 文件夹

| 可引用文件夹 | 引用方式 |
| --- | --- |
| `public` | `public/*` |
| `shared` | `@/*` |
| `entry` | 相对路径 |
| 其他非 `app` | `#/*` |

### `app` 文件夹

| 可引用文件夹 | 引用方式 |
| --- | --- |
| `public` | `public/*` |
| `shared` | `@/*` |
| `app` | 相对路径 |
| 其他 | `#/*` |

## 编码风格

初始阶段，暂无硬性要求，但需与已有代码尽量保持一致。
