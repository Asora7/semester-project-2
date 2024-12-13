import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: '/', // Make sure this is set to '/' to handle routing correctly
  build: {
    target: 'esnext',
    rollupOptions: {
      input: {
        main: resolve(__dirname, './index.html'),
        login: resolve(__dirname, './auth/login/index.html'),
        register: resolve(__dirname, './auth/register/index.html'),
        profile: resolve(__dirname, './profile/index.html'),
        // You can add more entry points here if needed
      },
    },
  },
});