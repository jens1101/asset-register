import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

const config = [
  eslint.configs.recommended,
  ...tseslint.configs.strict,
  {
    ignores: ["dist/", "src/gql-server/*.generated.ts"],
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },
];

export default config;
