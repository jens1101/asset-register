import type { AboutData } from "./about.data.js";
import { type Component, Suspense } from "solid-js";

export const About: Component<{ data: AboutData }> = ({ data: assets }) => {
  return (
    <section class="bg-pink-100 text-gray-700 p-8">
      <h1 class="text-2xl font-bold">About</h1>

      <p class="mt-4">A page all about this website.</p>

      <Suspense fallback={<span>...</span>}>
        <pre>{assets()}</pre>
      </Suspense>
    </section>
  );
};
