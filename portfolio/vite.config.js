import { defineConfig } from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import fs from "fs";
import path from "path";
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
  build: {
    outDir: path.resolve(__dirname, ".."),
  },
  plugins: [
    createHtmlPlugin({
      minify: true,
      inject: {
        ejsOptions: {
          root: "../",
        },
        data: {
          photos: photos,
          client: "Joyce Machado",
        },
      },
    }),
  ],
});
