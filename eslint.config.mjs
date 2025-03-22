import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"), {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@next/next/no-img-element": "off",
      "@next/next/no-page-custom-font": "off",
      "jsx-a11y/alt-text": "off",
      "react/display-name": "off",
      "react/no-children-prop": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "react/jsx-max-props-per-line": [
        0,
        {
          maximum: 1,
        },
      ],
    },
    ignores: [".next/"],
  },
];

export default eslintConfig;
