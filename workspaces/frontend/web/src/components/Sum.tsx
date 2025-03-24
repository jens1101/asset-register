import { numberFormatterCache } from "../common/intl.ts";
import type { SumFragment } from "../gql-client/graphql.generated.ts";
import { BigDecimal } from "effect";
import { For } from "solid-js";
import type { Component } from "solid-js";

/** Format a sum as JSX */
export const Sum: Component<{ children: SumFragment }> = (props) => {
  const formatParts = () =>
    numberFormatterCache
      .get({
        style: "currency",
        currency: props.children.currency,
      })
      .formatToParts(
        BigDecimal.format(props.children.amount) as Intl.StringNumericLiteral,
      )
      .map((part) =>
        part.type === "currency" ? <b>{part.value}</b> : part.value,
      );

  return <For each={formatParts()}>{(part) => part}</For>;
};
