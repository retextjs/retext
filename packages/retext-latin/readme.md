# retext-latin [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

[Parser][] for [**unified**][unified].  Parses Latin-script natural
language to an [**nlcst**][nlcst] syntax tree.  Used in the [**retext**
processor][processor].

## Installation

[npm][]:

```bash
npm install retext-latin
```

## Usage

```js
var unified = require('unified');
var latin = require('retext-latin');
var stringify = require('retext-stringify');
var emoji = require('retext-emoji');

process.stdin
    .pipe(unified())
    .use(latin)
    .use(emoji, {convert: 'encode'})
    .use(stringify)
    .pipe(process.stdout);
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

Access to the [parser][] ([`wooorm/parse-latin`][parse-latin]).

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

[unified]: https://github.com/wooorm/unified

[processor]: https://github.com/wooorm/retext/blob/master/packages/retext

[nlcst]: https://github.com/wooorm/nlcst

[parser]: https://github.com/wooorm/unified#processorparser

[parse-latin]: https://github.com/wooorm/parse-latin
