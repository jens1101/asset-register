import { useForm } from "../hooks/useForm.js";
import { useFormField } from "../hooks/useFormField.js";
import { type Component, createUniqueId } from "solid-js";

export const Asset: Component = () => {
  // const [assetInput, setAssetInput] = createSignal<CreateAssetInput>();
  const nameId = createUniqueId();
  const formSubmit = useForm({
    onSubmit: (formData: FormData) => {
      // TODO: use effect schema to transform and validate this data
      console.log(formData);
    },
  });

  const [nameValidation, nameErrors] = useFormField({
    validatonErrorMap: {
      patternMismatch: "Name may not contain numbers",
    },
    eventType: "input",
    customValidators: {
      isAsync: false,
      functions: [
        (element) =>
          element.value.length <= 3 ? "Length must be more than 3" : "",
      ],
    },
  });

  // const [asset] = createResource(
  //   assetInput(),
  //   async (data: CreateAssetInput) => {
  //     const { data: result } = await client.mutation<
  //       CreateAssetMutation,
  //       CreateAssetMutationVariables
  //     >(CreateAssetDocument, {
  //       data,
  //     });

  //     return result?.createAsset;
  //   },
  // );

  return (
    <form ref={formSubmit}>
      <div class="mb-3">
        <label for={nameId} class={"form-label"}>
          Asset name
        </label>

        <input
          ref={nameValidation}
          id={nameId}
          class={"form-control"}
          name={"name"}
          required
          pattern="\D+"
        />
      </div>

      <output class={"d-block"}>
        <pre>
          {nameErrors()
            .map((x) => `- ${x}`)
            .join("\n")}
        </pre>
      </output>

      <button type={"submit"} class={"btn btn-primary"}>
        Submit
      </button>
    </form>
  );
};
