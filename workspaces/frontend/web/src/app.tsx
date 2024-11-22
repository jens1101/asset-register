import { A } from "@solidjs/router";
import type { ParentComponent } from "solid-js";

export const App: ParentComponent = ({ children }) => {
  return (
    <>
      <nav class="nav">
        <A activeClass="nav-link active" inactiveClass="nav-link" href="/">
          Home
        </A>
        <A activeClass="nav-link active" inactiveClass="nav-link" href="/about">
          About
        </A>
        <A activeClass="nav-link active" inactiveClass="nav-link" href="/error">
          Error
        </A>
      </nav>

      <main>{children}</main>
    </>
  );
};
