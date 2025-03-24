import type { AddPluginConfig } from "@graphql-codegen/add";
import type { CodegenConfig } from "@graphql-codegen/cli";
import type { TypeScriptTypedDocumentNodesConfig } from "@graphql-codegen/typed-document-node";
import type { TypeScriptPluginConfig } from "@graphql-codegen/typescript";
import type { TypeScriptDocumentsPluginConfig as TypeScriptOperationsPluginConfig } from "@graphql-codegen/typescript-operations";
import type { UrqlIntrospectionConfig } from "@graphql-codegen/urql-introspection";

const config: CodegenConfig = {
  emitLegacyCommonJSImports: false,
  schema: "../../backend/gql/src/gql-server/schema.graphql",
  generates: {
    "src/gql-client/graphql.generated.ts": {
      documents: "src/gql-client/!(types)/*.graphql",
      plugins: [
        "typescript",
        "typescript-operations",
        "typed-document-node",
        {
          add: {
            content: [
              'import type { Temporal } from "temporal-polyfill";',
              'import type { BigDecimal } from "effect";',
            ],
            placement: "prepend",
          } as AddPluginConfig,
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
      } as TypeScriptPluginConfig &
        TypeScriptOperationsPluginConfig &
        TypeScriptTypedDocumentNodesConfig,
    },
    "src/gql-client/introspection.generated.ts": {
      plugins: [
        {
          "urql-introspection": {
            useTypeImports: true,
            module: "es2015",
          } as UrqlIntrospectionConfig,
        },
      ],
    },
  },
  hooks: {
    afterAllFileWrite: ["prettier --write"],
  },
};
export default config;
