import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    // Use esbuild for faster builds (default)
    minify: 'esbuild',
    // Chunk splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-router': ['react-router-dom'],
          'vendor-motion': ['framer-motion'],
        },
      },
    },
    // Generate source maps only for production debugging if needed
    sourcemap: false,
    // Target modern browsers for smaller bundle
    target: 'es2020',
    // CSS code splitting
    cssCodeSplit: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
  // Copy .htaccess to dist folder
  publicDir: 'public',
  // Drop console and debugger in production
  esbuild: {
    drop: ['console', 'debugger'],
  },
});
