import { defineConfig } from 'vite'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts(),
    vue(),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'VueNetflexCdnUrl',
    },
    rollupOptions: {
      external: [
        'vue',
        '@apility/vue-netflex-cdn-url',
        '@apility/vue-breakpoints-plugin',
        '@apility/netflex-cdn-url',
      ],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
