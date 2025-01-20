import { AssetListItem } from "../components/AssetListItem/AssetListItem.jsx";
import type { AssetFragment } from "../gql-client/types/graphql.js";
import type { HomeData } from "./home.data.js";
import {
  type Accessor,
  type Component,
  For,
  Suspense,
  createMemo,
} from "solid-js";

export const Home: Component<{ data: HomeData }> = (props) => {
  const assets: Accessor<AssetFragment[]> = createMemo(() => {
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
