import { createRouter, createWebHistory } from "vue-router";
import type { App } from "vue";

// 导入对应的模块
const Home = () => import("../view/Home.vue");
const Login = () => import("../view/login/index.vue");
const ElementTest = () => import("../view/ElementTest.vue");
const AntTest = () => import("../view/AntTest.vue");
const AxiosTest = () => import("../view/AxiosTest.vue");
const Header = () => import("../view/Header.vue");
const Test = () => import("../view/Test.vue");
const RadioButtonSample = () => import("../view/RadioButtonSample.vue");
const V3Demo = () => import("../view/V3Demo.vue");
const V3Demo1 = () => import("../view/V3Demo1.vue");
const V3Demo2 = () => import("../view/V3Demo2.vue");
const V3Demo3 = () => import("../view/V3Demo3.vue");
const CartDemo = () => import("../view/cart-demo/ShoppingCartApp.vue");

// 写路由
const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/element-test", component: ElementTest },
  { path: "/ant-test", component: AntTest },
  { path: "/axios-test", component: AxiosTest },
  { path: "/header", component: Header },
  { path: "/test", component: Test },
  { path: "/radio-button", component: RadioButtonSample },
  { path: "/v3demo", component: V3Demo },
  { path: "/v3demo1", component: V3Demo1 },
  { path: "/v3demo2", component: V3Demo2 },
  { path: "/cart-demo", component: CartDemo },
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

