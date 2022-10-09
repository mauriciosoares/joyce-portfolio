import { defineConfig } from "vite";
import path, { resolve } from "path";

export default defineConfig({
  root: "src",
  base: "",
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles.scss";`,
      },
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "../shared"),
    },
  },
});
