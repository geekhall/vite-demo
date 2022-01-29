import { defineConfig } from 'vite'
// import { resolve} from 'path'
import vue from '@vitejs/plugin-vue'

// function pathResolver(dir: string) {
//   return resolve(__dirname, ".", dir);
// }
// module.export = {}
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
})
