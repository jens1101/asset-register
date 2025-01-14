import type { ClassAttributes, InitialValue } from "../../common/types.js";
import { isImage } from "../../common/utils.js";
import { MAX_FILE_SIZE } from "../../config.js";
import type { ImageFragment } from "../../gql-client/types/graphql.js";
import { useFormField } from "../../hooks/useFormField.js";
import { useObjectUrl } from "../../hooks/useObjectUrl.js";
import { CreateFileInputFromFile } from "../../schemas/CreateFileInput.js";
import { Feedback } from "../FormFieldFeedback/Feedback.jsx";
import "./styles.scss";
import { Option, Schema } from "effect";
import prettyBytes from "pretty-bytes";
import {
  type Accessor,
  type Component,
  Show,
  createSignal,
  createUniqueId,
} from "solid-js";

const enum FieldName {
  Id = "id",
  Name = "name",
  Description = "description",
  File = "file",
}

export const ImageFormField: Component<
  ClassAttributes &
    InitialValue<Partial<ImageFragment>> & {
      /**
       * Callback triggered for each form field in this component. This will allow
       * mapping the field names to a custom format.
       */
      fieldNameCallback?: (name: FieldName) => string;
      /** Callback triggered when the user presses the "Delete" button. */
      onDelete?: EventListener;
      /** Boolean to force all current validation messages to show. */
      showValidations?: boolean;
    }
> = (props) => {
  const initialId = props.initialValue?.id;
  const initialName = props.initialValue?.name;
  const initialDescription = props.initialValue?.description;
  const initialFile = Option.getOrUndefined(
    Schema.encodeUnknownOption(CreateFileInputFromFile)(
      props.initialValue?.file,
    ),
  );

  const [selectedFile, setSelectedFile] = createSignal<File | undefined>(
    initialFile,
  );
  const imagePreviewUrl: Accessor<string | undefined> = () => {
    const image = selectedFile();
    return image && isImage(image) ? useObjectUrl(image) : undefined;
  };

  const nameId = createUniqueId();
  const {
    validation: nameValidation,
    errors: nameErrors,
    touched: nameTouched,
  } = useFormField<HTMLInputElement>({
    initialValue: initialName,
    validationEventType: "input",
    validatonErrorMap: {
      valueMissing: "Name is required",
    },
  });

  const descriptionId = createUniqueId();

  const imageId = createUniqueId();
  const {
    validation: imageValidation,
    errors: imageErrors,
    touched: imageTouched,
    empty: imageEmpty,
    clear: imageClear,
  } = useFormField<HTMLInputElement>({
    initialValue: initialFile,
    customValidators: {
      isAsync: false,
      functions: [
        (element) =>
          Number(element.files?.[0]?.size) > MAX_FILE_SIZE
            ? `Maximum allowed file size is ${prettyBytes(MAX_FILE_SIZE)}`
            : "",
        (element) =>
          element.files?.[0] && !isImage(element.files[0])
            ? "Only image file types are allowed"
            : "",
      ],
    },
    validatonErrorMap: {
      valueMissing: "An image is required",
    },
  });

  return (
    <fieldset class={`card ${props.class ?? ""}`} classList={props.classList}>
      <Show
        when={imagePreviewUrl()}
        fallback={<div class={"card-img-top image-form-field__image"} />}
      >
        <img
          src={imagePreviewUrl()}
          class={"card-img-top image-form-field__image"}
          alt={"Asset Image"}
        />
      </Show>

      <div class={"card-body"}>
        <Show when={initialId}>
          <input
            type={"hidden"}
            name={props.fieldNameCallback?.(FieldName.Id) ?? FieldName.Id}
            value={initialId}
          />
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
                (props.showValidations || nameTouched()) &&
                nameErrors().length === 0,
              "is-invalid":
                (props.showValidations || nameTouched()) &&
                nameErrors().length > 0,
            }}
            name={props.fieldNameCallback?.(FieldName.Name) ?? FieldName.Name}
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
            name={
              props.fieldNameCallback?.(FieldName.Description) ??
              FieldName.Description
            }
          >
            {initialDescription}
          </textarea>
        </div>

        <div class={"mb-3"}>
          <label for={imageId} class={"form-label"}>
            Image
          </label>

          <div
            class="input-group"
            classList={{
              "has-validation":
                (props.showValidations || imageTouched()) &&
                imageErrors().length > 0,
            }}
          >
            <input
              ref={imageValidation}
              id={imageId}
              class={"form-control"}
              classList={{
                "is-valid":
                  (props.showValidations || imageTouched()) &&
                  imageErrors().length === 0,
                "is-invalid":
                  (props.showValidations || imageTouched()) &&
                  imageErrors().length > 0,
              }}
              type={"file"}
              name={props.fieldNameCallback?.(FieldName.File) ?? FieldName.File}
              required
              accept={"image/*"}
              onChange={(event) =>
                setSelectedFile(event.currentTarget.files?.[0])
              }
            />
            <button
              class={"btn btn-outline-secondary"}
              type={"button"}
              disabled={imageEmpty()}
              onClick={() => {
                imageClear();
                setSelectedFile(undefined);
              }}
            >
              Clear
            </button>

            <Feedback invalidFeedback={imageErrors()} />
          </div>
        </div>

        <button
          type="button"
          class="btn btn-outline-danger"
          onClick={(event) => {
            props.onDelete?.(event);
          }}
        >
          Delete
        </button>
      </div>
    </fieldset>
  );
};
