# retext-stringify [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

[Compiler][] for [**unified**][unified].  Stringifies an
[**nlcst**][nlcst] syntax tree to text.  Used in the [**retext**
processor][processor].

## Installation

[npm][]:

```bash
npm install retext-stringify
```

## Usage

```js
var unified = require('unified');
var english = require('retext-english');
var stringify = require('retext-stringify');
var emoji = require('retext-emoji');

process.stdin
    .pipe(unified())
    .use(english)
    .use(emoji, {convert: 'encode'})
    .use(stringify)
    .pipe(process.stdout);
```

## Table of Contents

*   [API](#api)
    *   [processor.use(stringify)](#processorusestringify)
*   [License](#license)

## API

### `processor.use(stringify)`

Configure the `processor` to stringify [**nlcst**][nlcst] syntax trees
to text.

There is no configuration for the parser.

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

[processor]: https://github.com/wooorm/retext

[compiler]: https://github.com/wooorm/unified#processorcompiler

[nlcst]: https://github.com/wooorm/nlcst
