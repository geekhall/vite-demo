# Vue 3 + Typescript + Vite

_Read this in other languages:_
[_简体中文_](README.md)

This template should help get you started developing with Vue 3 and Typescript in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.

## Create project

```bash
npm init vite vite-demo -- --template vue-ts
# or
yarn create vite vite-demo --template vue-ts
```

## Add vue-router

### install
```bash
npm install vue-router@4
# or
yarn add vue-router@4
```

### modify vite.config.ts

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

Resolve error while executing `vite dev` :
```
failed to load config from /Users/yiny/workspace/vuejs/vite-demo/vite.config.ts
error when starting dev server:
TypeError: Cannot read properties of undefined (reading 'join')
```

Could not find module "path"

Resolve：

```bash
yarn add @types/node --save-dev
```


## Clean up generated file by default

Create file `public/css/reset.css`，and add content：
```css
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
```
Add `import '../public/css/reset.css'` to `main.ts`.

### create vscode global snippet:
```json
{
  "Print to console": {
    "prefix": "vue-ts-less",
    "body": [
      "<template></template>",
      "",
      "<script lang=\"ts\">",
      "import { defineComponent } from \"vue\";",
      "export default defineComponent({",
      "  components: {},",
      "  setup() {",
      "    return {};",
      "  },",
      "});",
      "</script>",
      "",
      "<style lang=\"less\" scoped>",
      "</style>",
      "$2"
    ],
    "description": "Vue-ts-less模板"
  }
}
delete all files in `src/assets` and `src/components`.

delete the content of `App.vue`, type `vue-ts-less` and `tab` key to generate new content.

```

## Add vuex

### Install
```bash
# 安装vuex，使用4.x版本
yarn add vuex@next --save
```
在src目录下创建`store/modules`目录，用于新建各个`moudle`，如`users.ts`：
```typescript
import { createStore } from "vuex";

export interface State { }

export const users = createStore<State>({
    state: () => ({}),
    getters: {},
    mutations: {},
    actions: {},
})
```

在 src 目录下创建 store/index.ts，添加如下内容：

```typescript
import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";
import type { App } from "vue";

// 引入对应的模块
import { users } from "./modules/users";

// 手动声明 state 类型
export interface State { }

// 定义注入类型
const key: InjectionKey<Store<State>> = Symbol();

const store = createStore<State>({
  state() { },
  mutations: {},
  actions: {},
  // 使用模块
  modules: { users },
});

// 将类型注入useStore，项目中引用的均为自定义的这个，覆盖了vuex提供的useStore
export function useStore() {
  return baseUseStore(key);
}

export function setupStore(app: App<Element>) {
  app.use(store, key);
}

export default store;

```

在`main.ts`中添加：
```typescript
import { createApp } from 'vue'
import { setupStore } from './store'
import App from './App.vue'

const app = createApp(App);
setupStore(app);
app.mount('#app');
```
## add vue-router

```bash
yarn add vue-router@next
# or
yarn add vue-router@4
```
功能包括：
* 嵌套路由映射
* 动态路由选择
* 模块化、基于组件的路由配置
* 路由参数、查询、通配符
* 展示由 Vue.js 的过渡系统提供的过渡效果
* 细致的导航控制
* 自动激活 CSS 类的链接
* HTML5 history 模式或 hash 模式
* 可定制的滚动行为
* URL 的正确编码

在`src`下新建`view`文件夹，添加`Home.vue`，和`Login.vue`：

* Home.vue
```vue
<template>
    <div>
        <h1>Home Page.</h1>
    </div>
</template>

<script lang="ts">

</script>

<style lang="less" scoped>
</style>
```

* Login.vue

```vue
<template>
    <div>
        <h1>Login Page.</h1>
    </div>
</template>

<script lang="ts">

</script>

<style lang="less" scoped>
</style>

```



修改`App.vue`，加上 `router-view` 标签作为路由占位符才会起作用

```vue
<template>
  <router-view></router-view>
</template>

<script lang="ts">
export default {
  name: "App",
};
</script>

<style lang="less" scoped>
</style>
```

修改`main.ts`:

```typescript
import { createApp } from "vue";
import { setupStore } from "./store";
import router, { setupRouter } from "./router";
import App from "./App.vue";

const app = createApp(App);

setupRouter(app);
setupStore(app);

router.isReady().then(() => {
  app.mount("#app");
});

```

## 添加element plus支持

### 安装

```bash
yarn add element-plus
```

### 完整导入(不推荐)

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```typescript
// main.ts
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
```
### 自动导入（推荐）

首先你需要安装unplugin-vue-components 和 unplugin-auto-import这两款插件

```
yarn add unplugin-vue-components unplugin-auto-import
```

版本：

```json
    "element-plus": "^1.3.0-beta.9",
    "unplugin-auto-import": "^0.5.11",
    "unplugin-vue-components": "^0.17.15",
```

修改`vite.config.ts`：

```typescript
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import path from "path";
const resolve = (dir: string) => path.join(__dirname, dir);

export default defineConfig({
  plugins: [vue(),
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),],
  resolve: {
    alias: {
      "@/": resolve("src/*"),
      comps: resolve("src/components"),
      store: resolve("src/store"),
    },
  },
})

```


在`src`文件夹下添加`libs/element-plus.ts`，添加如下内容：

```typescript
import type { App } from "vue";
import { ElButton } from 'element-plus'

const components = [ElButton];

export function setupElem(app: App<Element>): void {
    components.forEach((component: any) => {
      app.use(component);
    });
  }
```

修改main.ts，添加如下内容：

```typescript
import { createApp } from "vue";
import { setupStore } from "./store";
import router, { setupRouter } from "./router";
import { setupElem } from "./libs/element-plus";  // ++
import App from "./App.vue";

const app = createApp(App);

setupRouter(app);
setupStore(app);
setupElem(app);  // ++

router.isReady().then(() => {
  app.mount("#app");
});
```


## less/sass/scss loader

### 安装

```bash
yarn add sass
yarn add node-sass
yarn add sass-loader
```

版本：

```

    "node-sass": "^7.0.1",
    "sass": "^1.49.0",
    "sass-loader": "^12.4.0",
```

### 添加主题切换功能





## run

```bash
yarn
yarn dev
```