# retext-dutch

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[retext][]** plugin to add support for parsing Dutch natural language.

## Contents

* [What is this?](#what-is-this)
* [When should I use this?](#when-should-i-use-this)
* [Install](#install)
* [Use](#use)
* [API](#api)
  * [`unified().use(retextDutch)`](#unifieduseretextdutch)
* [Syntax tree](#syntax-tree)
* [Types](#types)
* [Compatibility](#compatibility)
* [Contribute](#contribute)
* [Sponsor](#sponsor)
* [License](#license)

## What is this?

This package is a [unified][] ([retext][]) plugin that defines how to take
Dutch natural language as input and turn it into a syntax tree.
When it’s used, natural language can be parsed and other retext plugins can be
used after it.

See [the monorepo readme][retext] for info on what the retext ecosystem is.

## When should I use this?

This plugin adds support to unified for parsing Dutch.
If the prose is not Dutch, use [`retext`][retext-core] for any Latin-script
text, or for English use `unified` itself with
[`retext-english`][retext-english] and [`retext-stringify`][retext-stringify].

If you just want the syntax tree, you can use [`parse-dutch`][parse-dutch]
directly.

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install retext-dutch
```

In Deno with [`esm.sh`][esmsh]:

```js
import retextDutch from 'https://esm.sh/retext-dutch@5'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import retextDutch from 'https://esm.sh/retext-dutch@5?bundle'
</script>
```

## Use

```js
import retextDutch from 'retext-dutch'
import retextStringify from 'retext-stringify'
import {unified} from 'unified'
import {reporter} from 'vfile-reporter'

const file = await unified()
  .use(retextDutch)
  // Add your own plugins that work with Dutch here!
  .use(retextStringify)
  .process('Kunt U zich ’s morgens melden bij het afd. hoofd dhr. Venema')

console.log(String(file))
console.error(reporter(file))
```

Yields:

```txt
Kunt U zich ’s morgens melden bij het afd. hoofd dhr. Venema
```

```txt
no issues found
```

## API

This package exports no identifiers.
The default export is [`retextDutch`][api-retext-dutch].

### `unified().use(retextDutch)`

Add support for parsing Dutch natural language.

###### Parameters

There are no parameters.

###### Returns

Nothing (`undefined`).

## Syntax tree

The syntax tree used in retext is [nlcst][].

## Types

This package is fully typed with [TypeScript][].
It exports no additional types.

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release, we drop support for unmaintained versions of
Node.
This means we try to keep the current release line, `retext-dutch@^5`,
compatible with Node.js 16.

## Contribute

See [`contributing.md`][contributing] in [`retextjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

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

[build-badge]: https://github.com/retextjs/retext/workflows/main/badge.svg

[build]: https://github.com/retextjs/retext/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext.svg

[coverage]: https://codecov.io/github/retextjs/retext

[downloads-badge]: https://img.shields.io/npm/dm/retext-dutch.svg

[downloads]: https://www.npmjs.com/package/retext-dutch

[size-badge]: https://img.shields.io/bundlephobia/minzip/retext-dutch.svg

[size]: https://bundlephobia.com/result?p=retext-dutch

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/retextjs/retext/discussions

[health]: https://github.com/retextjs/.github

[contributing]: https://github.com/retextjs/.github/blob/main/contributing.md

[support]: https://github.com/retextjs/.github/blob/main/support.md

[coc]: https://github.com/retextjs/.github/blob/main/code-of-conduct.md

[license]: https://github.com/retextjs/retext/blob/main/license

[author]: https://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[nlcst]: https://github.com/syntax-tree/nlcst

[parse-dutch]: https://github.com/wooorm/parse-dutch

[retext]: https://github.com/retextjs/retext

[retext-core]: https://github.com/retextjs/retext/tree/main/packages/retext

[retext-english]: https://github.com/retextjs/retext/tree/main/packages/retext-english

[retext-stringify]: https://github.com/retextjs/retext/tree/main/packages/retext-stringify

[typescript]: https://www.typescriptlang.org

[unified]: https://github.com/unifiedjs/unified

[api-retext-dutch]: #unifieduseretextdutch
