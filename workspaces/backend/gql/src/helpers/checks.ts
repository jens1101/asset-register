import type { EntitySchemaCheckOptions } from "typeorm/entity-schema/EntitySchemaCheckOptions.js";

export const isUpperCase = (
  columnName: string,
): Required<EntitySchemaCheckOptions> => ({
  name: "isUpperCase",
  expression: `UPPER("${columnName}") = "${columnName}"`,
});

export const isGreaterThanOrEqualTo = (
  columnName: string,
  value: string,
): Required<EntitySchemaCheckOptions> => ({
  name: "isGreaterThanOrEqualTo",
  expression: `"${columnName}" >= ${value}`,
});

export const isTrimmed = (
  columnName: string,
): Required<EntitySchemaCheckOptions> => ({
  name: "isTrimmed",
  expression: `TRIM("${columnName}") = "${columnName}"`,
});

export const isNonEmpty = (
  columnName: string,
): Required<EntitySchemaCheckOptions> => ({
  name: "isNonEmpty",
  expression: `"${columnName}" != ''`,
});
