# Changelog

## [2.0.0](https://github.com/jens1101/asset-register/compare/gql-v1.0.0...gql-v2.0.0) (2025-04-02)


### ⚠ BREAKING CHANGES

* **#72:** Removed build step from `@app/gql`
* **#60:** Replaced the previous `AssetError` with more specialized error types.
    - Created `handleResolverError` and `handleResolverResponse` helpers to shorten resolvers.
    - Added documentation.

### Features

* **#11:** Used lint-staged as pre-commit hook ([50200d5](https://github.com/jens1101/asset-register/commit/50200d59a04228a145801baf01f8f833f87a84b1))
* **#60:** Improved GQL typed errors ([c279bc2](https://github.com/jens1101/asset-register/commit/c279bc29825cc4e3ac9740a884972bcae8579498))
* **#72:** Removed build step from `@app/gql` ([5d6b21c](https://github.com/jens1101/asset-register/commit/5d6b21cf9bc274943d758e4394c96d1eebbd6ccd))
* **#84:** Removed `@app/common` ([0c37bdc](https://github.com/jens1101/asset-register/commit/0c37bdc112ee75ea8a3dd5add6ea3be5f9514448))
* **#84:** Removed `@app/common` ([05106ec](https://github.com/jens1101/asset-register/commit/05106ece02a2bb1d87162f51b5cd146ee1934703))


### Bug Fixes

* **#15:** Added GQL documentation to the server ([15471c4](https://github.com/jens1101/asset-register/commit/15471c4fbaee36d7b217b96149d44c5e2c7c3c7b))
* **#15:** Added GQL documentation to the server ([fbe1b38](https://github.com/jens1101/asset-register/commit/fbe1b38c4e782a2e6461c52139b3589c7ce3db63))
* **#24:** Refined GQL server code generation ([0bc2ad2](https://github.com/jens1101/asset-register/commit/0bc2ad208ed665d75abee5f30ebd971ce7f93382))
* **#46:** Updated dependencies ([c9fa1c8](https://github.com/jens1101/asset-register/commit/c9fa1c80ff73a49f5bfaf65230c5c1c54b844145))
* **#60:** Refactored the resolver wrapper ([6c6305d](https://github.com/jens1101/asset-register/commit/6c6305dbf4b0807cd3dd4d27e7121376aea28ea8))
* **#67:** Refactored data source initialization ([80150ed](https://github.com/jens1101/asset-register/commit/80150edf7407f53da25a887e84bd7ee412647174))
* **#67:** Refactored data source initialization ([20a0e86](https://github.com/jens1101/asset-register/commit/20a0e869ce52d1fecb7b9d9a4163e8da61f1d0fb))
* **#72:** Corrected CMDs ([6d71a37](https://github.com/jens1101/asset-register/commit/6d71a37e0f145a5665626c4017f51c35c65a2789))
* Fixed a bug with Asset creation ([0543416](https://github.com/jens1101/asset-register/commit/0543416821e1fdc3b11be66b8088dbdb4ce2bddb))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @app/scalars bumped from 1.0.0 to 2.0.0
  * devDependencies
    * @app/tsconfig bumped from 1.0.0 to 2.0.0

## 1.0.0 (2025-02-22)


### Features

* **#12:** Added sort too asset images ([6898e27](https://github.com/jens1101/asset-register/commit/6898e27952f8a7a1320520de4128784d3f3656b5))
* **#13:** Implemented `updateImage` mutation ([123d02b](https://github.com/jens1101/asset-register/commit/123d02b98a576a0e46b5f8deda3d815bbcbad38d))
* **#14,#16,#23:** Refactored GQL server internals ([40631fa](https://github.com/jens1101/asset-register/commit/40631fa1a52bcabca25b71d246315cd550ae0e61))
* **#14:** Refacrored delete asset ([9f750f8](https://github.com/jens1101/asset-register/commit/9f750f885f7eaab52be6dea4a37b43e01574bbcc))
* **#14:** Refactored create asset ([0ffee51](https://github.com/jens1101/asset-register/commit/0ffee51af5b6b03a6a89aafa080cb27df0fc72a1))
* **#14:** Refactored reading assets ([c7d63be](https://github.com/jens1101/asset-register/commit/c7d63be3747f6f4c0a81ccdae8f23b2e722da5c4))
* **#14:** Refactored update asset ([e5cdec7](https://github.com/jens1101/asset-register/commit/e5cdec706222375e05bb0578008307dc7d25c04c))
* **#14:** Removed the `Void` scalar ([513e6af](https://github.com/jens1101/asset-register/commit/513e6af855c382fa6f0f0bdcd38d93bd9ccd1e3d))
* **#21:** Added the "common" workspace ([a099690](https://github.com/jens1101/asset-register/commit/a099690e48ab82e24ba83529fb1f3e82d91700b1))
* **#21:** Implemented custom scalars ([ca2dc3e](https://github.com/jens1101/asset-register/commit/ca2dc3e1935d2e86680fed88c0f5c80e3acfa610))
* **#29:** Added asset main image to GQL server ([0be0f0c](https://github.com/jens1101/asset-register/commit/0be0f0c70b5eb343cb1088e0deba71b75436850e))
* **#39:** Added `value` to GQL Asset ([a323d2c](https://github.com/jens1101/asset-register/commit/a323d2c997bf6f19b4f9f3f053cf2741422eab4e))
* **#39:** Added value to asset entity ([e57592d](https://github.com/jens1101/asset-register/commit/e57592d801745fe075cd3dd017c8b9a404efcdf5))
* **#39:** Added value to asset GQL mutation ([3c5dca0](https://github.com/jens1101/asset-register/commit/3c5dca0fa8748ed7a9d62d4d88e4a6998586bd86))
* **#39:** Renamed `resolverWrapper` to `runAsyncWrapper` ([064fc07](https://github.com/jens1101/asset-register/commit/064fc07c7041dc258a001e0a5fd18d1726a25feb))
* **#48:** Updated API for editing assets ([d6f64d0](https://github.com/jens1101/asset-register/commit/d6f64d03f09f8c83cc4e01e5dd4de32a79542c2e))
* **#51:** Updated all non-breaking dependencies ([e78e0a9](https://github.com/jens1101/asset-register/commit/e78e0a998ab0ce5ac7dba0712489b0711d4344ec))
* **#64:** Added `NonEmptyTrimmedString` scalar ([a9f345d](https://github.com/jens1101/asset-register/commit/a9f345d300462ee70927bd36d434d73db016fbb5))
* **#64:** Added `TrimmedString` scalar ([25cce01](https://github.com/jens1101/asset-register/commit/25cce01ad534b11b3250fead0eae91639824e922))
* **#64:** Added a DB check to prevent saving an empty name ([38fbb5e](https://github.com/jens1101/asset-register/commit/38fbb5e5f4565f8718a9eafa9f0afc6db179fc28))
* **#64:** Improved checks ([b8d733e](https://github.com/jens1101/asset-register/commit/b8d733e8ee72dad5fdb179d73253dddad9a9e8fd))
* **#65:** Replaced `Decimal.js` with `BigDecimal` ([7997321](https://github.com/jens1101/asset-register/commit/79973216765253474c5dec2323987b13a4502d96))
* **#79,#80:** Refactored and moved scalars ([4a222e7](https://github.com/jens1101/asset-register/commit/4a222e71e8e147653cacab16f8ec660205bc494b))
* Added `updatedAt` to images ([46f6b12](https://github.com/jens1101/asset-register/commit/46f6b124a410feccc971cf0a0a280a440f592b84))
* Added circular dependency checks ([1068989](https://github.com/jens1101/asset-register/commit/1068989b36b6b2c4eb646d68563e1d3fdac64c15))
* Added ESLint and updated Prettier config ([ba4cd87](https://github.com/jens1101/asset-register/commit/ba4cd87df53e9efeb14039bc6f0f73e5ac7d50b7))
* Added foundations for the DB and GQL server ([5018a25](https://github.com/jens1101/asset-register/commit/5018a25c46d25680828d1a96b7470e09301b3c1a))
* Added GQL Docker dev config ([1aa5bfb](https://github.com/jens1101/asset-register/commit/1aa5bfb2ede52bd8b85559aa331be139a3520b95))
* Added GQL Docker prod config ([41571bb](https://github.com/jens1101/asset-register/commit/41571bb50470391b8b46e9bff99002f4061cabf8))
* Added GQL server ([a378613](https://github.com/jens1101/asset-register/commit/a37861392aaa937ac85c1daf0f66a575d1803344))
* Added image and proof of purchase mutations ([5c6a819](https://github.com/jens1101/asset-register/commit/5c6a8195cc1958ec6c8e35bc3ce923b76e88907b))
* Added PgAdmin to dev stack ([48a51be](https://github.com/jens1101/asset-register/commit/48a51be89d0f5780bd195331b8f0174898b015aa))
* Added type checking to `test` scripts ([79a67e0](https://github.com/jens1101/asset-register/commit/79a67e0d34c4c5d3366b508e2244cd0e9abd294b))
* Fleshed out DB design ([a139bf5](https://github.com/jens1101/asset-register/commit/a139bf5accc7ad8d4301cc5a10790e75bfaabd82))
* Go the front end to work ([70d0b0a](https://github.com/jens1101/asset-register/commit/70d0b0ab05ba049622c56975a8c229866dc696f6))
* Got asset related queries to work ([a6b8f02](https://github.com/jens1101/asset-register/commit/a6b8f02fa439044a432f2d85b241735ca3bb480d))
* Implemented `createAsset` mutation ([3ba105d](https://github.com/jens1101/asset-register/commit/3ba105dbc6413f86798782d76510a7edc0d58531))
* Implemented `deleteAsset` mutation ([4092661](https://github.com/jens1101/asset-register/commit/4092661d373807bb29927532749de5b7f834743b))
* Implemented `updateAsset` mutation ([07d0c4f](https://github.com/jens1101/asset-register/commit/07d0c4ff7e8c60c9e7d934e2792c7495120b551b))
* Initialised basic repo framework ([64cbff5](https://github.com/jens1101/asset-register/commit/64cbff573f899cc2819f2f548035616e87ec0820))
* Made asset name required ([54e4a33](https://github.com/jens1101/asset-register/commit/54e4a338528e0a9f763bed3c6eb2e18b17158979))
* Renamed "file" to "buffer" ([8b787be](https://github.com/jens1101/asset-register/commit/8b787be23f1dde164af938c76435483047255a55))
* Scaffolded TypeORM ([a2147f0](https://github.com/jens1101/asset-register/commit/a2147f0a882a54acb68b4738200ef6def4cc8323))


### Bug Fixes

* **#14:** Fixed asset creation ([a56a57c](https://github.com/jens1101/asset-register/commit/a56a57cd5397d8130c8df7dbf40d4faf32d6291b))
* **#14:** Handled defects in scopes ([22aa8a4](https://github.com/jens1101/asset-register/commit/22aa8a48cdf2d1915ef78f6568034ef8d3cd689c))
* **#14:** Removed unused `ImageError` GQL type ([f3885d8](https://github.com/jens1101/asset-register/commit/f3885d8184da2453a5dd2c5b094882e450536b35))
* **#16:** Refactored Image and Document field resolvers ([99d6641](https://github.com/jens1101/asset-register/commit/99d6641bde7c4400b01734a09359b289f4b58caa))
* **#30:** Corrected typo ([d754312](https://github.com/jens1101/asset-register/commit/d75431282ca877b66ad8753e7499a4fd53f13d4a))
* **#30:** Fixed updating image files ([e818c6e](https://github.com/jens1101/asset-register/commit/e818c6e5c2f934986b19368db3c873aff44ff05b))
* **#39:** Fixed asset creation ([bac54cf](https://github.com/jens1101/asset-register/commit/bac54cfec50ce886f5ea90f9cf44534e833ad9dd))
* **#39:** Refactored how currency scalars work ([1640591](https://github.com/jens1101/asset-register/commit/16405910e329210012f94f622a5fc720aeea43fa))
* **#57:** Fixed update timestamps ([29e6428](https://github.com/jens1101/asset-register/commit/29e64289f951d599701e35c7c166db8272564eae))
* **#64:** Fixed edge case where image order is incorrect ([70f3c29](https://github.com/jens1101/asset-register/commit/70f3c293e395f205af50bd2f440e13ae7811f806))
* Added missing prettierignore files ([61c10fc](https://github.com/jens1101/asset-register/commit/61c10fc736825e50c98511146973a70cddd99f37))
* Fixed edge case when adding an asset image ([14d808d](https://github.com/jens1101/asset-register/commit/14d808dcbde66430f0b3722010e9d3b69f815c30))
* Fixed ESLint again ([bd2d2c6](https://github.com/jens1101/asset-register/commit/bd2d2c64912546d7be615232966b2531052e1616))
* Hooked up the front end to GQL ([9aa63b5](https://github.com/jens1101/asset-register/commit/9aa63b54998b08f6380c448324775a0cce8c4131))
* Recreated initial migration ([97e94e0](https://github.com/jens1101/asset-register/commit/97e94e006d27ac3bfc390922816d9f1de3dabd38))
* Renamed "remove" to "delete" ([35167fc](https://github.com/jens1101/asset-register/commit/35167fcd8a84be443ab82b0814fe0b3e2b0ef1b7))
* Renamed packages ([265ea78](https://github.com/jens1101/asset-register/commit/265ea781907997654e93783f7ecf584ed27299ee))
* Updated eslint config for existing workspaces ([6faaee7](https://github.com/jens1101/asset-register/commit/6faaee7046e62ae6e0210ecb964940e1f08a5c87))
* Updated ESLint rules for GQL service ([78989d0](https://github.com/jens1101/asset-register/commit/78989d00dcb6bb87df39aa61224d5de1678712c5))
* Updated formatter ([6ff2232](https://github.com/jens1101/asset-register/commit/6ff22325db3385c96de305c02218be34676f24fe))
* Wrapped server creation in a function ([67d02f8](https://github.com/jens1101/asset-register/commit/67d02f830e9c6b83ebaf14c1734082dbe4f066f7))
