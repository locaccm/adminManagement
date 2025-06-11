import js from "@eslint/js";
import typescript from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";
import prettierPlugin from "eslint-plugin-prettier";
import jsdocPlugin from "eslint-plugin-jsdoc";
import jestPlugin from "eslint-plugin-jest";

export default [
  {
    ignores: [
      "dist/**",
      "node_modules/**",
      "coverage/**",
    ]
  },

  js.configs.recommended,

  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: 2021,
        sourceType: "module",
      },
    },
    plugins: {
      "@typescript-eslint": typescript,
      prettier: prettierPlugin,
      jsdoc: jsdocPlugin,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "camelcase": ["error", { properties: "always" }],
      "prettier/prettier": "error",
      "jsdoc/check-tag-names": [
        "error",
        { "definedTags": ["swagger"] }
      ],
      "jsdoc/require-description": "error",
    },
  },

  {
    files: [
      "src/api_documentation/swagger.ts",
      "src/index.ts"
    ],
    languageOptions: {
      globals: {
        __dirname: "readonly",
        process: "readonly",
        console: "readonly"
      }
      
    }
  },

  {
    files: [
      "**/*.test.ts",
      "**/*.test.js",
      "**/*.spec.ts",
      "**/*.spec.js",
      "**/__mocks__/**/*.ts",
      "**/__mocks__/**/*.js",
    ],
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      globals: jestPlugin.environments.globals.globals,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
    },
  },
];
