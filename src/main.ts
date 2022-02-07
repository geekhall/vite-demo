import { createApp, Vue} from 'vue';

// Vuex 配置 （换成pinia）
// import { setupStore } from "./store";
// import store from './store/index'

// Vue-router配置
import router, { setupRouter } from "./router";

// ElementUI配置
import { setupElem } from "./libs/element-plus";  // ++

// Ant-Design-Vue配置
import Button from 'ant-design-vue/lib/button'; // 按需
// import 'ant-design-vue/lib/button/style/css';  // bug?或者 ant-design-vue/lib/button/style/css 加载 css 文件
// import Antd from 'ant-design-vue'; // 全部引入(不推荐)


import { setupAntd } from "./libs/antdv";  // ++
import App from "./App.vue";
import 'ant-design-vue/dist/antd.css';
import './assets/css/global.css';
import './assets/css/normalize.css';
import './assets/css/index.scss';
import { createPinia } from 'pinia'
import svgIcon from './icons/index.vue'

// Vue.config.productionTip = false;

const app = createApp(App)
// 创建pinia实例
const pinia = createPinia()

setupRouter(app);     // 装载Router
// setupStore(app);   // 装载Vuex
setupElem(app);       // 装载ElementUI
setupAntd(app);       // 装载AntDesignVue
app.use(pinia)        // 挂载Pinia到app

// app.use(Antd);

router.isReady().then(() => {
  app.component('svg-icon', svgIcon).mount("#app");
});

