import { ScalarName } from "./ScalarName.ts";
import { StringScalar } from "./StringScalar.ts";
import { Schema } from "effect";

export const trimmedStringScalar = new StringScalar({
  name: ScalarName.TrimmedString,
  schema: Schema.Trimmed,
});
