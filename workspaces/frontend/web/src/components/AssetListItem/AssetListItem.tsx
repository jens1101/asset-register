import type { AssetListItemFragment } from "../../gql-client/types/graphql.js";
import { useObjectUrl } from "../../hooks/useObjectUrl.js";
import "./styles.scss";
import { A } from "@solidjs/router";
import { type Component, Show } from "solid-js";

export const AssetListItem: Component<{ asset: AssetListItemFragment }> = ({
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
        class={"card-img-top asset-list-item__image"}
        alt={"Asset main image"}
      />

      <div class={"card-body"}>
        <h5 class={"card-title"}>{asset.name}</h5>

        <Show when={asset.description}>
          <p class={"card-text"}>{asset.description}</p>
        </Show>

        <A href={`/asset/${asset.id}`} class={"btn btn-primary"}>
          View
        </A>
      </div>
    </div>
  );
};
