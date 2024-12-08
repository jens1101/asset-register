import { type Accessor, type Component, Index, Show } from "solid-js";

export const Feedback: Component<{
  invalidFeedback?: string | string[];
  validFeedback?: string | string[];
}> = (props) => {
  const validFeedback: Accessor<string[]> = () => {
    const validFeedback = props.validFeedback;

    if (!validFeedback) return [];
    else if (Array.isArray(validFeedback)) return validFeedback;
    else return [validFeedback];
  };

  const invalidFeedback: Accessor<string[]> = () => {
    const invalidFeedback = props.invalidFeedback;

    if (!invalidFeedback) return [];
    else if (Array.isArray(invalidFeedback)) return invalidFeedback;
    else return [invalidFeedback];
  };

  return (
    <>
      <Show when={validFeedback().length === 1}>
        <div class="valid-feedback">{validFeedback()[0]}</div>
      </Show>

      <Show when={validFeedback().length > 1}>
        <ul class="valid-feedback">
          <Index each={validFeedback()}>
            {(message) => <li>{message()}</li>}
          </Index>
        </ul>
      </Show>

      <Show when={invalidFeedback().length === 1}>
        <div class="invalid-feedback">{invalidFeedback()[0]}</div>
      </Show>

      <Show when={invalidFeedback().length > 1}>
        <ul class="invalid-feedback">
          <Index each={invalidFeedback()}>
            {(message) => <li>{message()}</li>}
          </Index>
        </ul>
      </Show>
    </>
  );
};
