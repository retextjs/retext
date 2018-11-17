# retext-english [![Build][build-badge]][build] [![Coverage][coverage-badge]][coverage] [![Downloads][downloads-badge]][downloads] [![Size][size-badge]][size] [![Chat][chat-badge]][chat]

[Parser][] for [**unified**][unified].
Parses the English language to [**nlcst**][nlcst] syntax trees.

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
npm install retext-english
```

## Usage

```js
var unified = require('unified')
var stream = require('unified-stream')
var english = require('retext-english')
var stringify = require('retext-stringify')
var emoji = require('retext-emoji')

var processor = unified()
  .use(english)
  .use(emoji, {convert: 'encode'})
  .use(stringify)

process.stdin.pipe(stream(processor)).pipe(process.stdout)
```

## Table of Contents

*   [API](#api)
    *   [processor.use(english)](#processoruseenglish)
    *   [english.Parser](#englishparser)
*   [License](#license)

## API

### `processor.use(english)`

Configure the `processor` to read English text as input.

There is no configuration for the parser.

### `english.Parser`

Access to the [parser][] ([`parse-english`][parse-english]).

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/retextjs/retext/master.svg

[build]: https://travis-ci.org/retextjs/retext

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext.svg

[coverage]: https://codecov.io/github/retextjs/retext

[downloads-badge]: https://img.shields.io/npm/dm/retext-english.svg

[downloads]: https://www.npmjs.com/package/retext-english

[size-badge]: https://img.shields.io/bundlephobia/minzip/retext-english.svg

[size]: https://bundlephobia.com/result?p=retext-english

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/retext

[license]: https://github.com/retextjs/retext/blob/master/license

[author]: https://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[unified]: https://github.com/unifiedjs/unified

[nlcst]: https://github.com/syntax-tree/nlcst

[parser]: https://github.com/unifiedjs/unified#processorparser

[parse-english]: https://github.com/wooorm/parse-english

[announcement]: https://medium.com/unifiedjs/collectively-evolving-through-crowdsourcing-22c359ea95cc
