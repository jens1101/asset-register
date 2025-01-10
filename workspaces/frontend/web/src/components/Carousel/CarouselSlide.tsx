import type { ClassAttributes } from "../../common/types.js";
import type { ImageFragment } from "../../gql-client/types/graphql.js";
import { useObjectUrl } from "../../hooks/useObjectUrl.js";
import { type Component, Show } from "solid-js";

export const CarouselSlide: Component<
  ClassAttributes & {
    image: ImageFragment;
  }
> = (props) => {
  const imageUrl = () => useObjectUrl(props.image.file);

  return (
    <div
      class={`carousel-item w-100 h-100 ${props.class ?? ""}`}
      classList={props.classList}
      style={{
        background: `no-repeat center/cover url("${imageUrl()}")`,
      }}
    >
      <img
        src={imageUrl()}
        class={"d-block w-100 h-100 object-fit-contain bg-blur"}
        alt={props.image.name ?? props.image.file.filename}
      />

      <Show when={props.image.name}>
        {/* TODO: the drop shadow clips. The padding should be applied directly to the h5 element */}
        {/* TODO: the text moves vertically on slide transition. This is not a result of the shadow */}
        <div class={"carousel-caption text-shadow-1"}>
          <h5 class={"m-0 text-truncate"} title={props.image.name ?? ""}>
            {props.image.name}
          </h5>
        </div>
      </Show>
    </div>
  );
};
