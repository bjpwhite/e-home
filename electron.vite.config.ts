import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
// import * as path from 'path'

export default defineConfig({
  main: {
    plugins: [vue(), externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/main/index.ts')
          // moments: resolve(__dirname, 'src/renderer/src/views/moments/main.ts'),
          // moments: resolve(__dirname, 'src/main/index.ts'),
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve('src/renderer/src'),
        '^': resolve('src/renderer/src/components')
      }
    }
  },
  preload: {
    plugins: [vue(), externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/preload/index.ts'),
          moments: resolve(__dirname, 'src/preload/index.ts'),
          tray: resolve(__dirname, 'src/preload/index.ts')
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve('src/renderer/src'),
        '^': resolve('src/renderer/src/components')
      }
    }
  },
  renderer: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__dirname, 'src/renderer/public/main.html'),
          moments: resolve(__dirname, 'src/renderer/public/moments.html'),
          tray: resolve(__dirname, 'src/renderer/public/tray.html')
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve('src/renderer/src'),
        '^': resolve('src/renderer/src/components')
      }
    },
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
})
