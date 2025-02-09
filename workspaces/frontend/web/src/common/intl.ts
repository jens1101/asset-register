import { DEFAULT_COLLATOR, LOCALE } from "./config.js";
import { Data, MutableHashMap, Option } from "effect";

/** Generic class to cache `Intl` related instances */
class IntlCache<Options extends Record<never, never>, Return> {
  #cache = MutableHashMap.empty<Options, Return>();
  #builder: (options: Options) => Return;

  constructor(builder: (options: Options) => Return) {
    this.#builder = builder;
  }

  get(options: Options): Return {
    const parsedOptions = Data.struct(options);

    return MutableHashMap.get(this.#cache, parsedOptions).pipe(
      Option.match({
        onSome: (formatter) => formatter,
        onNone: () => {
          const formatter = this.#builder(parsedOptions);
          MutableHashMap.set(this.#cache, parsedOptions, formatter);
          return formatter;
        },
      }),
    );
  }
}

/** Cache for date-time formatters */
const dateTimeFormatterCache = new IntlCache<
  Intl.DateTimeFormatOptions,
  Intl.DateTimeFormat
>((options) => new Intl.DateTimeFormat(LOCALE, options));

/** Cache for number formatters */
export const numberFormatterCache = new IntlCache<
  Intl.NumberFormatOptions,
  Intl.NumberFormat
>((options) => new Intl.NumberFormat(LOCALE, options));

/** Cache for display name formatters */
const displayNamesCache = new IntlCache<
  Intl.DisplayNamesOptions,
  Intl.DisplayNames
>((options) => new Intl.DisplayNames(LOCALE, options));

/**
 * The default formatter that should be used to format date-time values for
 * display
 */
export const defaultDateTimeFormatter = dateTimeFormatterCache.get({
  timeStyle: "medium",
  dateStyle: "medium",
});

/** All available currencies sorted by display name. */
export const availableCurrencies = Intl.supportedValuesOf("currency")
  .map((code) => ({
    code,
    display: displayNamesCache.get({ type: "currency" }).of(code) ?? code,
  }))
  .sort((a, b) => DEFAULT_COLLATOR.compare(a.display, b.display));
