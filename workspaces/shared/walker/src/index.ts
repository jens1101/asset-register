import { Option } from "effect";

type ParentInfo<K extends string | number = string | number> = {
  parentNode: WalkerNode<false, K>;
  childKey: K;
};

type WalkerNode<
  Primitive extends boolean = boolean,
  K extends string | number = string | number,
> = Primitive extends true
  ? {
      value: unknown;
      parentInfo: Option.Option<ParentInfo>;
      isPrimitive: Primitive;
    }
  : {
      value: Record<K, unknown>;
      skipDescendants: () => void;
      parentInfo: Option.Option<ParentInfo>;
      isPrimitive: Primitive;
    };

// TODO: documentation
export function* walk(value: unknown) {
  yield* _walk({
    value,
    register: new Set(),
    parentInfo: Option.none(),
  });
}

function* _walk({
  value,
  register,
  parentInfo,
}: {
  value: unknown;
  register: Set<unknown>;
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
    yield* _walk({
      value: childValue,
      register,
      parentInfo: Option.some({
        parentNode: node,
        childKey,
      }),
    });
  }
}
