import type { DocumentNode } from "graphql";

export const typeDefs = {
  kind: "Document",
  definitions: [
    {
      kind: "InputObjectTypeDefinition",
      name: { kind: "Name", value: "CreeateAssetInput" },
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
                name: { kind: "Name", value: "ImageInput" },
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
            name: { kind: "Name", value: "DocumentInput" },
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
                  name: { kind: "Name", value: "CreeateAssetInput" },
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
          type: { kind: "NamedType", name: { kind: "Name", value: "Void" } },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          name: { kind: "Name", value: "replaceProofOfPurchase" },
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
            {
              kind: "InputValueDefinition",
              name: { kind: "Name", value: "proofOfPurchase" },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "NamedType",
                  name: { kind: "Name", value: "DocumentInput" },
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
          name: { kind: "Name", value: "removeProofOfPurchase" },
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
          name: { kind: "Name", value: "addAssetImages" },
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
            {
              kind: "InputValueDefinition",
              name: { kind: "Name", value: "images" },
              type: {
                kind: "NonNullType",
                type: {
                  kind: "ListType",
                  type: {
                    kind: "NonNullType",
                    type: {
                      kind: "NamedType",
                      name: { kind: "Name", value: "ImageInput" },
                    },
                  },
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
          name: { kind: "Name", value: "removeAssetImages" },
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
            {
              kind: "InputValueDefinition",
              name: { kind: "Name", value: "imageIds" },
              type: {
                kind: "ListType",
                type: {
                  kind: "NonNullType",
                  type: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "ID" },
                  },
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
                  name: { kind: "Name", value: "AssetResponse" },
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
              name: { kind: "Name", value: "DateTime" },
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
              name: { kind: "Name", value: "DateTime" },
            },
          },
          directives: [],
        },
      ],
    },
    {
      kind: "ScalarTypeDefinition",
      description: {
        kind: "StringValue",
        value: "RFC 3339 compliant date-time string.",
        block: false,
      },
      name: { kind: "Name", value: "DateTime" },
      directives: [],
    },
    {
      kind: "ScalarTypeDefinition",
      description: {
        kind: "StringValue",
        value: "Represents the Node `Buffer` type",
        block: false,
      },
      name: { kind: "Name", value: "Byte" },
      directives: [],
    },
    {
      kind: "ScalarTypeDefinition",
      description: {
        kind: "StringValue",
        value: "Represents the absence of a value",
        block: false,
      },
      name: { kind: "Name", value: "Void" },
      directives: [],
    },
    {
      kind: "InterfaceTypeDefinition",
      description: {
        kind: "StringValue",
        value: "A generic error interface.",
        block: false,
      },
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
      name: { kind: "Name", value: "DocumentInput" },
      directives: [],
      fields: [
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "file" },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "FileInput" },
            },
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
              name: { kind: "Name", value: "DateTime" },
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
      name: { kind: "Name", value: "FileInput" },
      directives: [],
      fields: [
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "buffer" },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Byte" } },
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
            type: { kind: "NamedType", name: { kind: "Name", value: "Byte" } },
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
              name: { kind: "Name", value: "DateTime" },
            },
          },
          directives: [],
        },
      ],
    },
    {
      kind: "InputObjectTypeDefinition",
      name: { kind: "Name", value: "ImageInput" },
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
              name: { kind: "Name", value: "FileInput" },
            },
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
              name: { kind: "Name", value: "DateTime" },
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
