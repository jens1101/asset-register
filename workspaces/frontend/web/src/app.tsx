import type { ParentComponent } from "solid-js";

export const App: ParentComponent = ({ children }) => {
  return <main>{children}</main>;
};
