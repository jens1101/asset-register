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
            type: {
              input: "TemporalInstantScalar",
              output: "Temporal.Instant",
            },
          },
          Uint8Array: {
            type: {
              input: "Uint8ArrayScalar",
              output: "Uint8Array",
            },
          },
        },
        add: {
          "./types.generated.ts": {
            content: `
              import type {
                TemporalInstantScalar,
              } from "@app/common/scalars/TemporalInstant";
              import type {
                Uint8ArrayScalar,
              } from "@app/common/scalars/Uint8Array";
              import type { Temporal } from "temporal-polyfill";`,
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
