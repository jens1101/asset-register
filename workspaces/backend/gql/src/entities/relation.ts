// TODO: I don't like that it's not possible to default these type relations.
//  Would be great to have a default per entity and then reuse that for nested entities.
// TODO: This fails with nested relations. It would be great to be able to nest relations.
// TODO: maybe move this to a seperate issue.

/** The base type for expressing entity relations */
export type Relations<R extends Record<string, unknown>> = R;

/**
 * The base type for creating a list of options of which relations to include
 * in the entity.
 */
export type RelationOptions<T extends Relations<Record<string, unknown>>> = {
  [K in keyof T]?: boolean;
};

/**
 * The base type to express what relations are included after setting the
 * relation options.
 */
export type ChosenRelations<
  R extends Relations<Record<string, unknown>>,
  O extends RelationOptions<R>,
> = {
  [K in keyof R as O[K] extends true ? K : never]: R[K];
};
