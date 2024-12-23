---
title: Contributing
description: A guide to answer How to contribute to OpenBuild Official Website front-end project.
---

We're delighted to have you here!

You must be interested in contributing your intelligence to this project or learning necessary skills from the project's code, right?

Before you start making a difference, to ensure smooth participation and asynchronous collaboration, please read all the following content in order (if you have seen and are familiar with them, you can skip):

- [Code of Conduct](https://openbuildxyz.github.io/eco/guides/code-of-conduct/)
- [Asynchrony Collaboration](https://github.com/openbuildxyz/.github/blob/main/docs/collaboration/en.md)
- [Technology Stack](#technology-stack)
- [Environment Setup](#environment-setup)
- [Directory Structure](#directory-structure)
- [File References](#file-references)
- [Coding Style](#coding-style)

Let's get started!

## Technology Stack

The entire project relies on [React](https://react.dev/), [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/) as the underlying dependencies, and other libraries mainly used include:

- Utilities
  - [Lodash](https://lodash.com/)
  - [validator.js](https://github.com/validatorjs/validator.js)
  - [Nano ID](https://zelark.github.io/nano-id-cc/)
- Data handling
  - [React Redux](https://react-redux.js.org/)
  - [React Hook Form](https://www.react-hook-form.com/)
- UI
  - [Heroicons](https://heroicons.com/)
  - [Headless UI](https://headlessui.com/v1)
  - [daisyUI](https://daisyui.com/)
  - [styled-components](https://styled-components.com/)
  - [NextUI](https://nextui.org/)
  - [ByteMD](https://bytemd.js.org/)
  - [SurveyJS](https://surveyjs.io/)
- Animation
  - [aos](https://michalsnik.github.io/aos/)
  - [Animate.css](https://animate.style/)
  - [Framer Motion](https://www.framer.com/motion/)
- Web3
  - [RainbowKit](https://www.rainbowkit.com/)
  - [Wagmi](https://wagmi.sh/)

## Environment Setup

Ensure that your local Node.js version matches the one specified in the `engines` field of the `package.json` file.

Install dependencies using a package manager in the root directory, and it is recommended to use [pnpm](https://pnpm.io).

Execute `cp .env.example .env` or `cp .env.example .env.local` in the root directory to properly inject the environment variables needed for running the application:

| Variable Name | Purpose | Required |
| --- | --- | --- |
| `NEXT_PUBLIC_API_BASE_URL` |  | Yes |
| `NEXT_PUBLIC_APP_URL` |  | Yes |
| `NEXTAUTH_URL` |  | Yes |
| `NEXTAUTH_SECRET` |  | Yes |
| `NEXT_PUBLIC_GITHUB_ID` |  | When using GitHub account authorization |
| `NEXT_PUBLIC_GOOGLE_ID` |  | When using Google account authorization |
| `NEXT_PUBLIC_ASPECTA_ID` |  | When displaying data from [Aspecta](https://aspecta.id) |
| `NEXT_PUBLIC_GA_ID` |  | For traffic statistics |
| `NEXT_PUBLIC_GA_KEY` |  | - |

After setting the corresponding environment variables as needed, execute the `start` command in npm scripts (e.g., `pnpm start`) to start the application locally and begin debugging!

## Directory Structure

Although this project is developed based on Next.js, the file organization avoids using its default recommended directory structure, as well as the common directory structure seen in other front-end projects.

Instead, a "modular" directory structure guided by domain-driven design principles is adopted, with some compatibility adaptations made according to the limitations of Next.js:

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

In this way, the importance of the [`app`](https://nextjs.org/docs/app) is greatly diminished, relegating it to a more straightforward role of URL and view routing, while the responsibilities of the other folders are as follows:

- `shared` - Scripts, styles, images, etc., that are unrelated to specific business or pages, essentially globally reusable;
- `domain` - Scripts, styles, images, etc., related to specific business, focusing on business logic processing and rendering of associated data, split by business domain;
- `entry` - Scripts, styles, images, etc., related to specific pages, focusing on pure page rendering and interaction.

As the entire project's directory structure is still under reconstruction, you will see folders in the `src` folder that are not listed above; when developing new features, it is important to avoid adding new content to legacy code and instead follow the directory structure outlined above.

**Before officially submitting code, please carefully review and understand the above directory structure.**

## File References

To avoid confusing dependency relationships and circular dependencies, there are restrictions on file references, with the basic rules being:

1. For folders `src/*`, use relative paths when the `*` parts are the same;
2. When different, use `@/*` for the `shared` folder, and `#/*` for others;
3. Use `public/*` for files under the `public` folder;
4. The "purity" order of `src/*` folders (excluding legacy directory structures) is `shared` > `domain` > `entry` > `app`, with "purer" folders prohibited from referencing "impurer" ones.

Detailed reference rules for `src/*` folders (excluding legacy directory structures) are as follows:

### `shared` Folder

| Permissible Folders | Reference Method |
| --- | --- |
| `public` | `public/*` |
| `shared` | Relative Path |

### `domain` Folder

| Permissible Folders | Reference Method |
| --- | --- |
| `public` | `public/*` |
| `shared` | `@/*` |
| `domain` | Relative Path |
| Others not `entry` and `app` | `#/*` |

### `entry` Folder

| Permissible Folders | Reference Method |
| --- | --- |
| `public` | `public/*` |
| `shared` | `@/*` |
| `entry` | Relative Path |
| Others not `app` | `#/*` |

### `app` Folder

| Permissible Folders | Reference Method |
| --- | --- |
| `public` | `public/*` |
| `shared` | `@/*` |
| `app` | Relative Path |
| Others | `#/*` |

## Coding Style

In the initial stage, there are no hard requirements, but it is necessary to maintain consistency with the existing code as much as possible.
