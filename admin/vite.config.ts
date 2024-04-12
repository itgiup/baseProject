import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname);
  return {
    resolve: {
      alias: {
        "@configs": path.join(__dirname, "src/configs"),
        "@components": path.join(__dirname, "src/components"),
        "@pages": path.join(__dirname, "src/pages"),
        "@services": path.join(__dirname, "src/services"),
        "@typings": path.join(__dirname, "src/typings"),
        "@utils": path.join(__dirname, "src/utils"),
        "@redux": path.join(__dirname, "src/redux"),
        "@assets": path.join(__dirname, "src/assets")
      },
    },
    plugins: [react()],
    define: {
      __APP_ENV__: env
    }
  }
})