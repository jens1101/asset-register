import { Dropdown } from "bootstrap";
import { type Accessor, createSignal, onCleanup } from "solid-js";

export function useDropdown(options?: Partial<Dropdown.Options>): {
  dropdownToggleRef: (element: HTMLElement) => void;
  show(): void;
  hide(): void;
  toggle(): void;
  cleanup(): void;
  isVisible: Accessor<boolean>;
} {
  const [dropdownInstance, setDropdownInstance] = createSignal<Dropdown>();
  const [dropdownElement, setDropdownElement] = createSignal<HTMLElement>();
  const [isVisible, setIsVisible] = createSignal<boolean>(false);

  const dropdownToggleRef = (element: HTMLElement) => {
    cleanup();

    element.setAttribute("data-bs-toggle", "dropdown");
    setDropdownElement(element);
    setDropdownInstance(new Dropdown(element, options));
    element.addEventListener("show.bs.dropdown", onShow);
    element.addEventListener("hide.bs.dropdown", onHide);
  };

  const onShow = () => setIsVisible(true);
  const onHide = () => setIsVisible(false);

  const show = () => dropdownInstance()?.show();
  const hide = () => dropdownInstance()?.hide();
  const toggle = () => dropdownInstance()?.toggle();
  const cleanup = () => {
    dropdownInstance()?.dispose();
    dropdownElement()?.removeEventListener("show.bs.dropdown", onShow);
    dropdownElement()?.removeEventListener("hide.bs.dropdown", onHide);
  };

  onCleanup(cleanup);

  return {
    dropdownToggleRef,
    show,
    hide,
    toggle,
    cleanup,
    isVisible,
  };
}
