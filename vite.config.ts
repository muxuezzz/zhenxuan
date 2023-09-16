// vite.config.ts
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
//@ts-ignore 引入svg需要的插件
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import { viteMockServe } from 'vite-plugin-mock'

// export default defineConfig({
//   plugins: [vue(),
//   createSvgIconsPlugin({
//     // 设置svg存储地址
//     iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
//     symbolId: 'icon-[dir]-[name]',
//   })
//   ],
//   resolve: {
//     alias: {
//       "@": path.resolve("./src") // 相对路径别名配置，使用 @ 代替 src
//     }
//   },
//   // scss全局变量的配置,引入文件时不要忘记冒号
//   css: {
//     preprocessorOptions: {
//       scss: {
//         javascriptEnabled: true,
//         additionalData: '@import "./src/styles/variable.scss";',
//       },
//     },
//   },
// }
// )

export default defineConfig(({ command, mode }) => {
  // 获取各种环境下的变量
  let env = loadEnv(mode, process.cwd())
  return {
    plugins: [
      vue(),
      createSvgIconsPlugin({
        // 设置svg存储地址
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      viteMockServe({
        localEnabled: command === 'serve',
      }),
    ],

    resolve: {
      alias: {
        '@': path.resolve('./src'), // 相对路径别名配置，使用 @ 代替 src
      },
    },

    // scss全局变量的配置,引入文件时不要忘记冒号
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@use "./src/styles/variable.scss" as *;',
        },
      },
    },

    // 代理配置,解决跨域问题
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          //对应环境下的获取数据的服务器地址设置
          // env.VITE_APP_BASE_API表示代理的标识，env.VITE_APP_BASE_API开头的地址都会被代理
          target: env.VITE_SERVE,
          //需要代理跨域
          changeOrigin: true,
          //路径重写
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
