import type { ParentComponent } from "solid-js";

export const App: ParentComponent = (props) => {
  return <main>{props.children}</main>;
};
