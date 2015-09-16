# ![Retext](https://cdn.rawgit.com/wooorm/retext/master/logo.svg)

[![Build Status](https://img.shields.io/travis/wooorm/retext.svg)](https://travis-ci.org/wooorm/retext) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/retext.svg)](https://codecov.io/github/wooorm/retext) [![Code Climate](http://img.shields.io/codeclimate/github/wooorm/retext.svg)](https://codeclimate.com/github/wooorm/retext)

**retext** is an extensible natural language processor with support for
multiple languages. **Retext** provides a pluggable system for analysing
and manipulating natural language in JavaScript. Node and the browser.
100% coverage.

> Rather than being a do-all library for Natural Language Processing (such as
> [NLTK](http://www.nltk.org) or [OpenNLP](https://opennlp.apache.org)),
> **retext** aims to be useful for more practical use cases (such as checking
> for [insensitive words](https://github.com/wooorm/alex) or decoding
> [emoticons](https://github.com/wooorm/retext-emoji)) instead of more academic
> goals (research purposes).
> **retext** is inherently modular—it uses plugins (similar to
> [mdast](https://github.com/wooorm/mdast/) for markdown) instead of providing
> everything out of the box (such as
> [Natural](https://github.com/NaturalNode/natural)). This makes **retext** a
> viable tool for use on the web.

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install retext
```

**retext** is also available for [bower](http://bower.io/#install-packages),
and [duo](http://duojs.org/#getting-started), and as an AMD, CommonJS, and
globals module, [uncompressed](retext.js) and [compressed](retext.min.js).

## Usage

The following example uses [**retext-emoji**](https://github.com/wooorm/retext-emoji)
to show emoji and [**retext-smartypants**](https://github.com/wooorm/retext-smartypants)
for smart punctuation.

Require dependencies:

```javascript
var retext = require('retext');
var emoji = require('retext-emoji');
var smartypants = require('retext-smartypants');
```

Create an instance using retext-emoji and -smartypants:

```javascript
var processor = retext().use(smartypants).use(emoji, {
    'convert' : 'encode'
});
```

Process a document:

```javascript
var doc = processor.process([
    'The three wise monkeys [. . .] sometimes called the three mystic',
    'apes--are a pictorial maxim. Together they embody the proverbial',
    'principle to ("see no evil, hear no evil, speak no evil"). The',
    'three monkeys are Mizaru (:see_no_evil:), covering his eyes, who',
    'sees no evil; Kikazaru (:hear_no_evil:), covering his ears, who',
    'hears no evil; and Iwazaru (:speak_no_evil:), covering his mouth,',
    'who speaks no evil.'
].join('\n'));
```

Yields (you need a browser which supports emoji to see them):

```text
The three wise monkeys […] sometimes called the three mystic
apes—are a pictorial maxim. Together they embody the proverbial
principle to (“see no evil, hear no evil, speak no evil”). The
three monkeys are Mizaru (🙈), covering his eyes, who
sees no evil; Kikazaru (🙉), covering his ears, who
hears no evil; and Iwazaru (🙊), covering his mouth,
who speaks no evil.
```

## API

### [retext](#api).use([plugin](#plugin)\[, options\])

Change the way [**retext**](#api) works by using a [plugin](#plugin).

**Signatures**

*   `processor = retext.use(plugin, options?)`;
*   `processor = retext.use(plugins)`.

**Parameters**

*   `plugin` (`Function`) — A [**Plugin**](#plugin);

*   `plugins` (`Array.<Function>`) — A list of [**Plugin**](#plugin)s;

*   `options` (`Object?`) — Passed to the plugin. Specified by its
    documentation.

**Returns**

`Object` — an instance of Retext: The returned object functions just like
**retext** (it has the same methods), but caches the `use`d plugins. This
provides the ability to chain `use` calls to use multiple plugins, but
ensures the functioning of the **retext** module does not change for other
dependents.

### [retext](#api).process(value\[, [done](#function-doneerr-file-doc)\])

Parse a text document, apply plugins to it, and compile it into
something else.

**Signatures**

*   `doc = mdast.process(value[, done])`.

**Parameters**

*   `value` ([`VFile`](https://github.com/wooorm/vfile) or `string`)
    — Text document;

*   `done` ([`Function`](#function-doneerr-file-doc), optional).

**Returns**

`string?`: A document. Formatted in whatever plugins generate. The result is
`null` if a plugin is asynchronous, in which case the callback `done` should’ve
been passed (don’t worry: plugin creators make sure you know its async).

### function done(err, [file](https://github.com/wooorm/vfile), doc)

Callback invoked when the output is generated with either an error, or the
processed document (represented as a virtual file and a string).

**Parameters**

*   `err` (`Error?`) — Reason of failure;
*   `file` ([`VFile?`](https://github.com/wooorm/vfile)) — Virtual file;
*   `doc` (`string?`) — Generated document.

## Plugin

### function attacher([retext](#api)\[, options\])

A plugin is a function, which takes the **Retext** instance a user attached
the plugin on as a first parameter and optional configuration as a second
parameter.

A plugin can return a `transformer`.

### function transformer([node](https://github.com/wooorm/nlcst), [file](https://github.com/wooorm/vfile)\[, next\])

A transformer changes the provided document (represented as a node and a
virtual file).

Transformers can be asynchronous, in which case `next` must be invoked
(optionally with an error) when done.

## List of Plugins

*   [retext-directionality](https://github.com/wooorm/retext-directionality)
    — (**[demo](http://wooorm.github.io/retext-directionality/)**)
    — Detect the direction text is written in;

*   [retext-dom](https://github.com/wooorm/retext-dom)
    — (**[demo](http://wooorm.github.io/retext-dom/)**)
    — Create a (living) DOM tree from a TextOM tree;

*   [retext-double-metaphone](https://github.com/wooorm/retext-double-metaphone)
    — (**[demo](http://wooorm.github.io/retext-double-metaphone/)**)
    — Implementation of the Double Metaphone algorithm;

*   [retext-dutch](https://github.com/wooorm/retext-dutch)
    — Dutch language support;

*   [retext-english](https://github.com/wooorm/retext-english)
    — English language support;

*   [retext-emoji](https://github.com/wooorm/retext-emoji)
    — (**[demo](http://wooorm.github.io/retext-emoji/)**)
    — Encode or decode [Gemojis](https://github.com/github/gemoji);

*   [retext-equality](https://github.com/wooorm/retext-equality)
    — Warn about possible insensitive, inconsiderate language;

*   [retext-keywords](https://github.com/wooorm/retext-keywords)
    — (**[demo](http://wooorm.github.io/retext-keywords/)**)
    — Extract keywords and keyphrases;

*   [retext-lancaster-stemmer](https://github.com/wooorm/retext-lancaster-stemmer)
    — (**[demo](http://wooorm.github.io/retext-lancaster-stemmer/)**)
    — Implementation of [the Lancaster (Paice/Husk) algorithm](http://www.comp.lancs.ac.uk/computing/research/stemming/index.htm);

*   [retext-language](https://github.com/wooorm/retext-language)
    — (**[demo](http://wooorm.github.io/retext-language/)**)
    — Detect the language of text;

*   [retext-metaphone](https://github.com/wooorm/retext-metaphone)
    — (**[demo](http://wooorm.github.io/retext-metaphone/)**)
    — Implementation of the Metaphone algorithm;

*   [retext-porter-stemmer](https://github.com/wooorm/retext-porter-stemmer)
    — (**[demo](http://wooorm.github.io/retext-porter-stemmer/)**)
    — Implementation of [the Porter stemming algorithm](http://tartarus.org/martin/PorterStemmer/);

*   [retext-pos](https://github.com/wooorm/retext-pos)
    — (**[demo](http://wooorm.github.io/retext-pos/)**)
    — Part-of-speech tagger;

*   [retext-sentiment](https://github.com/wooorm/retext-sentiment)
    — (**[demo](http://wooorm.github.io/retext-sentiment/)**)
    — Detect sentiment in text;

*   [retext-smartypants](https://github.com/wooorm/retext-smartypants)
    — (**[demo](http://wooorm.github.io/retext-smartypants/)**)
    — Implementation of [SmartyPants](http://daringfireball.net/projects/smartypants/);

*   [retext-soundex](https://github.com/wooorm/retext-soundex)
    — (**[demo](http://wooorm.github.io/retext-soundex/)**)
    — Implementation of the Soundex algorithm;

*   [retext-syllable](https://github.com/wooorm/retext-syllable)
    — (**[demo](http://wooorm.github.io/retext-syllable/)**)
    — Syllable count;

## List of Utilities

The following projects are useful when working with the syntax tree,
[NLCST](https://github.com/wooorm/nlcst):

*   [wooorm/nlcst-to-string](https://github.com/wooorm/nlcst-to-string)
    — Stringify a node;

*   [wooorm/nlcst-is-literal](https://github.com/wooorm/nlcst-is-literal)
    — Check whether a node is meant literally;

*   [wooorm/nlcst-test](https://github.com/wooorm/nlcst-test)
    — Validate a NLCST node;

In addition, see [`wooorm/unist`](https://github.com/wooorm/unist#unist-node-utilties)
for other utilities which work with **retext** nodes, but also with
[**mdast**](https://github.com/wooorm/mdast) nodes.

And finally, see [`wooorm/vfile`](https://github.com/wooorm/vfile#related-tools)
for a list of utilities for working with virtual files.

## Related

*   [nlcst](https://github.com/wooorm/nlcst)
*   [unist](https://github.com/wooorm/unist)
*   [unified](https://github.com/wooorm/unified)

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
