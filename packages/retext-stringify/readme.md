# retext-stringify [![Build][build-badge]][build] [![Coverage][coverage-badge]][coverage] [![Downloads][downloads-badge]][downloads] [![Size][size-badge]][size] [![Chat][chat-badge]][chat]

[Compiler][] for [**unified**][unified].
Stringifies a syntax tree ([**nlcst**][nlcst]) to text.
Used in the [**retext** processor][processor].

## Installation

[npm][]:

```bash
npm install retext-stringify
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

[build-badge]: https://img.shields.io/travis/retextjs/retext/master.svg

[build]: https://travis-ci.org/retextjs/retext

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext.svg

[coverage]: https://codecov.io/github/retextjs/retext

[downloads-badge]: https://img.shields.io/npm/dm/retext-stringify.svg

[downloads]: https://www.npmjs.com/package/retext-stringify

[size-badge]: https://img.shields.io/bundlephobia/minzip/retext-stringify.svg

[size]: https://bundlephobia.com/result?p=retext-stringify

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/retext

[license]: https://github.com/retextjs/retext/blob/master/license

[author]: https://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[unified]: https://github.com/unifiedjs/unified

[processor]: https://github.com/retextjs/retext

[compiler]: https://github.com/unifiedjs/unified#processorcompiler

[nlcst]: https://github.com/syntax-tree/nlcst
