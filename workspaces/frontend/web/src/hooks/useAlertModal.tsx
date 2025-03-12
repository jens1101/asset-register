import { useCustomModal } from "./useCustomModal.js";
import { Modal } from "bootstrap";
import { type Component, type JSX, Show } from "solid-js";

type AlertDialogOptions = Partial<{
  title: JSX.Element;
  body: JSX.Element;
  dismiss: JSX.Element;
}>;

const AlertDialog: Component<
  AlertDialogOptions & { onDismiss: EventListener }
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
          class="btn btn-primary"
          onClick={(event) => {
            props.onDismiss(event);
          }}
        >
          {props.dismiss ?? "Dismiss"}
        </button>
      </div>
    </div>
  </div>
);

/**
 * Hook to show an alert modal to the user. This is usually used to convey an
 * important message to the user, like an error.
 */
export const useAlertModal = () => {
  const { showCustomModal, dismissModal } = useCustomModal();

  /**
   * Creates and shows an alert modal.
   * @param alertOptions Options to set the alert dialog's content.
   * @param modalOptions Additional {@link Modal.Options | options} related to
   * the modal behaviour.
   * @returns An Effect that resolves with `null` after the user dismissed the
   * modal.
   */
  const showAlertModal = (
    alertOptions: AlertDialogOptions,
    modalOptions?: Partial<Modal.Options>,
  ) =>
    showCustomModal(
      <AlertDialog
        {...alertOptions}
        onDismiss={() => {
          dismissModal(null);
        }}
      />,
      modalOptions,
    );

  return {
    showAlertModal,
    dismissModal,
  };
};
