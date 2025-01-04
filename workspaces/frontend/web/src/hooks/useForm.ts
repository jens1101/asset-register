// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { useFormField } from "./useFormField.js";
import { type Accessor, createSignal, onCleanup } from "solid-js";

/**
 * Hook to enhance the functionality of form submission:
 * - Prevents the default submission behaviour.
 * - Prevents the deafult validation behaviour. Instead, this runs
 *   `reportValidity` on submission to check form validity.
 * - Callbacks for submission and invalid events.
 *
 * This is intended to work in conjunction with {@link useFormField}.
 *
 * **Note** that {@link useFormField} custom validations are _not_ run on
 * submission. This is by design since they might be computationally expensive.
 * The `required` attribute should be used to prevnt users from submitting an
 * empty form.
 */
export function useForm({
  onSubmit,
  onInvalid,
  preventDefault = true,
}: Partial<{
  /**
   * Callback when the form passed validation and can be submitted.
   * @param formData The from data taken from the form.
   * @param event The submission event
   */
  onSubmit: (formData: FormData, event: Event) => unknown;
  /**
   * Callback when the form failed validation.
   */
  onInvalid: EventListener;
  /** If true, will prevent the default form submission behaviour. */
  preventDefault: boolean;
}> = {}): {
  /**
   * Directive or ref function that adds the necessary listeners to enable the
   * enhanced form submission functionality.
   * @param formElement The form element
   */
  submit: (formElement: HTMLFormElement) => void;
  /**
   * Accessor to determine if the form has at any time failed submission due to
   * failed validations.
   */
  previouslyFailedSubmission: Accessor<boolean>;
} {
  const [element, setElement] = createSignal<HTMLFormElement>();
  const [previouslyFailedSubmission, setPreviouslyFailedSubmission] =
    createSignal<boolean>(false);

  /**
   * Event listener for the "submit" event on the form.
   * @param event The submit event.
   */
  const onFormSubmit: EventListener = (event) => {
    if (preventDefault) event.preventDefault();

    const currentElement = element();

    if (!currentElement) return;

    // At this point it is assumed that each form field had its validations
    // run and set. So all we need to do is report those validations to the
    // user (if applicable).
    // The user can submit the form without filling in all the fields. This
    // means that the custom validators would not have been run. This is by
    // design. To force the user to enter a value the `required` attribute
    // should be used.
    if (currentElement.reportValidity()) {
      onSubmit?.(new FormData(currentElement), event);
    } else {
      setPreviouslyFailedSubmission(true);
      onInvalid?.(event);
    }
  };

  /**
   * Directive or ref function that adds the necessary listeners to enable the
   * enhanced form submission functionality.
   * @param formElement The form element to which the listeners will be added
   * to.
   */
  const submit = (formElement: HTMLFormElement): void => {
    if (element()) {
      throw new Error("Only one form can be associated per hook instance");
    }

    setElement(formElement);

    formElement.noValidate = true;
    formElement.addEventListener("submit", onFormSubmit);
  };

  onCleanup(() => {
    const currentElement = element();

    if (!currentElement) return;

    currentElement.removeEventListener("submit", onFormSubmit);
  });

  return {
    submit,
    previouslyFailedSubmission,
  };
}
