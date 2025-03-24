import eslint from "@eslint/js";
import solid from "eslint-plugin-solid/configs/typescript";
import tseslint from "typescript-eslint";

const config = [
  eslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,
  {
    ...solid,
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    ignores: ["*", "!*.ts", "dist", "node_modules"],
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-empty-object-type": [
        "error",
        { allowInterfaces: "with-single-extends" },
      ],
      "@typescript-eslint/restrict-template-expressions": [
        "error",
        { allowNumber: true },
      ],
      "@typescript-eslint/no-unused-expressions": [
        "error",
        { allowShortCircuit: true, allowTernary: true },
      ],
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
    },
  },
];

export default config;
