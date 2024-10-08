import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// import compression from 'vite-plugin-compression2'

const pathSrc = path.resolve(__dirname, 'src')
const env = loadEnv('', process.cwd())
export default defineConfig({
  base: env.VITE_SUB_DOMAIN,
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.ts', 'src/**/*.vue', 'src/*.ts', 'src/*.vue'],
      cache: false,
      fix: true
    }),
    AutoImport({
      imports: ['vue'],
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          prefix: 'Icon'
        })
      ],
      dts: path.resolve(pathSrc, 'auto-imports.d.ts')
    }),
    Components({
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          enabledCollections: ['ep']
        })
      ],
      dts: path.resolve(pathSrc, 'components.d.ts')
    }),
    Icons({
      autoInstall: true
    }),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
      symbolId: 'icon-[dir]-[name]'
    })
    // compression({
    //   threshold: 20 * 1024 // 对大于20kb的文件进行压缩
    // })
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': pathSrc
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/styles/variables.scss";'
      }
    }
  },
  server: {
    port: 10802,
    proxy: {
      '/dev-api': {
        target: 'http://xxx.com:80/xxx',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/dev-api/, '')
      }
    }
  }
})
