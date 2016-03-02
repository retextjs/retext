/**
 * @author Titus Wormer
 * @copyright 2014 Titus Wormer
 * @license MIT
 * @module retext
 * @fileoverview Test suite for `retext`.
 */

'use strict';

/* eslint-env node */

/*
 * Dependencies.
 */

var test = require('tape');
var nlcstTest = require('nlcst-test');
var retext = require('./');

/**
 * No-op.
 */
function noop() {}

noop();

/*
 * Tests.
 */

test('retext', function (t) {
    t.plan(5);

    t.equal(
        typeof retext,
        'function',
        'should be a `function`'
    );

    t.ok(
        retext() instanceof retext,
        'should return a newly initialized `Retext` object'
    );

    t.ok('Parser' in retext(), 'should set `Parser`');
    t.ok('Compiler' in retext(), 'should set `Compiler`');

    t.test('should create new constructors', function (st) {
        var P1 = retext().Parser;
        var P2 = retext().Parser;
        var C1 = retext().Compiler;
        var C2 = retext().Compiler;

        st.plan(4);

        st.notOk(new P1() instanceof P2);
        st.notOk(new P2() instanceof P1);

        st.notOk(new C1() instanceof C2);
        st.notOk(new C2() instanceof C1);
    });
});

test('retext#use()', function (t) {
    var processor;
    var options;
    var count;

    t.plan(11);

    t.test('should be a `function`', function (st) {
        st.plan(2);

        st.equal(typeof retext().use, 'function');
        st.equal(typeof retext.use, 'function');
    });

    processor = retext();

    t.equal(
        processor.use(noop),
        processor,
        'should return self'
    );

    t.throws(function () {
        retext().use();
    }, 'should throw when not given a function');

    t.equal(
        retext().use(noop).ware.attachers.length,
        1,
        'should attach a plugin'
    );

    processor = retext();
    options = {};

    processor.use(function () {
        t.equal(
            arguments.length,
            2,
            'should invoke attacher with two arguments'
        );

        t.equal(
            arguments[0],
            processor,
            'should invoke attacher with `processor`'
        );

        t.equal(
            arguments[1],
            options,
            'should invoke attacher with `options`'
        );
    }, options);

    count = 0;

    retext()
        .use(function () {
            t.equal(count, 0, 'invoke order A');
            count = 1;
        })
        .use(function () {
            t.equal(count, 1, 'invoke order B');
            count = 2;
        })
        .use(function () {
            t.equal(count, 2, 'invoke order C');
            count = 3;
        });

    t.equal(count, 3, 'invoke order D');
});

test('retext#parse()', function (t) {
    t.plan(2);

    t.test('should be a `function`', function (st) {
        st.plan(2);
        st.equal(typeof retext().parse, 'function');
        st.equal(typeof retext.parse, 'function');
    });

    t.doesNotThrow(function () {
        nlcstTest(retext().parse('Foo'));
    }, 'should return NLCST');
});

test('retext#run()', function (t) {
    var root;

    t.plan(6);

    t.test('should be a `function`', function (st) {
        st.plan(2);
        st.equal(typeof retext().run, 'function');
        st.equal(typeof retext.run, 'function');
    });

    root = {
        'type': 'RootNode',
        'children': []
    };

    t.equal(
        retext().run(root),
        root,
        'should return the cst'
    );

    retext().run(root, function (err, tree, file) {
        t.ifError(err, 'should accept `done`');
        t.equal(root, tree, 'should pass `tree`');
        t.equal(file.hasFailed(), false, 'should pass `file`');
    });

    retext().use(function () {
        /**
         * Spy.
         */
        return function () {
            t.pass('should invoke a transformer');
        };
    }).run(root);
});

test('retext#stringify()', function (t) {
    t.plan(2);

    t.test('should be a `function`', function (st) {
        st.plan(2);
        st.equal(typeof retext().stringify, 'function');
        st.equal(typeof retext.stringify, 'function');
    });

    t.equal(
        retext.stringify({
            'type': 'TextNode',
            'value': 'foo'
        }),
        'foo',
        'should return string'
    );
});

test('retext#process()', function (t) {
    t.plan(2);

    t.test('should be a `function`', function (st) {
        st.plan(2);

        st.equal(typeof retext().process, 'function');
        st.equal(typeof retext.process, 'function');
    });

    t.equal(
        retext.process('Foo bar baz.'),
        'Foo bar baz.',
        'should return string'
    );
});
