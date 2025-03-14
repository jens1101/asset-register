/** Utility interface to easily add `class` and `classList` to any component. */
export interface ClassAttributes {
  classList?:
    | {
        [k: string]: boolean | undefined;
      }
    | undefined;

  class?: string | undefined;
}

/**
 * Utility interface to add the HTML `id` attribute to any component. Note that
 * the `id` needs to be forwarded to an underlying HTML element, otherwise this
 * does nothing (similar in behaviour to `ref`).
 */
export interface IdAttribute {
  id?: string | undefined;
}

/** Common interface for an initial value. */
export interface InitialValue<T> {
  /** The initial value for this field. */
  initialValue?: T | undefined;
}
