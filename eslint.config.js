import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.node, // ✅ habilita process, __dirname, etc.
      },
    },
    plugins: {
      js,
    },
    extends: ["js/recommended"],
    rules: {
      // aquí puedes personalizar reglas
      "no-unused-vars": "warn", // por ejemplo, que avise en vez de romper
    },
  },
]);
