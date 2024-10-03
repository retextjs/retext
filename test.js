/**
 * @import {Root} from 'nlcst'
 * @import {Plugin} from 'unified'
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import {emojiModifier} from 'nlcst-emoji-modifier'
import {assert as nlcstAssert} from 'nlcst-test'
import {retext} from 'retext'
import {unified} from 'unified'
import {removePosition} from 'unist-util-remove-position'

test('retext', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('retext')).sort(), ['retext'])
  })
})

test('parse', async function (t) {
  await t.test('should parse', async function () {
    const tree = retext().parse('Alfred')

    nlcstAssert(tree)

    removePosition(tree, {force: true})

    assert.deepEqual(tree, {
      type: 'RootNode',
      children: [
        {
          type: 'ParagraphNode',
          children: [
            {
              type: 'SentenceNode',
              children: [
                {
                  type: 'WordNode',
                  children: [{type: 'TextNode', value: 'Alfred'}]
                }
              ]
            }
          ]
        }
      ]
    })
  })
})

test('stringify', async function (t) {
  await t.test('should stringify', async function () {
    assert.deepEqual(
      retext().stringify({
        type: 'RootNode',
        children: [
          {
            type: 'ParagraphNode',
            children: [
              {
                type: 'SentenceNode',
                children: [
                  {
                    type: 'WordNode',
                    children: [{type: 'TextNode', value: 'Alfred'}]
                  }
                ]
              }
            ]
          }
        ]
      }),
      'Alfred'
    )
  })
})

const parsers = ['dutch', 'english', 'latin']

let index = -1
while (++index < parsers.length) {
  await eachParser(parsers[index])
}

/** @param {string} name */
async function eachParser(name) {
  const id = 'retext-' + name

  await test(id, async function (t) {
    /** @type {{default: Plugin<[], string, Root>}} */
    const result = await import(id)

    await t.test('should expose the public api', async function () {
      assert.deepEqual(Object.keys(result).sort(), ['default'])
    })

    const processor = unified().use(result.default)

    await t.test('should parse', async function () {
      const tree = processor.parse('Alfred')

      nlcstAssert(tree)

      removePosition(tree, {force: true})

      assert.deepEqual(tree, {
        type: 'RootNode',
        children: [
          {
            type: 'ParagraphNode',
            children: [
              {
                type: 'SentenceNode',
                children: [
                  {
                    type: 'WordNode',
                    children: [{type: 'TextNode', value: 'Alfred'}]
                  }
                ]
              }
            ]
          }
        ]
      })
    })

    await t.test('should support extensions', async function () {
      const tree = processor()
        .data('nlcstSentenceExtensions', [emojiModifier])
        .parse(':+1:')
      const paragraph = tree.children[0]
      assert(paragraph.type === 'ParagraphNode')
      const sentence = paragraph.children[0]
      assert(sentence.type === 'SentenceNode')
      const emoji = sentence.children[0]
      assert(emoji.type === 'EmoticonNode')
    })
  })
}
