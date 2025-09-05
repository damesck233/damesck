import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 5175,
    // 服务器压缩
    // cors: true,
    open: false,
    'proxy': {
      '/api': {
        target: 'https://blog.damesck.net',
        changeOrigin: true,
        rewrite: (path) => {
          console.log(path)
          return path;
        },
      },
    }
  },
  build: {
    // 生产环境优化
    target: 'es2015',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,  // 移除console
        drop_debugger: true, // 移除debugger
        pure_funcs: ['console.log', 'console.info'], // 移除特定函数调用
        passes: 2 // 多次优化
      },
      mangle: {
        safari10: true // 兼容Safari 10
      },
      format: {
        comments: false // 删除注释
      }
    },
    cssMinify: true, // 压缩CSS
    assetsInlineLimit: 4096, // 小于4kb的资源内联为base64
    rollupOptions: {
      output: {
        // 代码分割优化
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'motion': ['framer-motion'],
          'icons': ['@heroicons/react'],
          'utils': ['./src/utils/preloader.ts']
        },
        // 减少大型chunk
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // 资源文件大小警告限制
    chunkSizeWarningLimit: 1200
  },
  optimizeDeps: {
    // 预构建优化
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'framer-motion',
      '@heroicons/react/24/outline'
    ],
    exclude: [] // 排除不需要预构建的依赖
  },
  // 开启预览配置
  preview: {
    port: 5174
  },
  // 优化缓存
  cacheDir: 'node_modules/.vite',
  // 加快冷启动
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
})
