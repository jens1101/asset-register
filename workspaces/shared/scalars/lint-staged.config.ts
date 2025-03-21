import { type Configuration } from "lint-staged";

export default {
  "*": [
    "npm exec -w @app/scalars prettier -- --write",
    "npm run -w @app/scalars lint:eslint -- --no-warn-ignored",
  ],
} satisfies Configuration;
