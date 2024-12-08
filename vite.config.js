import { defineConfig } from 'vite';

export default defineConfig({
  base: '', 

  build: {
    outDir: 'dist', // Netlify uses this as the default deployment directory
  },

  server: {
    // Serve the app as single-page application locally (optional for local testing)
    historyApiFallback: true,
  },
});
