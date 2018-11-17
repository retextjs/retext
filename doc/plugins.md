![retext][logo]

# Plugins

**retext** is a natural language processor powered by plugins part of the
[unified][] [collective][].

## Table of Contents

*   [List of Plugins](#list-of-plugins)
*   [List of Utilities](#list-of-utilities)
*   [Using plugins](#using-plugins)
*   [Creating plugins](#creating-plugins)

## List of Plugins

See [awesome retext][awesome] for the most awesome projects in the ecosystem.
More plugins can be found on GitHub tagged with the
[`retext-plugin` topic][topic].

Have a good idea for a new plugin?
See [Creating plugins][create] below.

*   [`retext-cliches`](https://github.com/dunckr/retext-cliches)
    — check phrases for cliches
*   [`retext-contractions`](https://github.com/retextjs/retext-contractions)
    — check apostrophe use in contractions
*   [`retext-diacritics`](https://github.com/retextjs/retext-diacritics)
    — check for proper use of diacritics
*   [`retext-dutch`](https://github.com/retextjs/retext/tree/master/packages/retext-dutch)
    — dutch language support
*   [`retext-english`](https://github.com/retextjs/retext/tree/master/packages/retext-english)
    — English language support
*   [`retext-emoji`](https://github.com/retextjs/retext-emoji)
    — encode or decode [gemoji](https://github.com/github/gemoji)
*   [`retext-equality`](https://github.com/retextjs/retext-equality)
    — warn about possible insensitive, inconsiderate language
*   [`retext-indefinite-article`](https://github.com/retextjs/retext-indefinite-article)
    — check if indefinite articles (`a`, `an`) are used correctly
*   [`retext-keywords`](https://github.com/retextjs/retext-keywords)
    — extract keywords and keyphrases
*   [`retext-latin`](https://github.com/retextjs/retext/tree/master/packages/retext-latin)
    — Latin-script language support
*   [`retext-overuse`](https://github.com/dunckr/retext-overuse)
    — check words for overuse
*   [`retext-passive`](https://github.com/retextjs/retext-passive)
    — check for passive voice
*   [`retext-profanities`](https://github.com/retextjs/retext-profanities)
    — check profane and vulgar wording
*   [`retext-readability`](https://github.com/retextjs/retext-readability)
    — check readability
*   [`retext-redundant-acronyms`](https://github.com/retextjs/retext-redundant-acronyms)
    — check redundant acronyms (`ATM machine` > `ATM`)
*   [`retext-repeated-words`](https://github.com/retextjs/retext-repeated-words)
    — check `for for` repeated words
*   [`retext-sentence-spacing`](https://github.com/retextjs/retext-sentence-spacing)
    — check spacing between sentences
*   [`retext-sentiment`](https://github.com/retextjs/retext-sentiment)
    — detect sentiment in text
*   [`retext-simplify`](https://github.com/retextjs/retext-simplify)
    — check phrases for simpler alternatives
*   [`retext-smartypants`](https://github.com/retextjs/retext-smartypants)
    — implementation of [SmartyPants](https://daringfireball.net/projects/smartypants/)
*   [`retext-spell`](https://github.com/retextjs/retext-spell)
    — check spelling
*   [`retext-stringify`](https://github.com/retextjs/retext/tree/master/packages/retext-stringify)
    — compile back to text
*   [`retext-syntax-mentions`](https://github.com/retextjs/retext-syntax-mentions)
    — classify `@mentions` as syntax
*   [`retext-usage`](https://github.com/admhlt/retext-usage)
    — check incorrect English usage
*   [`retext-quotes`](https://github.com/retextjs/retext-quotes)
    — check quote and apostrophe usage

## List of Utilities

See [**nlcst**][nlcst-util] for a list of utilities for working with the syntax
tree.
See [`unist`][unist-util] for other utilities which work with **nlcst**
nodes, too.
Finally, see [**vfile**][vfile-util] for a list of utilities working with
virtual files.

## Using plugins

To use a plugin invoke the [`use()`][unified-use] function.

## Creating plugins

Have an idea for a plugin?
Post it on [spectrum][] or in [ideas][] and make it happen!

To create a plugin, first read up on the [concept of plugins][unified-plugins].
Then, read the [guide on “Creating a plugin with unified”][guide].
Finally, take one of existing plugins, which looks similar to what you’re about
to make, and work from there.
If you get stuck, [spectrum][], [ideas][], and [issues][] are good places to get
help.

You should pick a name prefixed by `'retext-'`, such as `retext-spell`.

**Do not use the `retext-` prefix** if the thing you create doesn’t work with
`retext().use()`: it isn’t a “plugin” and will confuse users.
If it works with nlcst, use `'nlcst-util-'`, if it works with any unist tree,
use `unist-util-`, and if it works with virtual files, use `vfile-`.

<!--Definitions:-->

[logo]: https://raw.githubusercontent.com/retextjs/retext/976354b/logo.svg?sanitize=true

[nlcst-util]: https://github.com/syntax-tree/nlcst#list-of-utilities

[unist-util]: https://github.com/syntax-tree/unist#unist-node-utilties

[vfile-util]: https://github.com/vfile/vfile#utilities

[unified-use]: https://github.com/unifiedjs/unified#processoruseplugin-options

[unified-plugins]: https://github.com/unifiedjs/unified#plugin

[issues]: https://github.com/retextjs/retext/issues

[spectrum]: https://spectrum.chat/unified/retext

[guide]: https://unified.js.org/create-a-plugin.html

[unified]: https://github.com/unifiedjs/unified

[collective]: https://opencollective.com/unified

[create]: #creating-plugins

[awesome]: https://github.com/retextjs/awesome

[ideas]: https://github.com/retextjs/ideas

[topic]: https://github.com/topics/retext-plugin
