import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';
import laravel from 'laravel-vite-plugin'
import { wordpressPlugin, wordpressThemeJson } from '@roots/vite-plugin';

export default defineConfig({
  base: '/wp-content/themes/codigo/public/build/',
  plugins: [
    vue(),
    tailwindcss(),
    laravel({
      input: [
        'resources/css/app.css',
        'resources/scss/app.scss',
        'resources/js/app.js',
        'resources/css/editor.css',
        'resources/scss/editor.scss',
        'resources/js/editor.js',
      ],
      refresh: true,
    }),

    wordpressPlugin(),

    // Generate the theme.json file in the public/build/assets directory
    // based on the Tailwind config and the theme.json file from base theme folder
    wordpressThemeJson({
      disableTailwindColors: false,
      disableTailwindFonts: false,
      disableTailwindFontSizes: false,
    }),
  ],
  resolve: {
    alias: {
      '@scripts': '/resources/js',
      '@styles': '/resources/css',
      '@scss': '/resources/scss',
      '@fonts': '/resources/fonts',
      '@images': '/resources/images',
    },
  },
})
