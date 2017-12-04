# retext [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

The [**retext**][retext] processor is a natural language processor
powered by [plug-ins][plugins].

*   Interface by [**unified**][unified]
*   [**nlcst**][nlcst] syntax tree
*   Parses natural language to the tree with [**retext-latin**][latin]
*   [Plug-ins][plugins] transform the tree
*   Compiles the tree to text using [**retext-stringify**][stringify]

Don’t need the parser, or another parser?  [That’s OK][unified-usage].

## Installation

[npm][]:

```bash
npm install retext
```

## Usage

```js
var retext = require('retext');
var profanities = require('retext-profanities');
var emoji = require('retext-emoji');
var report = require('vfile-reporter');

retext()
  .use(profanities)
  .use(emoji, {convert: 'encode'})
  .process('He’s set on beating your butt for sheriff! :cop:', function (err, file) {
    console.log(String(file));
    console.error(report(err || file));
  });
```

Yields:

```txt
He’s set on beating your butt for sheriff! 👮
  1:26-1:30  warning  Be careful with “butt”, it’s profane in some cases  butt  retext-profanities

⚠ 1 warning
```

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/retextjs/retext.svg

[build-status]: https://travis-ci.org/retextjs/retext

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext.svg

[coverage-status]: https://codecov.io/github/retextjs/retext

[chat-badge]: https://img.shields.io/gitter/room/retextjs/Lobby.svg

[chat]: https://gitter.im/retextjs/Lobby

[license]: https://github.com/retextjs/Lobby/blob/master/LICENSE

[author]: http://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[retext]: https://github.com/retextjs/retext

[unified]: https://github.com/unifiedjs/unified

[nlcst]: https://github.com/syntax-tree/nlcst

[latin]: https://github.com/retextjs/retext/blob/master/packages/retext-latin

[stringify]: https://github.com/retextjs/retext/blob/master/packages/retext-stringify

[plugins]: https://github.com/retextjs/retext/blob/master/doc/plugins.md

[unified-usage]: https://github.com/unifiedjs/unified#usage
