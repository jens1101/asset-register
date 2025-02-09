/** The locale for this app */
export const LOCALE = new Intl.Locale(window.navigator.language);

/** The default currency for the app */
export const DEFAULT_CURRENCY = "ZAR";

/** The default collator for the app */
export const DEFAULT_COLLATOR = new Intl.Collator(LOCALE);
