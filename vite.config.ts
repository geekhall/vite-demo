import { defineConfig } from 'vite'
// import vitePluginImp from "vite-plugin-imp"; // ++

// yarn add unplugin-icons
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// yarn add unplugin-element-plus
import ElementPlus from 'unplugin-element-plus/vite'

import vue from '@vitejs/plugin-vue'

import { createSvg } from './src/icons/index'

// Mock config
import { viteMockServe } from 'vite-plugin-mock' //++
import path from 'path'
import styleImport from 'vite-plugin-style-import'
const resolve = (dir: string) => path.join(__dirname, dir)

export default defineConfig({
  plugins: [
    vue(),
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
    createSvg('./src/icons/svg/'),
    styleImport({
      libs: [
        {
          libraryName: 'element-plus',
          esModule: true,
          ensureStyleFile: true,
          resolveStyle: (name) => {
            return `element-plus/lib/theme-chalk/${name}.css`
          },
          resolveComponent: (name) => {
            return `element-plus/lib/${name}`
          }
        }
      ]
    }),
    // vite-plutgin-imp 有下面的问题，暂时不使用
    // [vite-plugin-imp] element-plus/es/components/button/style/css.js is not found!
    // [vite-plugin-imp] If you think this is a bug, feel free to open an issue on https://github.com/onebay/vite-plugin-imp/issues
    //
    //
    // vitePluginImp({
    //   libList: [
    //     {
    //       libName: "ant-design-vue",
    //       // style: (name) => `ant-design-vue/es/${name}/style/css`, // 加载css
    //       style: (name) => `ant-design-vue/es/${name}/style`, // 加载less
    //     },
    //   ],
    // }),
    viteMockServe({
      mockPath: './src/mock', // mock 文件地址
      supportTs: true // 支持TS，打开后将无法监视js
    }), // MockJS
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 自定义定制主题
        modifyVars: { 'primary-color': '#1188ff' },
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      '@/': resolve('src/*'),
      '~': path.resolve(__dirname, 'src'),
      comps: resolve('src/components'),
      store: resolve('src/store')
    }
  },
  server: {
    port: '3000',
    open: true, //自动打开
    base: './ ', //生产环境路径
    proxy: {
      // 本地开发环境通过代理实现跨域，生产环境使用 nginx 转发
      // 正则表达式写法
      //这里是通过请求/api 来转发到 https://api.xxx.com/
      //假如你要请求https://api.xxx.com/a/a
      //那么axios的url，可以配置为 /api/a/a

      // 这里下面的写法表示直接将'/api/xxx'转发至'http://localhost:8000/api/xxx'
      // 例如：
      // http://localhost:3000/api/account/img_captcha/
      // 会转发到：↓
      // http://localhost:8000/api/account/img_captcha/
      // '/api': 'http://localhost:8000/'

      // 而下面这种写法会使用rewrite功能去掉网址中的'/api'
      // 例如：
      // http://localhost:3000/api/account/img_captcha/
      // 会转发到：↓
      // http://localhost:8000/account/img_captcha/
      '/api': {
        target: 'http://localhost:8888', // 后端服务实际地址
        changeOrigin: true, // 开启代理换源功能，服务器端接收到的请求源为localhost:8888
        // ws: true,        // 支持websocket
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
