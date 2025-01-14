import { Option } from "effect";
import {
  type Accessor,
  type JSX,
  type ParentComponent,
  type Setter,
  createContext,
  createSignal,
} from "solid-js";

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
