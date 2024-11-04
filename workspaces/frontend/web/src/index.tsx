import { App } from "./app.js";
import { routes } from "./routes.js";
import { Router } from "@solidjs/router";
import { render } from "solid-js/web";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
  );
}

if (root) render(() => <Router root={App}>{routes}</Router>, root);
