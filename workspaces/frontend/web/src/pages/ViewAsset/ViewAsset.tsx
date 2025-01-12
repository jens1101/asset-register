import { defaultDateTimeFormatter } from "../../common/utils.js";
import { Carousel } from "../../components/Carousel/Carousel.jsx";
import { useDropdown } from "../../hooks/useDropdown.js";
import { useObjectUrl } from "../../hooks/useObjectUrl.js";
import type { AssetData } from "../asset.data.js";
import "./styles.scss";
import { Option, pipe } from "effect";
import { type Component, Show, Suspense } from "solid-js";

export const ViewAsset: Component<{ data: AssetData }> = (props) => {
  const { dropdownToggleRef } = useDropdown();

  const asset = () =>
    pipe(
      Option.fromNullable(props.data()?.asset),
      Option.filter((asset) => asset.__typename === "Asset"),
    );

  const proofOfPurchase = () =>
    asset().pipe(
      Option.flatMap((asset) =>
        Option.fromNullable(asset.proofOfPurchase?.file),
      ),
      Option.map((file) => ({
        filename: file.filename,
        url: useObjectUrl(file),
      })),
    );

  return (
    <>
      <section class="container">
        <Suspense fallback={<span>...</span>}>
          <Show when={Option.getOrNull(asset())} keyed>
            {(asset) => (
              <>
                <div class={"d-flex"}>
                  <h1 class={"flex-grow-1"}>{asset.name}</h1>
                  <div class={"dropdown"}>
                    <button
                      class={"btn btn-secondary dropdown-toggle"}
                      type={"button"}
                      ref={dropdownToggleRef}
                    >
                      Options
                    </button>
                    <ul class="dropdown-menu dropdown-menu-end">
                      <li>
                        <a
                          class="dropdown-item"
                          href={`/asset/${asset.id}/edit`}
                        >
                          Edit
                        </a>
                      </li>
                      <li>
                        <button class="dropdown-item text-danger" type="button">
                          Delete
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <Show when={asset.description}>
                  <p class={"lead"}>{asset.description}</p>
                </Show>

                <h3>Created at</h3>
                <p>
                  {defaultDateTimeFormatter.format(
                    asset.createdAt.epochMilliseconds,
                  )}
                </p>

                <h3>Updated at</h3>
                <p>
                  {defaultDateTimeFormatter.format(
                    asset.updatedAt.epochMilliseconds,
                  )}
                </p>

                <Show when={Option.getOrNull(proofOfPurchase())} keyed>
                  {(file) => (
                    <>
                      <h3>Proof of Purchase</h3>
                      <p>
                        <a href={file.url} download={file.filename}>
                          {file.filename}
                        </a>
                      </p>
                    </>
                  )}
                </Show>

                <h3>Images</h3>
                <Carousel
                  images={asset.images}
                  class={"carousel__view-asset"}
                />
              </>
            )}
          </Show>
        </Suspense>
      </section>
    </>
  );
};
