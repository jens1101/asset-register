import type { DocumentNode } from "graphql";

export const typeDefs = {
  kind: "Document",
  definitions: [
    {
      name: { kind: "Name", value: "Query" },
      kind: "ObjectTypeDefinition",
      fields: [
        {
          kind: "FieldDefinition",
          description: {
            kind: "StringValue",
            value: "An example query",
            block: false,
          },
          name: { kind: "Name", value: "examples" },
          arguments: [
            {
              kind: "InputValueDefinition",
              name: { kind: "Name", value: "filter" },
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "ExampleFilter" },
              },
              directives: [],
            },
          ],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Example" },
            },
          },
          directives: [],
        },
      ],
      directives: [],
      interfaces: [],
    },
    {
      name: { kind: "Name", value: "Mutation" },
      kind: "ObjectTypeDefinition",
      fields: [
        {
          kind: "FieldDefinition",
          description: {
            kind: "StringValue",
            value: "An example mutation",
            block: false,
          },
          name: { kind: "Name", value: "createExample" },
          arguments: [
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
          ],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Example" },
            },
          },
          directives: [],
        },
      ],
      directives: [],
      interfaces: [],
    },
    {
      name: { kind: "Name", value: "Subscription" },
      kind: "ObjectTypeDefinition",
      fields: [
        {
          kind: "FieldDefinition",
          description: {
            kind: "StringValue",
            value: "An example subscription",
            block: false,
          },
          name: { kind: "Name", value: "examples" },
          arguments: [
            {
              kind: "InputValueDefinition",
              name: { kind: "Name", value: "filter" },
              type: {
                kind: "NamedType",
                name: { kind: "Name", value: "ExampleFilter" },
              },
              directives: [],
            },
          ],
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "Example" },
            },
          },
          directives: [],
        },
      ],
      directives: [],
      interfaces: [],
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
      description: {
        kind: "StringValue",
        value: "An example input",
        block: false,
      },
      name: { kind: "Name", value: "ExampleFilter" },
      directives: [],
      fields: [
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "id" },
          type: { kind: "NamedType", name: { kind: "Name", value: "ID" } },
          directives: [],
        },
        {
          kind: "InputValueDefinition",
          name: { kind: "Name", value: "name" },
          type: { kind: "NamedType", name: { kind: "Name", value: "String" } },
          directives: [],
        },
      ],
    },
    {
      kind: "ObjectTypeDefinition",
      description: {
        kind: "StringValue",
        value: "An example type",
        block: false,
      },
      name: { kind: "Name", value: "Example" },
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
        {
          kind: "OperationTypeDefinition",
          type: {
            kind: "NamedType",
            name: { kind: "Name", value: "Subscription" },
          },
          operation: "subscription",
        },
      ],
    },
  ],
} as unknown as DocumentNode;
