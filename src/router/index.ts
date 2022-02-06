import { createRouter, createWebHistory } from "vue-router";
import type { App } from "vue";

// 导入对应的模块
const Home = () => import("../view/Home.vue");
const Login = () => import("../view/login/Index.vue");
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
const User = () => import("../view/User.vue");
const UserProfile = () => import("../view/UserProfile.vue");
const UserPosts = () => import("../view/UserPosts.vue");
const UserDashboard = () => import("../view/UserDashboard.vue");
const UserSetting = () => import("../view/UserSetting.vue");

// 写路由
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  { path: "/login", component: Login },
  { path: '/user/:id',
  component: User,
  children: [
    {
      // 当 /user/:id/profile 匹配成功
      // UserProfile 将被渲染到 User 的 <router-view> 内部
      path: 'profile',
      name: 'UserProfile',
      component: UserProfile,
    },
    {
      // 当 /user/:id/posts 匹配成功
      // UserPosts 将被渲染到 User 的 <router-view> 内部
      path: 'posts',
      name: 'UserPosts',
      component: UserPosts,
    },
    {
      // 当 /user/:id/dashboard 匹配成功
      // UserDashboard 将被渲染到 User 的 <router-view> 内部
      path: 'dashboard',
      name: 'UserDashboard',
      component: UserDashboard,
    },
    {
      // 当 /user/:id/setting 匹配成功
      // UserSetting 将被渲染到 User 的 <router-view> 内部
      path: 'setting',
      name: 'UserSetting',
      component: UserSetting,
    },
  ]
  },
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

