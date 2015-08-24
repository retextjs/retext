/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer.
 * @license MIT
 * @module retext
 * @fileoverview Test suite for `retext`.
 */

'use strict';

/* eslint-env node, mocha */

/*
 * Dependencies.
 */

var assert = require('assert');
var test = require('nlcst-test');
var Retext = require('./');

/*
 * Constants.
 */

var equal = assert.strictEqual;
var throws = assert.throws;

/**
 * No-op.
 */
function noop() {}

noop();

/*
 * Tests.
 */

describe('new Retext()', function () {
    it('should be a `function`', function () {
        equal(typeof Retext, 'function');
    });

    it('should return a newly initialized `Retext` object', function () {
        assert(new Retext(noop) instanceof Retext);
        assert(new Retext() instanceof Retext);
    });

    it('should set `Parser` and `Compiler`', function () {
        var retext = new Retext();

        assert('Parser' in retext);
        assert('Compiler' in retext);
    });

    it('should create new constructors', function () {
        var P1 = new Retext().Parser;
        var P2 = new Retext().Parser;
        var C1 = new Retext().Compiler;
        var C2 = new Retext().Compiler;

        assert(!(new P1() instanceof P2));
        assert(!(new P2() instanceof P1));

        assert(!(new C1() instanceof C2));
        assert(!(new C2() instanceof C1));
    });
});

describe('Retext#use()', function () {
    it('should be a `function`', function () {
        equal(typeof new Retext().use, 'function');
        equal(typeof Retext.use, 'function');
    });

    it('should return self', function () {
        var retext = new Retext();

        equal(retext.use(noop), retext);
    });

    it('should throw when not given a function', function () {
        var retext = new Retext();

        throws(function () {
            retext.use();
        });
    });

    it('should attach a plugin', function () {
        var retext = new Retext();

        retext.use(noop);

        equal(retext.ware.attachers.length, 1);
    });

    it('should invoke an attached plugin', function (done) {
        var retext = new Retext();

        /**
         * Spy.
         */
        function plugin() {
            done();
        }

        retext.use(plugin);
    });

    it('should invoke a plugin with `retext` and `options`', function () {
        var retext = new Retext();
        var options = {};
        var parameters;

        /**
         * A plugin to test its arguments.
         */
        function plugin() {
            parameters = arguments;
        }

        retext.use(plugin, options);

        equal(parameters[0], retext);
        equal(parameters[1], options);
        equal(parameters.length, 2);
    });

    it('should invoke plugins in order', function (done) {
        var retext = new Retext();
        var isInvoked;

        /**
         * A plugin checking that the second plugin
         * is not invoked.
         */
        function firstPlugin() {
            isInvoked = true;
        }

        /**
         * A plugin checking that the first plugin
         * is already invoked.
         */
        function secondPlugin() {
            equal(isInvoked, true);

            done();
        }

        retext
            .use(firstPlugin)
            .use(secondPlugin);
    });

    it('should invoke dependencies in order', function () {
        var retext = new Retext();
        var count = 0;

        /* eslint-disable no-use-before-define */

        /**
         * A plugin checking that it's the first invoked
         * plugin.
         */
        function firstPlugin() {
            equal(count, 0);

            count++;
        }

        /**
         * A plugin checking that it's the second invoked
         * plugin.
         */
        function secondPlugin() {
            equal(count, 1);

            count++;
        }

        /**
         * A plugin checking that it's the last invoked
         * plugin.
         */
        function thirdPlugin() {
            equal(count, 2);

            count++;
        }

        /* eslint-enable no-use-before-define */

        retext
            .use(firstPlugin)
            .use(secondPlugin)
            .use(thirdPlugin);

        equal(count, 3);
    });
});

describe('Retext#parse()', function () {
    it('should be a `function`', function () {
        equal(typeof new Retext().parse, 'function');
        equal(typeof Retext.parse, 'function');
    });

    it('should return nlcst', function () {
        test(Retext.parse('Foo'));
    });
});

describe('Retext#run()', function () {
    it('should be a `function`', function () {
        equal(typeof new Retext().run, 'function');
        equal(typeof Retext.run, 'function');
    });

    it('should return the cst', function () {
        var retext = new Retext();
        var root = {
            'type': 'RootNode',
            'children': []
        };

        equal(retext.run(root), root);
    });

    it('should accept `done`', function (done) {
        var retext = new Retext();
        var root = {
            'type': 'RootNode',
            'children': []
        };

        retext.run(root, done);
    });

    it('should invoke `done` with `tree` and a file', function (done) {
        var retext = new Retext();
        var root = {
            'type': 'RootNode',
            'children': []
        };

        retext.run(root, function (err, tree, file) {
            equal(root, tree);
            equal(file.hasFailed(), false);

            done(err);
        });
    });

    it('should invoke a transformer', function (done) {
        var retext = new Retext();

        /**
         * Spy.
         */
        function transformer() {
            done();
        }

        /**
         * Spy.
         */
        function attacher() {
            return transformer;
        }

        retext.use(attacher).run({
            'type': 'RootNode',
            'children': []
        });
    });
});

describe('Retext#stringify()', function () {
    it('should be a `function`', function () {
        equal(typeof new Retext().stringify, 'function');
        equal(typeof Retext.stringify, 'function');
    });

    it('should return string', function () {
        equal(Retext.stringify({
            'type': 'TextNode',
            'value': 'foo'
        }), 'foo');
    });
});

describe('Retext#process()', function () {
    it('should be a `function`', function () {
        equal(typeof new Retext().process, 'function');
        equal(typeof Retext.process, 'function');
    });

    it('should return string', function () {
        equal(Retext.process('Foo bar baz.'), 'Foo bar baz.');
    });
});
