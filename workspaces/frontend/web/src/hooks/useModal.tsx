import { ModalContext } from "../context/modal.jsx";
import { Modal } from "bootstrap";
import { Option } from "effect";
import {
  type Component,
  type JSX,
  Show,
  createSignal,
  onCleanup,
  startTransition,
  useContext,
} from "solid-js";

type PromptProps = {
  title?: JSX.Element;
  body: JSX.Element;
  okay?: JSX.Element;
  cancel?: JSX.Element;
  onOkay: EventListener;
  onCancel: EventListener;
};

const PromptDialog: Component<PromptProps> = (props) => (
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
            props.onCancel(event);
          }}
        >
          {props.cancel ?? "Cancel"}
        </button>

        <button
          type="button"
          class="btn btn-primary"
          onClick={(event) => {
            props.onOkay(event);
          }}
        >
          {props.okay ?? "Okay"}
        </button>
      </div>
    </div>
  </div>
);

export const useModal = () => {
  const context = useContext(ModalContext);
  const [modalInstance, setModalInstance] = createSignal<Option.Option<Modal>>(
    Option.none(),
  );

  const dismissModal = (): void => {
    modalInstance().pipe((value) =>
      Option.gen(function* () {
        const modalInstance = yield* value;

        modalInstance.hide();
        modalInstance.dispose();

        context.setContent(Option.none());
        setModalInstance(Option.none());
      }),
    );
  };

  const showCustomModal = (
    dialog: JSX.Element,
    options?: Partial<Modal.Options>,
  ): void => {
    Option.gen(function* () {
      const element = yield* context.element();

      startTransition(() => context.setContent(Option.some(dialog)))
        .then(() => {
          const modalInstance = new Modal(element, options);
          setModalInstance(Option.some(modalInstance));
          modalInstance.show();
        })
        .catch((error: unknown) => {
          // TODO: error handling
          console.log(error);
        });
    });
  };

  const showPromptModal = (
    promptProps: Omit<PromptProps, "onCancel" | "onOkay"> & {
      onCancel?: EventListener;
      onOkay?: EventListener;
    },
    options?: Partial<Modal.Options>,
  ): void => {
    const dialog = (
      <PromptDialog
        {...promptProps}
        onOkay={(event) => {
          dismissModal();
          promptProps.onOkay?.(event);
        }}
        onCancel={(event) => {
          dismissModal();
          promptProps.onCancel?.(event);
        }}
      />
    );

    showCustomModal(dialog, options);
  };

  onCleanup(dismissModal);

  return {
    dismissModal,
    showCustomModal,
    showPromptModal,
  };
};
