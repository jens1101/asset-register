import { Feedback } from "../../components/FormFieldFeedback/Feedback.jsx";
import { ImageFormField } from "../../components/ImageFormField/ImageFormField.jsx";
import { MAX_FILE_SIZE } from "../../config.js";
import { client } from "../../gql-client/client.js";
import {
  CreateAssetDocument,
  type CreateAssetInput,
  type CreateAssetMutation,
  type CreateAssetMutationVariables,
} from "../../gql-client/types/graphql.js";
import { useForm } from "../../hooks/useForm.js";
import { useFormField } from "../../hooks/useFormField.js";
import {
  AssetFormFromFormData,
  CreateAssetInputFromAssetForm,
} from "./schemas.js";
import { Effect, Schema, pipe } from "effect";
import prettyBytes from "pretty-bytes";
import {
  type Component,
  For,
  createEffect,
  createResource,
  createSignal,
  createUniqueId,
} from "solid-js";

export const CreateAsset: Component = () => {
  const [images, setImages] = createSignal<object[]>([]);

  const [assetInput] = createSignal<CreateAssetInput>();
  const { submit, previouslyFailedSubmission } = useForm({
    onSubmit: (formData: FormData) => {
      Effect.runPromise(
        pipe(
          formData,
          Schema.decode(AssetFormFromFormData),
          Effect.andThen(Schema.decode(CreateAssetInputFromAssetForm)),
        ),
      )
        .then((foo) => {
          // TODO: implement
          console.log(foo);
        })
        .catch((foo: unknown) => {
          // TODO: error handling
          console.log(foo);
        });
    },
  });

  const nameId = createUniqueId();
  const {
    validation: nameValidation,
    errors: nameErrors,
    touched: nameTouched,
  } = useFormField<HTMLInputElement>({
    validationEventType: "input",
    validatonErrorMap: {
      valueMissing: "Name is required",
    },
  });

  const descriptionId = createUniqueId();

  const proofOfPurchaseId = createUniqueId();
  const {
    validation: proofOfPurchaseValidation,
    errors: proofOfPurchaseErrors,
    empty: proofOfPurchaseEmpty,
    clear: proofOfPurchaseClear,
  } = useFormField<HTMLInputElement>({
    customValidators: {
      isAsync: false,
      functions: [
        (element) =>
          Number(element.files?.[0]?.size) > MAX_FILE_SIZE
            ? `Maximum allowed file size is ${prettyBytes(MAX_FILE_SIZE)}`
            : "",
      ],
    },
  });

  const [asset] = createResource(assetInput, async (data: CreateAssetInput) => {
    const { data: result } = await client.mutation<
      CreateAssetMutation,
      CreateAssetMutationVariables
    >(CreateAssetDocument, {
      data,
    });

    return result?.createAsset;
  });

  createEffect(() => {
    console.log(asset());
  });

  return (
    <form ref={submit}>
      <div class="mb-3">
        <label for={nameId} class={"form-label"}>
          Name
        </label>

        <input
          ref={nameValidation}
          id={nameId}
          class={"form-control"}
          classList={{
            "is-valid":
              (previouslyFailedSubmission() || nameTouched()) &&
              nameErrors().length === 0,
            "is-invalid":
              (previouslyFailedSubmission() || nameTouched()) &&
              nameErrors().length > 0,
          }}
          name={"name"}
          required
        />

        <Feedback invalidFeedback={nameErrors()} />
      </div>

      <div class={"mb-3"}>
        <label for={descriptionId} class={"form-label"}>
          Description
        </label>

        <textarea
          id={descriptionId}
          class={"form-control"}
          name={"description"}
        />
      </div>

      <div class={"mb-3"}>
        <label for={proofOfPurchaseId} class={"form-label"}>
          Proof of puchase
        </label>

        <div
          class="input-group"
          classList={{
            "has-validation":
              !proofOfPurchaseEmpty() && proofOfPurchaseErrors().length > 0,
          }}
        >
          <input
            ref={proofOfPurchaseValidation}
            id={proofOfPurchaseId}
            class={"form-control"}
            classList={{
              "is-valid":
                !proofOfPurchaseEmpty() && proofOfPurchaseErrors().length === 0,
              "is-invalid":
                !proofOfPurchaseEmpty() && proofOfPurchaseErrors().length > 0,
            }}
            type={"file"}
            name={"proofOfPurchase"}
          />
          <button
            class={"btn btn-outline-secondary"}
            type={"button"}
            disabled={proofOfPurchaseEmpty()}
            onClick={proofOfPurchaseClear}
          >
            Clear
          </button>

          <Feedback invalidFeedback={proofOfPurchaseErrors()} />
        </div>
      </div>

      <div class="d-flex flex-wrap align-items-center">
        <h2 class="m-0 me-3">Images</h2>
        <button
          type="button"
          class="btn btn-primary"
          onClick={() => setImages([...images(), {}])}
        >
          Add
        </button>
      </div>
      <div class="mb-3 row row-cols-1 row-cols-md-2 row-cols-xl-3">
        <For each={images()}>
          {(_, index) => (
            <div class={"col py-2"}>
              <ImageFormField
                fieldNameCallback={(name) => `images.${index()}.${name}`}
                onDelete={() => setImages(images().toSpliced(index(), 1))}
                showValidations={previouslyFailedSubmission()}
              />
            </div>
          )}
        </For>
      </div>

      <button type={"submit"} class={"btn btn-primary"}>
        Submit
      </button>
    </form>
  );
};
