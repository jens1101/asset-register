import { formatSum } from "../../common/utils.jsx";
import type {
  AssetListItemFragment,
  FileFragment,
} from "../../gql-client/types/graphql.js";
import { useObjectUrl } from "../../hooks/useObjectUrl.js";
import "./styles.scss";
import { A } from "@solidjs/router";
import { BigDecimal } from "effect";
import { type Accessor, type Component, Show } from "solid-js";

export const AssetListItem: Component<{ asset: AssetListItemFragment }> = (
  props,
) => {
  const objectUrl: Accessor<string | undefined> = () => {
    const image: FileFragment | undefined = props.asset.mainImage?.file;
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

        <h6
          class={`card-subtitle mb-2 ${
            BigDecimal.greaterThan(
              props.asset.value.amount,
              BigDecimal.fromBigInt(0n),
            )
              ? "text-body-secondary"
              : "text-body-tertiary"
          }`}
        >
          {formatSum(props.asset.value)}
        </h6>

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
