import { App } from "./app.js";
import { Modal } from "./components/Modal/Modal.jsx";
import { ModalProvider } from "./context/modal.jsx";
import { routes } from "./routes.js";
import "./styles/index.scss";
import { Router } from "@solidjs/router";
import { Effect, Option, pipe } from "effect";
import { render } from "solid-js/web";

await pipe(
  Option.fromNullable(document.getElementById("root")),
  Effect.mapError(() => new Error("Root element not found")),
  Effect.andThen((root) =>
    render(
      () => (
        <ModalProvider>
          <Router root={App}>{routes}</Router>
          <Modal />
        </ModalProvider>
      ),
      root,
    ),
  ),
  Effect.catchAllCause((cause) =>
    Effect.logError("Failed to bootstrap app", cause),
  ),
  Effect.runPromise,
);
