import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  emitLegacyCommonJSImports: false,
  generates: {
    "src/gql-client/types/": {
      schema: "../../backend/gql/src/gql-server/schema.graphql",
      documents: "src/gql-client/!(types)/*.graphql",
      preset: "client",
      presetConfig: {
        fragmentMasking: false,
      },
      plugins: [
        {
          add: {
            content: [
              'import type { Temporal } from "temporal-polyfill";',
              'import type { BigDecimal } from "effect";',
            ],
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
          BigDecimal: "BigDecimal.BigDecimal",
          Currency: "string",
          NonEmptyTrimmedString: "string",
          TrimmedString: "string",
        },
      },
    },
  },
};
export default config;
