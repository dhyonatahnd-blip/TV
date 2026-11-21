import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(({mode}) => {
  const isDocs = mode === 'docs';

  return {
    base: './',
    build: isDocs
      ? {
          outDir: 'docs',
          emptyOutDir: true,
          rollupOptions: {
            output: {
              entryFileNames: 'assets/konkord-tv.js',
              chunkFileNames: 'assets/[name].js',
              assetFileNames: (assetInfo) => {
                const fileName = assetInfo.names?.[0] ?? assetInfo.name ?? '';
                if (fileName.endsWith('.css')) {
                  return 'assets/konkord-tv.css';
                }
                return 'assets/[name]-[hash][extname]';
              },
            },
          },
        }
      : undefined,
    plugins: [
      react(),
      tailwindcss(),
      // Copies src/assets into dist/ (or docs/) so root-relative URLs like
      // "/src/assets/images/..." (e.g. generate_image output) still resolve
      // in production builds. Do not remove.
      {
        name: 'copy-unbundled-src-assets',
        apply: 'build',
        configResolved(config) {
          (this as unknown as {_outDir?: string})._outDir = config.build.outDir;
        },
        closeBundle(error?: Error): void {
          if (error) {
            return;
          }
          const outDirName = (this as unknown as {_outDir?: string})._outDir || 'dist';
          const outDir = path.resolve(__dirname, outDirName);
          const srcAssets = path.resolve(__dirname, 'src/assets');
          const destAssets = path.resolve(outDir, 'src/assets');
          if (fs.existsSync(outDir) && fs.existsSync(srcAssets)) {
            fs.cpSync(srcAssets, destAssets, {recursive: true, force: true});
          }
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
