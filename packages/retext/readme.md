# retext [![Build][build-badge]][build] [![Coverage][coverage-badge]][coverage] [![Downloads][downloads-badge]][downloads] [![Size][size-badge]][size] [![Chat][chat-badge]][chat]

[**retext**][retext] is a natural language processor powered by [plugins][]
part of the [unified][] [collective][].

*   API by [`unified`][unified]
*   Parses natural language to the tree with [`retext-latin`][latin]
*   [**nlcst**][nlcst] syntax tree
*   [Plugins][] transform the tree
*   Compiles the tree to markdown using [`retext-stringify`][stringify]

Don’t need the parser?  Or the compiler?  [That’s OK][unified-usage].

* * *

**Announcing the unified collective!  🎉
[Read more about it on Medium »][announcement]**

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
      <a href="https://www.gatsbyjs.org">Gatsby</a></td>
    <td width="20%" align="center">
      <a href="https://compositor.io"><img src="https://avatars1.githubusercontent.com/u/19245838?s=400&v=4"></a>
      <br><br>🥉
      <a href="https://compositor.io">Compositor</a>
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

## Installation

[npm][]:

```bash
npm install retext
```

## Usage

```js
var retext = require('retext')
var profanities = require('retext-profanities')
var emoji = require('retext-emoji')
var report = require('vfile-reporter')

var doc = 'He’s set on beating your butt for sheriff! :cop:'

retext()
  .use(profanities)
  .use(emoji, {convert: 'encode'})
  .process(doc, function(err, file) {
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

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/retextjs/retext/master.svg

[build]: https://travis-ci.org/retextjs/retext

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext.svg

[coverage]: https://codecov.io/github/retextjs/retext

[downloads-badge]: https://img.shields.io/npm/dm/retext.svg

[downloads]: https://www.npmjs.com/package/retext

[size-badge]: https://img.shields.io/bundlephobia/minzip/retext.svg

[size]: https://bundlephobia.com/result?p=retext

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/retext

[license]: https://github.com/retextjs/Lobby/blob/master/license

[author]: https://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[retext]: https://github.com/retextjs/retext

[unified]: https://github.com/unifiedjs/unified

[nlcst]: https://github.com/syntax-tree/nlcst

[latin]: https://github.com/retextjs/retext/blob/master/packages/retext-latin

[stringify]: https://github.com/retextjs/retext/blob/master/packages/retext-stringify

[plugins]: https://github.com/retextjs/retext/blob/master/doc/plugins.md

[unified-usage]: https://github.com/unifiedjs/unified#usage

[collective]: https://opencollective.com/unified

[announcement]: https://medium.com/unifiedjs/collectively-evolving-through-crowdsourcing-22c359ea95cc
