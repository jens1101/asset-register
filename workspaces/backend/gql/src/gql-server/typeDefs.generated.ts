import type { DocumentNode } from "graphql";

export const typeDefs = {
  kind: "Document",
  definitions: [
    {
      kind: "InputObjectTypeDefinition",
      description: {
        kind: "StringValue",
        value: "Inputs required for creating a new asset.",
        block: false,
      },
      name: { kind: "Name", value: "CreateAssetInput" },
      directives: [],
      fields: [
        {
          kind: "InputValueDefinition",
          description: {
            kind: "StringValue",
            value:
              "The asset name. This must be a non-empty string with no leading or trailing\nwhitespaces.",
            block: true,
          },
          name: { kind: "Name", value: "name" },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "NonEmptyTrimmedString" },
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
          description: {
            kind: "StringValue",
            value: "Images associated with the asset. The array may be empty.",
            block: false,
          },
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
          description: {
            kind: "StringValue",
            value:
              "The value of the asset at the time of purchase or valuation.",
            block: false,
          },
          name: { kind: "Name", value: "value" },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "SumInput" },
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
      description: {
        kind: "StringValue",
        value:
          "Inputs for updating an asset. Only the fields that need to be updated need to be\nincluded.",
        block: true,
      },
      name: { kind: "Name", value: "UpdateAssetInput" },
      directives: [],
      fields: [
        {
          kind: "InputValueDefinition",
          description: {
            kind: "StringValue",
            value: "The ID of the asset that needs to be updated.",
            block: false,
          },
          name: { kind: "Name", value: "id" },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          description: {
            kind: "StringValue",
            value:
              "The asset name. This must be a non-empty string with no leading or trailing\nwhitespaces.",
            block: true,
          },
          name: { kind: "Name", value: "name" },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "NonEmptyTrimmedString" },
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
          description: {
            kind: "StringValue",
            value:
              "The value of the asset at the time of purchase or valuation.",
            block: false,
          },
          name: { kind: "Name", value: "value" },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "SumInput" },
          },
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
          description: {
            kind: "StringValue",
            value: "Mutation to create a new asset",
            block: false,
          },
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
            type: { kind: "NamedType", name: { kind: "Name", value: "Asset" } },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          description: {
            kind: "StringValue",
            value: "Mutation to update an existing asset",
            block: false,
          },
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
              name: { kind: "Name", value: "UpdateAssetResponse" },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          description: {
            kind: "StringValue",
            value:
              "Mutation to delete an asset. Upon success the return value will be `null`. An\nerror value will be returned when an error occurs.",
            block: true,
          },
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
            name: { kind: "Name", value: "ReadAssetError" },
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
          description: {
            kind: "StringValue",
            value: "Query a single asset by ID",
            block: false,
          },
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
              name: { kind: "Name", value: "ReadAssetResponse" },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          description: {
            kind: "StringValue",
            value: "Query all assets",
            block: false,
          },
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
          description: {
            kind: "StringValue",
            value:
              "The asset name. This must be a non-empty string with no leading or trailing\nwhitespaces.",
            block: true,
          },
          name: { kind: "Name", value: "name" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "NonEmptyTrimmedString" },
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
          description: {
            kind: "StringValue",
            value:
              "The main image is the first image in the array of images associated with the\nasset. This can be `null` if the asset has no images.",
            block: true,
          },
          name: { kind: "Name", value: "mainImage" },
          arguments: [],
          type: { kind: "NamedType", name: { kind: "Name", value: "Image" } },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          description: {
            kind: "StringValue",
            value: "Images associated with the asset.",
            block: false,
          },
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
          description: {
            kind: "StringValue",
            value:
              "The value of the asset at the time of purchase or valuation.",
            block: false,
          },
          name: { kind: "Name", value: "value" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "Sum" } },
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
      kind: "ObjectTypeDefinition",
      description: {
        kind: "StringValue",
        value:
          "Error that occurs when the specified asset could not be found in the database",
        block: false,
      },
      name: { kind: "Name", value: "ReadAssetError" },
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
      kind: "UnionTypeDefinition",
      name: { kind: "Name", value: "ReadAssetResponse" },
      directives: [],
      types: [
        { kind: "NamedType", name: { kind: "Name", value: "Asset" } },
        { kind: "NamedType", name: { kind: "Name", value: "ReadAssetError" } },
      ],
    },
    {
      kind: "UnionTypeDefinition",
      name: { kind: "Name", value: "UpdateAssetResponse" },
      directives: [],
      types: [
        { kind: "NamedType", name: { kind: "Name", value: "Asset" } },
        { kind: "NamedType", name: { kind: "Name", value: "ReadAssetError" } },
        {
          kind: "NamedType",
          name: { kind: "Name", value: "ImageNotFoundError" },
        },
        {
          kind: "NamedType",
          name: { kind: "Name", value: "DeleteDocumentError" },
        },
      ],
    },
    {
      kind: "ScalarTypeDefinition",
      description: {
        kind: "StringValue",
        value:
          "A tagged scalar that encodes to an ISO 8601 timestamp and decodes to a\n`Temporal.Instant` instance.",
        block: true,
      },
      name: { kind: "Name", value: "TemporalInstant" },
      directives: [],
    },
    {
      kind: "ScalarTypeDefinition",
      description: {
        kind: "StringValue",
        value:
          "A tagged scalar that encodes to a base64 string and decodes to a `Uint8Array`\ninstance.",
        block: true,
      },
      name: { kind: "Name", value: "Uint8Array" },
      directives: [],
    },
    {
      kind: "ScalarTypeDefinition",
      description: {
        kind: "StringValue",
        value:
          "A tagged scalar that encodes to a decimal numerical string and decodes to a\n`BigDecimal` instance.",
        block: true,
      },
      name: { kind: "Name", value: "BigDecimal" },
      directives: [],
    },
    {
      kind: "ScalarTypeDefinition",
      description: {
        kind: "StringValue",
        value: "A string scalar of ISO 4217 3-letter currency codes.",
        block: false,
      },
      name: { kind: "Name", value: "Currency" },
      directives: [],
    },
    {
      kind: "ScalarTypeDefinition",
      description: {
        kind: "StringValue",
        value:
          "A string scalar that may not be empty nor have any leading or trailing\nwhitespaces.",
        block: true,
      },
      name: { kind: "Name", value: "NonEmptyTrimmedString" },
      directives: [],
    },
    {
      kind: "ScalarTypeDefinition",
      description: {
        kind: "StringValue",
        value:
          "A string scalar that may not have any leading or trailing whitespaces.",
        block: false,
      },
      name: { kind: "Name", value: "TrimmedString" },
      directives: [],
    },
    {
      kind: "InterfaceTypeDefinition",
      description: {
        kind: "StringValue",
        value:
          "The interface for expected business errors. This allows us to distinguish\nbetween errors and defects. For example: querying for an asset that does not\nexist is an expected error and then this interface is used to standardise the\nreturned error.",
        block: true,
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
      description: {
        kind: "StringValue",
        value: "Inputs required for creating a new document.",
        block: false,
      },
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
      description: {
        kind: "StringValue",
        value:
          "Inputs for updating a document. Only the fields that need to be updated need to\nbe included.",
        block: true,
      },
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
      description: {
        kind: "StringValue",
        value: "Inputs required for deleting a document.",
        block: false,
      },
      name: { kind: "Name", value: "DeleteDocumentInput" },
      directives: [],
      fields: [
        {
          kind: "InputValueDefinition",
          description: {
            kind: "StringValue",
            value: "The ID of the document that needs to be deleted.",
            block: false,
          },
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
      description: {
        kind: "StringValue",
        value:
          "Inputs required for mutating a document. This approach allows the use of a\nsingle mutation to update or delete a document.",
        block: true,
      },
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
      description: {
        kind: "StringValue",
        value:
          "The document type is used to contain a file with some associated metadata.",
        block: false,
      },
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
          description: {
            kind: "StringValue",
            value: "The file contained within this document.",
            block: false,
          },
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
          description: {
            kind: "StringValue",
            value: "The asset associated with this document.",
            block: false,
          },
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
      kind: "ObjectTypeDefinition",
      description: {
        kind: "StringValue",
        value:
          "Error that occurs when attempting to delete a document from an asset that\ndoesn't own the document. In other words: the asset in question does not match\nthe document's associated asset.",
        block: true,
      },
      name: { kind: "Name", value: "DeleteDocumentError" },
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
      kind: "InputObjectTypeDefinition",
      description: {
        kind: "StringValue",
        value: "Inputs required for creating a new file.",
        block: false,
      },
      name: { kind: "Name", value: "CreateFileInput" },
      directives: [],
      fields: [
        {
          kind: "InputValueDefinition",
          description: {
            kind: "StringValue",
            value: "The actual file contents.",
            block: false,
          },
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
          description: {
            kind: "StringValue",
            value: "The name of the file.",
            block: false,
          },
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
          description: {
            kind: "StringValue",
            value: "The mime type of the file.",
            block: false,
          },
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
      description: {
        kind: "StringValue",
        value:
          "The file type is a genric container for binary file data plus some essential\nmetadata.",
        block: true,
      },
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
          description: {
            kind: "StringValue",
            value: "The actual file contents.",
            block: false,
          },
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
          description: {
            kind: "StringValue",
            value: "The name of the file.",
            block: false,
          },
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
          description: {
            kind: "StringValue",
            value:
              "The mime type of the file. This is essential for knowing what the file is.",
            block: false,
          },
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
      description: {
        kind: "StringValue",
        value: "Inputs required for creating a new image.",
        block: false,
      },
      name: { kind: "Name", value: "CreateImageInput" },
      directives: [],
      fields: [
        {
          kind: "InputValueDefinition",
          description: {
            kind: "StringValue",
            value:
              "The image name. It may not contain leading or trailing whitespaces.",
            block: false,
          },
          name: { kind: "Name", value: "name" },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "TrimmedString" },
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
          description: {
            kind: "StringValue",
            value: "The file associated with this image.",
            block: false,
          },
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
          description: {
            kind: "StringValue",
            value:
              "The ID of the image that preceeds this one. Used for ordering images. If\n`null` or omitted then the new image will be appended to the start of the\nlist.",
            block: true,
          },
          name: { kind: "Name", value: "previousImageId" },
          type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          directives: [],
        },
      ],
    },
    {
      kind: "InputObjectTypeDefinition",
      description: {
        kind: "StringValue",
        value:
          "Inputs for updating an image. Only the fields that need to be updated need to be\nincluded.",
        block: true,
      },
      name: { kind: "Name", value: "UpdateImageInput" },
      directives: [],
      fields: [
        {
          kind: "InputValueDefinition",
          description: {
            kind: "StringValue",
            value: "The ID of the image that needs to be updated.",
            block: false,
          },
          name: { kind: "Name", value: "id" },
          type: {
            kind: "NonNullType",
            type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          description: {
            kind: "StringValue",
            value:
              "The image name. It may not contain leading or trailing whitespaces.",
            block: false,
          },
          name: { kind: "Name", value: "name" },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "TrimmedString" },
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
          description: {
            kind: "StringValue",
            value: "A new image file that will replace the existing one.",
            block: false,
          },
          name: { kind: "Name", value: "file" },
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "CreateFileInput" },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          description: {
            kind: "StringValue",
            value:
              "The ID of the image that preceeds this one. Used for reordering images. If\n`null` then the new image will be moved to the start of the list.",
            block: true,
          },
          name: { kind: "Name", value: "previousImageId" },
          type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          directives: [],
        },
      ],
    },
    {
      kind: "InputObjectTypeDefinition",
      description: {
        kind: "StringValue",
        value: "Inputs required for deleting an image.",
        block: false,
      },
      name: { kind: "Name", value: "DeleteImageInput" },
      directives: [],
      fields: [
        {
          kind: "InputValueDefinition",
          description: {
            kind: "StringValue",
            value: "The ID of the image that needs to be deleted.",
            block: false,
          },
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
      description: {
        kind: "StringValue",
        value:
          "Inputs required for mutating an image. This approach allows the use of a single\nmutation to create, update, or delete an image.",
        block: true,
      },
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
      description: {
        kind: "StringValue",
        value:
          "The image type is used to contain a file with some image related metadata.",
        block: false,
      },
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
          description: {
            kind: "StringValue",
            value:
              "The image name. It may not contain leading or trailing whitespaces.",
            block: false,
          },
          name: { kind: "Name", value: "name" },
          arguments: [],
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "TrimmedString" },
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
          description: {
            kind: "StringValue",
            value: "The file contained within this image.",
            block: false,
          },
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
          description: {
            kind: "StringValue",
            value: "The asset associated with this image.",
            block: false,
          },
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
      kind: "ObjectTypeDefinition",
      description: {
        kind: "StringValue",
        value:
          "Occurs when an image was not found in the asset's list of images. This can\nhappen, for example, when images are reordered and the mutation input is bad.",
        block: true,
      },
      name: { kind: "Name", value: "ImageNotFoundError" },
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
      kind: "InputObjectTypeDefinition",
      description: {
        kind: "StringValue",
        value: "Generic input for creating or updating a sum.",
        block: false,
      },
      name: { kind: "Name", value: "SumInput" },
      directives: [],
      fields: [
        {
          kind: "InputValueDefinition",
          description: {
            kind: "StringValue",
            value: "An ISO 4217 currency code.",
            block: false,
          },
          name: { kind: "Name", value: "currency" },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Currency" },
            },
          },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          description: {
            kind: "StringValue",
            value: "The numerical amount as a decimal number.",
            block: false,
          },
          name: { kind: "Name", value: "amount" },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "BigDecimal" },
            },
          },
          directives: [],
        },
      ],
    },
    {
      kind: "ObjectTypeDefinition",
      description: {
        kind: "StringValue",
        value:
          "The sum type is used to associate a numerical amount with a currency.",
        block: false,
      },
      name: { kind: "Name", value: "Sum" },
      interfaces: [],
      directives: [],
      fields: [
        {
          kind: "FieldDefinition",
          description: {
            kind: "StringValue",
            value: "An ISO 4217 currency code.",
            block: false,
          },
          name: { kind: "Name", value: "currency" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Currency" },
            },
          },
          directives: [],
        },
        {
          kind: "FieldDefinition",
          description: {
            kind: "StringValue",
            value: "The numerical amount as a decimal number.",
            block: false,
          },
          name: { kind: "Name", value: "amount" },
          arguments: [],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "BigDecimal" },
            },
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
