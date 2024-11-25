import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  emitLegacyCommonJSImports: false,
  generates: {
    "src/gql-client/types/": {
      schema: "../../backend/gql/src/gql-server/schema.graphql",
      documents: "src/gql-client/!(types)/*.graphql",
      preset: "client",
      plugins: [
        {
          add: {
            content: 'import type { Temporal } from "temporal-polyfill";',
          },
        },
      ],
      config: {
        useTypeImports: true,
        strictScalars: true,
        scalars: {
          TemporalInstant: "Temporal.Instant",
          Uint8Array: "Uint8Array",
          Void: "void",
        },
      },
    },
  },
};
export default config;
