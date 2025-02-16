import { Option } from "effect";

export type ParentInfo<K extends string | number = string | number> = {
  /** The parent {@link WalkerNode node} of the current node */
  parentNode: WalkerNode<false, K>;
  /**
   * The key that needs to be accessed in the parent node's value to derive the
   * child node's value.
   * @example
   * ```
   * const childValue = parentInfo.parentNode.value[parentInfo.childKey];
   * ```
   */
  childKey: K;
};

/** A data type representing any JS primitive value */
export type PrimitiveValue =
  | string
  | number
  | bigint
  | boolean
  | undefined
  | symbol
  | null;

/**
 * A representation of each node that's encountered. Each node can either be a
 * primitive or not.
 *
 * Primitive nodes have a {@link PrimitiveValue primitive value} and therefore
 * must be leaf nodes (they cannot have dececendants). Hence the lack of a
 * `skipDescendants` function.
 *
 * The `skipDescendants` function is present on nodes with a complex data type.
 * Once called, the function will not iterate over the node's descendants. Note
 * however, that for cyclical data the descendants might be encountered again
 * if they are accessible via a differnet path.
 *
 * The parent info is an Option, because the root node does not have a parent.
 * All other nodes will have some parent information.
 */
export type WalkerNode<
  Primitive extends boolean = boolean,
  K extends string | number = string | number,
> = Primitive extends true
  ? {
      value: PrimitiveValue;
      parentInfo: Option.Option<ParentInfo>;
      isPrimitive: Primitive;
    }
  : {
      value: Record<K, unknown>;
      skipDescendants: () => void;
      parentInfo: Option.Option<ParentInfo>;
      isPrimitive: Primitive;
    };

/**
 * Generator function that walks the specified unknown value in a depth-first
 * fashion. Each step will yield an instance of {@link WalkerNode}.
 *
 * A register is kept of what nodes have been visited already and each node may
 * only be visited once. This means that cyclical data will not walk infinitely.
 *
 * Any value can be passed to this function. A primitive value, like a number,
 * will still yield one node.
 */
export function* walk(value: unknown) {
  yield* walkNode({
    value,
    register: new Set(),
    // The root node has no parent, therefore no parent info.
    parentInfo: Option.none(),
  });
}

/**
 * This generator does the actual work of walking. It calls itself recursively.
 */
function* walkNode({
  value,
  register,
  parentInfo,
}: {
  /** The value of the current node that needs to be walked */
  value: unknown;
  /** A Set that keeps track of what nodes have been viited */
  register: Set<unknown>;
  /** The parent info for the current node */
  parentInfo: Option.Option<ParentInfo>;
}): Generator<WalkerNode, void> {
  if (!value || typeof value !== "object") {
    yield {
      value,
      parentInfo,
      isPrimitive: true,
    } as WalkerNode<true>;
    return;
  }

  if (register.has(value)) return;

  // Note that only complex values are kept track of. This is because equal
  // values of two different primitive nodes are indistingushable from each
  // other, therefore it would cause false positives if we kept track of those.
  register.add(value);

  let skipDescendants = false;
  const node: WalkerNode<false> = {
    value: value as Record<string | number, unknown>,
    skipDescendants: () => {
      skipDescendants = true;
    },
    parentInfo,
    isPrimitive: false,
  };

  yield node;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  if (skipDescendants) return;

  for (const [childKey, childValue] of Object.entries(value)) {
    yield* walkNode({
      value: childValue,
      register,
      parentInfo: Option.some({
        parentNode: node,
        childKey,
      }),
    });
  }
}
