'use strict';

var test = require('tape');
var clean = require('unist-util-remove-position');
var nlcst = require('nlcst-test');
var unified = require('./packages/retext/node_modules/unified');
var retext = require('./packages/retext');

var root = {
  type: 'RootNode',
  children: [{
    type: 'ParagraphNode',
    children: [{
      type: 'SentenceNode',
      children: [{
        type: 'WordNode',
        children: [{type: 'TextNode', value: 'Alfred'}]
      }]
    }]
  }]
};

/* Test `retext-latin`, `retext-english`, `retext-dutch`. */
test('retext().parse(file)', function (t) {
  t.test('retext', function (st) {
    var tree = retext().parse('Alfred');

    st.doesNotThrow(
      function () {
        nlcst(tree);
      },
      'should expose NLCST'
    );

    st.deepEqual(
      clean(tree, true),
      root,
      'should give the correct tree'
    );

    st.end();
  });

  ['latin', 'english', 'dutch'].forEach(function (name) {
    var lib = require('./packages/retext-' + name);
    var tree = unified().use(lib).parse('Alfred');

    t.test('retext-' + name, function (st) {
      st.doesNotThrow(
        function () {
          nlcst(tree);
        },
        'should expose NLCST'
      );

      st.deepEqual(
        clean(tree, true),
        root,
        'should give the corrent tree'
      );

      st.end();
    });
  });

  t.end();
});

/* Test `retext-stringify`. */
test('retext().stringify(ast, file, options?)', function (t) {
  t.throws(
    function () {
      retext().stringify(false);
    },
    /false/,
    'should throw when `ast` is not given'
  );

  t.throws(
    function () {
      retext().stringify({});
    },
    /Expected node, got `\[object Object]`/,
    'should throw when `ast` is not a node'
  );

  t.throws(
    function () {
      retext().stringify({type: 'unicorn'});
    },
    /Cannot read property 'length' of undefined/,
    'should throw when `ast` is not a valid node'
  );

  t.deepEqual(
    retext().stringify(root),
    'Alfred',
    'should stringify'
  );

  t.end();
});
