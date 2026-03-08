import js from "@eslint/js"
import globals from "globals"
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import reactRefresh from "eslint-plugin-react-refresh"
import importPlugin from "eslint-plugin-import"
import { defineConfig, globalIgnores } from "eslint/config"

export default defineConfig([

  globalIgnores([
    "dist",
    "node_modules",
    "build",
    ".vite"
  ]),

  /*
  =========================================
  BASE CONFIG (comum a todo o projeto)
  =========================================
  */
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    extends: [js.configs.recommended],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module"
    },

    plugins: {
      import: importPlugin
    },

    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "off",

      "import/no-unresolved": "off",
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal"],
          "newlines-between": "always"
        }
      ]
    }
  },

  /*
  =========================================
  FRONTEND (React + Vite)
  =========================================
  */
  {
    files: ["src/**/*.{js,jsx}"],

    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh
    },

    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true }
      }
    },

    settings: {
      react: {
        version: "detect"
      }
    },

    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      "react/react-in-jsx-scope": "off", // React 17+
      "react/jsx-uses-react": "off",

      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true }
      ]
    }
  },

  /*
  =========================================
  BACKEND (Node.js)
  =========================================
  */
  {
    files: [
      "server/**/*.{js,mjs}",
      "api/**/*.{js,mjs}",
      "*.config.js"
    ],

    languageOptions: {
      globals: globals.node
    },

    rules: {
      "no-process-exit": "off"
    }
  }

])