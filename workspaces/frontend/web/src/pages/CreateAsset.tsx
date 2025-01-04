import { AssetForm } from "../components/AssetForm/AssetForm.jsx";
import { client } from "../gql-client/client.js";
import {
  CreateAssetDocument,
  type CreateAssetInput,
  type CreateAssetMutation,
  type CreateAssetMutationVariables,
} from "../gql-client/types/graphql.js";
import type { AssetFormValues } from "../schemas/AssetFormValues.js";
import { CreateAssetInputFromAssetFormValues } from "../schemas/CreateAssetInput.js";
import { Schema } from "effect";
import {
  type Component,
  createEffect,
  createResource,
  createSignal,
  createUniqueId,
} from "solid-js";

// TODO: create `EditAsset` page
export const CreateAsset: Component = () => {
  const formId = createUniqueId();

  const [assetInput, setAssetInput] = createSignal<CreateAssetInput>();

  const [asset] = createResource(assetInput, async (data: CreateAssetInput) => {
    const { data: result, error } = await client.mutation<
      CreateAssetMutation,
      CreateAssetMutationVariables
    >(CreateAssetDocument, {
      data,
    });

    if (error) {
      console.error(error);
    }

    // TODO: defect handling
    return result?.createAsset;
  });

  const onSubmit = async (formValues: typeof AssetFormValues.Type) => {
    try {
      setAssetInput(
        await Schema.decodePromise(CreateAssetInputFromAssetFormValues)(
          formValues,
        ),
      );
    } catch (error) {
      // TODO: proper error handling
      console.log(error);
    }
  };

  createEffect(() => {
    // TODO: Handle errors and defects.
    // TODO: On success show a message to the user and give him the option to add more or return home.
    console.log(asset());
  });

  return (
    <section class="container">
      <h1>Create Asset</h1>

      <AssetForm onSubmit={onSubmit} id={formId} />

      <button type={"submit"} class={"btn btn-primary mt-3"} form={formId}>
        Create asset
      </button>
    </section>
  );
};
