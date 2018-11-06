# retext-dutch [![Build][build-badge]][build] [![Coverage][coverage-badge]][coverage] [![Downloads][downloads-badge]][downloads] [![Size][size-badge]][size] [![Chat][chat-badge]][chat]

[Parser][] for [**unified**][unified].  Parses the Dutch language to
an [**NLCST**][nlcst] syntax tree.

## Installation

[npm][]:

```bash
npm install retext-dutch
```

## Usage

```js
var unified = require('unified')
var stream = require('unified-stream')
var dutch = require('retext-dutch')
var stringify = require('retext-stringify')
var emoji = require('retext-emoji')

var processor = unified()
  .use(dutch)
  .use(emoji, {convert: 'encode'})
  .use(stringify)

process.stdin.pipe(stream(processor)).pipe(process.stdout)
```

## Table of Contents

*   [API](#api)
    *   [processor.use(dutch)](#processorusedutch)
    *   [dutch.Parser](#dutchparser)
*   [License](#license)

## API

### `processor.use(dutch)`

Configure the `processor` to read Dutch text as input.

There is no configuration for the parser.

### `dutch.Parser`

Access to the [parser][] ([`parse-dutch`][parse-dutch]).

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/retextjs/retext/master.svg

[build]: https://travis-ci.org/retextjs/retext

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext.svg

[coverage]: https://codecov.io/github/retextjs/retext

[downloads-badge]: https://img.shields.io/npm/dm/retext-dutch.svg

[downloads]: https://www.npmjs.com/package/retext-dutch

[size-badge]: https://img.shields.io/bundlephobia/minzip/retext-dutch.svg

[size]: https://bundlephobia.com/result?p=retext-dutch

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/retext

[license]: https://github.com/retextjs/retext/blob/master/license

[author]: https://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[unified]: https://github.com/unifiedjs/unified

[nlcst]: https://github.com/syntax-tree/nlcst

[parser]: https://github.com/unifiedjs/unified#processorparser

[parse-dutch]: https://github.com/wooorm/parse-dutch
