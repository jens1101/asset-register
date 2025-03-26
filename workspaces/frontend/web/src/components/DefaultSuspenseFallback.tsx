import type { ClassAttributes } from "../common/types.ts";
import { Spinner } from "./Spinner.tsx";
import { type Component, Show } from "solid-js";

/** Convenience component that can be used as a suspense fallback */
export const DefaultSuspenseFallback: Component<
  ClassAttributes & { loadingText?: string }
> = (props) => (
  <div
    class={`d-flex flex-column align-items-center ${props.class}`}
    classList={props.classList}
  >
    <Show when={props.loadingText}>
      <p>{props.loadingText}</p>
    </Show>
    <Spinner />
  </div>
);
