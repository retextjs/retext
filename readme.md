# ![Retext](https://cdn.rawgit.com/wooorm/retext/master/logo.svg)

[![Build Status](https://img.shields.io/travis/wooorm/retext.svg)](https://travis-ci.org/wooorm/retext) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/retext.svg)](https://codecov.io/github/wooorm/retext) [![Code Climate](http://img.shields.io/codeclimate/github/wooorm/retext.svg)](https://codeclimate.com/github/wooorm/retext)

> **Retext is going to [change
> soon](https://github.com/wooorm/retext/issues/23). You probably wan’t to use
> the [next, stable, version](https://github.com/wooorm/retext/tree/feature/stable).**

**retext** is an extensible natural language system—by default using
[**parse-latin**](https://github.com/wooorm/parse-latin) to transform natural
language into a **[TextOM](https://github.com/wooorm/textom/)** object model.
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

[Component.js](https://github.com/componentjs/component):

```bash
component install wooorm/retext
```

[Bower](http://bower.io/#install-packages):

```bash
bower install retext
```

[Duo](http://duojs.org/#getting-started):

```javascript
var Retext = require('wooorm/retext');
```

UMD (globals/AMD/CommonJS) ([uncompressed](retext.js) and [compressed](retext.min.js)):

```html
<script src="path/to/retext.js"></script>
<script>
  var retext = new Retext();
</script>
```

## Usage

The following example uses **[retext-emoji](https://github.com/wooorm/retext-emoji)** (to show emoji) and **[retext-smartypants](https://github.com/wooorm/retext-smartypants)** (for smart punctuation).

```javascript
/* Require dependencies. */
var Retext = require('retext');
var emoji = require('retext-emoji');
var smartypants = require('retext-smartypants');

/* Create an instance using retext-emoji and -smartypants. */
var retext = new Retext()
    .use(emoji, {
        'convert' : 'encode'
    })
    .use(smartypants);

/* Read a document. */
retext.parse(
    'The three wise monkeys [. . .] sometimes called the ' +
    'three mystic apes--are a pictorial maxim. Together ' +
    'they embody the proverbial principle to ("see no evil, ' +
    'hear no evil, speak no evil"). The three monkeys are ' +
    'Mizaru (:see_no_evil:), covering his eyes, who sees no ' +
    'evil; Kikazaru (:hear_no_evil:), covering his ears, ' +
    'who hears no evil; and Iwazaru (:speak_no_evil:), ' +
    'covering his mouth, who speaks no evil.',
    function (err, tree) {
        /* Handle errors. */
        if (err) {
            throw err;
        }

        /* Log the text content of the tree (the transformed input). */
        console.log(tree.toString());
        /**
         * This logs the following:
         *   The three wise monkeys […] sometimes called the three
         *   mystic apes—are a pictorial maxim. Together they
         *   embody the proverbial principle to (“see no evil,
         *   hear no evil, speak no evil”). The three monkeys are
         *   Mizaru (🙈), covering his eyes, who sees no evil;
         *   Kikazaru (🙉), covering his ears, who hears no evil;
         *   and Iwazaru (🙊), covering his mouth, who speaks no evil.
         */
    }
);
```

## API

### Retext(parser?)

```javascript
var Retext = require('retext');
var ParseEnglish = require('parse-english');
var retext = new Retext(new ParseEnglish());

/* There, ol’ chap. */
retext.parse('Some English', function (err, tree) {/* ... */});
```

Return a new `Retext` instance with the given [parser](#parsers) (defaults to
an instance of **parse-latin**).

### Retext#use([plugin](#plugin), options?)

Takes a plugin—a humble function to transform the object model.
Optionally takes an `options` object, but it’s up to plugin authors to support
settings.

### Retext#parse(value, options?, done(err, tree))

Parses the given source and, when done, passes either an error (the first
argument), or the (by `use`d plugins, modified) document (the second argument)
to the callback.

### plugin

A plugin is simply a function, with `function(retext, options?)` as its
signature. The first argument is the **Retext** instance a user attached the
plugin to. The plugin is invoked when a user `use`s the plugin (not when a
document is parsed) and enables the plugin to modify the internal Object Model
([`retext.TextOM`](https://github.com/wooorm/textom)) or the parser
([`retext.parser`](https://github.com/wooorm/parse-latin)).

The plugin can return another function: `function(NLCSTNode, options, next?)`.
This function is invokeded when a document is parsed. It’s given the document
as created by `Retext#parse()` before it’s given to the user.

## Plugins

*   [retext-content](https://github.com/wooorm/retext-content)
    — Append, prepend, remove, and replace content into/from Retext nodes;

*   [retext-cst](https://github.com/wooorm/retext-cst)
    — (**[demo](http://wooorm.github.io/retext-cst/)**)
    — Encoding and decoding between AST (JSON) and TextOM object model;

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

*   [retext-find](https://github.com/wooorm/retext-find)
    — Easily find nodes;

*   [retext-inspect](https://github.com/wooorm/retext-inspect)
    — (**[demo](http://wooorm.github.io/retext-inspect/)**)
    — Nicely display nodes in `console.log` calls;

*   [retext-keywords](https://github.com/wooorm/retext-keywords)
    — (**[demo](http://wooorm.github.io/retext-keywords/)**)
    — Extract keywords and keyphrases;

*   [retext-lancaster-stemmer](https://github.com/wooorm/retext-lancaster-stemmer)
    — (**[demo](http://wooorm.github.io/retext-lancaster-stemmer/)**)
    — Implementation of [the Lancaster (Paice/Husk) algorithm](http://www.comp.lancs.ac.uk/computing/research/stemming/index.htm);

*   [retext-language](https://github.com/wooorm/retext-language)
    — (**[demo](http://wooorm.github.io/retext-language/)**)
    — Detect the language of text;

*   [retext-link](https://github.com/wooorm/retext-link)
    — (**[demo](http://wooorm.github.io/retext-link/)**)
    — Detect links in text;

*   [retext-live](https://github.com/wooorm/retext-live)
    — Change a node based on a (new?) value;

*   [retext-metaphone](https://github.com/wooorm/retext-metaphone)
    — (**[demo](http://wooorm.github.io/retext-metaphone/)**)
    — Implementation of the Metaphone algorithm;

*   [retext-porter-stemmer](https://github.com/wooorm/retext-porter-stemmer)
    — (**[demo](http://wooorm.github.io/retext-porter-stemmer/)**)
    — Implementation of [the Porter stemming algorithm](http://tartarus.org/martin/PorterStemmer/);

*   [retext-pos](https://github.com/wooorm/retext-pos)
    — (**[demo](http://wooorm.github.io/retext-pos/)**)
    — Part-of-speech tagger;

*   [retext-range](https://github.com/wooorm/retext-range)
    — Sequences of content within a TextOM tree between two points;

*   [retext-search](https://github.com/wooorm/retext-search)
    — (**[demo](http://wooorm.github.io/retext-search/)**)
    — Search in a TextOM tree;

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

*   [retext-visit](https://github.com/wooorm/retext-visit)
    — (**[demo](http://wooorm.github.io/retext-visit/)**)
    — Visit nodes, optionally by type;

*   [retext-walk](https://github.com/wooorm/retext-walk)
    — Walk trees, optionally by type.

## Desired Plugins

> Hey! Want to create one of the following, or any other plugin, for
> **retext** but not sure where to start? I suggest to read **retext-visit**’s
> source code to see how it’s build first (it’s probably the most straight
> forward to learn), and go from there.
> Let me know if you still have any questions, go ahead and send me
> [feedback](mailto:tituswormer@gmail.com) or [raise an
> issue](https://github.com/wooorm/retext/issues).

*   retext-date
    — Detect time and date in text;

*   retext-frequen
    -words — Like **retext-keywords**, but based on frequency and stop-words
    instead of a POS-tagger;

*   retext-hyphen
    — Insert soft-hyphens where needed; this might have to be implemented
    with some sort of node which doesn’t stringify;

*   retext-location
    — Track the position of nodes (line, column);

*   retext-no-pants
    — Opposite of **retext-smartypants**;

*   retext-no-break
    — Inserts [non-breaking spaces](http://en.wikipedia.org/wiki/Non-breaking_space#Non-breaking_behavior)
    between things like “100 km”;

*   retext-profanity
    — Censor profane words;

*   retext-punctuation-pair
    — Detect which opening or initial punctuation, belongs to which closing
    or final punctuation mark (and vice versa);

*   retext-summary
    — Summarise text;

*   retext-sync
    — Detect changes in a textarea (or contenteditable?), sync the diffs over
    to a **retext** tree, let plugins modify the content, and sync the diffs
    back to the textarea;

*   retext-typography
    — Applies typographic enhancements, like (or using?) retext-smartypants
    and retext-hyphen;

*   retraverse
    — Like Estraverse.

## Parsers

*   [parse-latin](https://github.com/wooorm/parse-latin) (**[demo](http://wooorm.github.io/parse-latin/)**)
    — default;

*   [parse-english](https://github.com/wooorm/parse-english) (**[demo](http://wooorm.github.io/parse-english/)**)
    — Specifically for English;

*   [parse-dutch](https://github.com/wooorm/parse-dutch) (**[demo](http://wooorm.github.io/parse-dutch/)**)
    — Specifically for Dutch;

## Benchmark

On a MacBook Air, it parses about 2 big articles, 25 sections, or 230
paragraphs per second.

```text
           retext.parse(value, callback);
  230 op/s » A paragraph (5 sentences, 100 words)
   25 op/s » A section (10 paragraphs, 50 sentences, 1,000 words)
    2 op/s » An article (100 paragraphs, 500 sentences, 10,000 words)
```

## Related

*   [textom](https://github.com/wooorm/textom)
*   [nlcst](https://github.com/wooorm/nlcst)

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
