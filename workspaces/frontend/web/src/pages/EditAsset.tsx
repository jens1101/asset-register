import { generatePath } from "../common/route.ts";
import {
  FileEquivalence,
  SumEquivalence,
  manualRetryWrapper,
} from "../common/utils.ts";
import {
  AssetForm,
  type AssetFormSubmitCallback,
} from "../components/AssetForm/AssetForm.tsx";
import type { AssetResource } from "../data/asset.ts";
import { Paths } from "../enums/Paths.ts";
import { mutation } from "../gql-client/client.ts";
import {
  type AssetFragment,
  type CreateImageInput,
  type MutateDocumentInput,
  type MutateImageInput,
  UpdateAssetDocument,
  type UpdateAssetInput,
  type UpdateAssetMutation,
  type UpdateAssetMutationVariables,
  type UpdateImageInput,
} from "../gql-client/graphql.generated.ts";
import { useAlertModal } from "../hooks/useAlertModal.tsx";
import { usePromptModal } from "../hooks/usePromptModal.tsx";
import type { AssetFormValues } from "../schemas/AssetFormValues.ts";
import { CreateFileInputFromFile } from "../schemas/CreateFileInput.ts";
import { SumInputFromFormValues } from "../schemas/SumInput.ts";
import { Title } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";
import { Array, Effect, Match, Option, Schema, pipe } from "effect";
import {
  type Component,
  ErrorBoundary,
  Show,
  Suspense,
  createUniqueId,
} from "solid-js";

const updateAssset = (
  asset: AssetFragment,
  formValues: typeof AssetFormValues.Type,
) =>
  Effect.gen(function* () {
    const proofOfPurchaseInput = pipe(
      yield* getProofOfPurchaseInput(asset, formValues),
      Option.map((proofOfPurchase) => ({ proofOfPurchase })),
      Option.getOrElse(() => ({})),
    );

    const imagesInput = pipe(
      yield* getImagesInput(asset, formValues),
      Option.map((images) => ({ images })),
      Option.getOrElse(() => ({})),
    );

    const valueInput = pipe(
      yield* getValueInput(asset, formValues),
      Option.map((value) => ({ value })),
      Option.getOrElse(() => ({})),
    );

    const updateAssetInput: UpdateAssetInput = {
      id: asset.id,
      ...(formValues.name !== asset.name && { name: formValues.name }),
      ...(formValues.description !== asset.description && {
        description: formValues.description,
      }),
      ...valueInput,
      ...proofOfPurchaseInput,
      ...imagesInput,
    };

    if (
      Object.keys(updateAssetInput).filter((key) => key !== "id").length <= 0
    ) {
      return asset;
    }

    const result = yield* mutation<
      UpdateAssetMutation,
      UpdateAssetMutationVariables
    >(UpdateAssetDocument, {
      data: updateAssetInput,
    });

    return result.updateAsset;
  });

const getProofOfPurchaseInput = (
  asset: AssetFragment,
  formValues: typeof AssetFormValues.Type,
): Effect.Effect<Option.Option<MutateDocumentInput>, Error> =>
  Effect.gen(function* () {
    const newFile = Option.fromNullable(
      formValues.proofOfPurchase?.file &&
        (yield* Schema.decode(CreateFileInputFromFile)(
          formValues.proofOfPurchase.file,
        )),
    );

    return Option.match(Option.fromNullable(asset.proofOfPurchase), {
      onSome: ({ id, file: currentFile }) =>
        Option.match(newFile, {
          onSome: (newFile) =>
            Option.filter(
              Option.some({ update: { file: newFile } }),
              () => !FileEquivalence(currentFile, newFile),
            ),
          onNone: () => Option.some({ delete: { id } }),
        }),
      onNone: () =>
        Option.map(newFile, (newFile) => ({ update: { file: newFile } })),
    });
  });

const getValueInput = (
  asset: AssetFragment,
  formValues: typeof AssetFormValues.Type,
) =>
  Effect.gen(function* () {
    const valueInput = yield* Schema.decode(SumInputFromFormValues)(
      formValues.value,
    );

    return Option.filter(
      Option.some(valueInput),
      () => !SumEquivalence(asset.value, valueInput),
    );
  });

const getImagesInput = (
  asset: AssetFragment,
  formValues: typeof AssetFormValues.Type,
): Effect.Effect<Option.Option<MutateImageInput[]>, Error> =>
  Effect.gen(function* () {
    const inputs: MutateImageInput[] = [];

    const currentImageIds: string[] = asset.images.map((image) => image.id);
    const newImageIds: string[] = [];

    let previousImageId: string | null = null;
    let createImageInputs: CreateImageInput[] = [];

    for (const newImage of formValues.images) {
      if (!newImage.id) {
        createImageInputs.unshift({
          file: yield* Schema.decode(CreateFileInputFromFile)(newImage.file),
          name: newImage.name,
          description: newImage.description,
          previousImageId,
        });

        continue;
      }

      inputs.push(...createImageInputs.map((create) => ({ create })));
      createImageInputs = [];

      const currentImage = asset.images.find(
        (image) => image.id === newImage.id,
      );

      if (!currentImage) {
        yield* Effect.fail(new Error(`Invalid image ID ${newImage.id}`));
        break;
      }

      const newFile = yield* Schema.decode(CreateFileInputFromFile)(
        newImage.file,
      );

      const updateInput: UpdateImageInput = {
        id: currentImage.id,
        ...(newImage.name !== currentImage.name && { name: newImage.name }),
        ...(newImage.description !== currentImage.description && {
          description: newImage.description,
        }),
        ...(!FileEquivalence(newFile, currentImage.file) && { file: newFile }),
      };

      if (Object.keys(updateInput).filter((key) => key !== "id").length > 0) {
        inputs.push({ update: updateInput });
      }

      newImageIds.push(newImage.id);
      previousImageId = newImage.id;
    }

    inputs.push(
      ...createImageInputs.map((create) => ({ create })),
      ...Array.difference(currentImageIds, newImageIds).map((id) => ({
        delete: { id },
      })),
    );

    return Option.filter(Option.some(inputs), Array.isNonEmptyArray);
  });

export const EditAsset: Component<{ data: AssetResource }> = (props) => {
  const assetQuery = () =>
    pipe(
      props.data.assetQuery(),
      Option.fromNullable,
      Option.map((assetQuery) => assetQuery.asset),
    );
  const asset = () =>
    Option.filter(assetQuery(), (asset) => asset.__typename === "Asset");
  const formId = createUniqueId();
  const navigate = useNavigate();
  const { showPromptModal } = usePromptModal();
  const { showAlertModal } = useAlertModal();

  const onSubmit: AssetFormSubmitCallback = (formValues) =>
    pipe(
      Effect.all([asset(), formValues]),
      Effect.andThen(([asset, formValues]) => updateAssset(asset, formValues)),
      Effect.andThen((result) =>
        pipe(
          Match.value(result),
          Match.when({ __typename: "ReadAssetError" }, () =>
            pipe(
              showAlertModal({
                title: "Failed to edit asset",
                body: "The asset no longer exists or could not be found",
                dismiss: "Go Home",
              }),
              Effect.andThen(() => {
                navigate(Paths.Home);
              }),
            ),
          ),
          Match.when({ __typename: "DeleteDocumentError" }, () =>
            showAlertModal({
              title: "Failed to edit asset",
              body: "The proof of purchase failed to update. Please try again.",
              dismiss: "Dismiss",
            }),
          ),
          Match.when({ __typename: "ImageNotFoundError" }, () =>
            showAlertModal({
              title: "Failed to edit asset",
              body: "One of the images failed to update. Please try again.",
              dismiss: "Dismiss",
            }),
          ),
          Match.when({ __typename: "Asset" }, (asset) => {
            navigate(generatePath(Paths.ViewAsset, { id: asset.id }));
          }),
          Match.exhaustive,
        ),
      ),
      manualRetryWrapper("Failed to edit asset", () =>
        pipe(
          showPromptModal({
            title: "Edit asset failed",
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
      <Title>
        Edit Asset
        {pipe(
          asset(),
          Option.map((asset) => ` - ${asset.name}`),
          Option.getOrElse(() => ""),
        )}
      </Title>

      <section class="container">
        <Suspense fallback={<span>...</span>}>
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
                  <h1>Edit Asset</h1>

                  <AssetForm
                    onSubmit={onSubmit}
                    initialValue={asset}
                    id={formId}
                  />

                  <button
                    type={"submit"}
                    class={"btn btn-primary mt-3"}
                    form={formId}
                  >
                    Save changes
                  </button>
                </>
              )}
            </Show>
          </ErrorBoundary>
        </Suspense>
      </section>
    </>
  );
};
