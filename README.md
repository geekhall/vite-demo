# Vue 3 + Typescript + Vite

_Read this in other languages:_
[_English_](README.en-US.md),
[_日本語_](README.ja-JP.md)

## 创建工程

```bash
npm init vite vite-demo --template vue-ts
# or
yarn create vite vite-demo --template vue-ts
```

## 添加`vue-router`路由功能

### 安装

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

新建`src/assets/css/reset.css`，添加如下内容，并在main.ts添加`import './assets/css/reset.css';`引入：
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
```

将 `src/assets` 和 `src/components`目录下的所有文件都删除。

清空`App.vue`，并使用`vue-ts-less`生成新的内容后保存。

## 添加 `vuex` 功能

### 安装
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


## 添加 `Pinia` 支持

Pinia可以替代Vuex

### 安装

```bash
yarn add pinia
```

### 使用

在`main.ts`中添加：

```typescript
// 导入pinia
import { createPinia } from 'pinia'

// 创建pinia实例
const pinia = createPinia()

// 挂载pinia
app.use(pinia)

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
## 添加Ant Design Vue 支持

### 安装
```bash

```

### 在`main.ts`完整引入（不推荐）

```typescript
import { createApp } from 'vue';
import Antd from 'ant-design-vue';
import App from './App';
import 'ant-design-vue/dist/antd.css'; // 要引入才有样式

const app = createApp();
app.config.productionTip = false;

app.use(Antd);
```

### 局部导入

```typescript
import { createApp } from 'vue';
import { Button } from 'ant-design-vue';
import 'ant-design-vue/es/button/style'; //同样要引入less样式
import "ant-design-vue/es/button/style/css"; // 加载 CSS

import App from './App';

const app = createApp(App);

app.use(Button).mount('#app');
```

### 按需导入

* 安装vite-plugin-imp（会报找不到css的问题，暂不使用）

```bash
# -D / --dev 指开发依赖，会加到package.json的devDependencies中
yarn add vite-plugin-imp -D
```

`vite.config.ts`中添加：

```ts
import vitePluginImp from "vite-plugin-imp"; // ++

vitePluginImp({
  libList: [
    {
      libName: "ant-design-vue",
      // style: (name) => `ant-design-vue/es/${name}/style/css`, // 加载css
      style: (name) => `ant-design-vue/es/${name}/style`, // 加载less
    },
  ],
}),
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

### 添加Elementplus icon

```
# 添加Elementplus icon
yarn add @element-plus/icons-vue
yarn add unplugin-element-plus

# 安装 vite-plugin-style-import
yarn add vite-plugin-style-import
```

`vite.config.ts` 文件添加：

```ts
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// yarn add unplugin-element-plus
import ElementPlus from 'unplugin-element-plus/vite'

plugins: [
  Components({
      dts: true,
      resolvers: [
        // auto import icons
        // https://github.com/antfu/vite-plugin-icons
        IconsResolver({}),
	      ElementPlusResolver()
      ]
    }),
    // https://github.com/antfu/vite-plugin-icons
    Icons(),
    ElementPlus({}),
    //...

```

这样所有出现过的`element`标签都会自动在`components.d.ts`中去并注册为全局组件

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

## 添加 axios 功能

`Axios` 是一个基于 `Promise` 的 HTTP 库，
用于替代Ajax发送`GET`和`POST`请求。

* 可以在浏览器中发送 XMLHttpRequests
* 可以在 node.js 发送 http 请求
* 支持 Promise API
* 拦截请求和响应
* 转换请求数据和响应数据
* 能够取消请求
* 自动转换 JSON 数据
* 客户端支持保护安全免受 XSRF 攻击

### 安装

```bash
yarn add axios
```

### 封装

在 `src` 目录下新建 `src/service/request.ts`，添加如下内容，对axios进行二次封装：

```typescript
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { message } from 'ant-design-vue'
import { useRouter } from "vue-router"

const router = useRouter()

export function request(config: AxiosRequestConfig) {
    // 1 创建实例
    const instance = axios.create({
        baseURL: "xxx",
        timeout: 5000,
        headers: {
            "Content-Type": "application/json",
        },
    });
    // 2 拦截器
    // 请求拦截
    instance.interceptors.request.use(
        (config) => {
            message.loading();
            return config;
        },
        (err) => {
            console.log(err);
        }
    );
    // 响应拦截
    instance.interceptors.response.use((response: AxiosResponse<any>) => {
        message.destroy();
        return response.data;
    }),
        (error: any) => {
            if (error?.response) {
                switch (error.response.status) {
                    case 400: message.error('请求错误(400)'); break;
                    case 401: router.push({ name: 'login' }); break;
                    case 403: message.error('拒绝访问(403)'); break;
                    case 404: message.error('请求出错(404)'); break;
                    case 408: message.error('请求超时(408)'); break;
                    case 500: message.error('服务器错误(500)'); break;
                    case 501: message.error('服务未实现(501)'); break;
                    case 502: message.error('网络错误(502)'); break;
                    case 503: message.error('服务不可用(503)'); break;
                    case 504: message.error('网络超时(504)'); break;
                    case 505: message.error('HTTP版本不受支持(505)'); break;
                    default: message.error(`连接出错(${error.response.status})!`);
                }
            } else {
                message.error('连接服务器失败!');
            }
            message.destroy();
            console.log(error);
        };
    // 3 返回实例，instance本身就是一个pormise
    return instance(config);
}

```

在service文件夹下新建api文件夹，分模块整合api：

```typescript
import { request } from "../request";

export function getUserInfo() {
    return request({
        url: `/element-test`,
        method: 'get',
        data: {},
        params: {}
    });
}


```

添加`AxiosTest.vue`，在使用该api的文件中直接引入即可，并配置router

```vue
<template>
  <el-button @click="test">测试</el-button>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getUserInfo } from "../service/api/user";

export default defineComponent({
  setup() {
    const test = async () => {
      await getUserInfo().then((res: any) => {
        console.log(res.data);
      });
    };
    return { test };
  },
});
</script>

<style>
</style>

```

配置`router`:

```typescript

// 导入对应的模块
const Home = () => import("../view/Home.vue");
const Login = () => import("../view/Login.vue");
const ElementTest = () => import("../view/ElementTest.vue");
const AntTest = () => import("../view/AntTest.vue");
const AxiosTest = () => import("../view/AxiosTest.vue");

// 写路由
const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/element-test", component: ElementTest },
  { path: "/ant-test", component: AntTest },
  { path: "/axios-test", component: AxiosTest },
];

```
访问测试页面URL：`http://localhost:3000/axios-test`

点击测试按钮后可以看到控制台向`http://localhost:3000/xxx/element-test`发送了请求。

## 安装Moke工具

mock 模拟数据我们选用 `mockjs` 插件，vite 中需要安装 `vite-plugin-mock` 插件。

### 安装

```bash
yarn add mockjs
yarn add vite-plugin-mock -D
```

### 在配置文件中引用插件
编辑`vite.config.ts`， 添加：
```typescript
import { viteMockServe } from 'vite-plugin-mock' //++

plugins: [
    viteMockServe({
      mockPath: "./src/mock",
      supportTs: true,
    }), // MockJS
]
```

### 使用Mock

在src下新建mock文件夹，新建`index.ts`文件，添加如下内容：

```typescript
import { MockMethod } from 'vite-plugin-mock'
import * as fs from 'fs'

const appData = JSON.parse(fs.readFileSync('./src/mock/data.json', 'utf8'))
const seller = appData.seller
const goods = appData.goods
const ratings = appData.ratings

export default [
  {
    url: '/api/getUser',
    method: 'get',
    response: () => {
      return {
          code: 200,
          message: 'ok',
          data: ['tom', 'jerry']
      };
    }
  },
  // ...
  {
    // http://localhost:3000/api/seller
    url: '/api/seller',
    method: 'get',
    response: () => {
      return {
          code: 200,
          message: 'ok',
          data: seller
      };
    }
  }
] as MockMethod[]
```

使用postman或者浏览器访问：http://localhost:3000/api/getList，即可看到返回结果

可以安装Chrome插件[JSONVue](https://chrome.google.com/webstore/detail/jsonvue/chklaanhfefbnpoihckbnefhakgolnmc/related)来美化返回的JSON结果


## 安装并使用ESLint和Prettier

```bash
# 安装eslint
sudo npm install -g eslint

# 初始化（生成.eslintrc.js文件）
eslint --init

# 安装Prettier
yarn add prettier -D

```

找到一个`.vue`文件，点击鼠标右键，选择`使用...格式化文档`，配置默认格式化程序，
选择Prettier。

工程下新建`.prettierrc`文件，输入如下内容：
```json
{
    "semi": false,
    "singleQuote": true,
    "trailingComma": "none"
}
```

在`.eslintrc.js`文件的`rules`中添加如下内容，解决同Prettier规则冲突问题
```json
idnent: 0,
'space-before-function-paren': 0
```

然后在 `.vue`或者`.ts`文件中保存时就会使用`Prettier`自动格式化代码了。
### 解决VSCode中`.vue`后缀的文件爆红问题

Code => 首选项 => 设置 => 搜索vetur，将下面的三个选项勾选掉即可：

![](https://gitee.com/geekhall/pic/raw/main/img/20220204134200.png)

## 使用Commitizen规范git提交

### 安装依赖

`cz-customizable`是作为`commitizen`的插件使用。

`commitlint/config-conventional`和`@commitlint/cli`以及`husky`进行强制git代码提交规范检查。

```bash
sudo npm install -g commitizen
yarn add -D commitizen \
  cz-conventional-changelog \
  @commitlint/config-conventional \
  @commitlint/cli \
  husky \
  standard-version \
  cz-customizable

# or
npm install --save-dev \
  @commitlint/config-conventional \
  @commitlint/cli

npm install husky --save-dev
```

### 配置

1. 在`package.json`中配置`commitizen`和`cz-customizable`新增如下内容：

```json
"config": {
  "commitizen": {
    "path": "node-modules/cz-customizable"
  }
}
```

2. 在根目录新建`.cz-config.js`文件并写入配置，之后就可以使用`git cz` 来代替`git commit`

```js
module.exports = {
  // 可选类型
  types: [
    { value: 'feat', name: 'feat:     新功能' },
    { value: 'fix', name: 'fix:      修复' },
    { value: 'docs', name: 'docs:     文档变更' },
    { value: 'style', name: 'style:    代码格式(不影响代码运行的变动)' },
    {
      value: 'refactor',
      name: 'refactor: 重构(既不是增加feature，也不是修复bug)'
    },
    { value: 'perf', name: 'perf:     性能优化' },
    { value: 'test', name: 'test:     增加测试' },
    { value: 'chore', name: 'chore:    构建过程或辅助工具的变动' },
    { value: 'revert', name: 'revert:   回退' },
    { value: 'build', name: 'build:    打包' }
  ],
  // 消息步骤
  messages: {
    type: '请选择提交类型:',
    customScope: '请输入修改范围(可选):',
    subject: '请简要描述提交(必填):',
    body: '请输入详细描述(可选):',
    footer: '请输入要关闭的issue(可选):',
    confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
  },
  // 跳过问题
  skipQuestions: ['body', 'footer'],
  // subject文字长度默认是72
  subjectLimit: 72
}
```

3. 初始化husky文件

```
npx husky install
```

在`package.json`中的`"scripts"`部分添加如下内容：

```json
"prepare": "husky install"
```

然后运行：

```bash
yarn prepare
# or
npm run prepare
```

运行`npx husky add .husky/commit-msg`，然后在生成的
`commit-msg`文件中添加：

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no-install commitlint --edit
```

husky就配置完成了

这时使用`git commit -m "新功能"`提交会报错：
```
✖   subject may not be empty [subject-empty]
✖   type may not be empty [type-empty]
```

使用：`git commit -m "feat: 新功能"` 提交就会成功。


在`package.json` 中添加如下配置：
```json
"lint-staged": {
    "src/**/*.{ts,js,vue}" : [ // src 目录下的所有js，ts和vue文件
      "eslint --fix",          // 自动修复
      "git add"                // 自动提交时修复
    ]
  }
```

## 修改vetur snippets模板

修改`user/.vscode/extensions/octref.vetur-0.35.0/server/dist/veturSnippets`下的`default.vue`

```ts
<template>${0}</template>

<script lang="ts" setup></script>

<style lang="scss" scoped></style>
```

可以使用`<vue`执行新Vue文件的snippets。

## 添加SVG图标支持

### 安装

```bash
yarn add svg-sprite-loader -D
# or
npm install svg-sprite-loader -D
```



### 添加icons文件夹及相关文件

在`@/src`里面创建`icons`文件夹，里面创建`index.vue`(`svgicon`的模板文件),
`index.ts`(`svgicon`的`js`逻辑), `svg`文件夹(`svg`图标存放的地址)

这部分需要用到fs模块，所以需要：

```bash
yarn add fs
# 或者
npm install fs
```

### 配置`vite.config.ts`

添加：

```ts
import { createSvg } from './src/icons/index'

export default defineConfig({
    plugins: [
      vue(),
      createSvg('./src/icons/svg/')
     ]
})
```

### 在main.ts中写入svg-icon 模板

```ts
import svgIcon from './icons/index.vue'

app.component('svg-icon', svgIcon)

```

## 配置代理解决跨域问题

本地开发环境通过代理实现跨域，生产环境使用 nginx 转发

正则表达式写法，这里是通过请求/api 来转发到 http://localhost:8000/

比如请求地址：`http://localhost:3000/api/account/img_captcha/`

通过代理转发至后端的`http://localhost:8000/account/img_captcha/`

`vite.config.ts`:

```ts
export default defineConfig({
  plugins: [
    vue(),
    // ...
  ],
  server: {
      port: '3000',
      open: true, //自动打开
      base: "./ ", //生产环境路径
      proxy: {
        '/api': {
          target: 'http://localhost:8000', // 后端服务实际地址
          changeOrigin: true, // 开启代理
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
```