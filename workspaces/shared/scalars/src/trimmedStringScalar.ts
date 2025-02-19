import { ScalarName } from "./ScalarName.js";
import { StringScalar } from "./StringScalar.js";
import { Schema } from "effect";

export const trimmedStringScalar = new StringScalar({
  name: ScalarName.TrimmedString,
  schema: Schema.Trimmed,
});
