import { generatePath } from "../common/route.ts";
import { manualRetryWrapper } from "../common/utils.ts";
import {
  AssetForm,
  type AssetFormSubmitCallback,
} from "../components/AssetForm/AssetForm.tsx";
import { Paths } from "../enums/Paths.ts";
import { mutation } from "../gql-client/client.ts";
import {
  CreateAssetDocument,
  type CreateAssetMutation,
  type CreateAssetMutationVariables,
} from "../gql-client/types/graphql.ts";
import { usePromptModal } from "../hooks/usePromptModal.tsx";
import { CreateAssetInputFromAssetFormValues } from "../schemas/CreateAssetInput.ts";
import { Title } from "@solidjs/meta";
import { useNavigate } from "@solidjs/router";
import { Effect, Schema, pipe } from "effect";
import { type Component, createUniqueId } from "solid-js";

export const CreateAsset: Component = () => {
  const formId = createUniqueId();
  const navigate = useNavigate();
  const { showPromptModal } = usePromptModal();

  const onSubmit: AssetFormSubmitCallback = (formValues) =>
    pipe(
      formValues,
      Effect.andThen(Schema.decode(CreateAssetInputFromAssetFormValues)),
      Effect.andThen((createAssetInput) =>
        mutation<CreateAssetMutation, CreateAssetMutationVariables>(
          CreateAssetDocument,
          {
            data: createAssetInput,
          },
        ),
      ),
      Effect.andThen((result) => {
        navigate(generatePath(Paths.ViewAsset, { id: result.createAsset.id }));
      }),
      manualRetryWrapper("Failed to create asset", () =>
        pipe(
          showPromptModal({
            title: "Create asset failed",
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
      <Title>Create Asset</Title>

      <section class="container">
        <h1>Create Asset</h1>

        <AssetForm onSubmit={onSubmit} id={formId} />

        <button type={"submit"} class={"btn btn-primary mt-3"} form={formId}>
          Create asset
        </button>
      </section>
    </>
  );
};
