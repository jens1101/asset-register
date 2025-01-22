import { AssetListItem } from "../components/AssetListItem/AssetListItem.jsx";
import type { AssetListResource } from "../data/index.js";
import type { AssetListItemFragment } from "../gql-client/types/graphql.js";
import {
  type Accessor,
  type Component,
  For,
  Suspense,
  createMemo,
} from "solid-js";

export const Home: Component<{ data: AssetListResource }> = (props) => {
  const assets: Accessor<AssetListItemFragment[]> = createMemo(() => {
    const result = props.data()?.assets;
    return result?.__typename === "Assets" ? result.value : [];
  });

  return (
    <section class={"container"}>
      <div class={"row row-cols-1 row-cols-sm-2 row-cols-md-3"}>
        <Suspense fallback={<span>...</span>}>
          <For each={assets()}>
            {(asset) => (
              <div class={"col py-2"}>
                <AssetListItem asset={asset} />
              </div>
            )}
          </For>
        </Suspense>
      </div>
    </section>
  );
};
