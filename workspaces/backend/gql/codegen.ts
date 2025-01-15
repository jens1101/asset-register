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
          Void: {
            type: "void",
          },
          TemporalInstant: {
            type: "Temporal.Instant",
          },
          Uint8Array: {
            type: "Uint8Array",
          },
        },
        add: {
          "./types.generated.ts": {
            content: 'import type { Temporal } from "temporal-polyfill";',
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
