/* This file was automatically generated. DO NOT UPDATE MANUALLY. */
import type { Resolvers } from "./types.generated.js";
import { examples as Query_examples } from "./example/resolvers/Query/examples.js";
import { createExample as Mutation_createExample } from "./example/resolvers/Mutation/createExample.js";
import { examples as Subscription_examples } from "./example/resolvers/Subscription/examples.js";
import { Example } from "./example/resolvers/Example.js";
export const resolvers: Resolvers = {
  Query: { examples: Query_examples },
  Mutation: { createExample: Mutation_createExample },
  Subscription: { examples: Subscription_examples },
  Example: Example,
};
