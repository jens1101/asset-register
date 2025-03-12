import { Option } from "effect";
import {
  type Accessor,
  type JSX,
  type ParentComponent,
  type Setter,
  createContext,
  createSignal,
} from "solid-js";

/**
 * Context responsible for managing all modal-related data in the app.
 *
 * Note: we do not store a Bootstrap `Modal` instance in this context, because
 * initialization fails if the modals content isn't set. It also does not
 * handle dynamic content well. Therefore only the element reference is stored
 * here and the `Modal` instance needs to be created after the modal content
 * is set.
 * @see `useModal` for a hook that creates modals.
 */
export const ModalContext = createContext<{
  content: Accessor<Option.Option<JSX.Element>>;
  setContent: Setter<Option.Option<JSX.Element>>;
  element: Accessor<Option.Option<HTMLElement>>;
  setElement: Setter<Option.Option<HTMLElement>>;
}>({
  content: () => Option.none(),
  setContent: () => {},
  element: () => Option.none(),
  setElement: () => {},
});

/** Provider for the {@link ModalContext | modal context} */
export const ModalProvider: ParentComponent = (props) => {
  const [content, setContent] = createSignal<Option.Option<JSX.Element>>(
    Option.none(),
  );
  const [element, setElement] = createSignal<Option.Option<HTMLElement>>(
    Option.none(),
  );

  return (
    <ModalContext.Provider
      value={{
        content,
        setContent,
        element,
        setElement,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  );
};
