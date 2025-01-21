import { defaultDateTimeFormatter } from "../../common/utils.js";
import { Carousel } from "../../components/Carousel/Carousel.jsx";
import { DropdownCaret } from "../../components/Dropdown/DropdownCaret.jsx";
import { client } from "../../gql-client/client.js";
import {
  DeleteAssetDocument,
  type DeleteAssetMutation,
  type DeleteAssetMutationVariables,
} from "../../gql-client/types/graphql.js";
import { useDropdown } from "../../hooks/useDropdown.js";
import { useModal } from "../../hooks/useModal.jsx";
import { useObjectUrl } from "../../hooks/useObjectUrl.js";
import type { AssetData } from "../asset.data.js";
import "./styles.scss";
import { useNavigate } from "@solidjs/router";
import OptionsIcon from "bootstrap-icons/icons/gear-fill.svg";
import { Option, pipe } from "effect";
import { type Component, Show, Suspense } from "solid-js";

export const ViewAsset: Component<{ data: AssetData }> = (props) => {
  const { dropdownToggleRef, isVisible } = useDropdown();
  const { showPromptModal } = useModal();
  const navigate = useNavigate();

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

  const onDelete = () => {
    const assetId = Option.map(asset(), (asset) => asset.id);

    if (Option.isNone(assetId)) return;

    showPromptModal({
      title: "Delete asset",
      body: "Do you want to delete this asset?",
      okay: "Yes",
      cancel: "No",
      onOkay: () => {
        client
          .mutation<DeleteAssetMutation, DeleteAssetMutationVariables>(
            DeleteAssetDocument,
            {
              id: assetId.value,
            },
          )
          .then(({ error }) => {
            // TODO: error handling
            if (error) {
              console.log(error);
              return;
            }

            navigate("/");
          });
      },
    });
  };

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
                          href={`/asset/${asset.id}/edit`}
                        >
                          Edit
                        </a>
                      </li>
                      <li>
                        <button
                          class="dropdown-item text-danger"
                          type="button"
                          onClick={onDelete}
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
        </Suspense>
      </section>
    </>
  );
};
