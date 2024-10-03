# [![retext][logo]][unified]

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**retext** is a tool that transforms natural language with plugins.
These plugins can inspect and change the natural language.
You can use retext on the server, the client, deno, etc.

## Intro

retext is an ecosystem of plugins that work with natural language as structured
data, specifically CSTs (concrete syntax trees).
Syntax trees make it easy for programs to deal with prose.
We call those programs plugins.
Plugins inspect and change trees.
You can use the many existing plugins or you can make your own.
Some example use cases are to [check spelling][retext-spell],
[fix typography][retext-smartypants], or
[make sure text is readable][retext-readability].

* for more about us, see [`unifiedjs.com`][site]
* for updates, see [Twitter][]
* for questions, see [support][]
* to help, see [contribute][] or [sponsor][] below

## Contents

* [What is this?](#what-is-this)
* [When should I use this?](#when-should-i-use-this)
* [Plugins](#plugins)
* [Types](#types)
* [Compatibility](#compatibility)
* [Contribute](#contribute)
* [Sponsor](#sponsor)
* [License](#license)

## What is this?

With this project and a plugin, you can turn simple punctuation:

```text
He said, "A 'simple' english sentence. . .
```

…into smart punctuation:

```text
He said, “A ‘simple’ english sentence…”
```

<details><summary>Show example code</summary>

```js
import retextLatin from 'retext-latin'
import retextSmartyPants from 'retext-smartypants'
import retextStringify from 'retext-stringify'
import {unified} from 'unified'

const file = await unified()
  .use(retextLatin)
  .use(retextSmartyPants)
  .use(retextStringify)
  .process("He said, \"A 'simple' english sentence. . .")

console.log(String(file))
```

</details>

With another plugin, you can check natural language:

**In**:

```text
Where can I find an ATM machine?
```

**Out**:

```text
1:21-1:32 warning Unexpected redundant `ATM machine`, expected `ATM` atm retext-redundant-acronyms

⚠ 1 warning
```

<details><summary>Show example code</summary>

```js
import retextEnglish from 'retext-english'
import retextRedundantAcronyms from 'retext-redundant-acronyms'
import retextStringify from 'retext-stringify'
import {unified} from 'unified'
import {reporter} from 'vfile-reporter'

const file = await unified()
  .use(retextEnglish)
  .use(retextRedundantAcronyms)
  .use(retextStringify)
  .process('Where can I find an ATM machine?')

console.log(reporter(file))
```

</details>

…and you can make your own plugins.

You can use retext for many different things.
**[unified][]** is the core project that transforms content with ASTs.
**retext** adds support for natural language to unified.
**[nlcst][]** is the natural language AST that retext uses.

This GitHub repository is a monorepo that contains the following packages:

* [`retext-dutch`][retext-dutch]
  — parse Dutch prose to a syntax tree
* [`retext-english`][retext-english]
  — parse English prose to a syntax tree
* [`retext-latin`][retext-latin]
  — parse any Latin-script prose to a syntax tree
* [`retext-stringify`][retext-stringify]
  — serialize a syntax tree
* [`retext`][api]
  — programmatic interface with both `retext-latin` and `retext-stringify`

## When should I use this?

It is recommended to use `unified` with `retext-english` (or `retext-dutch`)
and `retext-stringify` if your content is in English (or Dutch).
Otherwise, if your content is in another Latin-script language, use `retext`.

## Plugins

retext plugins deal with natural language.
You can choose from the many plugins that already exist.
Here are three good ways to find plugins:

* [`awesome-retext`][awesome-retext]
  — selection of the most awesome projects
* [List of plugins][list-of-plugins]
  — list of all plugins
* [`retext-plugin` topic][topic]
  — any tagged repo on GitHub

Some plugins are maintained by us here in the `@retextjs` organization while
others are maintained by folks elsewhere.
Anyone can make retext plugins, so as always when choosing whether to include
dependencies in your project, make sure to carefully assess the quality of
retext plugins too.

## Types

The retext organization and the unified collective as a whole is fully typed
with [TypeScript][].
Types for nlcst are available in [`@types/nlcst`][types-nlcst].

For TypeScript to work, it is important to type your plugins.
For example:

```js
/**
 * @import {Root} from 'nlcst'
 */

/**
 * @typedef Options
 *   Configuration (optional).
 * @property {boolean | null | undefined} [someField]
 *   Some option.
 */

/**
 * My plugin.
 *
 * @param {Options | null | undefined} [options]
 *   Configuration (optional).
 * @returns
 *   Transform.
 */
export function myRetextPluginAcceptingOptions(options) {
  /**
   * @param {Root} tree
   *   Tree.
   * @param {VFile} file
   *   File.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree, file) {
    // Do things.
  }
}
```

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release, we drop support for unmaintained versions of
Node.
This means we try to keep the current release line compatible with Node.js 16.

## Contribute

See [`contributing.md`][contributing] in [`retextjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

For info on how to submit a security report, see our
[security policy][security].

## Sponsor

Support this effort and give back by sponsoring on [OpenCollective][collective]!

<table>
<tr valign="middle">
<td width="20%" align="center" rowspan="2" colspan="2">
  <a href="https://vercel.com">Vercel</a><br><br>
  <a href="https://vercel.com"><img src="https://avatars1.githubusercontent.com/u/14985020?s=256&v=4" width="128"></a>
</td>
<td width="20%" align="center" rowspan="2" colspan="2">
  <a href="https://motif.land">Motif</a><br><br>
  <a href="https://motif.land"><img src="https://avatars1.githubusercontent.com/u/74457950?s=256&v=4" width="128"></a>
</td>
<td width="20%" align="center" rowspan="2" colspan="2">
  <a href="https://www.hashicorp.com">HashiCorp</a><br><br>
  <a href="https://www.hashicorp.com"><img src="https://avatars1.githubusercontent.com/u/761456?s=256&v=4" width="128"></a>
</td>
<td width="20%" align="center" rowspan="2" colspan="2">
  <a href="https://www.gitbook.com">GitBook</a><br><br>
  <a href="https://www.gitbook.com"><img src="https://avatars1.githubusercontent.com/u/7111340?s=256&v=4" width="128"></a>
</td>
<td width="20%" align="center" rowspan="2" colspan="2">
  <a href="https://www.gatsbyjs.org">Gatsby</a><br><br>
  <a href="https://www.gatsbyjs.org"><img src="https://avatars1.githubusercontent.com/u/12551863?s=256&v=4" width="128"></a>
</td>
</tr>
<tr valign="middle">
</tr>
<tr valign="middle">
<td width="20%" align="center" rowspan="2" colspan="2">
  <a href="https://www.netlify.com">Netlify</a><br><br>
  <!--OC has a sharper image-->
  <a href="https://www.netlify.com"><img src="https://images.opencollective.com/netlify/4087de2/logo/256.png" width="128"></a>
</td>
<td width="10%" align="center">
  <a href="https://www.coinbase.com">Coinbase</a><br><br>
  <a href="https://www.coinbase.com"><img src="https://avatars1.githubusercontent.com/u/1885080?s=256&v=4" width="64"></a>
</td>
<td width="10%" align="center">
  <a href="https://themeisle.com">ThemeIsle</a><br><br>
  <a href="https://themeisle.com"><img src="https://avatars1.githubusercontent.com/u/58979018?s=128&v=4" width="64"></a>
</td>
<td width="10%" align="center">
  <a href="https://expo.io">Expo</a><br><br>
  <a href="https://expo.io"><img src="https://avatars1.githubusercontent.com/u/12504344?s=128&v=4" width="64"></a>
</td>
<td width="10%" align="center">
  <a href="https://boostnote.io">Boost Note</a><br><br>
  <a href="https://boostnote.io"><img src="https://images.opencollective.com/boosthub/6318083/logo/128.png" width="64"></a>
</td>
<td width="10%" align="center">
  <a href="https://markdown.space">Markdown Space</a><br><br>
  <a href="https://markdown.space"><img src="https://images.opencollective.com/markdown-space/e1038ed/logo/128.png" width="64"></a>
</td>
<td width="10%" align="center">
  <a href="https://www.holloway.com">Holloway</a><br><br>
  <a href="https://www.holloway.com"><img src="https://avatars1.githubusercontent.com/u/35904294?s=128&v=4" width="64"></a>
</td>
<td width="10%"></td>
<td width="10%"></td>
</tr>
<tr valign="middle">
<td width="100%" align="center" colspan="8">
  <br>
  <a href="https://opencollective.com/unified"><strong>You?</strong></a>
  <br><br>
</td>
</tr>
</table>

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[logo]: https://raw.githubusercontent.com/retextjs/retext/3420f05/logo.svg?sanitize=true

[build-badge]: https://github.com/retextjs/retext/workflows/main/badge.svg

[build]: https://github.com/retextjs/retext/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext.svg

[coverage]: https://codecov.io/github/retextjs/retext

[downloads-badge]: https://img.shields.io/npm/dm/retext.svg

[downloads]: https://www.npmjs.com/package/retext

[size-badge]: https://img.shields.io/bundlejs/size/retext

[size]: https://bundlejs.com/?q=retext

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat]: https://github.com/retextjs/retext/discussions

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[health]: https://github.com/retextjs/.github

[security]: https://github.com/retextjs/.github/blob/main/security.md

[contributing]: https://github.com/retextjs/.github/blob/main/contributing.md

[support]: https://github.com/retextjs/.github/blob/main/support.md

[coc]: https://github.com/retextjs/.github/blob/main/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[unified]: https://github.com/unifiedjs/unified

[types-nlcst]: https://github.com/DefinitelyTyped/DefinitelyTyped/tree/HEAD/types/nlcst

[typescript]: https://www.typescriptlang.org

[twitter]: https://twitter.com/unifiedjs

[site]: https://unifiedjs.com

[topic]: https://github.com/topics/retext-plugin

[nlcst]: https://github.com/syntax-tree/nlcst

[awesome-retext]: https://github.com/retextjs/awesome-retext

[retext-english]: https://github.com/retextjs/retext/tree/main/packages/retext-english

[retext-dutch]: https://github.com/retextjs/retext/tree/main/packages/retext-dutch

[retext-latin]: https://github.com/retextjs/retext/tree/main/packages/retext-latin

[retext-stringify]: https://github.com/retextjs/retext/tree/main/packages/retext-stringify

[api]: https://github.com/retextjs/retext/tree/main/packages/retext

[list-of-plugins]: https://github.com/retextjs/retext/tree/main/doc/plugins.md

[retext-readability]: https://github.com/retextjs/retext-readability

[retext-smartypants]: https://github.com/retextjs/retext-smartypants

[retext-spell]: https://github.com/retextjs/retext-spell

[contribute]: #contribute

[sponsor]: #sponsor
