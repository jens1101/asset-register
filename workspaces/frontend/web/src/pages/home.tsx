import { type Component, createSignal } from "solid-js";

export const Home: Component = () => {
  const [count, setCount] = createSignal(0);

  return (
    <section>
      <h1>Home</h1>
      <p>This is the home page.</p>

      <div class="d-flex align-items-center">
        <button class="btn btn-primary" onClick={() => setCount(count() - 1)}>
          -
        </button>

        <output>Count: {count()}</output>

        <button class="btn btn-primary" onClick={() => setCount(count() + 1)}>
          +
        </button>
      </div>
    </section>
  );
};
