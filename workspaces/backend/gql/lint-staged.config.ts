import { type Configuration } from "lint-staged";

export default {
  "*": [
    "npm exec -w @app/gql prettier -- --write",
    "npm run -w @app/gql lint:eslint -- --no-warn-ignored",
  ],
} satisfies Configuration;
