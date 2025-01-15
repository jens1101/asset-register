# Asset Register

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
