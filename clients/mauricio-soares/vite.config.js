import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import fs from "fs";
import path, { resolve } from "path";
import sizeOf from "image-size";

const data = fs.readdirSync(path.join(__dirname, "src/images/gallery/full"));

const photos = data
  .filter((file) => path.extname(file).toLowerCase() === ".jpg")
  .map((image) => {
    const dimentions = sizeOf(
      path.join(__dirname, "src/images/gallery/full/thumb", image)
    );

    return {
      id: image.split(".")[0],
      width: dimentions.width,
      height: dimentions.height,
      alt: "Some Alt",
    };
  });

export default defineConfig({
  root: "src",
  base: "",
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles.scss";`
      }
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "../shared"),
    },
  },

  build: {
    outDir: path.resolve(__dirname, "../../c/mauricio-soares/"),
    // assetsDir: 'c/mauricio-soares/assets/'
  },
  plugins: [
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          photos: photos,
          client: "Mauricio Soares",
          imagesLimit: 5
        },
      },
    }),
  ],
});