# ![retext][logo]

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Chat][chat-badge]][chat]

**retext** is a natural language processor powered by [plugins][] part of the
[unified][] [collective][].

* * *

**Announcing the unified collective!  🎉
[Read more about it on Medium »][announcement]**

## Sponsors

<!--lint ignore no-html maximum-line-length-->

<table>
  <tr valign="top">
    <td width="20%" align="center">
      <a href="https://zeit.co"><img src="https://avatars1.githubusercontent.com/u/14985020?s=400&v=4"></a>
      <br><br>🥇
      <a href="https://zeit.co">ZEIT</a>
    </td>
    <td width="20%" align="center">
      <a href="https://www.gatsbyjs.org"><img src="https://avatars1.githubusercontent.com/u/12551863?s=400&v=4"></a>
      <br><br>🥇
      <a href="https://www.gatsbyjs.org">Gatsby</a></td>
    <td width="20%" align="center">
      <a href="https://compositor.io"><img src="https://avatars1.githubusercontent.com/u/19245838?s=400&v=4"></a>
      <br><br>🥉
      <a href="https://compositor.io">Compositor</a>
    </td>
    <td width="20%" align="center">
      <a href="https://www.holloway.com"><img src="https://avatars1.githubusercontent.com/u/35904294?s=400&v=4"></a>
      <br><br>
      <a href="https://www.holloway.com">Holloway</a>
    </td>
    <td width="20%" align="center">
      <br><br><br><br>
      <a href="https://opencollective.com/unified"><strong>You?</strong>
    </td>
  </tr>
</table>

## Intro

**retext** is an ecosystem of [plugins][plugins] for processing
natural language to do all kinds of things: [check spelling][spell],
[fix typography][smartypants], or [make sure text is readable][readability].

*   Visit [`unified.js.org`][website] and try its [guides][] for an overview
*   Read [unified][]’s readme for a technical intro
*   Browse [awesome retext][awesome] to find out more about the ecosystem
*   Follow us on [Medium][] and [Twitter][] to see what we’re up to
*   Check out [Contribute][] below to find out how to help out

This repository contains the following projects:

*   [`retext-english`][english] — Parse English prose to a syntax tree
*   [`retext-dutch`][dutch] — Parse Dutch prose to a syntax tree
*   [`retext-latin`][latin] — Parse any Latin-script prose to a syntax tree
*   [`retext-stringify`][stringify] — Stringify a syntax tree to text
*   [`retext`][api] — Programmatic interface with both `retext-latin` and `retext-stringify`

## Contribute

**retext** is built by people just like you!
Check out [`contributing.md`][contributing] for ways to get started.

This project has a [Code of Conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

Want to chat with the community and contributors?
Join us in [spectrum][chat]!

Have an idea for a cool new utility or tool?
That’s great!
If you want feedback, help, or just to share it with the world you can do so by
creating an issue in the [`retextjs/ideas`][ideas] repository!

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[logo]: https://raw.githubusercontent.com/retextjs/retext/976354b/logo.svg?sanitize=true

[build-badge]: https://img.shields.io/travis/retextjs/retext/master.svg

[build]: https://travis-ci.org/retextjs/retext

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext.svg

[coverage]: https://codecov.io/github/retextjs/retext

[downloads-badge]: https://img.shields.io/npm/dm/retext.svg

[downloads]: https://www.npmjs.com/package/retext

[size-badge]: https://img.shields.io/bundlephobia/minzip/retext.svg

[size]: https://bundlephobia.com/result?p=retext

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/retext

[license]: license

[author]: https://wooorm.com

[contribute]: #contribute

[contributing]: contributing.md

[coc]: code-of-conduct.md

[unified]: https://github.com/unifiedjs/unified

[website]: https://unified.js.org

[guides]: https://unified.js.org/#guides

[collective]: https://opencollective.com/unified

[medium]: https://medium.com/unifiedjs

[announcement]: https://medium.com/unifiedjs/collectively-evolving-through-crowdsourcing-22c359ea95cc

[twitter]: https://twitter.com/unifiedjs

[english]: https://github.com/retextjs/retext/tree/master/packages/retext-english

[dutch]: https://github.com/retextjs/retext/tree/master/packages/retext-dutch

[latin]: https://github.com/retextjs/retext/tree/master/packages/retext-latin

[stringify]: https://github.com/retextjs/retext/tree/master/packages/retext-stringify

[api]: https://github.com/retextjs/retext/tree/master/packages/retext

[ideas]: https://github.com/retextjs/ideas

[awesome]: https://github.com/retextjs/awesome

[plugins]: https://github.com/retextjs/retext/tree/master/doc/plugins.md

[spell]: https://github.com/retextjs/retext-spell

[smartypants]: https://github.com/retextjs/retext-smartypants

[readability]: https://github.com/retextjs/retext-readability
