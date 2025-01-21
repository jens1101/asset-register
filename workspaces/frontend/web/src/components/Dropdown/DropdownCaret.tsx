import type { ClassAttributes } from "../../common/types.js";
import "./styles.scss";
import Caret from "bootstrap-icons/icons/caret-down-fill.svg";
import type { Component } from "solid-js";

export const DropdownCaret: Component<ClassAttributes & { active: boolean }> = (
  props,
) => (
  <Caret
    aria-hidden="true"
    class={`dropdown-caret ${props.class ?? ""}`}
    classList={{ active: props.active, ...props.classList }}
  />
);
