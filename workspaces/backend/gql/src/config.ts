import type { Duration } from "effect";

/** The number of times the data source should retry initialising */
export const DATA_SOURCE_INIT_RETRIES: number = 3;

/** The starting duration of the backoff for data source initialisation */
export const DATA_SOURCE_INIT_DURATION: Duration.DurationInput = "1 second";
