import { Array, Option, pipe } from "effect";

type Regex_az =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";
type Regez_AZ =
  | "A"
  | "B"
  | "C"
  | "D"
  | "E"
  | "F"
  | "G"
  | "H"
  | "I"
  | "J"
  | "K"
  | "L"
  | "M"
  | "N"
  | "O"
  | "P"
  | "Q"
  | "R"
  | "S"
  | "T"
  | "U"
  | "V"
  | "W"
  | "X"
  | "Y"
  | "Z";
type Regex_09 = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
type Regex_w = Regex_az | Regez_AZ | Regex_09 | "_";
type ParamChar = Regex_w | "-";

// Emulates regex `+`
type RegexMatchPlus<
  CharPattern extends string,
  T extends string,
> = T extends `${infer First}${infer Rest}`
  ? First extends CharPattern
    ? RegexMatchPlus<CharPattern, Rest> extends never
      ? First
      : `${First}${RegexMatchPlus<CharPattern, Rest>}`
    : never
  : never;

// Recursive helper for finding path parameters in the absence of wildcards
type _PathParam<Path extends string> =
  // split path into individual path segments
  Path extends `${infer L}/${infer R}`
    ? _PathParam<L> | _PathParam<R>
    : // find params after `:`
      Path extends `:${infer Param}`
      ? Param extends `${infer Optional}?${string}`
        ? RegexMatchPlus<ParamChar, Optional>
        : RegexMatchPlus<ParamChar, Param>
      : // otherwise, there aren't any params present
        never;

type PathParam<Path extends string> =
  // check if path is just a wildcard
  Path extends "*" | "/*"
    ? "*"
    : // look for wildcard at the end of the path
      Path extends `${infer Rest}/*`
      ? "*" | _PathParam<Rest>
      : // look for params in the absence of wildcards
        _PathParam<Path>;

type Params<Path extends string> = {
  [key in PathParam<Path>]: string | null;
};

const stringify = (p: string | null) =>
  pipe(
    p,
    Option.fromNullable,
    Option.match({
      onSome: (value) => value,
      onNone: () => "",
    }),
  );

/**
 * Returns a path with params interpolated.
 * @throws {Error} If an error was encountered during the
 * interpolation process
 */
export function generatePath<Path extends string>(
  path: Path,
  params: Params<Path> = {} as Params<Path>,
): string {
  if (path.endsWith("*") && path !== "*" && !path.endsWith("/*")) {
    throw new Error(
      "The `*` character must always follow a `/` in the path pattern.",
    );
  }

  // ensure `/` is added at the beginning if the path is absolute
  const prefix = path.startsWith("/") ? "/" : "";

  return pipe(
    path.split(/\/+/),
    (segments) =>
      Array.map(segments, (segment, index) => {
        const isLastSegment = index === segments.length - 1;

        // Only apply the splat if it's the last segment
        if (isLastSegment && segment === "*") {
          const star = "*" as PathParam<Path>;
          return stringify(params[star]);
        }

        const keyMatch = segment.match(/^:([\w-]+)(\??)$/);
        if (keyMatch) {
          const [, key, optional] = keyMatch;
          const param = params[key as PathParam<Path>];

          if (optional !== "?" && param == null) {
            throw new Error(`Missing value for "${key}"`);
          }

          return stringify(param);
        }

        // Remove any optional markers from optional static segments
        return segment.replace(/\?$/g, "");
      }),
    Array.filter((segment) => !!segment),
    (segments) => prefix + segments.join("/"),
  );
}
