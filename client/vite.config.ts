import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@interfaces": path.resolve(__dirname, "./src/interfaces"),
      "@pages": path.resolve(__dirname, "./src/components/pages"),
      "@UI": path.resolve(__dirname, "./src/components/UI"),
      "@forms": path.resolve(__dirname, "./src/forms"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@common": path.resolve(__dirname, "./src/components/common"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@store": path.resolve(__dirname, "./src/store")
    }
  }
});
