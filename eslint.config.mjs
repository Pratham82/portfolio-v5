import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "*.config.js",
      "*.config.mjs",
      "package.json",
      "package-lock.json",
    ],
  },
  js.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: { jsx: true },
        project: "./tsconfig.json",
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2021,
        React: "readonly",
        JSX: "readonly",
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "@typescript-eslint": tseslint,
      prettier: prettierPlugin,
      import: importPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      // Disable base rule as it conflicts with TypeScript version
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
      // Next.js specific rules
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "@next/next/no-html-link-for-pages": "off",
      // TypeScript
      quotes: ["error", "double", { avoidEscape: true }],
      // React
      "react/jsx-props-no-spreading": "off",
      "react/require-default-props": "off",
      "react/prop-types": "off",
      "no-shadow": "off",
      "react/function-component-definition": [
        2,
        { namedComponents: "arrow-function" },
      ],
      // Import ordering
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          pathGroups: [
            {
              pattern: "**/*.{css,scss,less}",
              group: "index",
              position: "before",
            },
            { pattern: "next/**", group: "external", position: "before" },
            { pattern: "@/**", group: "internal", position: "after" },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      // Prettier
      "prettier/prettier": ["error", { endOfLine: "auto", singleQuote: false }],
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
  },
];
