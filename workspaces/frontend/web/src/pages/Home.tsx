import { AssetListItem } from "../components/AssetListItem/AssetListItem.tsx";
import { DefaultSuspenseFallback } from "../components/DefaultSuspenseFallback.tsx";
import type { AssetListResource } from "../data/assetList.ts";
import { Option, pipe } from "effect";
import { type Component, ErrorBoundary, For, Show, Suspense } from "solid-js";

export const Home: Component<{ data: AssetListResource }> = (props) => {
  const assets = () =>
    pipe(
      props.data.assetListQuery(),
      Option.fromNullable,
      Option.map((assetListQuery) => assetListQuery.assets),
    );

  return (
    <section class={"container"}>
      <Suspense
        fallback={<DefaultSuspenseFallback loadingText="Loading assets..." />}
      >
        <ErrorBoundary fallback={<div>Failed to fetch assets</div>}>
          <Show
            when={Option.getOrNull(assets())}
            fallback={<p>No assets to view</p>}
            keyed
          >
            {(assets) => (
              <div class={"row row-cols-1 row-cols-sm-2 row-cols-md-3"}>
                <For each={assets}>
                  {(asset) => (
                    <div class={"col py-2"}>
                      <AssetListItem asset={asset} />
                    </div>
                  )}
                </For>
              </div>
            )}
          </Show>
        </ErrorBoundary>
      </Suspense>
    </section>
  );
};
