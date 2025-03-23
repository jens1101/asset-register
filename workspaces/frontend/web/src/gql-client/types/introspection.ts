import type { IntrospectionQuery } from "graphql";

export default {
  __schema: {
    queryType: {
      name: "Query",
      kind: "OBJECT",
    },
    mutationType: {
      name: "Mutation",
      kind: "OBJECT",
    },
    subscriptionType: null,
    types: [
      {
        kind: "OBJECT",
        name: "Asset",
        fields: [
          {
            name: "createdAt",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "description",
            type: {
              kind: "SCALAR",
              name: "Any",
            },
            args: [],
          },
          {
            name: "id",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "images",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "LIST",
                ofType: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "OBJECT",
                    name: "Image",
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
          {
            name: "mainImage",
            type: {
              kind: "OBJECT",
              name: "Image",
              ofType: null,
            },
            args: [],
          },
          {
            name: "name",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "proofOfPurchase",
            type: {
              kind: "OBJECT",
              name: "Document",
              ofType: null,
            },
            args: [],
          },
          {
            name: "updatedAt",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "value",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "Sum",
                ofType: null,
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "DeleteDocumentError",
        fields: [
          {
            name: "message",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
        ],
        interfaces: [
          {
            kind: "INTERFACE",
            name: "Error",
          },
        ],
      },
      {
        kind: "OBJECT",
        name: "Document",
        fields: [
          {
            name: "asset",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "Asset",
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: "createdAt",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "file",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "File",
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: "id",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "INTERFACE",
        name: "Error",
        fields: [
          {
            name: "message",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
        ],
        interfaces: [],
        possibleTypes: [
          {
            kind: "OBJECT",
            name: "DeleteDocumentError",
          },
          {
            kind: "OBJECT",
            name: "ImageNotFoundError",
          },
          {
            kind: "OBJECT",
            name: "ReadAssetError",
          },
        ],
      },
      {
        kind: "OBJECT",
        name: "File",
        fields: [
          {
            name: "buffer",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "createdAt",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "filename",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "id",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "mimeType",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "Image",
        fields: [
          {
            name: "asset",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "Asset",
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: "createdAt",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "description",
            type: {
              kind: "SCALAR",
              name: "Any",
            },
            args: [],
          },
          {
            name: "file",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "File",
                ofType: null,
              },
            },
            args: [],
          },
          {
            name: "id",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "name",
            type: {
              kind: "SCALAR",
              name: "Any",
            },
            args: [],
          },
          {
            name: "updatedAt",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "ImageNotFoundError",
        fields: [
          {
            name: "message",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
        ],
        interfaces: [
          {
            kind: "INTERFACE",
            name: "Error",
          },
        ],
      },
      {
        kind: "OBJECT",
        name: "Mutation",
        fields: [
          {
            name: "createAsset",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "OBJECT",
                name: "Asset",
                ofType: null,
              },
            },
            args: [
              {
                name: "data",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "deleteAsset",
            type: {
              kind: "OBJECT",
              name: "ReadAssetError",
              ofType: null,
            },
            args: [
              {
                name: "id",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "updateAsset",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "UNION",
                name: "UpdateAssetResponse",
                ofType: null,
              },
            },
            args: [
              {
                name: "data",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "Query",
        fields: [
          {
            name: "asset",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "UNION",
                name: "ReadAssetResponse",
                ofType: null,
              },
            },
            args: [
              {
                name: "id",
                type: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "SCALAR",
                    name: "Any",
                  },
                },
              },
            ],
          },
          {
            name: "assets",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "LIST",
                ofType: {
                  kind: "NON_NULL",
                  ofType: {
                    kind: "OBJECT",
                    name: "Asset",
                    ofType: null,
                  },
                },
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "OBJECT",
        name: "ReadAssetError",
        fields: [
          {
            name: "message",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
        ],
        interfaces: [
          {
            kind: "INTERFACE",
            name: "Error",
          },
        ],
      },
      {
        kind: "UNION",
        name: "ReadAssetResponse",
        possibleTypes: [
          {
            kind: "OBJECT",
            name: "Asset",
          },
          {
            kind: "OBJECT",
            name: "ReadAssetError",
          },
        ],
      },
      {
        kind: "OBJECT",
        name: "Sum",
        fields: [
          {
            name: "amount",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
          {
            name: "currency",
            type: {
              kind: "NON_NULL",
              ofType: {
                kind: "SCALAR",
                name: "Any",
              },
            },
            args: [],
          },
        ],
        interfaces: [],
      },
      {
        kind: "UNION",
        name: "UpdateAssetResponse",
        possibleTypes: [
          {
            kind: "OBJECT",
            name: "Asset",
          },
          {
            kind: "OBJECT",
            name: "DeleteDocumentError",
          },
          {
            kind: "OBJECT",
            name: "ImageNotFoundError",
          },
          {
            kind: "OBJECT",
            name: "ReadAssetError",
          },
        ],
      },
      {
        kind: "SCALAR",
        name: "Any",
      },
    ],
    directives: [],
  },
} as unknown as IntrospectionQuery;
