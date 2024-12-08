import type {
  AssetListItemFragment,
  FileFragment,
} from "../../gql-client/types/graphql.js";
import { useObjectUrl } from "../../hooks/useObjectUrl.js";
import "./styles.scss";
import { A } from "@solidjs/router";
import { type Accessor, type Component, Show } from "solid-js";

export const AssetListItem: Component<{ asset: AssetListItemFragment }> = (
  props,
) => {
  const objectUrl: Accessor<string | undefined> = () => {
    const image: FileFragment | undefined = props.asset.images[0]?.file;
    return image ? useObjectUrl(image) : undefined;
  };

  return (
    <div class={"card h-100"}>
      <img
        src={objectUrl()}
        class={"card-img-top asset-list-item__image"}
        alt={"Asset main image"}
      />

      <div class={"card-body"}>
        <h5 class={"card-title"}>{props.asset.name}</h5>

        <Show when={props.asset.description}>
          <p class={"card-text"}>{props.asset.description}</p>
        </Show>

        <A href={`/asset/${props.asset.id}`} class={"btn btn-primary"}>
          View
        </A>
      </div>
    </div>
  );
};
