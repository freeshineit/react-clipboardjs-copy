// import js from '@eslint/js';
// import globals from 'globals';
// import reactHooks from 'eslint-plugin-react-hooks';
// import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from "eslint/config";
import configs from "eslint-config-xx";

export default defineConfig([
  globalIgnores(["dist", "build"]),
  ...configs,
  {
    files: ["examples/**/*.tsx"],
    rules: {
      "react/no-deprecated": "off",
    },
  },
]);
