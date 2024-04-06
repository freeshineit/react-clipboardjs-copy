import { defineConfig, type UserConfig, type ConfigEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import eslint from 'vite-plugin-eslint';
import postcssPreset from 'postcss-preset-env';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(((env: ConfigEnv) => {
  const isDev = env.mode === 'development';

  return {
    base: './',
    server: {
      // port: 3000, // 设置端口号
    },
    resolve: {
      alias: {
        'react-clipboardjs-copy': path.resolve(__dirname, '../packages/copy/src'),
      },
    },
    css: {
      postcss: {
        plugins: isDev ? [] : [postcssPreset()],
      },
    },
    build: {
      outDir: '../docs',
      minify: 'terser',
      rollupOptions: {
        output: {
          /**
           * 以对象的方式使用
           * 例如 lodash 模块打包成一个 chunk，名称是 lodash
           */
          manualChunks: {
            dll: ['react', 'react-dom'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      terserOptions: {
        // 清除console和debugger
        compress: {
          // drop_console: true,
          drop_debugger: true,
        },
      },
    },
    define: {},
    plugins: [react(), isDev ? eslint() : undefined].filter(Boolean),
  };
}) as UserConfig);
