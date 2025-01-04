import { AssetForm } from "../components/AssetForm/AssetForm.jsx";
import { client } from "../gql-client/client.js";
import {
  type AssetFragment,
  UpdateAssetDocument,
  type UpdateAssetInput,
  type UpdateAssetMutation,
  type UpdateAssetMutationVariables,
} from "../gql-client/types/graphql.js";
import type { AssetFormValues } from "../schemas/AssetFormValues.js";
import type { AssetData } from "./asset.data.js";
import { Effect } from "effect";
import { type Accessor, type Component, Show, createUniqueId } from "solid-js";

function updateAssset(
  asset: AssetFragment,
  formValues: typeof AssetFormValues.Type,
): Effect.Effect<void, Error> {
  return Effect.gen(function* () {
    const updateAssetInput: UpdateAssetInput = {
      id: asset.id,
      ...(formValues.name !== asset.name && { name: formValues.name }),
      ...(formValues.description !== asset.description && {
        description: formValues.description,
      }),
    };

    if (
      Object.keys(updateAssetInput).filter((key) => key !== "id").length <= 0
    ) {
      return;
    }

    const { data, error } = yield* Effect.tryPromise({
      try: () =>
        client.mutation<UpdateAssetMutation, UpdateAssetMutationVariables>(
          UpdateAssetDocument,
          {
            data: updateAssetInput,
          },
        ),
      catch: () => new Error("Failed to update asset"),
    });

    // TODO: Improve error handling
    if (error) yield* Effect.fail(error);
    if (data?.updateAsset.__typename === "AssetError")
      yield* Effect.fail(new Error("Failed to update asset"));
  });
}

export const EditAsset: Component<{ data: AssetData }> = (props) => {
  const formId = createUniqueId();

  // TODO: handle case when this is not an asset fragment
  const asset: Accessor<AssetFragment | null> = () => {
    const asset = props.data()?.asset;
    return asset && asset.__typename === "Asset" ? asset : null;
  };

  const onSubmit = async (formValues: typeof AssetFormValues.Type) => {
    const currentAsset = asset();

    if (!currentAsset) return;

    // TODO: deal with any errors in the results
    await Effect.runPromise(
      Effect.all([updateAssset(currentAsset, formValues)], {
        mode: "either",
        concurrency: "unbounded",
      }),
    );
  };

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
