import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';
import { fileURLToPath, URL } from 'url';

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['vuetify'],
    entries: ['./src/**/*.vue'],
  },
  server: {
    fs: {
      strict: true,
    },
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          compatConfig: {
            MODE: 2,
          },
        },
      },
    }),
    svgLoader({
      defaultImport: 'url',
    }),
  ],
});
