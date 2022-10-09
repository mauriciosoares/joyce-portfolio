import { mergeConfig } from "vite";
import defaultViteConfig from "../shared/vite.config";
import { createHtmlPlugin } from "vite-plugin-html";
import fs from "fs";
import sizeOf from "image-size";
import path from "path";

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

export default mergeConfig(defaultViteConfig, {
  build: {
    outDir: path.resolve(__dirname, "../../c/mauricio-soares-1665345136230/"),
  },
  plugins: [
    createHtmlPlugin({
      minify: true,
      inject: {
        ejsOptions: {
          root: "../../",
        },
        data: {
          photos: photos,
          client: "Mauricio",
          imagesLimit: 5,
        },
      },
    }),
  ],
});
