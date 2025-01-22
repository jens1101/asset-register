import { FileEquivalence } from "../common/utils.js";
import { AssetForm } from "../components/AssetForm/AssetForm.jsx";
import type { AssetResource } from "../data/index.js";
import { client } from "../gql-client/client.js";
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
} from "../gql-client/types/graphql.js";
import type { AssetFormValues } from "../schemas/AssetFormValues.js";
import { CreateFileInputFromFile } from "../schemas/CreateFileInput.js";
import { useNavigate } from "@solidjs/router";
import { Effect, Exit, Option, Schema, pipe } from "effect";
import { isNonEmptyArray } from "effect/Array";
import { type Accessor, type Component, Show, createUniqueId } from "solid-js";

function updateAssset(
  asset: AssetFragment,
  formValues: typeof AssetFormValues.Type,
): Effect.Effect<AssetFragment, Error> {
  return Effect.gen(function* () {
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

    const updateAssetInput: UpdateAssetInput = {
      id: asset.id,
      ...(formValues.name !== asset.name && { name: formValues.name }),
      ...(formValues.description !== asset.description && {
        description: formValues.description,
      }),
      ...proofOfPurchaseInput,
      ...imagesInput,
    };

    if (
      Object.keys(updateAssetInput).filter((key) => key !== "id").length <= 0
    ) {
      return asset;
    }

    // TODO: This could be moved into a util function. The client functions are turned into an effect.
    const { data, error } = yield* Effect.promise(() =>
      client.mutation<UpdateAssetMutation, UpdateAssetMutationVariables>(
        UpdateAssetDocument,
        {
          data: updateAssetInput,
        },
      ),
    );

    // TODO: Improve error handling
    if (error) {
      return yield* Effect.fail(error);
    }

    if (data?.updateAsset.__typename === "Asset") {
      return data.updateAsset;
    }

    return yield* Effect.fail(new Error("Failed to update asset"));
  });
}

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

const getImagesInput = (
  asset: AssetFragment,
  formValues: typeof AssetFormValues.Type,
): Effect.Effect<Option.Option<MutateImageInput[]>, Error> =>
  Effect.gen(function* () {
    const inputs: MutateImageInput[] = [];

    const currentImageIds = new Set(asset.images.map((image) => image.id));
    const newImageIds = new Set();

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

      newImageIds.add(newImage.id);
      previousImageId = newImage.id;
    }

    inputs.push(
      ...createImageInputs.map((create) => ({ create })),
      ...Array.from(currentImageIds.difference(newImageIds), (id) => ({
        delete: { id },
      })),
    );

    return Option.filter(Option.some(inputs), isNonEmptyArray);
  });

export const EditAsset: Component<{ data: AssetResource }> = (props) => {
  const initialAsset: Accessor<Option.Option<AssetFragment>> = () =>
    Option.fromNullable(props.data()?.asset).pipe(
      Option.filter((data) => data.__typename === "Asset"),
    );
  const formId = createUniqueId();
  const navigate = useNavigate();

  const onSubmit = async (formValues: typeof AssetFormValues.Type) => {
    const asset = initialAsset();

    if (Option.isNone(asset)) return;

    Exit.match(
      await Effect.runPromiseExit(updateAssset(asset.value, formValues)),
      {
        onSuccess(asset) {
          navigate(`/asset/${asset.id}`);
        },
        onFailure(cause) {
          // TODO: error handling
          console.error(cause);
        },
      },
    );
  };

  return (
    <section class="container">
      <h1>Edit Asset</h1>

      <Show when={Option.getOrUndefined(initialAsset())} keyed>
        {(initialAsset) => (
          <>
            <AssetForm
              onSubmit={onSubmit}
              initialValue={initialAsset}
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
    </section>
  );
};
