import { AssetListItem } from "../components/AssetListItem/AssetListItem.jsx";
import type { AssetListResource } from "../data/assetList.js";
import { Option, pipe } from "effect";
import { type Component, For, Show, Suspense } from "solid-js";

export const Home: Component<{ data: AssetListResource }> = (props) => {
  const assets = () =>
    pipe(
      props.data.assetListQuery(),
      Option.fromNullable,
      Option.map((assetListQuery) => assetListQuery.assets),
    );

  return (
    <section class={"container"}>
      <Suspense fallback={<span>...</span>}>
        <Show when={Option.getOrNull(assets())} keyed>
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
      </Suspense>
    </section>
  );
};
