import type { ClassAttributes } from "../common/types.ts";
import ErrorIcon from "bootstrap-icons/icons/exclamation-circle-fill.svg";
import { Option, Schema, pipe } from "effect";
import { type Component, type JSX, Show } from "solid-js";

/** Convenience component to show an error alert */
export const ErrorAlert: Component<
  ClassAttributes & {
    title?: JSX.Element;
    body?: JSX.Element;
    dismiss?: JSX.Element;
    onDismiss?: EventListener;
  }
> = (props) => (
  <div
    class={`alert alert-danger ${props.class ?? ""}`}
    classList={props.classList}
    role="alert"
  >
    <Show when={props.title}>
      <h4 class="alert-heading d-flex align-items-center">
        <ErrorIcon class={"bi me-1"} aria-hidden="true" />
        {props.title}
      </h4>
    </Show>

    <Show when={props.body}>
      {pipe(
        props.body,
        Schema.decodeUnknownOption(Schema.String),
        Option.match({
          onSome: (body) => <p>{body}</p>,
          onNone: () => props.body,
        }),
      )}
    </Show>

    <Show when={props.onDismiss} keyed>
      {(onDismiss) => (
        <>
          <hr />

          <button type="button" class="btn btn-primary" onClick={onDismiss}>
            {props.dismiss ?? "Dismiss"}
          </button>
        </>
      )}
    </Show>
  </div>
);
