<!--mdast setext-->

<!--lint disable maximum-line-length no-multiple-toplevel-headings-->

1.0.0 / 2015-09-16
==================

*   Refactor with final changes before 1.0.0 ([da92a14](https://github.com/wooorm/retext/commit/da92a14))
*   Refactor parsers to work with retext ([772a6eb](https://github.com/wooorm/retext/commit/772a6eb))
*   Add positional information to NLCST parsers ([d1ab2f0](https://github.com/wooorm/retext/commit/d1ab2f0))
*   Refactor retext ([30c0e21](https://github.com/wooorm/retext/commit/30c0e21))

0.6.0 / 2015-07-31
==================

*   Replace coveralls with codecov ([65d1cfb](https://github.com/wooorm/retext/commit/65d1cfb))
*   Remove warnings about deprecations ([6561765](https://github.com/wooorm/retext/commit/6561765))
*   Update parse-latin, browserify, eslint, jscs-jsdoc ([525aa73](https://github.com/wooorm/retext/commit/525aa73))
*   Fix UMD build typo in `Readme.md` ([cb7c4d8](https://github.com/wooorm/retext/commit/cb7c4d8))

0.5.1 / 2015-01-23
==================

*   Add UMD as an installation method in `Readme.md`
*   Add `index.js` to bower ignore
*   Remove bower dependencies due to UMD build
*   Add `retext.js` to bowers `main` instead of `index.js`
*   Add `retext.js`, `retext.min.js`
*   Add `retext.js`, `retext.min.js` to `.npmignore`
*   Add `postbuild` npm script target to mangle build
*   Add `build`, `prepublish` npm script target
*   Add esmangle as a dev-dependency
*   Add browserify as a dev-dependency
*   Refactor npm script targets
*   Update eslint
*   Add demo for `retext-keywords` to `Readme.md`
*   Add demo for `retext-pos` to `Readme.md`

0.5.0 / 2015-01-12
==================

*   Update textom to a stable version
*   Update copyright notice in `LICENSE` to include 2015
*   Add link to whole license in `Readme.md`
*   Add Duo as an instalation method in `Readme.md`
*   Add links to installation methods in `Readme.md`
*   Refactor `package.json`
*   Update jscs-jsdoc
*   Refactor `test.js` for changes in eslint
*   Update eslint

0.5.0-rc.2 / 2014-12-19
=======================

*   Update textom
*   Refactor to adhere to strict jsdoc style
*   Add jscs-jsdoc configuration to `.jscs.json`
*   Add jscs-jsdoc as a dev-dependency
*   Refactor npm scripts for changes in npm
*   Add demo for `retext-inspect` to `Readme.md`
*   Add demo for `retext-cst` to `Readme.md`

0.5.0-rc.1 / 2014-12-05
=======================

*   Fix benchmark results in `Readme.md`
*   Fix typos in `Readme.md`
*   Fix example to be valid JS in `Readme.md`
*   Add link to personal website to copyright in `Readme.md`
*   Refactor npm script targets in `package.json`
*   Update benchmark results in `Readme.md`
*   Update nlcst-to-textom, textom
*   Update eslint
*   Remove retext-emoticon from desired plug-ins in `Readme.md`
*   Add demo for `retext-syllabe` to `Readme.md`
*   Rename retext-ast to retext-cst in plugins in `Readme.md`
*   Fix typo’s in `Readme.md`

0.4.0 / 2014-11-20
==================

*   Update dependencies
*   Fix incorrect executive rights on `test.js`

0.4.0-rc.2 / 2014-11-19
=======================

*   Update parse-latin, textom to lates development releases
*   Fix logo link in `Readme.md`

0.4.0-rc.1 / 2014-11-15
=======================

*   Refactor script targets in `package.json`
*   Add `logo.svg`
*   Add description of plugins to `Readme.md`
*   Remove personal intro from `Readme.md`
*   Add flat badges to `Readme.md`
*   Update parse-latin
*   Update matcha, nlcst-to-textom

0.3.0 / 2014-10-28
==================

*   Refactor example in `Readme.md`
*   Update textom, parse-latin

0.3.0-rc.2 / 2014-10-27
=======================

*   Remove superfluous test code
*   Refactor docs in `Readme.md`
*   Refactor module
*   Remove `retext` argument for plugin's `onrun`
*   Merge branch 'feature/standardise-options'
*   Add functionality for options for `use` and `parse`
*   Add tests for standardised options for `use` and `parse`
*   Merge branch 'feature/refactor-plugin-and-attach-system'
*   Refactor module for new plugin/attach system
*   Refactor test for new plugin/attach system
*   Add `.eslintrc`
*   Disallow space after object keys in `.jscs.json`
*   Update eslint, mocha
*   Add retext-typography to desired plugins in Readme.md
*   Add retext-hyphen to desired plugins in Readme.md
*   Update retext-live (to -sync) in desired plugins in `Readme.md`
*   Add retext-live to plugins in Readme.md

0.3.0-rc.1 / 2014-10-21
=======================

*   Update textom, parse-latin
*   Add retext-no-break to desired plugins in Readme.md
*   Add retext-location to desired plugins in Readme.md

0.2.1 / 2014-10-15
==================

*   Add test for `TextOM` on retext instances
*   Change exception-assertions in tests
*   Add nlcst-to-textom implementation to API
*   Add nlcst-to-textom as a dependency
*   Update parse-latin

0.2.0 / 2014-10-14
==================

*   Add retext-no-pants to desired plugins in Readme.md
*   Add retext-frequent-words to desired plugins in Readme.md
*   Add retext-emoticon to desired plugins in Readme.md
*   Refactor Readme.md

0.2.0-rc.5 / 2014-10-14
=======================

*   Update textom
*   Add retext-walk to plugins in Readme.md
*   Add `bower_components/` to .npmignore
*   Move `benchmark/index.js` to `benchmark.js`

0.2.0-rc.4 / 2014-10-09
=======================

*   Replace parse-english with NLCST in package keywords
*   Update .gitignore, .npmignore, bower ignore
*   Update textom, parse-latin for component, bower
*   Move spec to test.js
*   Refactor indent in .jscs.json
*   Remove browser test
*   Update textom, parse-latin
*   Add retext-inspect to plugins in Readme.md
*   Add retext-find to plugins in Readme.md
*   Add demo for retext-lancaster-stemmer
*   Add demo for retext-soundex

0.2.0-rc.3 / 2014-09-27
=======================

*   Fix benchmarks failing benchmarks
*   Refactor Readme.md
*   Remove `npm update npm` from travis
*   Fix property order in manifest files
*   Update .gitignore, .npmignore
*   Update copyright in Readme.md
*   Remove testling
*   Update dependencies

0.2.0-rc.2 / 2014-09-21
=======================

*   Merge branch 'feature/rename-apply-plugins-to-run'
*   Rename `applyPlugins` > `run`
*   Merge branch 'refactor/api'
*   Refactor API
*   Merge branch 'feature/fail-without-callback'
*   Add interface for error on omitted `done` for `parse`
*   Add spec for error on omitted `done` for `parse`
*   Merge branch 'feature/chainable-parse'
*   Add chainable `parse` and `applyPlugins`
*   Add spec for chainable `parse` and `applyPlugins`
*   Fix throwing interdependent plugins
*   Add spec for throwing interdependent plugins
*   Refactor spec
*   Refactor benchmark
*   Update benchmark results in docs
*   Update docs for async changes in [27dbfd7](https://github.com/wooorm/retext/commit/27dbfd7)
*   Remove flashy demos from docs
*   Update and fix Installation in docs
*   Remove sauce labs from travis
*   Merge branch 'feature/async'

0.2.0-rc.1 / 2014-09-19
=======================

*   Fix either istanbul or eslint failing in spec
*   Use ware to support async parsing
*   Add retext-syllable to Plugins
*   Add retext-soundex to Plugins
*   Update eslint to 0.8.0
*   Add retext-lancaster-stemmer to Plugins
*   Add demo for retext-sentiment
*   Add demos for parse-latin, parse-english, parse-dutch
*   Add retext-sentiment to Plugins
*   Add demo for retext-language
*   Remove retext-language from desired plugins
*   Add retext-language to plugins
*   Merge pull request [#13](https://github.com/wooorm/retext/issues/13) from joshWyatt/patch-2
*   Update Readme.md
*   Add a section on flashy demos
*   Merge pull request [#11](https://github.com/wooorm/retext/issues/11) from jlburkhead/patch-1
*   Spelling fix in README
*   Add mention on where to start for building plugins
*   Add personal note

0.1.1 / 2014-07-25
==================

*   Add bower.json

0.1.0 / 2014-07-24
==================

*   Fixed incorrect JSDoc comments
*   Update benchmark in Readme
*   Refactored benchmark
*   Add spec/browser.spec.js git gitignore
*   Add components to gitignore
*   Update mocha
*   Add demo’s for retext-dom, retext-visit
*   Add demos for retext-double-metaphone, retext-link, retext-metaphone, retext-search
*   Add mention of retexts goals and why its useful
*   Add demo for retext-porter-stemmer, retext-emoji
*   Add URIs to demos for retext-directionality, retext-smartypants

0.1.0-rc.6 / 2014-07-22
=======================

*   Fixed component dependency names
*   Added codeclimate badge
*   Replaced unicode characters in API with their ASCII equivalents
*   Added retext-link to plugins

0.1.0-rc.5 / 2014-07-16
=======================

*   Added support for including data properties set by parser (-plugins) on object model
*   Removed retext-standard from Desired Plugins
*   Added retext-keywords to Plugins
*   Fixed ordering of Desired Plugins
*   Added retext-pos to Plugins
*   Mentioned parse-dutch; Added “Parsers” section
*   Add a list of desired plugins (fixes [#7](https://github.com/wooorm/retext/issues/7))
*   Fix incorrect reference to the default parser

0.1.0-rc.4 / 2014-07-12
=======================

*   Retext now exposes the used parser on the TextOM instance
*   Added Sauce Labs to travis

0.1.0-rc.3 / 2014-07-12
=======================

*   Update dependencies in component.json
*   Removed functionality to pass strings to the Retext constructor
*   Added an example to the Retext docs on how to use custom parsers
*   Added a missing semicolon
*   Retext now exposes an `applyPlugins` method (fixes [#8](https://github.com/wooorm/retext/issues/8))
*   Added unit tests for Retext#applyPlugins

0.1.0-rc.2 / 2014-07-11
=======================

*   Updated parse-latin, textom
*   Updated eslint, istanbul

0.1.0-rc.1 / 2014-07-07
=======================

*   Fixed a typo
*   Fixed functionality removed/added in new parsers
*   Now depending on parse-latin rather vs parse-englsih
*   Added a unit test to detect if the API actually parses
*   Removed complexity-report
*   Removed functionality to browserify unit tests by default
*   Updated parse-english, browserify, jscs, and istanbul
*   Added retext-dom to plugins
*   Add retext-search to plugins
*   Fix new line
*   Added Benchmark to Readme
*   Modified wording in benchmark
*   Updated dependency version of jscs
*   Added benchmark
*   Added Double Metaphone to plugins
*   Added retext-metaphone to plugins

0.0.12 / 2014-06-19
===================

*   Added browser files
*   Unit tests can now run in the browser (spec/index.html)
*   Fixed a bug where everything in ./spec/ was tested
*   Split the lint task into lint-api, lint-test, and lint-style
*   Update dependency versions of jscs and parse-english
*   Updated developer dependency of jscs to 1.5.2
*   Added a logo to documentation (fixes [#2](https://github.com/wooorm/retext/issues/2))

0.0.11 / 2014-06-16
===================

*   Fix code styleguide for latest jscs updates
*   Update dependency versions of parse-english and jscs to 0..22 and 1.5.1

0.0.10 / 2014-06-15
===================

*   Mentioned retext-range in plugins
*   Fixed a new-line before EOF
*   Update parse-english to 0.0.21
*   Mentioned retext-directionality in, and reordered, plugins

0.0.9 / 2014-06-13
==================

*   Mentiond retext-ast and retext-content in Plugins
*   Removed a superfluous unit test
*   Updated dependency of parse-english to 0.0.20
*   Fixed a typo

0.0.8 / 2014-06-11
==================

*   Modified the introduction of retext a bit
*   Mentioned browser support in a seperate section (that darn Testling and its grey icons)
*   Updated dependency version of parse-english to 0.0.17
*   Made `assert.{throws,doesNotThrow}` expressions, strings

0.0.7 / 2014-06-10
==================

*   Updated istanbul to 0.2.11
*   Updated dependency of parse-english to 0.0.16
*   Updated dependency of parse-english to 0.0.14
*   Removed some docs about the previous sandbox “fix”
*   Fixed a new-line
*   Added an `after_script` for travis, made things strings
*   Added a testling badge, added a coverage-coveralls badge, added SVG icons
*   Added ci-testling fields
*   Added an “install with component” guide
*   Made api and unit tests honour ESLint settings
*   Removed Makefile, instead opting for just package.json

0.0.6 / 2014-06-08
==================

*   Made a unit test mandatory
*   Added an istanbul ignore—will have to fix in the future
*   Fixed a bug where, with component.js, when `"parse-english"` was passed to parser, an error was thrown
*   Removed all the cache-workaround code, as the recent improvements to parse-english and textom don’t need them
*   Updated dependency version of parse-english to 0.0.13

0.0.5 / 2014-06-08
==================

*   Made a unit test optional
*   Made index.js Component.js compliant
*   Added component.json
*   Updated dependency version of parse-english to 0.0.12
*   Updated dependency of parse-english to `0.0.10`
*   `-` is now an allowed left-sticked operator (e.g., `-1`)

0.0.4 / 2014-06-05
==================

*   Spec file now conform to JSCodeStyleChecker
*   Added spec files to Makefile, to be tested by JSCodeStyleChecker
*   Updated dependency of parse-english to 0.0.9

0.0.3 / 2014-06-04
==================

*   Updated mocha to latest version
*   Made API descriptions more concise. Added list of plugins
*   Removed `Installation: Git` from readme.
*   Fixed grammar mistakes in package.json

0.0.2 / 2014-06-04
==================
