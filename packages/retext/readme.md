# retext

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**retext**][retext] is a natural language processor powered by [plugins][]
part of the [unified][] [collective][].

*   API by [**unified**][unified]
*   Parses natural language to the tree with [`retext-latin`][latin]
*   [**nlcst**][nlcst] syntax tree
*   [Plugins][] transform the tree
*   Compiles the tree to markdown using [`retext-stringify`][stringify]

Don’t need the parser?  Or the compiler?  [That’s OK][unified-usage].

## Sponsors

<!--lint ignore no-html maximum-line-length-->

<table>
  <tr valign="top">
    <td width="20%" align="center">
      <a href="https://zeit.co"><img src="https://avatars1.githubusercontent.com/u/14985020?s=400&v=4"></a>
      <br><br>🥇
      <a href="https://zeit.co">ZEIT</a>
    </td>
    <td width="20%" align="center">
      <a href="https://www.gatsbyjs.org"><img src="https://avatars1.githubusercontent.com/u/12551863?s=400&v=4"></a>
      <br><br>🥇
      <a href="https://www.gatsbyjs.org">Gatsby</a>
    </td>
    <td width="20%" align="center">
      <a href="https://www.netlify.com"><img src="https://avatars1.githubusercontent.com/u/7892489?s=400&v=4"></a>
      <br><br>🥇
      <a href="https://www.netlify.com">Netlify</a>
    </td>
    <td width="20%" align="center">
      <a href="https://www.holloway.com"><img src="https://avatars1.githubusercontent.com/u/35904294?s=400&v=4"></a>
      <br><br>
      <a href="https://www.holloway.com">Holloway</a>
    </td>
    <td width="20%" align="center">
      <br><br><br><br>
      <a href="https://opencollective.com/unified"><strong>You?</strong>
    </td>
  </tr>
</table>

[**Read more about the unified collective on Medium »**][announcement]

## Install

[npm][]:

```sh
npm install retext
```

## Use

```js
var retext = require('retext')
var profanities = require('retext-profanities')
var emoji = require('retext-emoji')
var report = require('vfile-reporter')

retext()
  .use(profanities)
  .use(emoji, {convert: 'encode'})
  .process('He’s set on beating your butt for sheriff! :cop:', function(err, file) {
    console.log(String(file))
    console.error(report(err || file))
  })
```

Yields:

```txt
He’s set on beating your butt for sheriff! 👮
  1:26-1:30  warning  Be careful with “butt”, it’s profane in some cases  butt  retext-profanities

⚠ 1 warning
```

## Contribute

See [`contributing.md`][contributing] in [`retextjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.
Ideas for new plugins and tools can be posted in [`retextjs/ideas`][ideas].

A curated list of awesome retext resources can be found in [**awesome
retext**][awesome].

This project has a [Code of Conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/retextjs/retext.svg

[build]: https://travis-ci.org/retextjs/retext

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext.svg

[coverage]: https://codecov.io/github/retextjs/retext

[downloads-badge]: https://img.shields.io/npm/dm/retext.svg

[downloads]: https://www.npmjs.com/package/retext

[size-badge]: https://img.shields.io/bundlephobia/minzip/retext.svg

[size]: https://bundlephobia.com/result?p=retext

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/retext

[health]: https://github.com/retextjs/.github

[contributing]: https://github.com/retextjs/.github/blob/master/contributing.md

[support]: https://github.com/retextjs/.github/blob/master/support.md

[coc]: https://github.com/retextjs/.github/blob/master/code-of-conduct.md

[ideas]: https://github.com/retextjs/ideas

[awesome]: https://github.com/retextjs/awesome-retext

[license]: https://github.com/retextjs/Lobby/blob/master/license

[author]: https://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[unified]: https://github.com/unifiedjs/unified

[announcement]: https://medium.com/unifiedjs/collectively-evolving-through-crowdsourcing-22c359ea95cc

[latin]: https://github.com/retextjs/retext/tree/master/packages/retext-latin

[stringify]: https://github.com/retextjs/retext/tree/master/packages/retext-stringify

[plugins]: https://github.com/retextjs/retext/tree/master/doc/plugins.md

[retext]: https://github.com/retextjs/retext

[nlcst]: https://github.com/syntax-tree/nlcst

[unified-usage]: https://github.com/unifiedjs/unified#usage
