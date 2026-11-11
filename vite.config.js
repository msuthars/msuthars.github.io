import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

export default defineConfig({
  plugins: [react(), tailwindcss()],
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
