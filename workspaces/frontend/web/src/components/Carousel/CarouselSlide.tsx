import type { ImageFragment } from "../../gql-client/types/graphql.js";
import { useObjectUrl } from "../../hooks/useObjectUrl.js";
import { type Component, Show } from "solid-js";

export const CarouselSlide: Component<{
  image: ImageFragment;
  active: boolean;
}> = ({ image, active }) => {
  const imageUrl = useObjectUrl(image.file.buffer, image.file.mimeType);

  return (
    <div
      class={"carousel-item"}
      classList={{
        active,
      }}
    >
      <img
        src={imageUrl}
        class={"d-block w-100"}
        alt={image.name ?? image.file.filename}
      />

      <Show when={image.name || image.description}>
        <div
          class={
            "carousel-caption carousel-caption--card d-flex flex-column gap-2 rounded"
          }
        >
          <Show when={image.name}>
            <h5 class={"m-0"}>{image.name}</h5>
          </Show>

          <Show when={image.description}>
            <p class={"m-0"}>{image.description}</p>
          </Show>
        </div>
      </Show>
    </div>
  );
};
