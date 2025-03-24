import { AssetListItem } from "../components/AssetListItem/AssetListItem.tsx";
import { Spinner } from "../components/Spinner.tsx";
import type { AssetListResource } from "../data/assetList.ts";
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
      <Suspense
        fallback={
          <div class="d-flex justify-content-center">
            <Spinner />
          </div>
        }
      >
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
