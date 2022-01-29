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


## 清理默认生成的工程

新建`public/css/reset.css`，添加如下内容，并在main.ts添加`import '../public/css/reset.css'`引入：
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

新建vscode全局Snippet代码块
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
将 `src/assets` 和 `src/components`目录下的所有文件都删除。

清空`App.vue`，并使用`vue-ts-less`生成新的内容后保存。


```

## add vuex

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

