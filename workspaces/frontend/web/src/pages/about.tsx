import type { AboutData } from "./about.data.js";
import { type Component, Suspense, createEffect } from "solid-js";

export const About: Component<{ data: AboutData }> = ({ data: name }) => {
  createEffect(() => {
    console.log(name());
  });

  return (
    <section class="bg-pink-100 text-gray-700 p-8">
      <h1 class="text-2xl font-bold">About</h1>

      <p class="mt-4">A page all about this website.</p>

      <p>
        <span>We love</span>
        <Suspense fallback={<span>...</span>}>
          <span>&nbsp;{name()}</span>
        </Suspense>
      </p>
    </section>
  );
};
