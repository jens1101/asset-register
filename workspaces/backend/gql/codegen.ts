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
      },
      {
        schema: "src/gql-server/*/*.graphql",
      },
    ),
  },
};
export default config;
