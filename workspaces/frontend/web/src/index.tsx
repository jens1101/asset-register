import { App } from "./app.js";
import { Modal } from "./components/Modal/Modal.jsx";
import { ModalProvider } from "./context/modal.jsx";
import { routes } from "./routes.js";
import "./styles/index.scss";
import { Router } from "@solidjs/router";
import { Effect, Exit, Option, pipe } from "effect";
import { render } from "solid-js/web";

const program = pipe(
  Effect.gen(function* () {
    const root = yield* Option.fromNullable(document.getElementById("root"));

    render(
      () => (
        <ModalProvider>
          <Router root={App}>{routes}</Router>
          <Modal />
        </ModalProvider>
      ),
      root,
    );
  }),
  Effect.mapError(
    () =>
      new Error(
        "Root element not found. Did you forget to add it to your " +
          "index.html? Or maybe the id attribute got misspelled?",
      ),
  ),
);

// TODO: error handling
void Effect.runPromiseExit(program).then((exit) => {
  if (Exit.isFailure(exit) && import.meta.env.DEV) console.error(exit.cause);
});
