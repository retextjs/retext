import test from 'tape'
import clean from 'unist-util-remove-position'
import nlcst from 'nlcst-test'
import u from 'unist-builder'
import unified from './packages/retext/node_modules/unified/index.js'
import {retext} from './packages/retext/index.js'

const parsers = ['latin', 'english', 'dutch']

test('.parse', (t) => {
  const tree = retext().parse('Alfred')

  t.doesNotThrow(() => {
    nlcst(tree)
  }, 'should parse to valid nlcst')

  t.deepEqual(
    clean(tree, true),
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

function eachParser(name) {
  test('retext-' + name, async (t) => {
    t.plan(2)

    const plugin = (await import('retext-' + name)).default

    const tree = unified().use(plugin).parse('Alfred')

    t.doesNotThrow(() => {
      nlcst(tree)
    }, 'should parse to valid nlcst')

    t.deepEqual(
      clean(tree, true),
      u('RootNode', [
        u('ParagraphNode', [
          u('SentenceNode', [u('WordNode', [u('TextNode', 'Alfred')])])
        ])
      ]),
      'should give the corrent tree'
    )
  })
}

test('.stringify', (t) => {
  t.throws(
    () => {
      retext().stringify(false)
    },
    /false/,
    'should throw when `tree` is not given'
  )

  t.throws(
    () => {
      retext().stringify({})
    },
    /Expected node, got `\[object Object]`/,
    'should throw when `tree` is not a node'
  )

  t.throws(
    () => {
      retext().stringify({type: 'unicorn'})
    },
    /Cannot read property 'length' of undefined/,
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
