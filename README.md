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