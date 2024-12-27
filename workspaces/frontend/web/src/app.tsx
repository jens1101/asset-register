import { MainNav } from "./components/MainNav/MainNav.jsx";
import type { ParentComponent } from "solid-js";

export const App: ParentComponent = (props) => {
  return (
    <>
      <MainNav />

      <main class="my-4">{props.children}</main>
    </>
  );
};
