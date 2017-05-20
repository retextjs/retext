# retext-dutch [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

[Parser][] for [**unified**][unified].  Parses the Dutch language to
an [**NLCST**][nlcst] syntax tree.

## Installation

[npm][]:

```bash
npm install retext-dutch
```

## Usage

```js
var unified = require('unified');
var stream = require('unified-stream');
var dutch = require('retext-dutch');
var stringify = require('retext-stringify');
var emoji = require('retext-emoji');

var processor = unified()
  .use(dutch)
  .use(emoji, {convert: 'encode'})
  .use(stringify);

process.stdin.pipe(stream(processor)).pipe(process.stdout);
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

[build-badge]: https://img.shields.io/travis/wooorm/retext.svg

[build-status]: https://travis-ci.org/wooorm/retext

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/retext.svg

[coverage-status]: https://codecov.io/github/wooorm/retext

[chat-badge]: https://img.shields.io/gitter/room/wooorm/retext.svg

[chat]: https://gitter.im/wooorm/retext

[license]: https://github.com/wooorm/retext/blob/master/LICENSE

[author]: http://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[unified]: https://github.com/unifiedjs/unified

[nlcst]: https://github.com/syntax-tree/nlcst

[parser]: https://github.com/unifiedjs/unified#processorparser

[parse-dutch]: https://github.com/wooorm/parse-dutch
