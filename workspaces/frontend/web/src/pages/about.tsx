import type { AboutData } from "./about.data.js";
import { type Component, Suspense } from "solid-js";

export const About: Component<{ data: AboutData }> = ({ data: assets }) => {
  return (
    <section>
      <h1>About</h1>

      <p>A page all about this website.</p>

      <Suspense fallback={<span>...</span>}>
        <pre>{assets()}</pre>
      </Suspense>
    </section>
  );
};
