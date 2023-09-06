/**
 * @typedef {import('nlcst').Root} Root
 */

import assert from 'node:assert/strict'
import test from 'node:test'
import {removePosition} from 'unist-util-remove-position'
import {emojiModifier} from 'nlcst-emoji-modifier'
import {assert as nlcstAssert} from 'nlcst-test'
import {unified} from 'unified'
import {retext} from 'retext'

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

  const parsers = ['dutch', 'english', 'latin']

  let index = -1
  while (++index < parsers.length) {
    await eachParser(parsers[index])
  }

  /** @param {string} name */
  async function eachParser(name) {
    await t.test('retext-' + name, async function (t) {
      const fp = './packages/retext-' + name + '/index.js'

      /** @type {{default: import('unified').Plugin<[], string, Root>}} */
      // type-coverage:ignore-next-line
      const mod = await import(fp)
      const processor = unified().use(mod.default)

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
