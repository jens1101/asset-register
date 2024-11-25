import { GraphQLScalarType } from "graphql";

export const Void = new GraphQLScalarType<null, string>({
  name: "Void",
  serialize() {
    return "";
  },
  parseValue() {
    return null;
  },
  parseLiteral() {
    return null;
  },
});
