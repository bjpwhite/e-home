// electron.vite.config.ts
import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
var __electron_vite_injected_dirname = "G:\\Pro\\e-home";
var electron_vite_config_default = defineConfig({
  main: {
    plugins: [vue(), externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__electron_vite_injected_dirname, "src/main/index.ts")
        }
      }
    },
    resolve: {
      alias: {
        "@": resolve("src/renderer/src"),
        "^": resolve("src/renderer/src/components")
      }
    }
  },
  preload: {
    plugins: [vue(), externalizeDepsPlugin()],
    build: {
      rollupOptions: {
        input: {
          index: resolve(__electron_vite_injected_dirname, "src/preload/index.ts"),
          moments: resolve(__electron_vite_injected_dirname, "src/preload/index.ts"),
          tray: resolve(__electron_vite_injected_dirname, "src/preload/index.ts")
        }
      }
    },
    resolve: {
      alias: {
        "@": resolve("src/renderer/src"),
        "^": resolve("src/renderer/src/components")
      }
    }
  },
  renderer: {
    build: {
      rollupOptions: {
        input: {
          index: resolve(__electron_vite_injected_dirname, "src/renderer/public/main.html"),
          moments: resolve(__electron_vite_injected_dirname, "src/renderer/public/moments.html"),
          tray: resolve(__electron_vite_injected_dirname, "src/renderer/public/tray.html")
        }
      }
    },
    resolve: {
      alias: {
        "@": resolve("src/renderer/src"),
        "^": resolve("src/renderer/src/components")
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
});
export {
  electron_vite_config_default as default
};
