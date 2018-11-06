# retext-stringify [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

[Compiler][] for [**unified**][unified].  Stringifies an
[**NLCST**][nlcst] syntax tree to text.  Used in the [**retext**
processor][processor].

## Installation

[npm][]:

```bash
npm install retext-stringify
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

[build-badge]: https://img.shields.io/travis/retextjs/retext.svg

[build-status]: https://travis-ci.org/retextjs/retext

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext.svg

[coverage-status]: https://codecov.io/github/retextjs/retext

[chat-badge]: https://img.shields.io/gitter/room/retextjs/Lobby.svg

[chat]: https://gitter.im/retextjs/Lobby

[license]: https://github.com/retextjs/retext/blob/master/license

[author]: https://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[unified]: https://github.com/unifiedjs/unified

[processor]: https://github.com/retextjs/retext

[compiler]: https://github.com/unifiedjs/unified#processorcompiler

[nlcst]: https://github.com/syntax-tree/nlcst
