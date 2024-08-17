import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    // port:5000,
    cors: true,
    proxy: {
      // 配置跨域
      '/api': {
        // target: 'http://my.mcdd.top:9527/',
        target: 'http://localhost:8080/', // 根据需求替换 请求后台接口
        changeOrigin: true, // 允许跨域
        ws: true, // 是否代理websockets
        rewrite: (path) => path.replace(/^\/api/, '') // 重写请求路径，去掉/api
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
