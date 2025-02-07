import type { IdAttribute, InitialValue } from "../../common/types.js";
import { MAX_FILE_SIZE } from "../../config.js";
import {
  type AssetFragment,
  type ImageFragment,
} from "../../gql-client/types/graphql.js";
import { useForm } from "../../hooks/useForm.js";
import { useFormField } from "../../hooks/useFormField.js";
import {
  type AssetFormValues,
  AssetFormValuesFromFormData,
} from "../../schemas/AssetFormValues.js";
import { CreateFileInputFromFile } from "../../schemas/CreateFileInput.js";
import { Feedback } from "../FormFieldFeedback/Feedback.jsx";
import { ImageFormField } from "../ImageFormField/ImageFormField.jsx";
import { Option, Schema } from "effect";
import prettyBytes from "pretty-bytes";
import {
  type Component,
  For,
  Show,
  createSignal,
  createUniqueId,
} from "solid-js";

export const AssetForm: Component<
  InitialValue<Partial<AssetFragment>> &
    IdAttribute & {
      onSubmit?: (formValues: typeof AssetFormValues.Type) => unknown;
    }
> = (props) => {
  const initialValue = props.initialValue ?? {};

  const [images, setImages] = createSignal<Partial<ImageFragment>[]>(
    initialValue.images ?? [],
  );

  const { submit, previouslyFailedSubmission } = useForm({
    onSubmit: async (formData: FormData) => {
      try {
        props.onSubmit?.(
          await Schema.decodePromise(AssetFormValuesFromFormData)(formData),
        );
      } catch (foo) {
        // TODO: error handling
        console.log(foo);
      }
    },
  });

  const nameId = createUniqueId();
  const {
    validation: nameValidation,
    errors: nameErrors,
    touched: nameTouched,
  } = useFormField<HTMLInputElement>({
    initialValue: initialValue.name,
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
    initialValue: Option.getOrNull(
      Schema.encodeUnknownOption(CreateFileInputFromFile)(
        initialValue.proofOfPurchase?.file,
      ),
    ),
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

  return (
    <form ref={submit} id={props.id}>
      <Show when={initialValue.id}>
        <input type={"hidden"} name={"id"} value={initialValue.id} />
      </Show>

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
        >
          {initialValue.description}
        </textarea>
      </div>

      <div class={"mb-3"}>
        <label for={proofOfPurchaseId} class={"form-label"}>
          Proof of puchase
        </label>

        <Show when={initialValue.id}>
          <input
            type={"hidden"}
            name={"proofOfPurchase.id"}
            value={initialValue.proofOfPurchase?.id}
          />
        </Show>

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
            name={"proofOfPurchase.file"}
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
          {(image, index) => (
            <div class={"col py-2"}>
              <ImageFormField
                initialValue={image}
                fieldNameCallback={(name) => `images.${index()}.${name}`}
                onDelete={() => setImages(images().toSpliced(index(), 1))}
                showValidations={previouslyFailedSubmission()}
              />
            </div>
          )}
        </For>
      </div>
    </form>
  );
};
