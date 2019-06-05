'use strict'

var test = require('tape')
var clean = require('unist-util-remove-position')
var nlcst = require('nlcst-test')
var u = require('unist-builder')
var unified = require('./packages/retext/node_modules/unified')
var retext = require('./packages/retext')

var parsers = ['latin', 'english', 'dutch']

test('.parse', function(t) {
  var tree = retext().parse('Alfred')

  t.doesNotThrow(function() {
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

parsers.forEach(function(name) {
  var tree = unified()
    .use(require('./packages/retext-' + name))
    .parse('Alfred')

  test('retext-' + name, function(t) {
    t.doesNotThrow(function() {
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

    t.end()
  })
})

test('.stringify', function(t) {
  t.throws(
    function() {
      retext().stringify(false)
    },
    /false/,
    'should throw when `tree` is not given'
  )

  t.throws(
    function() {
      retext().stringify({})
    },
    /Expected node, got `\[object Object]`/,
    'should throw when `tree` is not a node'
  )

  t.throws(
    function() {
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
