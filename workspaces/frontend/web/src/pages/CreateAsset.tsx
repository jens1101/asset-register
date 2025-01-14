import { AssetForm } from "../components/AssetForm/AssetForm.jsx";
import { client } from "../gql-client/client.js";
import {
  type AssetFragment,
  CreateAssetDocument,
  type CreateAssetMutation,
  type CreateAssetMutationVariables,
} from "../gql-client/types/graphql.js";
import type { AssetFormValues } from "../schemas/AssetFormValues.js";
import { CreateAssetInputFromAssetFormValues } from "../schemas/CreateAssetInput.js";
import { useNavigate } from "@solidjs/router";
import { Effect, Exit, Schema } from "effect";
import { type Component, createUniqueId } from "solid-js";

function createAsset(
  formValues: typeof AssetFormValues.Type,
): Effect.Effect<AssetFragment, Error> {
  return Effect.gen(function* () {
    const createAssetInput = yield* Schema.decode(
      CreateAssetInputFromAssetFormValues,
    )(formValues);

    const { data, error } = yield* Effect.promise(() =>
      client.mutation<CreateAssetMutation, CreateAssetMutationVariables>(
        CreateAssetDocument,
        {
          data: createAssetInput,
        },
      ),
    );

    // TODO: Improve error handling
    if (error) {
      return yield* Effect.fail(error);
    }

    if (data?.createAsset.__typename === "Asset") {
      return data.createAsset;
    }

    return yield* Effect.fail(new Error("Failed to create asset"));
  });
}

export const CreateAsset: Component = () => {
  const formId = createUniqueId();
  const navigate = useNavigate();

  const onSubmit = async (formValues: typeof AssetFormValues.Type) => {
    Exit.match(await Effect.runPromiseExit(createAsset(formValues)), {
      onSuccess(asset) {
        navigate(`/asset/${asset.id}`);
      },
      onFailure(cause) {
        // TODO: error handling
        console.error(cause);
      },
    });
  };

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
