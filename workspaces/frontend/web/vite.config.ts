import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import solidSvg from "vite-plugin-solid-svg";

export default defineConfig(() => {
  return {
    plugins: [
      solidPlugin(),
      solidSvg({
        svgo: { enabled: false },
      }),
    ],
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
