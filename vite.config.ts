import { defineConfig } from 'vite'
import vitePluginImp from "vite-plugin-imp"; // ++
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import path from "path";
const resolve = (dir: string) => path.join(__dirname, dir);

export default defineConfig({
  plugins: [
    vue(),
    vitePluginImp({
      libList: [
        {
          libName: "ant-design-vue",
          // style: (name) => `ant-design-vue/es/${name}/style/css`, // 加载css
          style: (name) => `ant-design-vue/es/${name}/style`, // 加载less
        },
      ],
    }),
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),],
    css: {
      preprocessorOptions: {
        less: {
          // 自定义定制主题
          modifyVars: { "primary-color": "#1188ff" },
          javascriptEnabled: true,
        },
      },
    },
  resolve: {
    alias: {
      "@/": resolve("src/*"),
      comps: resolve("src/components"),
      store: resolve("src/store"),
    },
  },
})
