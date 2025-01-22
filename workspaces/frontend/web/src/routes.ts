import {
  type AssetListResource,
  type AssetResource,
  loadAsset,
  loadAssetList,
} from "./data/index.js";
import { Home } from "./pages/Home.jsx";
import type { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

// TODO: maybe create a paths enum that can be used here and to generate paths
// TODO: figure out if solid router provides a path generate helper function or write your own

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const routes: RouteDefinition<string | string[], any>[] = [
  {
    path: "/",
    component: Home,
    preload: loadAssetList,
  } satisfies RouteDefinition<string, AssetListResource>,
  {
    path: "/asset/create",
    component: lazy(async () => ({
      default: (await import("./pages/CreateAsset.jsx")).CreateAsset,
    })),
  },
  {
    path: "/asset/:id",
    component: lazy(async () => ({
      default: (await import("./pages/ViewAsset/ViewAsset.jsx")).ViewAsset,
    })),
    preload: loadAsset,
  } satisfies RouteDefinition<string, AssetResource>,
  {
    path: "/asset/:id/edit",
    component: lazy(async () => ({
      default: (await import("./pages/EditAsset.jsx")).EditAsset,
    })),
    preload: loadAsset,
  } satisfies RouteDefinition<string, AssetResource>,
  {
    path: "**",
    component: lazy(async () => ({
      default: (await import("./pages/404.jsx")).NotFound,
    })),
  },
];
