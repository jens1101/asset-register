import { type AboutData, loadAbout } from "./pages/about.data.js";
import { Home } from "./pages/home.js";
import type { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const routes: RouteDefinition<string | string[], any>[] = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/about",
    component: lazy(async () => ({
      default: (await import("./pages/about.js")).About,
    })),
    preload: loadAbout,
  } satisfies RouteDefinition<string, AboutData>,
  {
    path: "**",
    component: lazy(async () => ({
      default: (await import("./errors/404.js")).NotFound,
    })),
  },
];
