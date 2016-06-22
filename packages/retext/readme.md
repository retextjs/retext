# retext [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

The [**retext**][retext] processor is a natural language processor
powered by [plug-ins][plugins].

*   Interface by [**unified**][unified];
*   [**nlcst**][nlcst] syntax tree;
*   Parses natural language to the tree with [**retext-latin**][latin];
*   [Plug-ins][plugins] transform the tree;
*   Compiles the tree to text using [**retext-stringify**][stringify].

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
        file.filename = 'example';
        file.extension = 'txt';
        console.log(file.toString());
        console.error(report(file));
    });
```

Yields:

```txt
He’s set on beating your butt for sheriff! 👮
example.txt
    26-1:30  warning  Be careful with “butt”, it’s profane in some cases  butt

⚠ 1 warning
```

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

[retext]: https://github.com/wooorm/retext

[unified]: https://github.com/wooorm/unified

[nlcst]: https://github.com/wooorm/nlcst

[latin]: https://github.com/wooorm/retext/blob/master/packages/retext-latin

[stringify]: https://github.com/wooorm/retext/blob/master/packages/retext-stringify

[plugins]: https://github.com/wooorm/retext/blob/master/doc/plugins.md

[unified-usage]: https://github.com/wooorm/unified#usage
