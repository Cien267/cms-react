import { defineConfig } from 'vite';
import { fileURLToPath, URL } from "url";
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import path from 'path'
import babel from 'vite-plugin-babel';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxImportSource: "@emotion/react",
    babel: {
      babelrc: true
    },
  }), viteTsconfigPaths(), svgrPlugin(), babel(),],
  esbuild: {
    loader: "tsx",
    include: /src\/.*\.[tj]sx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
        ".ts": "tsx",
      },

    },
  },
  resolve: {
    alias: [
      { find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
    ],
  },
  build: {
    outDir: 'build'
  }
  // server: {
  // 	open: 'index.html',
  // 	port: 4000,
  // },
});