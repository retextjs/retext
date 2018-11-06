# retext-english [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

[Parser][] for [**unified**][unified].  Parses the English language to
an [**NLCST**][nlcst] syntax tree.

## Installation

[npm][]:

```bash
npm install retext-english
```

## Usage

```js
var unified = require('unified');
var stream = require('unified-stream');
var english = require('retext-english');
var stringify = require('retext-stringify');
var emoji = require('retext-emoji');

var processor = unified()
  .use(english)
  .use(emoji, {convert: 'encode'})
  .use(stringify);

process.stdin.pipe(stream(processor)).pipe(process.stdout);
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

[build-badge]: https://img.shields.io/travis/retextjs/retext.svg

[build-status]: https://travis-ci.org/retextjs/retext

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext.svg

[coverage-status]: https://codecov.io/github/retextjs/retext

[chat-badge]: https://img.shields.io/gitter/room/retextjs/Lobby.svg

[chat]: https://gitter.im/retextjs/Lobby

[license]: https://github.com/retextjs/retext/blob/master/license

[author]: http://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[unified]: https://github.com/unifiedjs/unified

[nlcst]: https://github.com/syntax-tree/nlcst

[parser]: https://github.com/unifiedjs/unified#processorparser

[parse-english]: https://github.com/wooorm/parse-english
