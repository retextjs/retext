![retext][logo]

# Getting Started

**retext** transforms natural language.
It’s an ecosystem of [plugins][].
If you get stuck, [issues][] and [discussions][] are good places to get help.

retext is built on [unified][], make sure to read it and its [website][] too.

## Contents

*   [Introduction](#introduction)
*   [Programmatic usage](#programmatic-usage)

## Introduction

Out of the box, **retext** doesn’t do anything.
But much can be done [through plugins][plugins].

## Programmatic usage

The programmatic interface of **retext** is provided by [**unified**][unified].
In fact, [`retext`][api] is two plugins:
[`retext-latin`][latin] and [`retext-stringify`][stringify].

Install [`retext`][api] with [npm][]:

```bash
npm install retext retext-equality retext-simplify
```

`index.js` contains:

```js
var retext = require('retext')
var simplify = require('retext-simplify')
var equality = require('retext-equality')
var report = require('vfile-reporter')

retext()
  .use(simplify)
  .use(equality)
  .process('Hey guys, utilize a shorter word.', function(err, file) {
    console.log(String(file))
    console.error(report(err || file))
  })
```

`node index.js` yields:

```txt
Hey guys, utilize a shorter word.
    1:5-1:9  warning  `guys` may be insensitive, use `people`, `persons`, `folks` instead  gals-men  retext-equality
  1:11-1:18  warning  Replace `utilize` with `use`                                         utilize   retext-simplify

⚠ 2 warnings
```

<!-- Definitions -->

[logo]: https://raw.githubusercontent.com/retextjs/retext/976354b/logo.svg?sanitize=true

[issues]: https://github.com/retextjs/retext/issues

[discussions]: https://github.com/retextjs/retext/discussions

[npm]: https://docs.npmjs.com/cli/install

[api]: https://github.com/retextjs/retext/tree/main/packages/retext

[plugins]: https://github.com/retextjs/retext/tree/main/doc/plugins.md

[unified]: https://github.com/unifiedjs/unified

[website]: https://unifiedjs.com

[latin]: https://github.com/retextjs/retext/tree/main/packages/retext-latin

[stringify]: https://github.com/retextjs/retext/tree/main/packages/retext-stringify
