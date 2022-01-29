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
