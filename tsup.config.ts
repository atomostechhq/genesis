import { defineConfig } from "tsup";
import esbuildCssModulesPlugin from 'esbuild-css-modules-plugin';


export default defineConfig({
  format: ["cjs", "esm"],
  entry: ["./app/index.ts"],
  dts: true,
  splitting: false,
  sourcemap: true,
  shims: true,
  skipNodeModulesBundle: true,
  clean: true,
  outDir: 'dist',
  plugins: [
    esbuildCssModulesPlugin()
  ]
});
