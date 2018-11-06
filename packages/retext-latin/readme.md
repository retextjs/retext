# retext-latin [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

[Parser][] for [**unified**][unified].  Parses Latin-script natural
language to an [**NLCST**][nlcst] syntax tree.  Used in the [**retext**
processor][processor].

## Installation

[npm][]:

```bash
npm install retext-latin
```

## Usage

```js
var unified = require('unified');
var stream = require('unified-stream');
var latin = require('retext-latin');
var stringify = require('retext-stringify');
var emoji = require('retext-emoji');

var processor = unified()
  .use(latin)
  .use(emoji, {convert: 'encode'})
  .use(stringify);

process.stdin.pipe(stream(processor)).pipe(process.stdout);
```

## Table of Contents

*   [API](#api)
    *   [processor.use(latin)](#processoruselatin)
    *   [latin.Parser](#latinparser)
*   [License](#license)

## API

### `processor.use(latin)`

Configure the `processor` to read Latin-script text as input.

There is no configuration for the parser.

### `latin.Parser`

Access to the [parser][] ([`parse-latin`][parse-latin]).

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

[processor]: https://github.com/retextjs/retext/blob/master/packages/retext

[nlcst]: https://github.com/syntax-tree/nlcst

[parser]: https://github.com/unifiedjs/unified#processorparser

[parse-latin]: https://github.com/wooorm/parse-latin
