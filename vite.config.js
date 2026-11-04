import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      /* Two pages: the portfolio at / and the resume at /resume/ */
      input: {
        main: fileURLToPath(new URL("index.html", import.meta.url)),
        resume: fileURLToPath(new URL("resume/index.html", import.meta.url))
      }
    }
  }
});
