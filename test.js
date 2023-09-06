/**
 * @typedef {import('nlcst').Root} Root
 */

import assert from 'node:assert/strict'
import test from 'tape'
import {removePosition} from 'unist-util-remove-position'
import {emojiModifier} from 'nlcst-emoji-modifier'
import {assert as nlcstAssert} from 'nlcst-test'
import {u} from 'unist-builder'
import {unified} from 'unified'
import {retext} from 'retext'

const parsers = ['latin', 'english', 'dutch']

test('.parse', (t) => {
  const tree = retext().parse('Alfred')

  t.doesNotThrow(() => {
    nlcstAssert(tree)
  }, 'should parse to valid nlcst')

  removePosition(tree, {force: true})

  t.deepEqual(
    tree,
    u('RootNode', [
      u('ParagraphNode', [
        u('SentenceNode', [u('WordNode', [u('TextNode', 'Alfred')])])
      ])
    ]),
    'should give the correct tree'
  )

  t.end()
})

let index = -1
while (++index < parsers.length) {
  eachParser(parsers[index])
}

/** @param {string} name */
function eachParser(name) {
  test('retext-' + name, async (t) => {
    t.plan(2)

    const fp = './packages/retext-' + name + '/index.js'

    /** @type {{default: import('unified').Plugin<[], string, Root>}} */
    // type-coverage:ignore-next-line
    const mod = await import(fp)

    const plugin = mod.default

    const tree = unified().use(plugin).parse('Alfred')

    t.doesNotThrow(() => {
      nlcstAssert(tree)
    }, 'should parse to valid nlcst')

    removePosition(tree, {force: true})

    t.deepEqual(
      tree,
      u('RootNode', [
        u('ParagraphNode', [
          u('SentenceNode', [u('WordNode', [u('TextNode', 'Alfred')])])
        ])
      ]),
      'should give the corrent tree'
    )

    const emojiTree = unified()
      .use(plugin)
      .use(function () {
        this.data('nlcstSentenceExtensions', [emojiModifier])
      })
      .parse(':+1:')
    const paragraph = emojiTree.children[0]
    assert(paragraph.type === 'ParagraphNode')
    const sentence = paragraph.children[0]
    assert(sentence.type === 'SentenceNode')
    const emoji = sentence.children[0]
    assert(emoji.type === 'EmoticonNode')
  })
}

test('.stringify', (t) => {
  t.throws(
    () => {
      // @ts-expect-error: runtime.
      retext().stringify(false)
    },
    /false/,
    'should throw when `tree` is not given'
  )

  t.throws(
    () => {
      // @ts-expect-error: runtime.
      retext().stringify({})
    },
    /Expected node, got `\[object Object]`/,
    'should throw when `tree` is not a node'
  )

  t.throws(
    () => {
      // @ts-expect-error: runtime.
      retext().stringify()
    },
    /Expected node, got `undefined`/,
    'should throw when `tree` is not a valid node'
  )

  t.deepEqual(
    retext().stringify(
      u('RootNode', [
        u('ParagraphNode', [
          u('SentenceNode', [u('WordNode', [u('TextNode', 'Alfred')])])
        ])
      ])
    ),
    'Alfred',
    'should stringify'
  )

  t.end()
})
