import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import basicSsl from '@vitejs/plugin-basic-ssl'
import path from 'path'
import pxToViewport from 'postcss-px-to-viewport'
import viteCompression from 'vite-plugin-compression'
import { getProxy, getEnvName, getEnvIp, getIPAdress } from './vite.config-proxy'

// https://vitejs.dev/config/
export default function ({ mode, command, ssrBuild }) {
  // 我们可以通过mode直接判断当前是不是生产环境，
  // 注意mode可以在运行指令中指定：`vite build --mode master`，
  // 如果没有指定，那默认打包就是production development
  const isPro = mode.includes('production')
  const isDev = mode.includes('development')

  function getEnv(key) { // 定义获取环境变量的方法
    // 第三个参数非常重要，下面有详解
    return loadEnv(mode, process.cwd(), '')[key]
  }

  function resolve(name) {
    return path.resolve(__dirname, name)
  }

  let config = {
    base: './',// getEnv('VUE_APP_PUBLICPATH'), // 读取环境变量
    resolve: {
      alias: [
        { find: '@/', replacement: resolve('src') + '/' },
        { find: /^~/, replacement: resolve('node_modules') + '/' }
      ],
      extensions: [
        '.mjs',
        '.js',
        '.ts',
        '.jsx',
        '.tsx',
        '.json',
        '.vue'
      ]
    },
    plugins: [
      vue(),
      vueJsx(),
      viteCompression({
        verbose: true, // 默认即可
        disable: false, //开启压缩(不禁用)，默认即可
        deleteOriginFile: false, //删除源文件
        threshold: 1, //压缩前最小文件大小
        algorithm: 'gzip', //压缩算法
        ext: '.gz' //文件类型
      })
    ],
    css: {
      postcss: {
        plugins: [
          pxToViewport({
            // (Array) 能转化为vw的属性列表  传入特定的CSS属性；
            // 可以传入通配符"*"去匹配所有属性，例如：['*']；
            // 在属性的前或后添加"*",可以匹配特定的属性. (例如['position'] 会匹配 background-position-y)
            // 在特定属性前加 "!"，将不转换该属性的单位 . 例如: ['*', '!letter-spacing']，将不转换letter-spacing
            // "!" 和 "*"可以组合使用， 例如: ['', '!font']，将不转换font-size以及font-weight等属性
            propList: ['*', /*'!font-size',*/ '!border-width'],
            viewportWidth: 375, // 视口宽度，对应设计稿宽度
            viewporHeight: 667, // 视口高度，对应设计稿高度
            unitPrecision: 3, // 指定px转换之后的小数位数
            viewportUnit: 'vw', // 转换的单位
            fontViewportUnit: 'vw', // 字体使用的单位
            replace: true, //  是否直接更换属性值，而不添加备用属性
            selectorBlackList: ['.ignore', '.hairlines'], // 指定不转换的类
            minPixelValue: 1, // 小于或等于1px不转换
            mediaQuery: true // 允许在媒体查询中转换
          })
        ]
      },
      preprocessorOptions: {
        scss: {
          additionalData: ``
        }
      }
    },
    envPrefix: ['VUE_APP_'],
    define: {
      __VERSION__: '"2.3.8"',
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env.hostIp': JSON.stringify(getIPAdress()),
      'process.env.envName': JSON.stringify(getEnvName()),
      'process.env.envIp': JSON.stringify(getEnvIp())
    }
  }
  if (isDev) {
    config.plugins.push(...[
      basicSsl()// 强制https
    ])
    config.server = {
      host: true,
      cors: true,
      https: true,
      hmr: {
        overlay: false
      },
      proxy: getProxy() || {}
    }
  } else if (isPro) {
    config.build = {
      emptyOutDir: true,
      assetsDir: 'js',
      outDir: path.resolve(__dirname, 'dist'),
      target: 'es2015',
      sourcemap: false,
      reportCompressedSize: false,
      rollupOptions: {
        output: {
          // manualChunks(id, { getModuleInfo, getModuleIds }) {
          //   if (id.includes('echarts') || id.includes('render')) {
          //     return 'echarts';
          //   }
          //   let info = getModuleInfo(id)
          //   // isEntry
          //   if (!info.isEntry && id.includes('node_modules')) {
          //     return 'node_modules';
          //   }
          // }
        }
      }
    }
  }

  return defineConfig(config)
}

