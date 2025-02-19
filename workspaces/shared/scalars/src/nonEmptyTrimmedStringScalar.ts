import { ScalarName } from "./ScalarName.js";
import { StringScalar } from "./StringScalar.js";
import { Schema } from "effect";

export const nonEmptyTrimmedStringScalar = new StringScalar({
  name: ScalarName.NonEmptyTrimmedString,
  schema: Schema.NonEmptyTrimmedString,
});
