import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.js"], // Use 'files' instead of 'include'
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
];
