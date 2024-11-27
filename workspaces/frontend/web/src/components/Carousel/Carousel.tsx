import type { ImageFragment } from "../../gql-client/types/graphql.js";
import { CarouselSlide } from "./CarouselSlide.jsx";
import "./styles.scss";
import { Carousel as BootstrapCarousel } from "bootstrap";
import {
  type Accessor,
  type Component,
  For,
  Show,
  createSignal,
  onCleanup,
} from "solid-js";

// TODO: add shadow/background to the buttons, indicators, and text
// TODO: Make the image fit like "cover"
// TODO: fix the aspect ratio of the carousel and pass through class and styles
export const Carousel: Component<{ images: ImageFragment[] }> = ({
  images,
}) => {
  const [carouselElement, setCarouselElement] = createSignal<HTMLDivElement>();
  const [currentIndex, setCurrentIndex] = createSignal<number>(0);
  const [carouselInstance, setCarouselInstance] =
    createSignal<BootstrapCarousel>();

  const onSlide = (event: Event) => {
    if ("to" in event) setCurrentIndex(Number(event.to));
  };

  const onRef = (element: HTMLDivElement) => {
    setCarouselElement(element);

    const carouselInstance = new BootstrapCarousel(element);
    carouselInstance.to(currentIndex());

    // We set the event listener here because we want to ignore the initial set
    // above.
    element.addEventListener("slide.bs.carousel", onSlide);

    setCarouselInstance(carouselInstance);
  };

  onCleanup(() => {
    carouselElement()?.removeEventListener("slide.bs.carousel", onSlide);
    carouselInstance()?.dispose();
  });

  return (
    <Show when={images.length > 0}>
      <div ref={onRef} class={"carousel slide"}>
        <Show when={images.length > 1}>
          <div class={"carousel-indicators"}>
            <For each={images}>
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

        <div class={"carousel-inner"}>
          <For each={images}>
            {(image: ImageFragment, index: Accessor<number>) => (
              <CarouselSlide
                image={image}
                active={index() === currentIndex()}
              />
            )}
          </For>
        </div>

        <button
          class={"carousel-control-prev"}
          classList={{
            "d-none": currentIndex() <= 0,
          }}
          type={"button"}
          onClick={() => carouselInstance()?.prev()}
        >
          <span class={"carousel-control-prev-icon"} aria-hidden="true" />
          <span class={"visually-hidden"}>Previous</span>
        </button>

        <button
          class={"carousel-control-next"}
          classList={{
            "d-none": currentIndex() >= images.length - 1,
          }}
          type={"button"}
          onClick={() => carouselInstance()?.next()}
        >
          <span class={"carousel-control-next-icon"} aria-hidden={"true"} />
          <span class={"visually-hidden"}>Next</span>
        </button>
      </div>
    </Show>
  );
};
