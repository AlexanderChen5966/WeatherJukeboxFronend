import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  // ***** 請在這裡新增或修改 base 屬性 *****
  // 將 '/WeatherJukeboxFronend/' 替換為您 GitHub 儲存庫的實際名稱，
  // 且務必以斜線 '/' 開頭和結尾！
  base: '/WeatherJukeboxFronend/',
  // ***************************************

  plugins: [vue(), vueDevTools()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
