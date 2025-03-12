import { ModalContext } from "../../context/modal.jsx";
import { Option } from "effect";
import { type Component, useContext } from "solid-js";

/**
 * Container component for modals. This should not be used directly, instead the
 * `useModal` hook should be used to create, show, and hide modals.
 */
export const Modal: Component = () => {
  const context = useContext(ModalContext);

  const ref = (element: HTMLElement) => {
    context.setElement(Option.some(element));
  };

  return (
    <div ref={ref} class={"modal"} tabindex={"-1"}>
      {Option.getOrNull(context.content())}
    </div>
  );
};
