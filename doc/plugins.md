![retext][logo]

# Plugins

**retext** is an ecosystem of [plug-ins][plugins].

## Table of Contents

*   [List of Plugins](#list-of-plugins)
*   [List of Utilities](#list-of-utilities)
*   [Using plugins](#using-plugins)
*   [Creating plugins](#creating-plugins)

## List of Plugins

*   [`retext-cliches`](https://github.com/dunckr/retext-cliches)
    — Check phrases for cliches
*   [`retext-contractions`](https://github.com/retextjs/retext-contractions)
    — Check apostrophe use in contractions
*   [`retext-diacritics`](https://github.com/retextjs/retext-diacritics)
    — Check for proper use of diacritics
*   [`retext-dutch`](https://github.com/retextjs/retext/tree/master/packages/retext-dutch)
    — Dutch language support
*   [`retext-english`](https://github.com/retextjs/retext/tree/master/packages/retext-english)
    — English language support
*   [`retext-emoji`](https://github.com/retextjs/retext-emoji)
    — Encode or decode [Gemojis](https://github.com/github/gemoji)
*   [`retext-equality`](https://github.com/retextjs/retext-equality)
    — Warn about possible insensitive, inconsiderate language
*   [`retext-indefinite-article`](https://github.com/retextjs/retext-indefinite-article)
    — Check if indefinite articles (`a`, `an`) are used correctly
*   [`retext-keywords`](https://github.com/retextjs/retext-keywords)
    — Extract keywords and keyphrases
*   [`retext-latin`](https://github.com/retextjs/retext/tree/master/packages/retext-latin)
    — Latin-script language support
*   [`retext-overuse`](https://github.com/dunckr/retext-overuse)
    — Check words for overuse
*   [`retext-passive`](https://github.com/retextjs/retext-passive)
    — Check for passive voice
*   [`retext-profanities`](https://github.com/retextjs/retext-profanities)
    — Check profane and vulgar wording
*   [`retext-readability`](https://github.com/retextjs/retext-readability)
    — Check readability
*   [`retext-redundant-acronyms`](https://github.com/retextjs/retext-redundant-acronyms)
    — Check redundant acronyms (`ATM machine` > `ATM`)
*   [`retext-repeated-words`](https://github.com/retextjs/retext-repeated-words)
    — Check `for for` repeated words
*   [`retext-sentence-spacing`](https://github.com/retextjs/retext-sentence-spacing)
    — Check spacing between sentences
*   [`retext-sentiment`](https://github.com/retextjs/retext-sentiment)
    — Detect sentiment in text
*   [`retext-simplify`](https://github.com/retextjs/retext-simplify)
    — Check phrases for simpler alternatives
*   [`retext-smartypants`](https://github.com/retextjs/retext-smartypants)
    — Implementation of [SmartyPants](http://daringfireball.net/projects/smartypants/)
*   [`retext-spell`](https://github.com/retextjs/retext-spell)
    — Spelling checker
*   [`retext-stringify`](https://github.com/retextjs/retext/tree/master/packages/retext-stringify)
    — Compile back to text
*   [`retext-syntax-mentions`](https://github.com/retextjs/retext-syntax-mentions)
    — Classify `@mentions` as syntax
*   [`retext-usage`](https://github.com/admhlt/retext-usage)
    — Check incorrect English usage
*   [`retext-quotes`](https://github.com/retextjs/retext-quotes)
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

First, read up on the [concept of plug-ins][unified-plugins].  Then, read the
[guide on “Creating a plugin with unified”][guide].  Finally, take one of
existing [plug-ins][plugins], which looks similar to what you’re about to do,
and work from there.  If you get stuck, [issues][] and [Gitter][] are good
places to get help.

You should pick a name prefixed by `"retext-"`, such as `retext-lint`.

Note that, if the thing you create cannot be given to `retext().use()`,
it isn’t a “plug-in”.  Don’t use the `retext-` prefix as that could
confuse users.  If it works with the NLCST tree, use `'nlcst-'`, if
it works with any Unist tree, use `unist-util-`, if it works with virtual
files, use `vfile-`.

<!--Definitions:-->

[logo]: https://cdn.rawgit.com/retextjs/retext/3879855/logo.svg

[plugins]: #list-of-plugins

[nlcst-util]: https://github.com/syntax-tree/nlcst#list-of-utilities

[unist-util]: https://github.com/syntax-tree/unist#unist-node-utilties

[vfile-util]: https://github.com/vfile/vfile#utilities

[unified-use]: https://github.com/unifiedjs/unified#processoruseplugin-options

[unified-plugins]: https://github.com/unifiedjs/unified#plugin

[issues]: https://github.com/retextjs/retext/issues

[gitter]: https://gitter.im/retextjs/Lobby

[guide]: https://unifiedjs.github.io/create-a-plugin.html
