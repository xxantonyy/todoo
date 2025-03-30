import path from 'path';

import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
import eslint from 'vite-plugin-eslint';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    base: '/',
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          icon: true,
          svgoConfig: {
            plugins: [{ name: 'convertColors', params: { currentColor: true } }],
          },
        },
      }),
      eslint(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    define: {
      __PLATFORM__: JSON.stringify(env.VITE_PLATFORM),
      __ENV__: JSON.stringify(mode),
      __API__: JSON.stringify(env.VITE_API),
    },
    css: {
      modules: {
        generateScopedName: '[local]__[hash:base64:5]', // ❗ в проде нужны хэши
      },
    },
    server: {
      port: Number(env.VITE_PORT) || 3000,
      open: true,
      proxy: {
        '/api': {
          target: 'http://31.130.150.4:3000',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    build: {
      outDir: 'build',
      sourcemap: mode !== 'production' ? 'inline' : false,
    },
  };
});
