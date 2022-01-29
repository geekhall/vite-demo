import { createApp } from "vue";
import { setupStore } from "./store";
import router, { setupRouter } from "./router";
import store from './store/index'
import { setupElem } from "./libs/element-plus";  // ++
import Vue from 'vue';
// import Button from 'ant-design-vue/lib/button'; // 按需
// import 'ant-design-vue/lib/button/style';  // 或者 ant-design-vue/lib/button/style/css 加载 css 文件
import Antd from 'ant-design-vue'; // 全部引入
import App from "./App.vue";
import 'ant-design-vue/dist/antd.css';
// Vue.config.productionTip = false;

const app = createApp(App);

setupRouter(app);
setupStore(app);
setupElem(app);  // ++

app.use(Antd);

router.isReady().then(() => {
  app.mount("#app");
});

