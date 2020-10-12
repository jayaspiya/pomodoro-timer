import resolve from "@rollup/plugin-node-resolve";
import babel from "@rollup/plugin-babel";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/scripts/app.js",
    output: {
      file: "dist/scripts/bundle.js",
      format: "iife",
    },
    plugins: [resolve(), babel({ babelHelpers: "bundled" }), terser()],
  },
];
