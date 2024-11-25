import type { AssetFragment } from "../gql-client/types/graphql.js";
import { useObjectUrl } from "../hooks/useObjectUrl.js";
import { type Component } from "solid-js";

// TODO: create an asset summary fragment
export const AssetSummary: Component<{ asset: AssetFragment }> = ({
  asset,
}) => {
  const mainImageFile = asset.images[0]?.file;

  const objectUrl = mainImageFile
    ? useObjectUrl(mainImageFile.buffer, mainImageFile.mimeType)
    : undefined;

  return (
    <div>
      <p>{asset.name}</p>

      <p>{asset.description}</p>

      <img src={objectUrl} />
    </div>
  );
};
