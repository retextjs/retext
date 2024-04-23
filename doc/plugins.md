![retext][logo]

# Plugins

**retext** is a tool that transforms natural language with plugins.
See [the monorepo readme][retext] for info on what the retext ecosystem is.
This page lists existing plugins.

## Contents

* [List of plugins](#list-of-plugins)
* [List of utilities](#list-of-utilities)
* [Using plugins](#using-plugins)
* [Creating plugins](#creating-plugins)

## List of plugins

See [`awesome-retext`][awesome-retext] for the most awesome projects in the
ecosystem.
More plugins can be found on GitHub tagged with the
[`retext-plugin` topic][topic].

The list of plugins:

* [`retext-assuming`](https://github.com/davidhund/retext-assuming)
  — check for unhelpful phrases such as `just`, `simply`, `obviously`
* [`retext-case-police`](https://github.com/JulianCataldo/retext-case-police)
  — check for popular names casing (`github` → `GitHub`)
* [`retext-cliches`](https://github.com/dunckr/retext-cliches)
  — check phrases for cliches
* [`retext-contractions`](https://github.com/retextjs/retext-contractions)
  — check apostrophe use in contractions
* [`retext-diacritics`](https://github.com/retextjs/retext-diacritics)
  — check for proper use of diacritics
* [`retext-dutch`](https://github.com/retextjs/retext/tree/main/packages/retext-dutch)
  — dutch language support
* [`retext-english`](https://github.com/retextjs/retext/tree/main/packages/retext-english)
  — English language support
* [`retext-emoji`](https://github.com/retextjs/retext-emoji)
  — encode or decode [gemoji](https://github.com/github/gemoji)
* [`retext-equality`](https://github.com/retextjs/retext-equality)
  — warn about possible insensitive, inconsiderate language
* [`retext-indefinite-article`](https://github.com/retextjs/retext-indefinite-article)
  — check if indefinite articles (`a`, `an`) are used correctly
* [`retext-intensify`](https://github.com/retextjs/retext-intensify)
  — check for weak and mitigating wording
* [`retext-keywords`](https://github.com/retextjs/retext-keywords)
  — extract keywords and keyphrases
* [`retext-latin`](https://github.com/retextjs/retext/tree/main/packages/retext-latin)
  — Latin-script language support
* [`retext-lexrank`](https://github.com/gorango/retext-lexrank)
  — add Lexrank scores to sentences
* [`retext-overuse`](https://github.com/dunckr/retext-overuse)
  — check words for overuse
* [`retext-passive`](https://github.com/retextjs/retext-passive)
  — check for passive voice
* [`retext-profanities`](https://github.com/retextjs/retext-profanities)
  — check profane and vulgar wording
* [`retext-readability`](https://github.com/retextjs/retext-readability)
  — check readability
* [`retext-redundant-acronyms`](https://github.com/retextjs/retext-redundant-acronyms)
  — check redundant acronyms (`ATM machine` > `ATM`)
* [`retext-repeated-words`](https://github.com/retextjs/retext-repeated-words)
  — check `for for` repeated words
* [`retext-sentence-spacing`](https://github.com/retextjs/retext-sentence-spacing)
  — check spacing between sentences
* [`retext-sentiment`](https://github.com/retextjs/retext-sentiment)
  — detect sentiment in text
* [`retext-simplify`](https://github.com/retextjs/retext-simplify)
  — check phrases for simpler alternatives
* [`retext-smartypants`](https://github.com/retextjs/retext-smartypants)
  — implementation of [SmartyPants](https://daringfireball.net/projects/smartypants/)
* [`retext-spell`](https://github.com/retextjs/retext-spell)
  — check spelling
* [`retext-stringify`](https://github.com/retextjs/retext/tree/main/packages/retext-stringify)
  — serialize back to text
* [`retext-syntax-mentions`](https://github.com/retextjs/retext-syntax-mentions)
  — classify `@mentions` as syntax
* [`retext-syntax-urls`](https://github.com/retextjs/retext-syntax-urls)
  — classify url-like values (example.com, example.md, etc) as syntax
* [`retext-usage`](https://github.com/admhlt/retext-usage)
  — check incorrect English usage
* [`retext-quotes`](https://github.com/retextjs/retext-quotes)
  — check quote and apostrophe usage

## List of utilities

See [nlcst][nlcst-util] for a list of utilities that work with the syntax tree.
See [unist][unist-util] for other utilities which work with nlcst and other
syntax trees too.
Finally, see [vfile][vfile-util] for a list of utilities working with virtual
files.

## Using plugins

To use a plugin programmatically, call the [`use()`][unified-use] function.

## Creating plugins

To create a plugin, first read up on the [concept of plugins][unified-plugins].
Then, read the [guide on “Creating a plugin with unified”][guide].
Finally, take one of existing plugins, which looks similar to what you’re about
to make, and work from there.
If you get stuck, [discussions][] is a good place to get help.

You should pick a name prefixed by `'retext-'` (such as `retext-emoji`).
**Do not use the `retext-` prefix** if the thing you create doesn’t work with
`retext().use()`: it isn’t a “plugin” and will confuse users.
If it works with nlcst, use `'nlcst-'`, if it works with any unist tree, use
`unist-util-`, and if it works with virtual files, use `vfile-`.

Use default exports to expose plugins from your packages, add `retext-plugin`
keywords in `package.json`, add a `retext-plugin` topic to your repo on GitHub,
and create a pull request to add the plugin here on this page!

<!--Definitions:-->

[logo]: https://raw.githubusercontent.com/retextjs/retext/3420f05/logo.svg?sanitize=true

[retext]: https://github.com/retextjs/retext

[awesome-retext]: https://github.com/retextjs/awesome-retext

[nlcst-util]: https://github.com/syntax-tree/nlcst#list-of-utilities

[unist-util]: https://github.com/syntax-tree/unist#unist-node-utilties

[vfile-util]: https://github.com/vfile/vfile#utilities

[unified-use]: https://github.com/unifiedjs/unified#processoruseplugin-options

[unified-plugins]: https://github.com/unifiedjs/unified#plugin

[discussions]: https://github.com/retextjs/retext/discussions

[guide]: https://unifiedjs.com/learn/guide/create-a-plugin/

[topic]: https://github.com/topics/retext-plugin
