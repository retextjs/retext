# retext [![Build Status](https://travis-ci.org/wooorm/retext.svg?branch=master)](https://travis-ci.org/wooorm/retext) [![Coverage Status](https://img.shields.io/coveralls/wooorm/retext.svg)](https://coveralls.io/r/wooorm/retext?branch=master)

[![browser support](https://ci.testling.com/wooorm/retext.png) ](https://ci.testling.com/wooorm/retext)

---

**retext** is a extensible natural language parser system—by default using [parse-english](https://github.com/wooorm/parse-english) as a parser and [textom](https://github.com/wooorm/textom/) as the object model. Provides a plugin-system for analysing and manipulating natural language. In JavaScript. NodeJS, and the browser. Tests provide 100% coverage.

## Installation

NPM:
```sh
$ npm install retext
```

Component.js:
```sh
$ component install wooorm/retext
```

## Usage

```js
var Retext = require('retext'),
    emoji = require('retext-emoji'),
    smartypants = require('retext-smartypants'),
    input;

// Modified first paragraph from: 
//   http://en.wikipedia.org/wiki/Three_wise_monkeys
input = 'The three wise monkeys [. . .] sometimes called the ' +
        'three mystic apes--are a pictorial maxim. Together ' +
        'they embody the proverbial principle to ("see no evil, ' +
        'hear no evil, speak no evil"). The three monkeys are ' +
        'Mizaru (:see_no_evil:), covering his eyes, who sees no ' +
        'evil; Kikazaru (:hear_no_evil:), covering his ears, ' +
        'who hears no evil; and Iwazaru (:speak_no_evil:), ' +
        'covering his mouth, who speaks no evil.'

var text = new Retext()
  .use(emoji({
      'convert' : 'encode'
  }))
  .use(smartypants())
  .parse(input)
  .toString();
// The three wise monkeys […] sometimes called the three
// mystic apes—are a pictorial maxim. Together they
// embody the proverbial principle to (“see no evil,
// hear no evil, speak no evil”). The three monkeys are
// Mizaru (🙈), covering his eyes, who sees no evil;
// Kikazaru (🙉), covering his ears, who hears no evil;
// and Iwazaru (🙊), covering his mouth, who speaks no evil.
```

Plugins used: [retext-emoji](https://github.com/wooorm/retext-emoji) and [retext-smartypants](https://github.com/wooorm/retext-smartypants).

## API

### Retext(parser)

Return a new `Retext` instance with the given parser (defaults to `"parse-english"`).

### Retext.prototype.use(plugin)

Takes a plugin—a humble function. When `Retext#parse` is called, the plugin will be invoked with the parsed tree, and the Retext instance as arguments. Returns self.

### Retext.prototype.parse(source)

Parses the given source and returns the (by `use`d plugins, modified) tree.

## Plugins

  * [retext-visit](https://github.com/wooorm/retext-visit) — visit nodes, optionally by type;
  * [retext-smartypants](https://github.com/wooorm/retext-smartypants) — implementation of [SmartyPants](http://daringfireball.net/projects/smartypants/);
  * [retext-emoji](https://github.com/wooorm/retext-emoji) — Encode or decode [Gemojis](https://github.com/github/gemoji);
  * [retext-porter-stemmer](https://github.com/wooorm/retext-porter-stemmer) — implementation of [the Porter stemming algorithm](http://tartarus.org/martin/PorterStemmer/);

## Related

  * [parse-english](https://github.com/wooorm/parse-english "Parse English")
  * [textom](https://github.com/wooorm/textom "TextOM")

## License

  MIT
