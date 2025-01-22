# Asset Register

## Errors and Defects

Errors and defects form part of the
[Effect way](https://effect.website/docs/error-management/two-error-types/) of
thinking. Effect's recommended patterns must be followed.

"Errors" are expected exceptions that form part of the business rules of the
app. For example, excluding a required field. These errors should be returned
as part of the GQL response using the
["errors as data" pattern](https://www.apollographql.com/docs/graphos/schema-design/guides/errors-as-data-explained).

"Defects" are unexpected exceptions. For example: a DB connection issue. These
should be returned as part of the
[GQL errors](https://spec.graphql.org/October2021/#sec-Errors).

"Errors as data" isn't exclusive to the top-level data. A sub-field can also
return errors as data, if it makes sense.

If you are making use of
[field resolvers](https://medium.com/paypal-tech/graphql-resolvers-best-practices-cd36fdbcef55)
then you might think that each field can have an error associated with it, which
would be very tedius to write and consume. However, this isn't correct. The
top-level resolver is expected to validate the input so that field resolvers are
not expected to error. This means that the top-level resolver can return an
error as data (e.g.: asset not found), but the field resovers generally only
need to return their data and throw for defects.

## Naming Convention

- For data-related operations the "CRUD" acronym should firstly be used as a
  guideline for naming the prefix. For example: `createAsset`, `readAsset`,
  `updateAsset`, and `deleteAsset`.
- An operation that can either create or update a resource should use the "save"
  prefix. For example: `saveAsset`.
- An operation that changes data, but that cannot be expressed using the
  aforementioned naming conventions, then the word "mutate" should be used as a
  prefix. For example: a function that calls either `updateAsset` or
  `deleteAsset`, based on some condition, should be called `mutateAsset`.
- The smurf naming convention should be avoided. For example:

  ```typescript
  // Wrong
  enum Error {
    DeleteError,
    UpdateError,
  }

  // Wrong
  enum Error {
    ErrorDelete,
    ErrorUpdate,
  }

  // Correct. The name of the enum eliminates ambiguity and no repeated naming
  // is necessary for its members.
  enum Error {
    Delete,
    Update,
  }
  ```
