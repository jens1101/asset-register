/** Utility interface to easily add `class` and `classList` to any component. */
export interface ClassAttributes {
  classList?:
    | {
        [k: string]: boolean | undefined;
      }
    | undefined;

  class?: string | undefined;
}
