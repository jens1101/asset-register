# Changelog

## [1.1.0](https://github.com/jens1101/asset-register/compare/web-v1.0.0...web-v1.1.0) (2025-04-02)


### Features

* **#103:** Added error handling on the home screen ([3396a4a](https://github.com/jens1101/asset-register/commit/3396a4a97b110b9728936ec494daf26e089febb7))
* **#103:** Added error handling to edit asset ([6996a41](https://github.com/jens1101/asset-register/commit/6996a4175fef10c1e2c26cd19639a2560895458c))
* **#103:** Added error handling to view asset ([5f3e2c4](https://github.com/jens1101/asset-register/commit/5f3e2c43ec9dec94d45273cb8c6d58b41d122e07))
* **#103:** Implemented error alert component ([0d51ab0](https://github.com/jens1101/asset-register/commit/0d51ab0e46d6d562ff3b41fd47e69d29cda34e0a))
* **#11:** Used lint-staged as pre-commit hook ([50200d5](https://github.com/jens1101/asset-register/commit/50200d59a04228a145801baf01f8f833f87a84b1))
* **#24:** Added basic graphcache setup ([0ecbfcf](https://github.com/jens1101/asset-register/commit/0ecbfcfdee115f4aa89b551a82358b164c646dbd))
* **#24:** Updated cache on asset deletion ([f32a5c4](https://github.com/jens1101/asset-register/commit/f32a5c4f57b5526f18f048043efd562d0eced1fc))
* **#46:** Updated document title ([92361cd](https://github.com/jens1101/asset-register/commit/92361cd6a14fbb2b9b2b949924b3cb2cfd789c2f))
* **#54:** Standardised paths in app ([8f1a718](https://github.com/jens1101/asset-register/commit/8f1a7189d4f122ca54ca3bacee9398ea8f748fc4))
* **#54:** Standardised paths in app ([4a07712](https://github.com/jens1101/asset-register/commit/4a07712aa18f5e884a8ac3157fd77c1829ed8349))
* **#55:** Added `InertAttribute` interface ([287c62a](https://github.com/jens1101/asset-register/commit/287c62af83f3cf668f856e2f44dafb2079138730))
* **#55:** Added `Spinner` component ([4775432](https://github.com/jens1101/asset-register/commit/47754325b249f5f84f29af419d99cd30c9a3a44d))
* **#55:** Added a loading spinner when editing ([a9ecd3a](https://github.com/jens1101/asset-register/commit/a9ecd3a0dfcb81e562943966c4cdfe906e8106bc))
* **#55:** Added basic spinner to home page ([02e6d96](https://github.com/jens1101/asset-register/commit/02e6d9673caa15287d02f6d56207991bdfb0bb1f))
* **#55:** Added default suspense component ([01c2190](https://github.com/jens1101/asset-register/commit/01c2190a54a6f2f96f20635762a267395df48ef0))
* **#55:** Added loading spinner to asset delete ([1ab232a](https://github.com/jens1101/asset-register/commit/1ab232a2fe32bea417e5ccdbef2b1cf9f9f8b2aa))
* **#55:** Added spinner on create asset submit ([b0d34d9](https://github.com/jens1101/asset-register/commit/b0d34d9d2867985b879c85bcd313786f9be6cccb))
* **#60:** Migrated rendering a sum to a component ([ea9391d](https://github.com/jens1101/asset-register/commit/ea9391d6d361e689a4ac854ccd5dd7e811d2c5ba))
* **#60:** Refactored asset form submission ([0e312ba](https://github.com/jens1101/asset-register/commit/0e312bac3f0de8d68626bcdcf42d51485181d8c6))
* **#60:** Refactored GQL fetching and error handling ([337e6db](https://github.com/jens1101/asset-register/commit/337e6dbc59180de91455e1d34f8d2459056dfba3))
* **#60:** Updated GQL client fragments ([e4027b2](https://github.com/jens1101/asset-register/commit/e4027b2e00fbc68ef63a076379a33326e9950285))
* **#72:** Fixed front end errors ([e755b3d](https://github.com/jens1101/asset-register/commit/e755b3dc96e215cd5b52faa67ed5284238db3d8f))
* **#84:** Removed `@app/common` ([0c37bdc](https://github.com/jens1101/asset-register/commit/0c37bdc112ee75ea8a3dd5add6ea3be5f9514448))
* **#84:** Removed `@app/common` ([05106ec](https://github.com/jens1101/asset-register/commit/05106ece02a2bb1d87162f51b5cd146ee1934703))


### Bug Fixes

* **#103:** Used structured logger ([93a0638](https://github.com/jens1101/asset-register/commit/93a06385f4188ed851ee8c89846730e605b50a25))
* **#24:** Refined GQL client code generation ([186d22e](https://github.com/jens1101/asset-register/commit/186d22e55758d3148653911897a5fb30397360ef))
* **#46:** Updated dependencies ([c9fa1c8](https://github.com/jens1101/asset-register/commit/c9fa1c80ff73a49f5bfaf65230c5c1c54b844145))
* **#60:** Made app bootsrapping more effectful ([1a10d74](https://github.com/jens1101/asset-register/commit/1a10d7464d8b3a47758a0b259fcb28dd9fe986b7))
* **#72:** Corrected CMDs ([6d71a37](https://github.com/jens1101/asset-register/commit/6d71a37e0f145a5665626c4017f51c35c65a2789))
* **#72:** Removed build step from Dockerfile ([6b0233e](https://github.com/jens1101/asset-register/commit/6b0233e648ffa9402a8028fd8ed37267ed6511aa))
* Used `Intl` to format file sizes ([48991ad](https://github.com/jens1101/asset-register/commit/48991ad3572c324617a13af85c9242362fc46067))


### Dependencies

* The following workspace dependencies were updated
  * dependencies
    * @app/scalars bumped from 1.0.0 to 2.0.0
    * @app/walker bumped from 1.0.0 to 2.0.0
  * devDependencies
    * @app/tsconfig bumped from 1.0.0 to 2.0.0

## 1.0.0 (2025-02-22)


### Features

* **#14,#16,#23:** Refactored GQL server internals ([40631fa](https://github.com/jens1101/asset-register/commit/40631fa1a52bcabca25b71d246315cd550ae0e61))
* **#21:** Added tagged scalar parsing to the client ([fd5246d](https://github.com/jens1101/asset-register/commit/fd5246dd4cbd353d8b6e6175410d3e325ecda607))
* **#29:** Consumed asset main image in the FE ([7dc76d3](https://github.com/jens1101/asset-register/commit/7dc76d3e0644517bfddaa57e9b3eb61906551fc3))
* **#30:** Added ability to add asset images ([33b08f7](https://github.com/jens1101/asset-register/commit/33b08f7675ea1fd252573bfbbaaf10364ae45249))
* **#30:** Added ability to delete asset images ([2ed20d6](https://github.com/jens1101/asset-register/commit/2ed20d62bfa6b81a0d4d7d9554f575cde376c8f4))
* **#30:** Added ability to delete assets ([dc3d262](https://github.com/jens1101/asset-register/commit/dc3d262ea3d833aa8fb28744e44118df7c47d57c))
* **#30:** Added ability to update asset images ([73e52bf](https://github.com/jens1101/asset-register/commit/73e52bfdad295ecc6a6cc6c56f9ac48bd08453ea))
* **#30:** Added asset list and asset view ([0be1063](https://github.com/jens1101/asset-register/commit/0be1063eba0985483d1d4548e2786552b05f2a6b))
* **#30:** Added asset options dropdown ([c4b40b2](https://github.com/jens1101/asset-register/commit/c4b40b23887ca8083b60a21b5af20dd99955a4dd))
* **#30:** Added images form field ([71af14a](https://github.com/jens1101/asset-register/commit/71af14ad63bff459351ff8fdbd18dff9366fd100))
* **#30:** Added main nav to the app ([b908d44](https://github.com/jens1101/asset-register/commit/b908d44ffbb250cff90a393836d41ee5ecfc94c5))
* **#30:** Added modal functionality ([6cdc607](https://github.com/jens1101/asset-register/commit/6cdc607e49d43c7dd4f7c6c357349c8e2e743c0e))
* **#30:** Added schemas to decode create asset form ([fea79f1](https://github.com/jens1101/asset-register/commit/fea79f155fd36917bc0963ecb8fc121d201a1de6))
* **#30:** Added the ability to edit assets ([1e214be](https://github.com/jens1101/asset-register/commit/1e214be4ad315fb15e62f640df5020c769093c5f))
* **#30:** Created and propagated the `assetListItem` fragment ([5012e71](https://github.com/jens1101/asset-register/commit/5012e715f1063299ffcf656a815c2a51a665e519))
* **#30:** Implemented basic form functionality ([39d1928](https://github.com/jens1101/asset-register/commit/39d1928fdf826a97ddfc7abf6d326aef5e8dfec9))
* **#30:** Implemented create asset submission ([9bda613](https://github.com/jens1101/asset-register/commit/9bda613edbc3875d3d95e231b167e05df72196ea))
* **#30:** Implemented mutating proof of purchase ([8b7caf5](https://github.com/jens1101/asset-register/commit/8b7caf5414301ebc3886864c924c03cf5ef6567c))
* **#30:** Improved form related hooks ([f4ebfe0](https://github.com/jens1101/asset-register/commit/f4ebfe043f9f72c0e3e25dd6e87b6e3df332ef8f))
* **#30:** Refactored the create asset screen ([a399911](https://github.com/jens1101/asset-register/commit/a39991163512c66c1f760853426cf9b50bba4422))
* **#30:** Refined viewing assets ([021998e](https://github.com/jens1101/asset-register/commit/021998e330d3c5554637062382380a54cb5ececc))
* **#30:** Updated home page ([eb6cf75](https://github.com/jens1101/asset-register/commit/eb6cf757706292d20f65d4c52fd0025a049aa9ef))
* **#34:** Added icons ([8230ed7](https://github.com/jens1101/asset-register/commit/8230ed7b3df9f3b97bdf0a3e7231d5f069422ddf))
* **#39:** Added `Sum` to front end ([4b91b79](https://github.com/jens1101/asset-register/commit/4b91b79b6068b243a72d65827cc08caadb3bebcc))
* **#39:** Display of asset value ([e4a0807](https://github.com/jens1101/asset-register/commit/e4a080701e57923504be323cf82d4f1bb2066658))
* **#39:** Editing asset value ([60c13e0](https://github.com/jens1101/asset-register/commit/60c13e092d66189138f3c482a33181ea8ff72d2b))
* **#51:** Updated all non-breaking dependencies ([e78e0a9](https://github.com/jens1101/asset-register/commit/e78e0a998ab0ce5ac7dba0712489b0711d4344ec))
* **#51:** Updated Vite ([929acd5](https://github.com/jens1101/asset-register/commit/929acd54417270659ec156294ed7472f5c44e5bb))
* **#64:** Validations to prevent invalid names ([bf48f26](https://github.com/jens1101/asset-register/commit/bf48f264f2e1d81a742a12d0790494ff5197995b))
* **#79,#80:** Documentation and housekeeping ([e068fb2](https://github.com/jens1101/asset-register/commit/e068fb29359c9b56e752af2ec3a009f357af1ae5))
* **#79,#80:** Refactored and moved scalars ([4a222e7](https://github.com/jens1101/asset-register/commit/4a222e71e8e147653cacab16f8ec660205bc494b))
* Added `updatedAt` to images ([46f6b12](https://github.com/jens1101/asset-register/commit/46f6b124a410feccc971cf0a0a280a440f592b84))
* Added circular dependency checks ([1068989](https://github.com/jens1101/asset-register/commit/1068989b36b6b2c4eb646d68563e1d3fdac64c15))
* Added ESLint and updated Prettier config ([ba4cd87](https://github.com/jens1101/asset-register/commit/ba4cd87df53e9efeb14039bc6f0f73e5ac7d50b7))
* Added frontend web workspace ([7a34f53](https://github.com/jens1101/asset-register/commit/7a34f531232d20689e15e55b662b0c439dfcb7c0))
* Added GQL client ([4870a0c](https://github.com/jens1101/asset-register/commit/4870a0ce33a27366e87c5ff0beeee17e980b6b79))
* Added GQL Docker prod config ([41571bb](https://github.com/jens1101/asset-register/commit/41571bb50470391b8b46e9bff99002f4061cabf8))
* Added Knip ([1fbb7b5](https://github.com/jens1101/asset-register/commit/1fbb7b54b19f175cab1e4d6674a1151ffa334310))
* Added type checking to `test` scripts ([79a67e0](https://github.com/jens1101/asset-register/commit/79a67e0d34c4c5d3366b508e2244cd0e9abd294b))
* Bootstrapped SolidJS ([48c3278](https://github.com/jens1101/asset-register/commit/48c327856ff8e3d61f559d9aeff5eaa5394d252e))
* Go the front end to work ([70d0b0a](https://github.com/jens1101/asset-register/commit/70d0b0ab05ba049622c56975a8c229866dc696f6))
* Integrated Bootstrap into the front end ([5f88482](https://github.com/jens1101/asset-register/commit/5f884827e1cb69c009313dce59481c3b8f7d7c04))


### Bug Fixes

* **#14:** Updated the FE to handle the GQL changes ([a0009cb](https://github.com/jens1101/asset-register/commit/a0009cbd38fb28c935cb5ea4ff721d93139a068c))
* **#21:** Added error handling to tagged scalar parsing ([21a01b1](https://github.com/jens1101/asset-register/commit/21a01b19dd1b3e85bfe8bc43dfde6d4af6f1ec13))
* **#30:** Added SolidJS eslint plugin ([1ae38f0](https://github.com/jens1101/asset-register/commit/1ae38f06442ef738c520699163ec989a3a9fa040))
* **#30:** Corrected typo ([d754312](https://github.com/jens1101/asset-register/commit/d75431282ca877b66ad8753e7499a4fd53f13d4a))
* **#30:** Fixed behaviour of error reporting and callbacks ([0df48c8](https://github.com/jens1101/asset-register/commit/0df48c8fdcd4c0e3d90bf9e7036011817211fe23))
* **#30:** Improved typing of the `useFormField` hook ([f609652](https://github.com/jens1101/asset-register/commit/f609652bf0af802c84d4c3fab4d8a323a2bd78c1))
* **#30:** Made app bootstrapping effectful ([c363d3c](https://github.com/jens1101/asset-register/commit/c363d3c2e7d5e060843060632e07437b89ea9981))
* **#30:** Updated edit asset behaviour ([61d4415](https://github.com/jens1101/asset-register/commit/61d4415ff53dd65da3fdf6237d55c9329ab9d553))
* **#79,#80:** Reduced duplication in the tagged scalar exchange ([bf24cff](https://github.com/jens1101/asset-register/commit/bf24cfff5071968c27aa17a0fb0e33321649d567))
* **#79,#80:** Updated tagged scalars exchange ([1ef9f37](https://github.com/jens1101/asset-register/commit/1ef9f372f6cbc90e430daa7f96457058a08018a8))
* Added missing prettierignore files ([61c10fc](https://github.com/jens1101/asset-register/commit/61c10fc736825e50c98511146973a70cddd99f37))
* Fixed ESLint again ([bd2d2c6](https://github.com/jens1101/asset-register/commit/bd2d2c64912546d7be615232966b2531052e1616))
* Fixed flash of light on app load ([d3ca91c](https://github.com/jens1101/asset-register/commit/d3ca91c3428dc0234c9921d74811d3d46cd2fbd0))
* Fixed web ([1c6035d](https://github.com/jens1101/asset-register/commit/1c6035d7ebeb701589bf44ba1feab0a1d1c709b9))
* Hooked up the front end to GQL ([9aa63b5](https://github.com/jens1101/asset-register/commit/9aa63b54998b08f6380c448324775a0cce8c4131))
* Renamed packages ([265ea78](https://github.com/jens1101/asset-register/commit/265ea781907997654e93783f7ecf584ed27299ee))
* Updated eslint config for existing workspaces ([6faaee7](https://github.com/jens1101/asset-register/commit/6faaee7046e62ae6e0210ecb964940e1f08a5c87))
* Updated formatter ([6ff2232](https://github.com/jens1101/asset-register/commit/6ff22325db3385c96de305c02218be34676f24fe))
* Updated front end ES Lint config ([b04f57d](https://github.com/jens1101/asset-register/commit/b04f57d6ef09b7c4eefd15256316d01273060d0a))
