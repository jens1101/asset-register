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
 * Utility interface to add the HTML `id` attribute to any component.
 *
 * _Note_ that the attribute needs to be forwarded to an underlying HTML
 * element, otherwise this does nothing.
 */
export interface IdAttribute {
  id?: string | undefined;
}

/**
 * Utility interface to add the HTML `inert` attribute to any component.
 *
 * _Note_ that the attribute needs to be forwarded to an underlying HTML
 * element, otherwise this does nothing.
 */
export interface InertAttribute {
  inert?: boolean;
}

/** Common interface for an initial value. */
export interface InitialValue<T> {
  /** The initial value for this field. */
  initialValue?: T | undefined;
}
