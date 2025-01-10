import { defaultDateTimeFormatter } from "../../common/utils.js";
import { Carousel } from "../../components/Carousel/Carousel.jsx";
import { useObjectUrl } from "../../hooks/useObjectUrl.js";
import type { AssetData } from "../asset.data.js";
import "./styles.scss";
import { Option, pipe } from "effect";
import { type Component, Show, Suspense } from "solid-js";

export const ViewAsset: Component<{ data: AssetData }> = (props) => {
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
                <a href={`/asset/${asset.id}/edit`}>Edit</a>
                <h1>{asset.name}</h1>

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
