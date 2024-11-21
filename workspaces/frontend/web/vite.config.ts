import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";

export default defineConfig(() => {
  return {
    plugins: [solidPlugin()],
    server: {
      host: true,
      port: Number(process.env.WEB_PORT),
      strictPort: true,
    },
    build: {
      target: "esnext",
    },
    preview: {
      host: true,
      port: Number(process.env.WEB_PORT),
      strictPort: true,
    },
  };
});
