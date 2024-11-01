import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  emitLegacyCommonJSImports: false,
  generates: {
    "src/gql-client/types/": {
      schema: "../../backend/gql/src/gql-server/schema.graphql",
      documents: "src/gql-client/!(types)/*.graphql",
      preset: "client",
      config: {
        useTypeImports: true,
        strictScalars: true,
      },
    },
  },
};
export default config;
