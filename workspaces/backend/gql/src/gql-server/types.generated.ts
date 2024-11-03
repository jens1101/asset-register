import type { GraphQLResolveInfo } from "graphql";

export type Maybe<T> = T | null | undefined;
export type InputMaybe<T> = T | null | undefined;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string | number };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

/** A generic error interface. */
export type Error = {
  message: Scalars["String"]["output"];
};

/** An example type */
export type Example = {
  __typename?: "Example";
  id: Scalars["ID"]["output"];
  name: Scalars["String"]["output"];
};

/** An example input */
export type ExampleFilter = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type Mutation = {
  __typename?: "Mutation";
  /** An example mutation */
  createExample: Example;
};

export type MutationcreateExampleArgs = {
  name: Scalars["String"]["input"];
};

export type Query = {
  __typename?: "Query";
  /** An example query */
  examples: Example;
};

export type QueryexamplesArgs = {
  filter?: InputMaybe<ExampleFilter>;
};

export type Subscription = {
  __typename?: "Subscription";
  /** An example subscription */
  examples: Example;
};

export type SubscriptionexamplesArgs = {
  filter?: InputMaybe<ExampleFilter>;
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping of interface types */
export type ResolversInterfaceTypes<_RefType extends Record<string, unknown>> =
  {
    Error: never;
  };

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Error: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>["Error"]>;
  String: ResolverTypeWrapper<Scalars["String"]["output"]>;
  Example: ResolverTypeWrapper<Example>;
  ID: ResolverTypeWrapper<Scalars["ID"]["output"]>;
  ExampleFilter: ExampleFilter;
  Mutation: ResolverTypeWrapper<{}>;
  Query: ResolverTypeWrapper<{}>;
  Subscription: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]["output"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Error: ResolversInterfaceTypes<ResolversParentTypes>["Error"];
  String: Scalars["String"]["output"];
  Example: Example;
  ID: Scalars["ID"]["output"];
  ExampleFilter: ExampleFilter;
  Mutation: {};
  Query: {};
  Subscription: {};
  Boolean: Scalars["Boolean"]["output"];
};

export type ErrorResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Error"] = ResolversParentTypes["Error"],
> = {
  __resolveType?: TypeResolveFn<null, ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type ExampleResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Example"] = ResolversParentTypes["Example"],
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  name?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"],
> = {
  createExample?: Resolver<
    ResolversTypes["Example"],
    ParentType,
    ContextType,
    RequireFields<MutationcreateExampleArgs, "name">
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Query"] = ResolversParentTypes["Query"],
> = {
  examples?: Resolver<
    ResolversTypes["Example"],
    ParentType,
    ContextType,
    Partial<QueryexamplesArgs>
  >;
};

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes["Subscription"] = ResolversParentTypes["Subscription"],
> = {
  examples?: SubscriptionResolver<
    ResolversTypes["Example"],
    "examples",
    ParentType,
    ContextType,
    Partial<SubscriptionexamplesArgs>
  >;
};

export type Resolvers<ContextType = any> = {
  Error?: ErrorResolvers<ContextType>;
  Example?: ExampleResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
};
