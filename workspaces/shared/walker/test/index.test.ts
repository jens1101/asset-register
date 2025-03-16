import { type PrimitiveValue, walk } from "../src/index.ts";
import { Option } from "effect";
import assert from "node:assert/strict";
import test from "node:test";

await test("Walker", async (t) => {
  await t.test("should handle primitive values", () => {
    const primitives = [
      "a",
      0,
      1n,
      true,
      undefined,
      Symbol(),
      null,
    ] as PrimitiveValue[];

    for (const primitive of primitives) {
      assert.deepEqual(Array.from(walk(primitive)), [
        {
          value: primitive,
          parentInfo: Option.none(),
          isPrimitive: true,
        },
      ]);
    }
  });
});
