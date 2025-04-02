import type { ClassAttributes } from "../common/types.ts";
import { Spinner, type SpinnerVariant } from "./Spinner.tsx";
import { type Component, Show } from "solid-js";

/** Convenience component that simply shows some text above a spinner */
export const SpinnerWithText: Component<
  ClassAttributes & { text?: string; variant?: SpinnerVariant }
> = (props) => (
  <div
    class={`d-flex flex-column align-items-center ${props.class}`}
    classList={props.classList}
  >
    <Spinner variant={props.variant ?? "border"} />
    <Show when={props.text}>
      <p>{props.text}</p>
    </Show>
  </div>
);
