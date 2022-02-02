import { createRouter, createWebHistory } from "vue-router";
import type { App } from "vue";

// 导入对应的模块
const Home = () => import("../view/Home.vue");
const Login = () => import("../view/Login.vue");
const ElementTest = () => import("../view/ElementTest.vue");
const AntTest = () => import("../view/AntTest.vue");
const AxiosTest = () => import("../view/AxiosTest.vue");
const Header = () => import("../view/Header.vue");
const Test = () => import("../view/Test.vue");

// 写路由
const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/element-test", component: ElementTest },
  { path: "/ant-test", component: AntTest },
  { path: "/axios-test", component: AxiosTest },
  { path: "/header", component: Header },
  { path: "/test", component: Test },
];

const router = createRouter({
  // createWebHashHistory (hash路由)
  // createWebHistory (history路，需要服务器配置支持)
  // createMemoryHistory 带缓存 history 路由
  // 添加baseUrl，createWebHistory(baseUrl)
  history: createWebHistory(),
  routes,
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}

export default router;

