# ![retext][logo]

[![Build Status][build-badge]][build-status]
[![Coverage Status][coverage-badge]][coverage-status]
[![Code Climate][climate-badge]][climate-status]

**retext** is an extensible natural language processor with support for
multiple languages. **retext** provides a pluggable system for analysing
and manipulating natural language in JavaScript. It works on Node and
in the Browser.

> Rather than being a do-all library for Natural Language Processing
> (such as [NLTK][] or [OpenNLP][]), **retext** aims to be useful for
> more practical use cases (such as checking for [insensitive words][alex]
> or decoding [emoticons][retext-emoji]) instead of more academic
> goals (research purposes).
> **retext** is inherently modular—it uses plugins (similar to
> [remark][] for markdown) instead of providing everything out of
> the box (such as  [Natural][]). This makes **retext** a viable
> tool for use on the web.

## Installation

[npm][]:

```bash
npm install retext
```

**retext** is also available as an AMD, CommonJS, and globals module,
[uncompressed and compressed][releases].

## Usage

The following example uses [**retext-emoji**][retext-emoji] to show
emoji and [**retext-smartypants**][retext-smartypants] for smart
punctuation.

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

### `retext.use(plugin[, options])`

Change the way [**retext**][api] works by using a [plugin][].

**Signatures**

*   `processor = retext.use(plugin, options?)`;
*   `processor = retext.use(plugins)`.

**Parameters**

*   `plugin` (`Function`) — A [**Plugin**][plugin];

*   `plugins` (`Array.<Function>`) — A list of [**Plugin**][plugin]s;

*   `options` (`Object?`) — Passed to the plugin. Specified by its
    documentation.

**Returns**

`Object` — an instance of Retext: The returned object functions just like
**retext** (it has the same methods), but caches the `use`d plugins. This
provides the ability to chain `use` calls to use multiple plugins, but
ensures the functioning of the **retext** module does not change for other
dependents.

### `retext.process(value[, done])`

Parse a text document, apply plugins to it, and compile it into
something else.

**Parameters**

*   `value` ([`VFile`][vfile] or `string`)
    — Text document;

*   `done` ([`Function`][done], optional).

**Returns**

`string?`: A document. Formatted in whatever plugins generate. The result is
`null` if a plugin is asynchronous, in which case the callback `done` should’ve
been passed (don’t worry: plugin creators make sure you know its async).

### `function done(err, file, doc)`

Callback invoked when the output is generated with either an error, or the
processed document (represented as a virtual file and a string).

**Parameters**

*   `err` (`Error?`) — Reason of failure;
*   `file` ([`VFile?`][vfile]) — Virtual file;
*   `doc` (`string?`) — Generated document.

## Plugin

### `function attacher(retext[, options])`

A plugin is a function, which takes the **Retext** instance a user attached
the plugin on as a first parameter and optional configuration as a second
parameter.

A plugin can return a `transformer`.

### `function transformer(node, file[, next])`

A transformer changes the provided document (represented as a node and a
virtual file).

Transformers can be asynchronous, in which case `next` must be invoked
(optionally with an error) when done.

## List of Plugins

*   [`dunckr/retext-cliches`](https://github.com/dunckr/retext-cliches)
    — Check phrases for cliches;

*   [`wooorm/retext-dutch`](https://github.com/wooorm/retext-dutch)
    — Dutch language support;

*   [`wooorm/retext-english`](https://github.com/wooorm/retext-english)
    — English language support;

*   [`wooorm/retext-emoji`](https://github.com/wooorm/retext-emoji)
    — (**[demo](http://wooorm.github.io/retext-emoji/)**)
    — Encode or decode [Gemojis](https://github.com/github/gemoji);

*   [`wooorm/retext-equality`](https://github.com/wooorm/retext-equality)
    — Warn about possible insensitive, inconsiderate language;

*   [`wooorm/retext-intensify`](https://github.com/wooorm/retext-intensify)
    — Check weak and mitigating wording;

*   [`wooorm/retext-keywords`](https://github.com/wooorm/retext-keywords)
    — (**[demo](http://wooorm.github.io/retext-keywords/)**)
    — Extract keywords and keyphrases;

*   [`wooorm/retext-profanities`](https://github.com/wooorm/retext-profanities)
    — Check profane and vulgar wording;

*   [`wooorm/retext-readability`](https://github.com/wooorm/retext-readability)
    — Check readability;

*   [`wooorm/retext-sentiment`](https://github.com/wooorm/retext-sentiment)
    — (**[demo](http://wooorm.github.io/retext-sentiment/)**)
    — Detect sentiment in text;

*   [`wooorm/retext-simplify`](https://github.com/wooorm/retext-simplify)
    — Check phrases for simpler alternatives;

*   [`wooorm/retext-smartypants`](https://github.com/wooorm/retext-smartypants)
    — (**[demo](http://wooorm.github.io/retext-smartypants/)**)
    — Implementation of [SmartyPants](http://daringfireball.net/projects/smartypants/).

## List of Utilities

The following projects are useful when working with the syntax tree,
[NLCST][]:

*   [`wooorm/nlcst-is-literal`](https://github.com/wooorm/nlcst-is-literal)
    — Check whether a node is meant literally;

*   [`wooorm/nlcst-normalize`](https://github.com/wooorm/nlcst-normalize)
    — Normalize a word for easier comparison;

*   [`wooorm/nlcst-search`](https://github.com/wooorm/nlcst-search)
    — Search for patterns in an NLCST tree;

*   [`wooorm/nlcst-to-string`](https://github.com/wooorm/nlcst-to-string)
    — Stringify a node;

*   [`wooorm/nlcst-test`](https://github.com/wooorm/nlcst-test)
    — Validate a NLCST node;

In addition, see [`wooorm/unist`][unist] for other utilities which
work with **retext** nodes, but also with other nodes.

And finally, see [`wooorm/vfile`][vfile] for a list of utilities which
work with virtual files.

## List of Products

The following products use **retext**:

### CLI

*   [`wooorm/alex`](https://github.com/wooorm/nlcst-to-string)
    — Catch insensitive, inconsiderate writing.

### Node

*   [`voischev/posthtml-retext`](https://github.com/voischev/posthtml-retext)
    — PostHTML plugin wrapper.

## Related

*   [nlcst][]
*   [unist][]
*   [vfile][]
*   [unified][]

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[logo]: https://cdn.rawgit.com/wooorm/retext/master/logo.svg

[build-badge]: https://img.shields.io/travis/wooorm/retext.svg

[build-status]: https://travis-ci.org/wooorm/retext

[coverage-badge]: https://img.shields.io/codecov/c/github/wooorm/retext.svg

[coverage-status]: https://codecov.io/github/wooorm/retext

[climate-badge]: http://img.shields.io/codeclimate/github/wooorm/retext.svg

[climate-status]: https://codeclimate.com/github/wooorm/retext

[author]: http://wooorm.com

[npm]: https://docs.npmjs.com/cli/install

[releases]: https://github.com/wooorm/retext/releases

[vfile]: https://github.com/wooorm/vfile

[unist]: https://github.com/wooorm/unist

[nlcst]: https://github.com/wooorm/nlcst

[unified]: https://github.com/wooorm/unified

[api]: #api

[plugin]: #plugin

[done]: #function-doneerr-file-doc

[license]: LICENSE

[nltk]: http://www.nltk.org

[opennlp]: https://opennlp.apache.org

[alex]: https://github.com/wooorm/alex

[retext-emoji]: https://github.com/wooorm/retext-emoji

[remark]: https://github.com/wooorm/remark

[natural]: https://github.com/NaturalNode/natural

[retext-smartypants]: https://github.com/wooorm/retext-smartypants
