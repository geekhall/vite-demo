# Vue 3 + Typescript + Vite

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

## Create

```bash
npm init vite vite-demo -- --template vue-ts
# or
yarn create vite vite-demo --template vue-ts
```

## Add router

```bash
npm install vue-router@4
# or
yarn add vue-router@4
```

## run

```bash
yarn
yarn dev
```

## add vue-router

```bash
yarn add vue-router@next
# or
yarn add vue-router@4
```

## add vuex

```bash
yarn add vuex@next
```

## 修改vite.config.ts

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
const resolve = (dir: string) => path.join(__dirname, dir);

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@/": resolve("src/*"),
      comps: resolve("src/components"),
      store: resolve("src/store"),
    },
  },
})

```

执行`vite dev`时报错
```
failed to load config from /Users/yiny/workspace/vuejs/vite-demo/vite.config.ts
error when starting dev server:
TypeError: Cannot read properties of undefined (reading 'join')
```

找不到模块“path”或其相应的类型声明；找不到名称“__dirname”

解决方法：
```bash
yarn add @types/node --save-dev
```


