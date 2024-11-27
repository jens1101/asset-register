import type { AssetFragment } from "../../gql-client/types/graphql.js";
import { useObjectUrl } from "../../hooks/useObjectUrl.js";
import "./styles.scss";
import { type Component, Show } from "solid-js";

// TODO: create an asset summary fragment
export const AssetSummary: Component<{ asset: AssetFragment }> = ({
  asset,
}) => {
  const mainImageFile = asset.images[0]?.file;

  const objectUrl = mainImageFile
    ? useObjectUrl(mainImageFile.buffer, mainImageFile.mimeType)
    : undefined;

  return (
    <div class={"card h-100"}>
      <img
        src={objectUrl}
        class={"card-img-top asset-summary__image"}
        alt={"Asset main image"}
      />

      <div class={"card-body"}>
        <h5 class={"card-title"}>{asset.name}</h5>

        <Show when={asset.description}>
          <p class={"card-text"}>{asset.description}</p>
        </Show>

        <a href={`/asset/${asset.id}`} class={"btn btn-primary"}>
          View
        </a>
      </div>
    </div>
  );
};
