import { defineConfig } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'

import photos from './photos.json'

export default defineConfig({
  plugins: [
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          photos: photos,
        },
      },
    }),
  ],
})
