/**
 * Utility type which aligns the constructor parameters of tagged errors with
 * the vanilla `Error` constructor.
 */
export interface ErrorParameters {
  message: string;
  options?: ErrorOptions;
}

/** Utility type to save the operation input to the error */
export interface ErrorInput {
  options?: {
    input?: unknown;
  };
}
