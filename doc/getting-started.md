![retext][logo]

# Getting Started

**retext** transforms natural language.  It’s an ecosystem of
[plug-ins][plugins].  If you get stuck, [issues][] and [Gitter][] are
good places to get help.

## Table of Contents

*   [Introduction](#introduction)
*   [Programmatic usage](#programmatic-usage)

## Introduction

Out of the box, **retext** doesn’t do anything.  But, much can be
done, [through plug-ins][plugins].

## Programmatic usage

The programmatic interface of **retext** is provided by
[**unified**][unified].  In fact, [`retext`][api] is two plug-ins:
[`retext-latin`][latin] and [`retext-stringify`][stringify].

Install [`retext`][api] with [npm][]:

```bash
npm install retext retext-equality retext-simplify
```

`index.js` contains:

```js
var retext = require('retext');
var simplify = require('retext-simplify');
var equality = require('retext-equality');
var report = require('vfile-reporter');

retext()
  .use(simplify)
  .use(equality)
  .process('Hey guys, utilize a shorter word.', function (err, file) {
    console.log(String(file));
    console.error(report(err || file));
  });
```

`node index.js` yields:

```txt
Hey guys, utilize a shorter word.
    1:5-1:9  warning  `guys` may be insensitive, use `people`, `persons`, `folks` instead  gals-men  retext-equality
  1:11-1:18  warning  Replace “utilize” with “use”                                         utilize   retext-simplify

⚠ 2 warnings
```

<!-- Definitions -->

[logo]: https://cdn.rawgit.com/wooorm/retext/9845a25/logo.svg

[issues]: https://github.com/wooorm/retext/issues

[gitter]: https://gitter.im/wooorm/retext

[npm]: https://docs.npmjs.com/cli/install

[api]: https://github.com/wooorm/retext/tree/master/packages/retext

[plugins]: https://github.com/wooorm/retext/tree/master/doc/plugins.md

[unified]: https://github.com/unifiedjs/unified

[latin]: https://github.com/wooorm/retext/tree/master/packages/retext-latin

[stringify]: https://github.com/wooorm/retext/tree/master/packages/retext-stringify
