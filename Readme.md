# retext [![Build Status](https://travis-ci.org/wooorm/retext.png)](https://travis-ci.org/wooorm/retext)

**retext** is a extensible natural language parser system—by default using [parse-english](https://github.com/wooorm/parse-english) as a parser and [textom](https://github.com/wooorm/textom/) as the object model. Provides a plugin-system for analysing and manipulating natural language. In JavaScript. NodeJS, and the browser. Tests provide 100% coverage.

## Installation

```sh
$ npm install retext
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

Return a new `Retext` instance with the given parser.

Takes a parser (Object, String, or null), or its name to use. Defaults to `"parse-english"`. When a string, requires the module.

### Retext.prototype.use(plugin)

Attaches a plugin. Returns self.

Takes a plugin—a humble function—and when the `parse` method of the Retext instance is called, the plugin will be called with the parsed tree, and the Retext instance as arguments. Plugins can also have an `attach` method, which will be only called once (when the plugin is `use`d).

### Retext.prototype.parse(source)

Parses the given source (using the to the constructor given parser), and returns the—by `use`d plugins, modified—tree.

Note that, during the parsing stage, when the `use` method is called by a plugin, the nested plugin is immediately called, before continuing on with its parent plugin—this enabled plugins to depend on other plugins.

Returns a RootNode.

## Related

  * [parse-english](https://github.com/wooorm/parse-english "Parse English")
  * [textom](https://github.com/wooorm/textom "TextOM")

## License

  MIT
