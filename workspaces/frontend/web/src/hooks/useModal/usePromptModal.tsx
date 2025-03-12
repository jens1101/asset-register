import { useCustomModal } from "./useCustomModal.js";
import { Modal } from "bootstrap";
import { type Component, type JSX, Show } from "solid-js";

type PromptDialogOptions = Partial<{
  title: JSX.Element;
  body: JSX.Element;
  positive: JSX.Element;
  negative: JSX.Element;
}>;

const PromptDialog: Component<
  PromptDialogOptions & { onPositive: EventListener; onNegative: EventListener }
> = (props) => (
  <div class="modal-dialog">
    <div class="modal-content">
      <Show when={props.title}>
        <div class="modal-header">
          <h5 class="modal-title">{props.title}</h5>
        </div>
      </Show>

      <div class="modal-body">
        <Show when={typeof props.body === "string"} fallback={props.body}>
          <p>{props.body}</p>
        </Show>
      </div>

      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary"
          onClick={(event) => {
            props.onNegative(event);
          }}
        >
          {props.negative ?? "Cancel"}
        </button>

        <button
          type="button"
          class="btn btn-primary"
          onClick={(event) => {
            props.onPositive(event);
          }}
        >
          {props.positive ?? "Okay"}
        </button>
      </div>
    </div>
  </div>
);

/**
 * Hook to show a prompt to a user. A prompt is typically used to confirm an
 * action, e.g.: "Do you want to delete this asset?"
 */
export const usePromptModal = () => {
  const { showCustomModal, dismissModal } = useCustomModal<
    "negative" | "positive"
  >();

  /**
   * Creates and shows a prompt modal.
   * @param promptOptions Options to set the prompt dialog's content.
   * @param modalOptions Additional {@link Modal.Options | options} related to
   * the modal behaviour.
   * @returns An Effect with the result of the prompt:
   *
   * - `"positive"` when the user clicked on the "positive" button
   * - `"negative"` when the user clicked on the "negative" button
   * - `null` when the user dismissed the modal by other means, like clicking
   * the backdrop.
   */
  const showPromptModal = (
    promptOptions: PromptDialogOptions,
    modalOptions?: Partial<Modal.Options>,
  ) =>
    showCustomModal(
      <PromptDialog
        {...promptOptions}
        onPositive={() => {
          dismissModal("positive");
        }}
        onNegative={() => {
          dismissModal("negative");
        }}
      />,
      modalOptions,
    );

  return {
    showPromptModal,
    dismissModal,
  };
};
