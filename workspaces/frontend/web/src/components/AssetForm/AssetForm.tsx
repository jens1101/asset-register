import { DEFAULT_CURRENCY } from "../../common/config.ts";
import {
  availableCurrencies,
  defaultByteFormatter,
  numberFormatterCache,
} from "../../common/intl.ts";
import type {
  IdAttribute,
  InertAttribute,
  InitialValue,
} from "../../common/types.ts";
import { MAX_FILE_SIZE } from "../../config.ts";
import {
  type AssetFragment,
  type ImageFragment,
} from "../../gql-client/graphql.generated.ts";
import { useForm } from "../../hooks/useForm.ts";
import { useFormField } from "../../hooks/useFormField.ts";
import {
  type AssetFormValues,
  AssetFormValuesFromFormData,
} from "../../schemas/AssetFormValues.ts";
import { CreateFileInputFromFile } from "../../schemas/CreateFileInput.ts";
import { Currency } from "../../schemas/Currency.ts";
import { Feedback } from "../FormFieldFeedback/Feedback.tsx";
import { ImageFormField } from "../ImageFormField/ImageFormField.tsx";
import {
  BigDecimal,
  type Effect,
  Option,
  type ParseResult,
  Schema,
  pipe,
} from "effect";
import {
  type Component,
  For,
  Show,
  createSignal,
  createUniqueId,
} from "solid-js";

export type AssetFormSubmitCallback = (
  formValues: Effect.Effect<
    typeof AssetFormValues.Type,
    ParseResult.ParseError
  >,
) => unknown;

export const AssetForm: Component<
  InitialValue<Partial<AssetFragment>> &
    IdAttribute &
    InertAttribute & { onSubmit?: AssetFormSubmitCallback }
> = (props) => {
  const initialValue = props.initialValue ?? {};

  const [images, setImages] = createSignal<Partial<ImageFragment>[]>(
    initialValue.images ?? [],
  );

  const { submit, previouslyFailedSubmission } = useForm({
    onSubmit: (formData: FormData) => {
      props.onSubmit?.(Schema.decode(AssetFormValuesFromFormData)(formData));
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
    customValidators: {
      isAsync: false,
      functions: [
        (element) =>
          element.value !== element.value.trim()
            ? "Name may not contain leading or trailing spaces"
            : "",
      ],
    },
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
    initialValue: Option.getOrUndefined(
      Schema.encodeUnknownOption(CreateFileInputFromFile)(
        initialValue.proofOfPurchase?.file,
      ),
    ),
    customValidators: {
      isAsync: false,
      functions: [
        (element) =>
          Number(element.files?.[0]?.size) > MAX_FILE_SIZE
            ? `Maximum allowed file size is ${defaultByteFormatter.format(MAX_FILE_SIZE)}`
            : "",
      ],
    },
  });

  const currencyId = createUniqueId();
  const {
    validation: currencyValidation,
    errors: currencyErrors,
    touched: currencyTouched,
    value: currencyValue,
  } = useFormField<HTMLSelectElement>({
    initialValue: initialValue.value?.currency ?? DEFAULT_CURRENCY,
  });

  const amountId = createUniqueId();
  const {
    validation: amountValidation,
    errors: amountErrors,
    touched: amountTouched,
  } = useFormField<HTMLInputElement>({
    initialValue:
      initialValue.value?.amount &&
      BigDecimal.format(initialValue.value.amount),
    validatonErrorMap: {
      valueMissing: "A value amount is required",
      rangeUnderflow: "The value amount cannot be less than zero",
      badInput: "The value amount must be a number",
      stepMismatch: "Fractional cents are not supported",
    },
  });

  return (
    <form ref={submit} id={props.id} inert={props.inert}>
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
        <label for={amountId} class={"form-label"}>
          Value
        </label>

        <select
          ref={currencyValidation}
          id={currencyId}
          class={"form-select mb-2"}
          classList={{
            "is-valid":
              (previouslyFailedSubmission() || currencyTouched()) &&
              currencyErrors().length === 0,
            "is-invalid":
              (previouslyFailedSubmission() || currencyTouched()) &&
              currencyErrors().length > 0,
          }}
          name={"value.currency"}
          required
        >
          <For each={availableCurrencies}>
            {({ code, display }) => <option value={code}>{display}</option>}
          </For>
        </select>

        <div
          class="input-group"
          classList={{
            "has-validation":
              (previouslyFailedSubmission() || amountTouched()) &&
              amountErrors().length > 0,
          }}
        >
          <span class="input-group-text">
            <b>
              {pipe(
                Schema.encodeUnknownOption(Currency)(currencyValue()),
                Option.map((currency) =>
                  numberFormatterCache
                    .get({ style: "currency", currency })
                    .formatToParts(0)
                    .filter((part) => part.type === "currency")
                    .map((part) => part.value),
                ),
                Option.flatMap(Option.fromIterable),
                Option.getOrElse(() => "?"),
              )}
            </b>
          </span>

          <input
            ref={amountValidation}
            id={amountId}
            class={"form-control"}
            classList={{
              "is-valid":
                (previouslyFailedSubmission() || amountTouched()) &&
                amountErrors().length === 0,
              "is-invalid":
                (previouslyFailedSubmission() || amountTouched()) &&
                amountErrors().length > 0,
            }}
            type={"number"}
            step={0.01}
            min={0}
            name={"value.amount"}
            required
          />

          <Feedback
            invalidFeedback={[...currencyErrors(), ...amountErrors()]}
          />
        </div>
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
