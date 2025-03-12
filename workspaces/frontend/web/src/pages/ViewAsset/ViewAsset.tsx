import { defaultDateTimeFormatter } from "../../common/intl.js";
import { generatePath } from "../../common/route.js";
import { manualRetryWrapper } from "../../common/utils.js";
import { Carousel } from "../../components/Carousel/Carousel.jsx";
import { DropdownCaret } from "../../components/Dropdown/DropdownCaret.jsx";
import { Sum } from "../../components/Sum.jsx";
import type { AssetResource } from "../../data/asset.js";
import { Paths } from "../../enums/Paths.js";
import { mutation } from "../../gql-client/client.js";
import {
  DeleteAssetDocument,
  type DeleteAssetMutation,
  type DeleteAssetMutationVariables,
} from "../../gql-client/types/graphql.js";
import { useDropdown } from "../../hooks/useDropdown.js";
import { useAlertModal } from "../../hooks/useModal/useAlertModal.jsx";
import { usePromptModal } from "../../hooks/useModal/usePromptModal.jsx";
import { useObjectUrl } from "../../hooks/useObjectUrl.js";
import "./styles.scss";
import { useNavigate } from "@solidjs/router";
import OptionsIcon from "bootstrap-icons/icons/gear-fill.svg";
import { BigDecimal, Effect, Option, pipe } from "effect";
import { type Component, ErrorBoundary, Show, Suspense } from "solid-js";

export const ViewAsset: Component<{ data: AssetResource }> = (props) => {
  const { dropdownToggleRef, isVisible } = useDropdown();
  const { showPromptModal } = usePromptModal();
  const { showAlertModal } = useAlertModal();
  const navigate = useNavigate();

  const assetQuery = () =>
    pipe(
      props.data.assetQuery(),
      Option.fromNullable,
      Option.map((assetQuery) => assetQuery.asset),
    );

  const asset = () =>
    Option.filter(assetQuery(), (asset) => asset.__typename === "Asset");

  const proofOfPurchase = () =>
    pipe(
      asset(),
      Option.flatMap((asset) =>
        Option.fromNullable(asset.proofOfPurchase?.file),
      ),
      Option.map((file) => ({
        filename: file.filename,
        url: useObjectUrl(file),
      })),
    );

  const onDelete = (assetId: string) =>
    pipe(
      showPromptModal({
        title: "Delete asset",
        body: "Do you want to delete this asset?",
        positive: "Yes",
        negative: "No",
      }),
      Effect.andThen((result) =>
        pipe(
          mutation<DeleteAssetMutation, DeleteAssetMutationVariables>(
            DeleteAssetDocument,
            { id: assetId },
          ),
          Effect.andThen((result) =>
            Effect.if(result.deleteAsset?.__typename === "ReadAssetError", {
              onTrue: () =>
                pipe(
                  showAlertModal({
                    title: "Failed to delete asset",
                    body: "The asset no longer exists or could not be found",
                    dismiss: "Go Home",
                  }),
                  Effect.andThen(() => {
                    navigate(Paths.Home);
                  }),
                ),
              onFalse: () =>
                Effect.sync(() => {
                  navigate(Paths.Home);
                }),
            }),
          ),
          Effect.when(() => result === "positive"),
        ),
      ),
      manualRetryWrapper("Failed to delete asset", () =>
        pipe(
          showPromptModal({
            title: "Failed to delete asset",
            body: "Do you want to retry?",
            positive: "Yes",
            negative: "No",
          }),
          Effect.map((response) => response === "positive"),
        ),
      ),
    );

  return (
    <>
      <section class="container">
        {/* TODO: implement loader component */}
        <Suspense fallback={<span>...</span>}>
          {/* TODO: implement error component */}
          <ErrorBoundary fallback={<div>Implement error component</div>}>
            <Show
              when={pipe(
                assetQuery(),
                Option.filter((asset) => asset.__typename === "ReadAssetError"),
                Option.getOrNull,
              )}
            >
              <div>
                <p>Asset not found</p>
                <a class="btn btn-primary" href={Paths.Home}>
                  Go home
                </a>
              </div>
            </Show>

            <Show when={pipe(asset(), Option.getOrNull)} keyed>
              {(asset) => (
                <>
                  <div class={"d-flex"}>
                    <h1 class={"flex-grow-1"}>{asset.name}</h1>
                    <div class={"dropdown"}>
                      <button
                        class={"btn btn-secondary"}
                        type={"button"}
                        ref={dropdownToggleRef}
                      >
                        <OptionsIcon
                          class={"bi options-icon"}
                          classList={{ active: isVisible() }}
                          aria-hidden="true"
                        />
                        <span class={"visually-hidden"}>Options</span>

                        <DropdownCaret active={isVisible()} class="ms-2" />
                      </button>
                      <ul class="dropdown-menu dropdown-menu-end">
                        <li>
                          <a
                            class="dropdown-item"
                            href={generatePath(Paths.EditAsset, {
                              id: asset.id,
                            })}
                          >
                            Edit
                          </a>
                        </li>
                        <li>
                          <button
                            class="dropdown-item text-danger"
                            type="button"
                            onClick={() => {
                              void onDelete(asset.id);
                            }}
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <Show when={asset.description}>
                    <p class={"lead"}>{asset.description}</p>
                  </Show>

                  <h3>Value</h3>
                  <p
                    classList={{
                      "text-body-tertiary": BigDecimal.lessThanOrEqualTo(
                        asset.value.amount,
                        BigDecimal.fromBigInt(0n),
                      ),
                    }}
                  >
                    <Sum>{asset.value}</Sum>
                  </p>

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

                  <Show when={asset.images.length > 0}>
                    <h3>Images</h3>
                    <Carousel
                      images={asset.images}
                      class={"carousel__view-asset"}
                    />
                  </Show>
                </>
              )}
            </Show>
          </ErrorBoundary>
        </Suspense>
      </section>
    </>
  );
};
