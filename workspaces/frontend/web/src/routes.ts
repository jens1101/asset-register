import {
  type AssetListResource,
  type AssetResource,
  loadAsset,
  loadAssetList,
} from "./data/index.js";
import { Paths } from "./enums/Paths.js";
import { Home } from "./pages/Home.jsx";
import type { RouteDefinition } from "@solidjs/router";
import { lazy } from "solid-js";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const routes: RouteDefinition<string | string[], any>[] = [
  {
    path: Paths.Home,
    component: Home,
    preload: loadAssetList,
  } satisfies RouteDefinition<string, AssetListResource>,
  {
    path: Paths.CreateAsset,
    component: lazy(async () => ({
      default: (await import("./pages/CreateAsset.jsx")).CreateAsset,
    })),
  },
  {
    path: Paths.ViewAsset,
    component: lazy(async () => ({
      default: (await import("./pages/ViewAsset/ViewAsset.jsx")).ViewAsset,
    })),
    preload: loadAsset,
  } satisfies RouteDefinition<string, AssetResource>,
  {
    path: Paths.EditAsset,
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
