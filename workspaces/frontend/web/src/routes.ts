import { type AssetData, loadAsset } from "./pages/asset.data.js";
import { type HomeData, loadHome } from "./pages/home.data.js";
import { Home } from "./pages/home.js";
import type { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

// TODO: maybe create a paths enum that can be used here and to generate paths
// TODO: figure out if solid router provides a path generate helper function or write your own

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const routes: RouteDefinition<string | string[], any>[] = [
  {
    path: "/",
    component: Home,
    preload: loadHome,
  } satisfies RouteDefinition<string, HomeData>,
  {
    path: "/asset/create",
    component: lazy(async () => ({
      default: (await import("./pages/CreateAsset.jsx")).CreateAsset,
    })),
  },
  {
    path: "/asset/:id",
    component: lazy(async () => ({
      default: (await import("./pages/asset.js")).Asset,
    })),
    preload: loadAsset,
  } satisfies RouteDefinition<string, AssetData>,
  {
    path: "/asset/:id/edit",
    component: lazy(async () => ({
      default: (await import("./pages/EditAsset.jsx")).EditAsset,
    })),
    preload: loadAsset,
  } satisfies RouteDefinition<string, AssetData>,
  {
    path: "**",
    component: lazy(async () => ({
      default: (await import("./pages/404.jsx")).NotFound,
    })),
  },
];
