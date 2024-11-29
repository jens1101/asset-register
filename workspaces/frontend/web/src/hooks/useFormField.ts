import { createSignal, onCleanup } from "solid-js";

// TODO: add documentation!

// TODO: reconsider the message transformer idea. The easiest solution is to have validations show on the form field itself.

// TODO: maybe use an interface? That might correctly thread the type
type FormFieldElement = Element & {
  setCustomValidity(error: string): void;
  checkValidity(): boolean;
  reportValidity(): boolean;
  readonly validationMessage: string;
  validity: ValidityState;

  // TODO: not technically needed
  value: string;
};

type AsyncValidator = (
  element: FormFieldElement,
  event: Event,
) => Promise<string | undefined>;

type SyncValidator = (
  element: FormFieldElement,
  event: Event,
) => string | undefined;

type ValidityMessages = Partial<
  Record<keyof Omit<ValidityState, "valid">, string>
>;

type Validators =
  | {
      isAsync: true;
      functions: (AsyncValidator | SyncValidator)[];
    }
  | {
      isAsync: false;
      functions: SyncValidator[];
    };

function runSyncValidations(
  element: FormFieldElement,
  event: Event,
  validators: SyncValidator[],
  stopOnFirstError: boolean,
): string[] {
  const errorMessages = [];

  for (const validator of validators) {
    const errorMessage = validator(element, event);

    if (errorMessage) errorMessages.push(errorMessage);
    if (errorMessage && stopOnFirstError) break;
  }

  return errorMessages;
}

async function runAsyncValidations(
  element: FormFieldElement,
  event: Event,
  validators: (SyncValidator | AsyncValidator)[],
  stopOnFirstError: boolean,
): Promise<string[]> {
  const errorMessages = [];

  for (const validator of validators) {
    const errorMessage = await validator(element, event);

    if (errorMessage) errorMessages.push(errorMessage);
    if (errorMessage && stopOnFirstError) break;
  }

  return errorMessages;
}

export function useFormField({
  eventType = "blur",
  validatonErrorMap,
  customValidators,
  invalidUntilResolved = true,
  stopOnFirstError = false,
}: Partial<{
  eventType: string;
  validatonErrorMap: ValidityMessages;
  customValidators: Validators;
  invalidUntilResolved: boolean;
  stopOnFirstError: boolean;
}> = {}): [(element: FormFieldElement) => void, () => string[]] {
  const [element, setElement] = createSignal<FormFieldElement>();
  const [validationErrorMessages, setValidationErrorMessages] = createSignal<
    string[]
  >([]);
  const [customErrorMessages, setCustomErrorMessages] = createSignal<string[]>(
    [],
  );
  const allErrorMessages = (): string[] => [
    ...validationErrorMessages(),
    ...customErrorMessages(),
  ];

  // TODO: this does not trigger for custom valiation messages! However, it
  // does trigger every time the checkValidity is called
  // TODO: `reporValidity` will apparantly only show errors to users if the
  // invalid event was not cancelled. So maybe we can use this behaviour to
  // intelligently report issues to the user.
  const onInvalid: EventListener = (event) => {
    event.preventDefault();

    const currentElement = element();

    if (!currentElement) return;

    const messages: string[] = [];
    const validity = currentElement.validity;

    if (validity.badInput && validatonErrorMap?.badInput)
      messages.push(validatonErrorMap.badInput);
    if (validity.customError && validatonErrorMap?.customError)
      messages.push(validatonErrorMap.customError);
    if (validity.patternMismatch && validatonErrorMap?.patternMismatch)
      messages.push(validatonErrorMap.patternMismatch);
    if (validity.rangeOverflow && validatonErrorMap?.rangeOverflow)
      messages.push(validatonErrorMap.rangeOverflow);
    if (validity.rangeUnderflow && validatonErrorMap?.rangeUnderflow)
      messages.push(validatonErrorMap.rangeUnderflow);
    if (validity.stepMismatch && validatonErrorMap?.stepMismatch)
      messages.push(validatonErrorMap.stepMismatch);
    if (validity.tooLong && validatonErrorMap?.tooLong)
      messages.push(validatonErrorMap.tooLong);
    if (validity.tooShort && validatonErrorMap?.tooShort)
      messages.push(validatonErrorMap.tooShort);
    if (validity.typeMismatch && validatonErrorMap?.typeMismatch)
      messages.push(validatonErrorMap.typeMismatch);
    if (validity.valueMissing && validatonErrorMap?.valueMissing)
      messages.push(validatonErrorMap.valueMissing);

    if (
      !validity.valid &&
      messages.length < 1 &&
      // If a custom error is set then the validation message will be the custom
      // error. We don't want to add that to this list of messages, because
      // it's already handled as part of the custom error messages list.
      !validity.customError &&
      currentElement.validationMessage
    ) {
      messages.push(currentElement.validationMessage);
    }

    setValidationErrorMessages(messages);
  };

  // TODO: The custom validator element should thread from the ref to the validator
  const onValidation: EventListener = (event) => {
    const currentElement = element();

    if (!currentElement) return;

    currentElement.setCustomValidity("");

    if (currentElement.checkValidity()) {
      setValidationErrorMessages([]);
    }

    if (currentElement.validity.valueMissing || !customValidators) {
      setCustomErrorMessages([]);
      return;
    }

    const errorMessages: string[] = [];

    if (!customValidators.isAsync) {
      errorMessages.push(
        ...runSyncValidations(
          currentElement,
          event,
          customValidators.functions,
          stopOnFirstError,
        ),
      );

      if (errorMessages.length > 0) {
        currentElement.setCustomValidity("Element failed custom validators");
      }

      setCustomErrorMessages(errorMessages);
    } else {
      if (invalidUntilResolved) {
        currentElement.setCustomValidity("Running custom validators");
      }

      runAsyncValidations(
        currentElement,
        event,
        customValidators.functions,
        stopOnFirstError,
      )
        .then((errors) => {
          errorMessages.push(...errors);

          errorMessages.length > 0
            ? currentElement.setCustomValidity(
                "Element failed custom validators",
              )
            : currentElement.setCustomValidity("");

          // TODO: an optional `onValidationComplete` callback could be useful
          //  to show a loading spinner. Additionally, it could return a string
          //  to be used as the custom error message.
          setCustomErrorMessages(errorMessages);
        })
        .catch(() => {});
    }
  };

  const fieldValidation = (element: FormFieldElement): void => {
    setElement(element);
    element.addEventListener(eventType, onValidation);
    element.addEventListener("invalid", onInvalid);
  };

  onCleanup(() => {
    const currentElement = element();

    if (!currentElement) return;

    currentElement.removeEventListener(eventType, onValidation);
    currentElement.removeEventListener("invalid", onInvalid);
  });

  return [fieldValidation, allErrorMessages];
}
