import { ModalContext } from "../../context/modal.tsx";
import { Option } from "effect";
import { type Component, useContext } from "solid-js";

/**
 * Container component for modals. This cannot be used to display a modal. The
 * modal hooks should instead be used to create, show, and hide modals.
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
