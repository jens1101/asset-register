import { type Configuration } from "lint-staged";

export default {
  "*": [
    "npm exec -w @app/web prettier -- --write",
    "npm run -w @app/web lint:eslint -- --no-warn-ignored",
  ],
} satisfies Configuration;
