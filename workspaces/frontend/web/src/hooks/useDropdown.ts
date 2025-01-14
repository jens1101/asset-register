import { Dropdown } from "bootstrap";
import { createSignal, onCleanup } from "solid-js";

export function useDropdown(options?: Partial<Dropdown.Options>): {
  dropdownToggleRef: (element: HTMLElement) => void;
  show(): void;
  hide(): void;
  toggle(): void;
  cleanup(): void;
} {
  const [dropdownInstance, setDropdownInstance] = createSignal<Dropdown>();

  const dropdownToggleRef = (element: HTMLElement) => {
    cleanup();

    element.setAttribute("data-bs-toggle", "dropdown");
    setDropdownInstance(new Dropdown(element, options));
  };

  const show = () => dropdownInstance()?.show();
  const hide = () => dropdownInstance()?.hide();
  const toggle = () => dropdownInstance()?.toggle();
  const cleanup = () => dropdownInstance()?.dispose();

  onCleanup(cleanup);

  return {
    dropdownToggleRef,
    show,
    hide,
    toggle,
    cleanup,
  };
}
