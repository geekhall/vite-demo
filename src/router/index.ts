import { createRouter, createWebHistory } from "vue-router";
import type { App } from "vue";

// 导入对应的模块
const Home = () => import("../view/Home.vue");
const Login = () => import("../view/Login.vue");
const Test = () => import("../view/Test.vue");

// 写路由
const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
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
