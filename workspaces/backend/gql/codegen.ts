import { defineConfig } from "@eddeee888/gcg-typescript-resolver-files";
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  emitLegacyCommonJSImports: false,
  generates: {
    "src/gql-server/": defineConfig(
      {
        emitLegacyCommonJSImports: false,
        mergeSchema: "schema.graphql",
        typesPluginsConfig: {
          useTypeImports: true,
          strictScalars: true,
        },
        scalarsOverrides: {
          TemporalInstant: { type: "Temporal.Instant" },
          Uint8Array: { type: "Uint8Array" },
          BigDecimal: { type: "BigDecimal.BigDecimal" },
          Currency: { type: "string" },
          NonEmptyTrimmedString: { type: "string" },
          TrimmedString: { type: "string" },
        },
        add: {
          "./types.generated.ts": {
            content: [
              'import type { Temporal } from "temporal-polyfill";',
              'import type { BigDecimal } from "effect";',
            ],
          },
        },
      },
      {
        schema: "src/gql-server/*/*.graphql",
      },
    ),
  },
};
export default config;
