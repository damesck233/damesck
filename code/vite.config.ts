import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5174
  },
  build: {
    // 生产环境优化
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // 移除console
        drop_debugger: true  // 移除debugger
      }
    },
    rollupOptions: {
      output: {
        // 代码分割
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'motion': ['framer-motion'],
          'icons': ['@heroicons/react']
        }
      }
    },
    // 资源文件大小警告限制
    chunkSizeWarningLimit: 1000
  },
  optimizeDeps: {
    // 预构建优化
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion']
  }
})
