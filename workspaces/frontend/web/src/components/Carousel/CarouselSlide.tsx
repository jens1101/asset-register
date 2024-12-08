import type { ImageFragment } from "../../gql-client/types/graphql.js";
import { useObjectUrl } from "../../hooks/useObjectUrl.js";
import { type Component, Show } from "solid-js";

export const CarouselSlide: Component<{
  image: ImageFragment;
  classList?:
    | {
        [k: string]: boolean | undefined;
      }
    | undefined;
}> = (props) => {
  const imageUrl = () => useObjectUrl(props.image.file);

  return (
    <div class={"carousel-item"} classList={props.classList}>
      <img
        src={imageUrl()}
        class={"d-block w-100"}
        alt={props.image.name ?? props.image.file.filename}
      />

      <Show when={props.image.name || props.image.description}>
        <div
          class={
            "carousel-caption carousel-caption--card d-flex flex-column gap-2 rounded"
          }
        >
          <Show when={props.image.name}>
            <h5 class={"m-0"}>{props.image.name}</h5>
          </Show>

          <Show when={props.image.description}>
            <p class={"m-0"}>{props.image.description}</p>
          </Show>
        </div>
      </Show>
    </div>
  );
};
