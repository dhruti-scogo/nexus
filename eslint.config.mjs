import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript", "prettier"),
  {
    rules: {
      // Disable all TypeScript ESLint rules
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/prefer-const": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-var-requires": "off",
      "@typescript-eslint/prefer-as-const": "off",
      "@typescript-eslint/no-array-constructor": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "@typescript-eslint/prefer-namespace-keyword": "off",
      "@typescript-eslint/no-loss-of-precision": "off",
      
      // Disable general ESLint rules
      "no-unused-vars": "off",
      "no-console": "off",
      "no-debugger": "off",
      "no-alert": "off",
      "no-constant-condition": "off",
      "no-empty": "off",
      "no-unreachable": "off",
      "no-undef": "off",
      "no-redeclare": "off",
      "no-duplicate-case": "off",
      "no-irregular-whitespace": "off",
      "no-control-regex": "off",
      "no-regex-spaces": "off",
      "no-empty-character-class": "off",
      "no-ex-assign": "off",
      "no-extra-boolean-cast": "off",
      "no-extra-parens": "off",
      "no-extra-semi": "off",
      "no-func-assign": "off",
      "no-inner-declarations": "off",
      "no-invalid-regexp": "off",
      "no-obj-calls": "off",
      "no-sparse-arrays": "off",
      "no-unexpected-multiline": "off",
      "no-unreachable": "off",
      "use-isnan": "off",
      "valid-typeof": "off",
      
      // Disable React rules
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/display-name": "off",
      "react/jsx-key": "off",
      "react/no-unescaped-entities": "off",
      "react/jsx-no-target-blank": "off",
      
      // Disable Next.js rules
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "off",
      "@next/next/no-page-custom-font": "off",
    },
  },
];

export default eslintConfig;
