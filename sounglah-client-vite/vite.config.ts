// sounglah-client-vite/vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), // or reactSWC() if you installed that
    tsconfigPaths(),
    svgrPlugin(), // Handles SVG imports as React components
  ],
  server: {
    port: 3000, // Optional: Set a default client port
    open: true,   // Optional: Open browser on start
    proxy: {
      // Configure this to proxy API calls to your Flask backend
      '/api': {
        target: 'http://localhost:5000', // Replace with your Flask server address
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '') // Uncomment if Flask routes don't include /api
      }
    }
  },
  build: {
    outDir: '../sounglah-server/frontend_build', // This is the key change!
    // You might also want to clear the previous build directory
    emptyOutDir: true, // Vite typically does this by default, but explicit is good.
  },
});