import { defineConfig } from 'vite';

// The site is a hand-authored, no-build static PWA that lives in /docs
// (GitHub Pages serves that folder). Vite is used here only as a fast local
// dev/preview server. We mirror the GitHub Pages subpath so local URLs match
// production exactly:  http://localhost:5173/VanLife/
export default defineConfig({
  root: 'docs',            // serve the published folder
  base: '/VanLife/',       // same subpath GitHub Pages uses (repo name)
  publicDir: false,        // no separate public dir; everything is already static
  appType: 'mpa',          // multi-page: landing page + /user-guide/ each have index.html
  server: {
    port: 5173,
    open: '/VanLife/',     // open the landing page on start
  },
  preview: {
    port: 4173,
    open: '/VanLife/',
  },
  build: {
    // Not normally needed (the site ships as-is), but supported.
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        landing: 'docs/index.html',
        guide: 'docs/user-guide/index.html',
      },
    },
  },
});
