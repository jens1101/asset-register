import type { CodegenConfig } from "@graphql-codegen/cli";
import type { UrqlIntrospectionConfig } from "@graphql-codegen/urql-introspection";

const config: CodegenConfig = {
  emitLegacyCommonJSImports: false,
  schema: "../../backend/gql/src/gql-server/schema.graphql",
  generates: {
    "src/gql-client/types/": {
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
    "src/gql-client/types/introspection.ts": {
      plugins: [
        {
          "urql-introspection": {
            useTypeImports: true,
            module: "es2015",
          } satisfies UrqlIntrospectionConfig,
        },
      ],
    },
  },
};
export default config;
