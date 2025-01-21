import type { ClassAttributes } from "../../common/types.js";
import type { ImageFragment } from "../../gql-client/types/graphql.js";
import { CarouselSlide } from "./CarouselSlide.jsx";
import "./styles.scss";
import { Carousel as BootstrapCarousel } from "bootstrap";
import PreviousIcon from "bootstrap-icons/icons/chevron-compact-left.svg";
import NextIcon from "bootstrap-icons/icons/chevron-compact-right.svg";
import {
  type Accessor,
  type Component,
  For,
  Show,
  createSignal,
  onCleanup,
} from "solid-js";

const INITIAL_INDEX = 0;

export const Carousel: Component<
  ClassAttributes & { images: ImageFragment[] }
> = (props) => {
  const [carouselElement, setCarouselElement] = createSignal<HTMLDivElement>();
  const [currentIndex, setCurrentIndex] = createSignal<number>(INITIAL_INDEX);
  const [carouselInstance, setCarouselInstance] =
    createSignal<BootstrapCarousel>();

  const onSlide = (event: Event) => {
    if ("to" in event) setCurrentIndex(Number(event.to));
  };

  onCleanup(() => {
    carouselElement()?.removeEventListener("slide.bs.carousel", onSlide);
    carouselInstance()?.dispose();
  });

  return (
    <Show when={props.images.length > 0}>
      <div
        ref={(element: HTMLDivElement) => {
          setCarouselElement(element);

          const carouselInstance = new BootstrapCarousel(element);
          carouselInstance.to(INITIAL_INDEX);

          // We set the event listener here because we want to ignore the
          // initial set above.
          element.addEventListener("slide.bs.carousel", onSlide);

          setCarouselInstance(carouselInstance);
        }}
        class={`carousel slide ${props.class ?? ""}`}
        classList={props.classList}
      >
        <Show when={props.images.length > 1}>
          <div class={"carousel-indicators"}>
            <For each={props.images}>
              {(_, index: Accessor<number>) => (
                <button
                  data-bs-target
                  type={"button"}
                  onClick={() => carouselInstance()?.to(index())}
                  classList={{
                    active: index() === currentIndex(),
                  }}
                />
              )}
            </For>
          </div>
        </Show>

        <div class={"carousel-inner h-100"}>
          <For each={props.images}>
            {(image, index) => (
              <CarouselSlide
                image={image}
                classList={{
                  active: index() === INITIAL_INDEX,
                }}
              />
            )}
          </For>
        </div>

        <button
          class={"carousel-control-prev drop-shadow-1 fs-2"}
          classList={{
            "d-none": currentIndex() <= 0,
          }}
          type={"button"}
          onClick={() => carouselInstance()?.prev()}
        >
          <PreviousIcon aria-hidden="true" />
          <span class={"visually-hidden"}>Previous</span>
        </button>

        <button
          class={"carousel-control-next drop-shadow-1 fs-2"}
          classList={{
            "d-none": currentIndex() >= props.images.length - 1,
          }}
          type={"button"}
          onClick={() => carouselInstance()?.next()}
        >
          <NextIcon aria-hidden="true" />
          <span class={"visually-hidden"}>Next</span>
        </button>
      </div>
    </Show>
  );
};
