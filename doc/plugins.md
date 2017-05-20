![retext][logo]

# Plugins

**retext** plug-ins lie at the core of **retext**’s vision.

## Table of Contents

*   [List of Plugins](#list-of-plugins)
*   [List of Utilities](#list-of-utilities)
*   [Using plugins](#using-plugins)
*   [Creating plugins](#creating-plugins)

## List of Plugins

*   [`retext-cliches`](https://github.com/dunckr/retext-cliches)
    — Check phrases for cliches
*   [`retext-contractions`](https://github.com/wooorm/retext-contractions)
    — Check apostrophe use in contractions
*   [`retext-diacritics`](https://github.com/wooorm/retext-diacritics)
    — Check for proper use of diacritics
*   [`retext-dutch`](https://github.com/wooorm/retext/tree/master/packages/retext-dutch)
    — Dutch language support
*   [`retext-english`](https://github.com/wooorm/retext/tree/master/packages/retext-english)
    — English language support
*   [`retext-emoji`](https://github.com/wooorm/retext-emoji)
    — Encode or decode [Gemojis](https://github.com/github/gemoji)
*   [`retext-equality`](https://github.com/wooorm/retext-equality)
    — Warn about possible insensitive, inconsiderate language
*   [`retext-indefinite-article`](https://github.com/wooorm/retext-indefinite-article)
    — Check if indefinite articles (`a`, `an`) are used correctly
*   [`retext-keywords`](https://github.com/wooorm/retext-keywords)
    — Extract keywords and keyphrases
*   [`retext-latin`](https://github.com/wooorm/retext/tree/master/packages/retext-latin)
    — Latin-script language support
*   [`retext-overuse`](https://github.com/dunckr/retext-overuse)
    — Check words for overuse
*   [`retext-passive`](https://github.com/wooorm/retext-passive)
    — Check for passive voice
*   [`retext-profanities`](https://github.com/wooorm/retext-profanities)
    — Check profane and vulgar wording
*   [`retext-readability`](https://github.com/wooorm/retext-readability)
    — Check readability
*   [`retext-redundant-acronyms`](https://github.com/wooorm/retext-redundant-acronyms)
    — Check redundant acronyms (`ATM machine` > `ATM`)
*   [`retext-repeated-words`](https://github.com/wooorm/retext-repeated-words)
    — Check `for for` repeated words
*   [`retext-sentence-spacing`](https://github.com/wooorm/retext-sentence-spacing)
    — Check spacing between sentences
*   [`retext-sentiment`](https://github.com/wooorm/retext-sentiment)
    — Detect sentiment in text
*   [`retext-simplify`](https://github.com/wooorm/retext-simplify)
    — Check phrases for simpler alternatives
*   [`retext-smartypants`](https://github.com/wooorm/retext-smartypants)
    — Implementation of [SmartyPants](http://daringfireball.net/projects/smartypants/)
*   [`retext-spell`](https://github.com/wooorm/retext-spell)
    — Spelling checker
*   [`retext-stringify`](https://github.com/wooorm/retext/tree/master/packages/retext-stringify)
    — Compile back to text
*   [`retext-syntax-mentions`](https://github.com/wooorm/retext-syntax-mentions)
    — Classify `@mentions` as syntax
*   [`retext-usage`](https://github.com/admhlt/retext-usage)
    — Check incorrect English usage
*   [`retext-quotes`](https://github.com/wooorm/retext-quotes)
    — Check quote and apostrophe usage

## List of Utilities

See [**nlcst**][nlcst-util] for a list of utilities for working with
the CST.  See [`unist`][unist-util] for other utilities which work with
**nlcst** nodes, too.

And finally, see [`vfile`][vfile-util] for a list of utilities
for working with virtual files.

## Using plugins

To use a plug-in programmatically, invoke the [`use()`][unified-use]
function.

## Creating plugins

First, read up on the [concept of plug-ins][unified-plugins].
Then, I suggest taking one of existing [plug-ins][plugins], which looks
similar to what you’re about to do, and work from there.  If you get
stuck, [issues][] and [Gitter][] are good places to get help.

A good place for publishing plug-ins is [npm][npm-publish].

You should pick a name prefixed by `"retext-"`, such as `retext-lint`.

When publishing a plug-in, you should use the package manager’s keywords
functionality and include `"retext"` in the list.

<!--Definitions:-->

[logo]: https://cdn.rawgit.com/wooorm/retext/9845a25/logo.svg

[plugins]: #list-of-plugins

[nlcst-util]: https://github.com/syntax-tree/nlcst#list-of-utilities

[unist-util]: https://github.com/syntax-tree/unist#unist-node-utilties

[vfile-util]: https://github.com/vfile/vfile#utilities

[unified-use]: https://github.com/unifiedjs/unified#processoruseplugin-options

[unified-plugins]: https://github.com/unifiedjs/unified#plugin

[npm-publish]: https://docs.npmjs.com/getting-started/publishing-npm-packages

[issues]: https://github.com/wooorm/retext/issues

[gitter]: https://gitter.im/wooorm/retext
