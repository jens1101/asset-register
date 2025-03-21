import { type Configuration } from "lint-staged";

export default {
  "*": [
    "npm exec -w @app/walker prettier -- --write",
    "npm run -w @app/walker lint:eslint -- --no-warn-ignored",
  ],
} satisfies Configuration;
