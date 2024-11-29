import type { Maybe } from "@app/common";
import { onCleanup } from "solid-js";

export function useForm({
  onSubmit,
  onInvalid,
  preventDefault = true,
}: Partial<{
  onSubmit: (formData: FormData, event: Event) => void;
  onInvalid: EventListener;
  preventDefault: boolean;
}> = {}) {
  let element: Maybe<HTMLFormElement>;
  let listener: Maybe<EventListener>;

  const submit = (formElement: HTMLFormElement): void => {
    if (element || listener) {
      throw new Error("Only one form can be associated per hook instance");
    }

    element = formElement;
    listener = (event) => {
      if (preventDefault) event.preventDefault();

      // At this point it is assumed that each form field had its validations
      // run and set. So all we need to do is report those validations to the
      // user (if applicable).
      // The user can submit the form without filling in all the fields. This
      // means that the custom validators would not have been run. This is by
      // design. To force the user to enter a value the `required` attribute
      // should be used.
      // TODO: If I just submit the form without anything entered, then nothing
      //  gets propagated to the `onValidationComplete` callback.
      formElement.reportValidity()
        ? onSubmit?.(new FormData(formElement), event)
        : onInvalid?.(event);
    };

    element.noValidate = true;
    formElement.addEventListener("submit", listener);
  };

  onCleanup(() => {
    if (element && listener) element.removeEventListener("submit", listener);
  });

  return submit;
}
