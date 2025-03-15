import { type AssetResource, loadAsset } from "./data/asset.ts";
import { type AssetListResource, loadAssetList } from "./data/assetList.ts";
import { Paths } from "./enums/Paths.ts";
import { Home } from "./pages/Home.tsx";
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
      default: (await import("./pages/CreateAsset.tsx")).CreateAsset,
    })),
  },
  {
    path: Paths.ViewAsset,
    component: lazy(async () => ({
      default: (await import("./pages/ViewAsset/ViewAsset.tsx")).ViewAsset,
    })),
    preload: loadAsset,
  } satisfies RouteDefinition<string, AssetResource>,
  {
    path: Paths.EditAsset,
    component: lazy(async () => ({
      default: (await import("./pages/EditAsset.tsx")).EditAsset,
    })),
    preload: loadAsset,
  } satisfies RouteDefinition<string, AssetResource>,
  {
    path: "**",
    component: lazy(async () => ({
      default: (await import("./pages/404.tsx")).NotFound,
    })),
  },
];
