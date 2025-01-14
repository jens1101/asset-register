import type { InitialValue } from "../common/types.js";
import { setInputValue } from "../common/utils.js";
import { type Accessor, createSignal, onCleanup } from "solid-js";

/**
 * The minimum interface required for the field validation to work. This is
 * well-known constraint validation functionality.
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Constraint_validation}
 */
interface FormFieldElement extends Element {
  setCustomValidity(error: string): void;
  checkValidity(): boolean;
  reportValidity(): boolean;
  readonly validationMessage: string;
  validity: ValidityState;
  value: string;
}

/**
 * Callback after custom validations have completed.
 * @param errorMessages All error messages that have been picked up, both
 * native and custom.
 */
type ValidationComplete =
  | ((errorMessages: string[]) => string)
  | ((errorMessages: string[]) => void);

/**
 * Map from validity state to custom messages that will be displayed to the
 * user.
 */
type ValidityMessages = Partial<
  Record<keyof Omit<ValidityState, "valid">, string>
>;

interface AsyncValidator<E extends FormFieldElement> {
  (element: E, event: Event): Promise<string | undefined>;
}

interface SyncValidator<E extends FormFieldElement> {
  (element: E, event: Event): string | undefined;
}

type Validators<E extends FormFieldElement> =
  | {
      isAsync: true;
      functions: (AsyncValidator<E> | SyncValidator<E>)[];
    }
  | {
      isAsync: false;
      functions: SyncValidator<E>[];
    };

function runSyncValidations<E extends FormFieldElement>(
  element: E,
  event: Event,
  validators: SyncValidator<E>[],
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

async function runAsyncValidations<E extends FormFieldElement>(
  element: E,
  event: Event,
  validators: (SyncValidator<E> | AsyncValidator<E>)[],
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

/**
 * Hook to add enhanced validation functionalities to a form field:
 * - Custom sync and async validators that intergrate with the native
 *   validation.
 * - Map native validation errors to custom error messages.
 * - Specify the event that triggers validation checking.
 * - Using the native functionality for error reporting or writing your own.
 * - Reporting only one error at a time, therefore stopping validation after
 *   the first failure.
 * - Running custom code after validations completed.
 *
 * The form field type can be specified as a type parameter. This will allow for
 * the correct element type to be threaded to all the callback functions.
 *
 * @example
 * ```
 * const {
 *   validation: nameValidation,
 *   errors: nameErrors,
 *   touched: nameTouched,
 * } =  useFormField<HTMLInputElement>({
 *   validationEventType: "input",
 *   validatonErrorMap: {
 *     valueMissing: "Name is required",
 *     patternMismatch: "Name may not contain numbers",
 *   },
 * });
 * ```
 */
export function useFormField<E extends FormFieldElement>({
  validationEventType = "change",
  touchedEventType = "change",
  validatonErrorMap,
  customValidators,
  invalidUntilResolved = true,
  stopOnFirstError = false,
  useDefaultErrorReporting = false,
  onValidationComplete,
  initialValue,
}: InitialValue<string | File | File[]> &
  Partial<{
    /** Which event will trigger validations */
    validationEventType: string;
    /** Which event will cause the form field to be marked as "touched" */
    touchedEventType: string;
    /** Map from validity state to display message */
    validatonErrorMap: ValidityMessages;
    /**
     * All custom validators to be run on validation. Validators are run in
     * sequential order.
     */
    customValidators: Validators<E>;
    /**
     * If true, will set the form field to an invalid state while async
     * validations are run. Has no effect if only syncronous functions are used.
     */
    invalidUntilResolved: boolean;
    /**
     * If true, will stop running validators upon encountering the first
     * validation error. This also takes into account native validations.
     */
    stopOnFirstError: boolean;
    /**
     * If false, will prevent the native UI from showing up on validation errors.
     * When setting this to true also consider using the
     * {@link onValidationComplete} callback to map the array of errors to a
     * custom string.
     */
    useDefaultErrorReporting: boolean;
    /**
     * Run a custom function after validation checking has completed. This also
     * allows for mapping the errors to a custom error message by returning a
     * string. This is typically not necessary unless you use
     * {@link useDefaultErrorReporting}
     */
    onValidationComplete: ValidationComplete;
  }> = {}): {
  /**
   * Directive or ref function that adds the necessary listeners to enable the
   * enhanced validation functionalities
   * @param element The form field element
   */
  validation: (element: E) => void;
  /** Accessor to all validation error messages */
  errors: Accessor<string[]>;
  /** Accessor to determine if the field has been touched by the user at all */
  touched: Accessor<boolean>;
  /** Accessor to determine if the field holds no value */
  empty: Accessor<boolean>;
  /** When called, clears the value of this input field. */
  clear: () => void;
} {
  const [element, setElement] = createSignal<E>();
  const [touched, setTouched] = createSignal<boolean>(false);
  const [empty, setEmpty] = createSignal<boolean>(true);
  const [nativeErrorMessages, setNativeErrorMessages] = createSignal<string[]>(
    [],
  );
  const [customErrorMessages, setCustomErrorMessages] = createSignal<string[]>(
    [],
  );
  const allErrorMessages: Accessor<string[]> = () => [
    ...nativeErrorMessages(),
    ...customErrorMessages(),
  ];

  /**
   * Event lister for the "invalid" event on the form field element. This is
   * used to map native validation errors to custom disply messages.
   *
   * **Note** that if no error messages were mapped, then the native validation
   * message will be used.
   * @param event The "invalid" event that triggered this listener.
   */
  const onInvalid: EventListener = (event) => {
    if (!useDefaultErrorReporting) event.preventDefault();

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

    setNativeErrorMessages(messages);
  };

  /**
   * Helper function to run the `onValidationComplete` callback and set the
   * custom validity message on the element.
   */
  const runValidationComplete = () => {
    const currentElement = element();

    if (!currentElement) return;

    currentElement.setCustomValidity(
      onValidationComplete?.(allErrorMessages()) ||
        (customErrorMessages().length > 0
          ? "Element failed custom validators"
          : ""),
    );
  };

  /**
   * Event listener to run custom validations.
   *
   * **Note** that no custom validators will be run in the following cases:
   * - No custom validators were specified.
   * - The element has the "required" attribute and no value was entered.
   * - {@link stopOnFirstError} is true and native validation errors occurred.
   * @param event The event, as specified by {@link validationEventType}, that
   * triggerd this listener
   */
  const onValidation: EventListener = (event) => {
    const currentElement = element();

    if (!currentElement) return;

    currentElement.setCustomValidity("");

    if (currentElement.checkValidity()) {
      setNativeErrorMessages([]);
    }

    if (
      currentElement.validity.valueMissing ||
      !customValidators ||
      (!currentElement.validity.valid && stopOnFirstError)
    ) {
      setCustomErrorMessages([]);
      runValidationComplete();
      return;
    }

    if (!customValidators.isAsync) {
      setCustomErrorMessages(
        runSyncValidations(
          currentElement,
          event,
          customValidators.functions,
          stopOnFirstError,
        ),
      );

      runValidationComplete();
    } else {
      if (invalidUntilResolved) {
        currentElement.setCustomValidity("Running custom validators");
      }

      // TODO: how to cancel stale async validations?
      // TODO: Is this the best way to set validations? Maybe we should make them more controlled?
      void (async () => {
        setCustomErrorMessages(
          await runAsyncValidations(
            currentElement,
            event,
            customValidators.functions,
            stopOnFirstError,
          ),
        );

        runValidationComplete();
      })();
    }
  };

  /**
   * Event listener to mark the form field as "touched".
   * @param event The event, as specified by {@link touchedEventType}, that
   * triggerd this listener
   */
  const onTouched: EventListener = () => {
    setTouched(true);
  };

  /**
   * Event listener to mark the form field as "empty".
   * @param event The change event
   */
  const onEmpty: EventListener = () => {
    setEmpty(!element()?.value);
  };

  /** Clears the value of the form field along with any custom validatons. */
  const clear = (): void => {
    const currentElement = element();
    if (!currentElement) return;

    currentElement.value = "";
    setEmpty(true);

    onValidation(new Event("clear"));
  };

  /**
   * Directive or ref function that adds the necessary listeners to enable the
   * enhanced validation functionalities
   * @param formFieldElement The form field element to which the listeners will
   * be added to.
   * @throws {@link Error}
   * Thrown if this hook is already bound to a different form field element.
   * If you want add another form field then you need to instantiate another
   * hook instance.
   */
  const fieldValidation = (formFieldElement: E): void => {
    if (element()) {
      throw new Error(
        "Only one form field can be associated per hook instance",
      );
    }

    setElement(() => formFieldElement);

    if (initialValue) {
      setInputValue(formFieldElement, initialValue);
      setEmpty(!initialValue);
    }

    formFieldElement.addEventListener(validationEventType, onValidation);
    formFieldElement.addEventListener("invalid", onInvalid);
    formFieldElement.addEventListener(touchedEventType, onTouched);
    formFieldElement.addEventListener("change", onEmpty);

    // Validations are immediately run in order to prevent fields from initially
    // being marked as valid and then beecoming invalid upon submission.
    onValidation(new Event("initialised"));
  };

  onCleanup(() => {
    const currentElement = element();

    if (!currentElement) return;

    currentElement.removeEventListener(validationEventType, onValidation);
    currentElement.removeEventListener("invalid", onInvalid);
    currentElement.removeEventListener(touchedEventType, onTouched);
    currentElement.removeEventListener("change", onEmpty);
  });

  return {
    validation: fieldValidation,
    errors: allErrorMessages,
    touched,
    empty,
    clear,
  };
}
