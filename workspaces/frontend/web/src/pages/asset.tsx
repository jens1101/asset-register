import { Carousel } from "../components/Carousel/index.js";
import type { AssetFragment } from "../gql-client/types/graphql.js";
import type { AssetData } from "./asset.data.js";
import { type Accessor, type Component, Show, Suspense } from "solid-js";

export const Asset: Component<{ data: AssetData }> = ({ data }) => {
  const asset: Accessor<AssetFragment | null> = () => {
    const asset = data()?.asset;
    return asset && asset.__typename === "Asset" ? asset : null;
  };

  return (
    <section>
      <Suspense fallback={<span>...</span>}>
        <Show when={asset()} keyed>
          {(asset) => (
            <>
              <h1>{asset.name}</h1>
              <Show when={asset.description}>
                <p>{asset.description}</p>
              </Show>
              <p>Created at: {asset.createdAt.toString()}</p>
              <p>Updated at: {asset.updatedAt.toString()}</p>
              <Carousel images={asset.images} />
            </>
          )}
        </Show>
      </Suspense>
    </section>
  );
};
