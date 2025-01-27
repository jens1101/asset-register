import type { DocumentNode } from "graphql";

export const typeDefs = {
  kind: "Document",
  definitions: [
    {
      kind: "InputObjectTypeDefinition",
      name: { kind: "Name", value: "CreateAssetInput" },
      directives: [],
      fields: [
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "name" },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "description" },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "images" },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "CreateImageInput" },
              },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "proofOfPurchase" },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "CreateDocumentInput" },
          },
          directives: [],
        },
      ],
    },
    {
      kind: "InputObjectTypeDefinition",
      name: { kind: "Name", value: "UpdateAssetInput" },
      directives: [],
      fields: [
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "id" },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "name" },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "description" },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "proofOfPurchase" },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "MutateDocumentInput" },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "images" },
          type: {
            kind: "ListType",
            type: {
              kind: "NonNullType",
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "MutateImageInput" },
              },
            },
          },
          directives: [],
        },
      ],
    },
    {
      name: { kind: "Name", value: "Mutation" },
      kind: "ObjectTypeDefinition",
      fields: [
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "createAsset" },
          arguments: [
            {
              kind: "InputValueDefinition",
              name: { kind: "Name", value: "data" },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "CreateAssetInput" },
                },
              },
              directives: [],
            },
          ],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "AssetResponse" },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "updateAsset" },
          arguments: [
            {
              kind: "InputValueDefinition",
              name: { kind: "Name", value: "data" },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "UpdateAssetInput" },
                },
              },
              directives: [],
            },
          ],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "AssetResponse" },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "deleteAsset" },
          arguments: [
            {
              kind: "InputValueDefinition",
              name: { kind: "Name", value: "id" },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "ID" },
                },
              },
              directives: [],
            },
          ],
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "AssetError" },
          },
          directives: [],
        },
      ],
      directives: [],
      interfaces: [],
    },
    {
      name: { kind: "Name", value: "Query" },
      kind: "ObjectTypeDefinition",
      fields: [
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "asset" },
          arguments: [
            {
              kind: "InputValueDefinition",
              name: { kind: "Name", value: "id" },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "ID" },
                },
              },
              directives: [],
            },
          ],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "AssetResponse" },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "assets" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "Asset" },
                },
              },
            },
          },
          directives: [],
        },
      ],
      directives: [],
      interfaces: [],
    },
    {
      kind: "UnionTypeDefinition",
      name: { kind: "Name", value: "AssetResponse" },
      directives: [],
      types: [
        { kind: "NamedType", name: { kind: "Name", value: "Asset" } },
        { kind: "NamedType", name: { kind: "Name", value: "AssetError" } },
      ],
    },
    {
      kind: "ObjectTypeDefinition",
      name: { kind: "Name", value: "AssetError" },
      interfaces: [
        { kind: "NamedType", name: { kind: "Name", value: "Error" } },
      ],
      directives: [],
      fields: [
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "message" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
          directives: [],
        },
      ],
    },
    {
      kind: "ObjectTypeDefinition",
      name: { kind: "Name", value: "Asset" },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "id" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "name" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "description" },
          arguments: [],
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "mainImage" },
          arguments: [],
          type: { kind: "NamedType", name: { kind: "Name", value: "Image" } },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "images" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "ListType",
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "Image" },
                },
              },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "proofOfPurchase" },
          arguments: [],
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "Document" },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "createdAt" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "TemporalInstant" },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "updatedAt" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "TemporalInstant" },
            },
          },
          directives: [],
        },
      ],
    },
    {
      kind: "ScalarTypeDefinition",
      name: { kind: "Name", value: "TemporalInstant" },
      directives: [],
    },
    {
      kind: "ScalarTypeDefinition",
      name: { kind: "Name", value: "Uint8Array" },
      directives: [],
    },
    {
      kind: "InterfaceTypeDefinition",
      name: { kind: "Name", value: "Error" },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "message" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
          directives: [],
        },
      ],
    },
    {
      kind: "InputObjectTypeDefinition",
      name: { kind: "Name", value: "CreateDocumentInput" },
      directives: [],
      fields: [
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "file" },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateFileInput" },
            },
          },
          directives: [],
        },
      ],
    },
    {
      kind: "InputObjectTypeDefinition",
      name: { kind: "Name", value: "UpdateDocumentInput" },
      directives: [],
      fields: [
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "file" },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateFileInput" },
            },
          },
          directives: [],
        },
      ],
    },
    {
      kind: "InputObjectTypeDefinition",
      name: { kind: "Name", value: "DeleteDocumentInput" },
      directives: [],
      fields: [
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "id" },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
          directives: [],
        },
      ],
    },
    {
      kind: "InputObjectTypeDefinition",
      name: { kind: "Name", value: "MutateDocumentInput" },
      directives: [
        {
          kind: "Directive",
          name: { kind: "Name", value: "oneOf" },
          arguments: [],
        },
      ],
      fields: [
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "update" },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "UpdateDocumentInput" },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "delete" },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DeleteDocumentInput" },
          },
          directives: [],
        },
      ],
    },
    {
      kind: "ObjectTypeDefinition",
      name: { kind: "Name", value: "Document" },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "id" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "createdAt" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "TemporalInstant" },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "file" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "File" } },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "asset" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Asset" } },
          },
          directives: [],
        },
      ],
    },
    {
      kind: "InputObjectTypeDefinition",
      name: { kind: "Name", value: "CreateFileInput" },
      directives: [],
      fields: [
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "buffer" },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Uint8Array" },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "filename" },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "mimeType" },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
          directives: [],
        },
      ],
    },
    {
      kind: "ObjectTypeDefinition",
      name: { kind: "Name", value: "File" },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "id" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "buffer" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Uint8Array" },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "filename" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "mimeType" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "String" },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "createdAt" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "TemporalInstant" },
            },
          },
          directives: [],
        },
      ],
    },
    {
      kind: "InputObjectTypeDefinition",
      name: { kind: "Name", value: "CreateImageInput" },
      directives: [],
      fields: [
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "name" },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "description" },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "file" },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CreateFileInput" },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "previousImageId" },
          type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          directives: [],
        },
      ],
    },
    {
      kind: "InputObjectTypeDefinition",
      name: { kind: "Name", value: "UpdateImageInput" },
      directives: [],
      fields: [
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "id" },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "name" },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "description" },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "file" },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "CreateFileInput" },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "previousImageId" },
          type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          directives: [],
        },
      ],
    },
    {
      kind: "InputObjectTypeDefinition",
      name: { kind: "Name", value: "DeleteImageInput" },
      directives: [],
      fields: [
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "id" },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
          directives: [],
        },
      ],
    },
    {
      kind: "InputObjectTypeDefinition",
      name: { kind: "Name", value: "MutateImageInput" },
      directives: [
        {
          kind: "Directive",
          name: { kind: "Name", value: "oneOf" },
          arguments: [],
        },
      ],
      fields: [
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "create" },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "CreateImageInput" },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "update" },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "UpdateImageInput" },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "delete" },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "DeleteImageInput" },
          },
          directives: [],
        },
      ],
    },
    {
      kind: "ObjectTypeDefinition",
      name: { kind: "Name", value: "Image" },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "id" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "name" },
          arguments: [],
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "description" },
          arguments: [],
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "createdAt" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "TemporalInstant" },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "updatedAt" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "TemporalInstant" },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "file" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "File" } },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "asset" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Asset" } },
          },
          directives: [],
        },
      ],
    },
    {
      kind: "SchemaDefinition",
      operationTypes: [
        {
          kind: "OperationTypeDefinition",
          type: { kind: "NamedType", name: { kind: "Name", value: "Query" } },
          operation: "query",
        },
        {
          kind: "OperationTypeDefinition",
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "Mutation" },
          },
          operation: "mutation",
        },
      ],
    },
  ],
} as unknown as DocumentNode;
