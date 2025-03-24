import type { ClassAttributes } from "../common/types.ts";
import type { Component } from "solid-js";

/** Component used to indicate a loading state */
export const Spinner: Component<
  ClassAttributes & {
    /** The visual variant of the spinner. Defaults to "border" */
    variant?: "border" | "grow";
  }
> = (props) => (
  <div
    class={`${props.variant === "grow" ? "spinner-grow" : "spinner-border"} ${props.class ?? ""}`}
    classList={props.classList}
    role="status"
  >
    <span class="visually-hidden">Loading...</span>
  </div>
);
