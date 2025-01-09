import { FileEquivalence } from "../common/utils.js";
import { AssetForm } from "../components/AssetForm/AssetForm.jsx";
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
} from "../gql-client/types/graphql.js";
import type { AssetFormValues } from "../schemas/AssetFormValues.js";
import { CreateFileInputFromFile } from "../schemas/CreateFileInput.js";
import type { AssetData } from "./asset.data.js";
import { Effect, Exit, Option, Schema, pipe } from "effect";
import { isNonEmptyArray } from "effect/Array";
import {
  type Component,
  Show,
  createEffect,
  createSignal,
  createUniqueId,
} from "solid-js";

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

      // TODO: handle edited images

      newImageIds.add(newImage.id);
      previousImageId = newImage.id;
    }

    inputs.push(
      ...createImageInputs.map((create) => ({ create })),
      // TODO: I don't like this duplication here...
      ...Array.from(currentImageIds.difference(newImageIds), (id) => ({
        delete: { id },
      })),
    );

    return Option.filter(Option.some(inputs), isNonEmptyArray);
  });

export const EditAsset: Component<{ data: AssetData }> = (props) => {
  const formId = createUniqueId();

  // TODO: handle case when this is not an asset fragment
  const [asset, setAsset] = createSignal<AssetFragment>();

  const onSubmit = async (formValues: typeof AssetFormValues.Type) => {
    const currentAsset = asset();

    if (!currentAsset) return;

    Exit.match(
      await Effect.runPromiseExit(updateAssset(currentAsset, formValues)),
      {
        onSuccess: (asset) => setAsset(asset),
        onFailure(cause) {
          // TODO: error handling
          console.error(cause);
        },
      },
    );
  };

  // Keep the asset signal synced with the asset prop.
  createEffect(() => {
    const asset = props.data()?.asset;
    setAsset(asset && asset.__typename === "Asset" ? asset : undefined);
  });

  return (
    <section class="container">
      <h1>Edit Asset</h1>

      <Show when={asset()} keyed>
        {(asset) => (
          <>
            <AssetForm onSubmit={onSubmit} initialValue={asset} id={formId} />

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
