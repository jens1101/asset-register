import { ModalContext } from "../context/modal.jsx";
import { Modal } from "bootstrap";
import { Deferred, Effect, Option, pipe } from "effect";
import {
  type JSX,
  createEffect,
  createSignal,
  onCleanup,
  startTransition,
  useContext,
} from "solid-js";

export const useCustomModal = <Result = null>() => {
  const context = useContext(ModalContext);

  const [modalInstance, setModalInstance] = createSignal<Option.Option<Modal>>(
    Option.none(),
  );
  const [modalResult, setModalResult] = createSignal<
    Option.Option<Deferred.Deferred<Result | null>>
  >(Option.none());

  /**
   * Hide the modal instance, and resolve the modal result to the specified
   * value.
   */
  const dismissModal = (result: Result | null) =>
    pipe(
      Option.all([modalResult(), modalInstance()]),
      Option.andThen(([modalResult, modalInstance]) => {
        Deferred.unsafeDone(modalResult, Effect.succeed(result));
        modalInstance.hide();
      }),
    );

  /**
   * Creates and shows a custom modal. This is the core fuction used by all
   * other modal hooks.
   * @param dialog The JSX for the modal dialog.
   * @param options Additional {@link Modal.Options | options} related to the
   * modal behaviour.
   * @returns An effect that resolves with the specified result or `null`. By
   * default if the user dismisses the modal in any way then the result will be
   * `null`. However, it is possible to dismiss the modal with a custom result
   * which can then be used to drive follow-up behaviour.
   */
  const showCustomModal = (
    dialog: JSX.Element,
    options?: Partial<Modal.Options>,
  ) =>
    pipe(
      startTransition(() => context.setContent(Option.some(dialog))),
      (promise) => Effect.promise(() => promise),
      Effect.andThen(() =>
        Effect.all([context.element(), Deferred.make<Result | null>()]),
      ),
      Effect.andThen(([element, modalResult]) => {
        setModalResult(Option.some(modalResult));

        const modalInstance = new Modal(element, options);
        setModalInstance(Option.some(modalInstance));
        modalInstance.show();

        return Deferred.await(modalResult);
      }),
      // This can only happen if the modal element itself does not exist. This
      // should never happen, therefore we simply log an error just in case.
      Effect.catchTag("NoSuchElementException", (error) =>
        Effect.logError("Modal element not found", error).pipe(Effect.as(null)),
      ),
    );

  // Modals can be hidden by different means like a backdrop click, pressing
  // the escape key, etc. This effect is the default handler that will resolve
  // the deferred value with `null`. It also disposes the modal after it has
  // been hidden.
  createEffect(() => {
    const element = context.element();
    if (Option.isNone(element)) return;

    const callback = () =>
      pipe(
        modalInstance(),
        Option.andThen((modalInstance) => {
          modalInstance.dispose();
          context.setContent(Option.none());
          setModalInstance(Option.none());
        }),
        modalResult,
        Option.andThen((modalResult) => {
          Deferred.unsafeDone(modalResult, Effect.succeed(null));
        }),
      );

    element.value.addEventListener("hidden.bs.modal", callback, {
      passive: true,
    });

    onCleanup(() => {
      element.value.removeEventListener("hidden.bs.modal", callback);
    });
  });

  onCleanup(() =>
    pipe(
      Option.all([modalInstance(), context.element()]),
      Option.andThen(([modalInstance, element]) => {
        element.addEventListener(
          "hidden.bs.modal",
          () => {
            modalInstance.dispose();
            context.setContent(Option.none());
          },
          {
            passive: true,
            once: true,
          },
        );

        modalInstance.hide();
      }),
    ),
  );

  return {
    showCustomModal,
    dismissModal,
  };
};
