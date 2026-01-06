import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["app/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  sourcemap: true,
  splitting: false,
  clean: true,
  outDir: "dist",

  // 👇 correct place
  esbuildOptions(options) {
    options.jsx = "automatic";
  },

  external: [
    "react",
    "react-dom",
    "react/jsx-runtime"
  ]
});
