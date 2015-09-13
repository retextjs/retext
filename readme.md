# ![Retext](https://cdn.rawgit.com/wooorm/retext/master/logo.svg)

[![Build Status](https://img.shields.io/travis/wooorm/retext.svg)](https://travis-ci.org/wooorm/retext) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/retext.svg)](https://codecov.io/github/wooorm/retext) [![Code Climate](http://img.shields.io/codeclimate/github/wooorm/retext.svg)](https://codeclimate.com/github/wooorm/retext)

> **Retext is going to [change
> soon](https://github.com/wooorm/retext/issues/23). You probably wan’t to use
> the [next, stable, version](https://github.com/wooorm/retext/tree/feature/stable).**

**retext** is an extensible natural language system—by default using
[**parse-latin**](https://github.com/wooorm/parse-latin) to transform natural
language into **[NLCST](https://github.com/wooorm/nlcst/)**.
**Retext** provides a pluggable system for analysing and manipulating natural
language in JavaScript. NodeJS and the browser. Tests provide 100% coverage.

> Rather than being a do-all library for Natural Language Processing (such as
> [NLTK](http://www.nltk.org) or [OpenNLP](https://opennlp.apache.org)),
> **retext** aims to be useful for more practical use cases (such as censoring
> profane words or decoding emoticons, but the possibilities are endless)
> instead of more academic goals (research purposes).
> **retext** is inherently modular—it uses plugins (similar to
> [rework](https://github.com/reworkcss/rework/) for CSS) instead of providing
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
(to show emoji) and [**retext-smartypants**](https://github.com/wooorm/retext-smartypants)
(for smart punctuation).

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
var doc = processor.process(
    'The three wise monkeys [. . .] sometimes called the ' +
    'three mystic apes--are a pictorial maxim. Together ' +
    'they embody the proverbial principle to ("see no evil, ' +
    'hear no evil, speak no evil"). The three monkeys are ' +
    'Mizaru (:see_no_evil:), covering his eyes, who sees no ' +
    'evil; Kikazaru (:hear_no_evil:), covering his ears, ' +
    'who hears no evil; and Iwazaru (:speak_no_evil:), ' +
    'covering his mouth, who speaks no evil.'
);
```

Yields (you need a browser which supports emoji to see them):

```text
The three wise monkeys […] sometimes called the three
mystic apes—are a pictorial maxim. Together they
embody the proverbial principle to (“see no evil,
hear no evil, speak no evil”). The three monkeys are
Mizaru (🙈), covering his eyes, who sees no evil;
Kikazaru (🙉), covering his ears, who hears no evil;
and Iwazaru (🙊), covering his mouth, who speaks no evil.
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

`Object`: an instance of Retext: The returned object functions just like
**retext** (it has the same methods), but caches the `use`d plugins. This
provides the ability to chain `use` calls to use multiple plugins, but
ensures the functioning of the **retext** module does not change for other
dependents.

### [retext](#api).process(value\[, done\])

Parse a text document, apply plugins to it, and compile it into
something else.

**Signatures**

*   `doc = mdast.process(value[, done])`.

**Parameters**

*   `value` (`string`) — Text document;

*   `done` (`function(err, doc, file)`, optional) — Callback invoked when the
    output is generated with either an error, or a result. Only strictly
    needed when async plugins are used.

**Returns**

`string` or `null`: A document. Formatted in whatever plugins generate.
The result is `null` if a plugin is asynchronous, in which case the callback
`done` should’ve been passed (don’t worry: plugin creators make sure you know
its async).

### plugin

A plugin is simply a function, with `function(retext[, options])` as its
signature. The first argument is the **Retext** instance a user attached the
plugin to. The plugin is invoked when a user `use`s the plugin (not when a
document is parsed) and enables the plugin to modify retext.

The plugin can return another function: `function(NLCSTNode, file[, next])`.
This function is invoked when a document is parsed.

## Plugins

*   [retext-directionality](https://github.com/wooorm/retext-directionality)
    — (**[demo](http://wooorm.github.io/retext-directionality/)**)
    — Detect the direction text is written in;

*   [retext-dom](https://github.com/wooorm/retext-dom)
    — (**[demo](http://wooorm.github.io/retext-dom/)**)
    — Create a (living) DOM tree from a TextOM tree;

*   [retext-double-metaphone](https://github.com/wooorm/retext-double-metaphone)
    — (**[demo](http://wooorm.github.io/retext-double-metaphone/)**)
    — Implementation of the Double Metaphone algorithm;

*   [retext-emoji](https://github.com/wooorm/retext-emoji)
    — (**[demo](http://wooorm.github.io/retext-emoji/)**)
    — Encode or decode [Gemojis](https://github.com/github/gemoji);

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

Although not **retext** plug-ins, the following projects are useful when
working with the [CST](https://github.com/wooorm/nlcst):

*   [wooorm/nlcst-to-string](https://github.com/wooorm/nlcst-to-string)
    — Stringify a node;

*   [wooorm/nlcst-is-literal](https://github.com/wooorm/nlcst-is-literal)
    — Check whether a node is meant literally;

In addition, see [`wooorm/unist`](https://github.com/wooorm/unist#unist-node-utilties)
for other utilities which work with **retext** nodes, but also with
[**mdast**](https://github.com/wooorm/mdast) nodes.

And finally, see [`wooorm/vfile`](https://github.com/wooorm/vfile#related-tools)
for a list of utilities for working with virtual files.

## Benchmark

On a MacBook Air, it parses about 2 big articles, 25 sections, or 230
paragraphs per second.

```text
           retext.parse(value, callback);
  325 op/s » A paragraph (5 sentences, 100 words)
   33 op/s » A section (10 paragraphs, 50 sentences, 1,000 words)
    3 op/s » An article (100 paragraphs, 500 sentences, 10,000 words)
```

## Related

*   [nlcst](https://github.com/wooorm/nlcst)

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
