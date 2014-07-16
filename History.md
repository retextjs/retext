
0.1.0-rc.5 / 2014-07-16
==================

 * Added support for including data properties set by parser (-plugins) on object model
 * Removed retext-standard from Desired Plugins
 * Added retext-keywords to Plugins
 * Fixed ordering of Desired Plugins
 * Added retext-pos to Plugins
 * Mentioned parse-dutch; Added “Parsers” section
 * Add a list of desired plugins (fixes #7)
 * Fix incorrect reference to the default parser

0.1.0-rc.4 / 2014-07-12
==================

 * Retext now exposes the used parser on the TextOM instance
 * Added Sauce Labs to travis

0.1.0-rc.3 / 2014-07-12
==================

 * Update dependencies in component.json
 * Removed functionality to pass strings to the Retext constructor
 * Added an example to the Retext docs on how to use custom parsers
 * Added a missing semicolon
 * Retext now exposes an `applyPlugins` method (fixes #8)
 * Added unit tests for Retext#applyPlugins

0.1.0-rc.2 / 2014-07-11
==================

 * Updated parse-latin, textom
 * Updated eslint, istanbul

0.1.0-rc.1 / 2014-07-07
==================

 * Fixed a typo
 * Fixed functionality removed/added in new parsers
 * Now depending on parse-latin rather vs parse-englsih
 * Added a unit test to detect if the API actually parses
 * Removed complexity-report
 * Removed functionality to browserify unit tests by default
 * Updated parse-english, browserify, jscs, and istanbul
 * Added retext-dom to plugins
 * Add retext-search to plugins
 * Fix new line
 * Added Benchmark to Readme
 * Modified wording in benchmark
 * Updated dependency version of jscs
 * Added benchmark
 * Added Double Metaphone to plugins
 * Added retext-metaphone to plugins

0.0.12 / 2014-06-19
==================

 * Added browser files
 * Unit tests can now run in the browser (spec/index.html)
 * Fixed a bug where everything in ./spec/ was tested
 * Split the lint task into lint-api, lint-test, and lint-style
 * Update dependency versions of jscs and parse-english
 * Updated developer dependency of jscs to 1.5.2
 * Added a logo to documentation (fixes #2)

0.0.11 / 2014-06-16
==================

 * Fix code styleguide for latest jscs updates
 * Update dependency versions of parse-english and jscs to 0..22 and 1.5.1

0.0.10 / 2014-06-15
==================

 * Mentioned retext-range in plugins
 * Fixed a new-line before EOF
 * Update parse-english to 0.0.21
 * Mentioned retext-directionality in, and reordered, plugins

0.0.9 / 2014-06-13
==================

 * Mentiond retext-ast and retext-content in Plugins
 * Removed a superfluous unit test
 * Updated dependency of parse-english to 0.0.20
 * Fixed a typo

0.0.8 / 2014-06-11
==================

 * Modified the introduction of retext a bit
 * Mentioned browser support in a seperate section (that darn Testling and its grey icons)
 * Updated dependency version of parse-english to 0.0.17
 * Made `assert.{throws,doesNotThrow}` expressions, strings

0.0.7 / 2014-06-10
==================

 * Updated istanbul to 0.2.11
 * Updated dependency of parse-english to 0.0.16
 * Updated dependency of parse-english to 0.0.14
 * Removed some docs about the previous sandbox “fix”
 * Fixed a new-line
 * Added an `after_script` for travis, made things strings
 * Added a testling badge, added a coverage-coveralls badge, added SVG icons
 * Added ci-testling fields
 * Added an “install with component” guide
 * Made api and unit tests honour ESLint settings
 * Removed Makefile, instead opting for just package.json

0.0.6 / 2014-06-08
==================

 * Made a unit test mandatory
 * Added an istanbul ignore—will have to fix in the future
 * Fixed a bug where, with component.js, when `"parse-english"` was passed to parser, an error was thrown
 * Removed all the cache-workaround code, as the recent improvements to parse-english and textom don’t need them
 * Updated dependency version of parse-english to 0.0.13

0.0.5 / 2014-06-08
==================

 * Made a unit test optional
 * Made index.js Component.js compliant
 * Added component.json
 * Updated dependency version of parse-english to 0.0.12
 * Updated dependency of parse-english to `0.0.10`
 * `-` is now an allowed left-sticked operator (e.g., `-1`)

0.0.4 / 2014-06-05
==================

 * Spec file now conform to JSCodeStyleChecker
 * Added spec files to Makefile, to be tested by JSCodeStyleChecker
 * Updated dependency of parse-english to 0.0.9

0.0.3 / 2014-06-04
==================

 * Updated mocha to latest version
 * Made API descriptions more concise. Added list of plugins
 * Removed `Installation: Git` from readme.
 * Fixed grammar mistakes in package.json

0.0.2 / 2014-06-04
==================
