import { App } from "./app.tsx";
import { Modal } from "./components/Modal/Modal.tsx";
import { ModalProvider } from "./context/modal.tsx";
import { routes } from "./routes.ts";
import "./styles/index.scss";
import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { Effect, Logger, Option, pipe } from "effect";
import { render } from "solid-js/web";

await pipe(
  Option.fromNullable(document.getElementById("root")),
  Effect.mapError(() => new Error("Root element not found")),
  Effect.andThen((root) =>
    render(
      () => (
        <MetaProvider>
          <ModalProvider>
            <Title>Asset Register</Title>

            <Router root={App}>{routes}</Router>
            <Modal />
          </ModalProvider>
        </MetaProvider>
      ),
      root,
    ),
  ),
  Effect.catchAllCause((cause) =>
    Effect.logError("Failed to bootstrap app", cause),
  ),
  Effect.provide(Logger.structured),
  Effect.runPromise,
);
