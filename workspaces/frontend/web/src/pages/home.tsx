import { AssetSummary } from "../components/AssetSummary.jsx";
import type { HomeData } from "./home.data.js";
import { type Component, For, Suspense } from "solid-js";

export const Home: Component<{ data: HomeData }> = ({ data: assets }) => {
  return (
    <section>
      <h1>Home</h1>
      <p>This is the home page.</p>

      <Suspense fallback={<span>...</span>}>
        <For each={assets()?.assets}>
          {(asset) =>
            asset.__typename === "Asset" ? (
              <AssetSummary asset={asset} />
            ) : (
              <></>
            )
          }
        </For>
      </Suspense>
    </section>
  );
};
