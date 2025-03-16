import { ScalarName } from "./ScalarName.ts";
import { StringScalar } from "./StringScalar.ts";
import { Schema } from "effect";

export const nonEmptyTrimmedStringScalar = new StringScalar({
  name: ScalarName.NonEmptyTrimmedString,
  schema: Schema.NonEmptyTrimmedString,
});
