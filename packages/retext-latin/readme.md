# retext-latin [![Build][build-badge]][build] [![Coverage][coverage-badge]][coverage] [![Downloads][downloads-badge]][downloads] [![Size][size-badge]][size] [![Chat][chat-badge]][chat]

[Parser][] for [**unified**][unified].
Parses Latin-script natural language to a syntax tree ([**nlcst**][nlcst]).
Used in the [**retext** processor][processor].

## Installation

[npm][]:

```bash
npm install retext-latin
```

## Usage

```js
var unified = require('unified')
var stream = require('unified-stream')
var latin = require('retext-latin')
var stringify = require('retext-stringify')
var emoji = require('retext-emoji')

var processor = unified()
  .use(latin)
  .use(emoji, {convert: 'encode'})
  .use(stringify)

process.stdin.pipe(stream(processor)).pipe(process.stdout)
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

[build-badge]: https://img.shields.io/travis/retextjs/retext/master.svg

[build]: https://travis-ci.org/retextjs/retext

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext.svg

[coverage]: https://codecov.io/github/retextjs/retext

[downloads-badge]: https://img.shields.io/npm/dm/retext-latin.svg

[downloads]: https://www.npmjs.com/package/retext-latin

[size-badge]: https://img.shields.io/bundlephobia/minzip/retext-latin.svg

[size]: https://bundlephobia.com/result?p=retext-latin

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/retext

[license]: https://github.com/retextjs/retext/blob/master/license

[author]: https://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[unified]: https://github.com/unifiedjs/unified

[processor]: https://github.com/retextjs/retext/blob/master/packages/retext

[nlcst]: https://github.com/syntax-tree/nlcst

[parser]: https://github.com/unifiedjs/unified#processorparser

[parse-latin]: https://github.com/wooorm/parse-latin
