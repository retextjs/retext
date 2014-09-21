'use strict';

var Retext,
    assert;

/**
 * Module dependencies (retext, assert).
 */

Retext = require('..');
assert = require('assert');

/**
 * Cache a (by istanbul ignored) no-operation function.
 */

/* istanbul ignore next */
function noop() {}

/**
 * Test `Retext`.
 */

describe('new Retext()', function () {
    it('should be a `function`', function () {
        assert(typeof Retext === 'function');
    });

    it('should return a newly initialized `Retext` object', function () {
        assert(new Retext(noop) instanceof Retext);
        assert(new Retext() instanceof Retext);
    });

    it('should set `parser` to an instance of parse-latin', function () {
        var retext;

        retext = new Retext();

        assert('parser' in retext);
        assert('TextOM' in retext.parser);
    });

    /**
     * The following sounds a bit weird, but can best be thought of as
     * a test for multiple contexts, similar to how different frames on
     * the client side use different Array constructors.
     */

    it('should create a new object model', function (done) {
        new Retext().parse(null, function (err, tree1) {
            /* istanbul ignore if: should not error. */
            if (err) {
                throw err;
            }

            new Retext().parse(null, function (err, tree2) {
                assert(tree1 instanceof tree1.constructor);
                assert(!(tree1 instanceof tree2.constructor));
                assert(tree2 instanceof tree2.constructor);
                assert(!(tree2 instanceof tree1.constructor));

                done(err);
            });
        });
    });
});

/**
 * Test `Retext` when given a parser.
 */

describe('new Retext(parser)', function () {
    it('should set `parser` to the given parser', function () {
        var retext;

        retext = new Retext(noop);

        assert('parser' in retext);
        assert(retext.parser === noop);
    });
});

/**
 * Test `Retext#use(plugin)`.
 */

describe('Retext#use(plugin)', function () {
    it('should be a `function`', function () {
        assert(typeof Retext.prototype.use === 'function');
        assert(typeof (new Retext()).use === 'function');
    });

    it('should return self', function () {
        var retext;

        retext = new Retext();

        assert(retext.use(noop) === retext);
    });

    it('should throw when not given a function', function () {
        var retext;

        retext = new Retext();

        assert.throws(function () {
            retext.use();
        }, 'undefined');

        assert.throws(function () {
            retext.use(null);
        }, 'null');

        assert.throws(function () {
            retext.use(undefined);
        }, 'undefined');

        assert.throws(function () {
            retext.use(true);
        }, 'true');

        assert.throws(function () {
            retext.use({});
        }, 'object Object');
    });

    it('should attach a plugin', function () {
        var retext;

        retext = new Retext();

        assert(retext.ware.fns.length === 0);

        retext.use(noop);

        assert(retext.ware.fns.length === 1);
    });

    it('should invoke `attach` on an attached plugin', function () {
        var retext,
            isInvoked;

        /* istanbul ignore next: noop */
        function plugin() {}

        retext = new Retext();

        plugin.attach = function () {
            isInvoked = true;
        };

        retext.use(plugin);

        assert(isInvoked === true);
    });

    it('should invoke `attach` with `retext`', function (done) {
        var retext,
            root,
            args;

        function plugin() {}

        retext = new Retext();
        root = new retext.TextOM.RootNode();

        plugin.attach = function () {
            args = arguments;
        };

        retext.use(plugin);

        retext.applyPlugins(root, function (err) {
            assert(args[0] === retext);
            assert(args.length === 1);

            done(err);
        });
    });

    it('should invoke `attach` on plugins in order', function (done) {
        var retext,
            isInvoked;

        function firstPlugin() {}

        function secondPlugin() {}

        retext = new Retext();
        isInvoked = false;

        firstPlugin.attach = function () {
            assert(isInvoked === false);

            isInvoked = true;
        };

        secondPlugin.attach = function () {
            assert(isInvoked === true);

            isInvoked = true;
        };

        retext
            .use(firstPlugin)
            .use(secondPlugin)
            .parse(null, done);
    });

    it('should invoke `attach` on dependencies in order', function (done) {
        var retext,
            invokeCount;

        function firstPlugin() {}

        function secondPlugin() {}

        function thirdPlugin() {}

        retext = new Retext();
        invokeCount = 0;

        thirdPlugin.attach = function () {
            assert(invokeCount === 2);

            retext
                .use(firstPlugin)
                .use(secondPlugin);

            invokeCount++;
        };

        secondPlugin.attach = function () {
            assert(invokeCount === 1);

            invokeCount++;

            retext
                .use(firstPlugin)
                .use(thirdPlugin);
        };

        firstPlugin.attach = function () {
            assert(invokeCount === 0);

            invokeCount++;

            retext
                .use(secondPlugin)
                .use(thirdPlugin);
        };

        retext
            .use(firstPlugin)
            .use(secondPlugin)
            .use(thirdPlugin)
            .parse(null, done);
    });

    it('should not re-attach an attached plugin', function () {
        var retext;

        retext = new Retext();

        retext.use(noop);

        assert(retext.ware.fns.length === 1);

        retext.use(noop);

        assert(retext.ware.fns.length === 1);
    });
});

/**
 * Test Retext#parse(value, done).
 */

describe('Retext#parse(value, done)', function () {
    it('should be a `function`', function () {
        assert(typeof Retext.prototype.parse === 'function');
        assert(typeof (new Retext()).parse === 'function');
    });

    it('should return self', function (done) {
        var retext;

        retext = new Retext();

        assert(retext.parse(null, done) === retext);
    });

    it('should invoke `done` with a `RootNode`', function (done) {
        var retext;

        retext = new Retext();

        retext.parse(null, function (err, tree) {
            assert(tree instanceof retext.parser.TextOM.RootNode);

            done(err);
        });
    });

    it('should transform `value` into a `TextOM` object', function (done) {
        new Retext().parse('Something something', function (err, root) {
            assert('head' in root);
            assert('tail' in root);
            assert(root.head.parent === root);
            assert('TextOM' in root);
            assert(root.toString() === 'Something something');

            done(err);
        });
    });

    it('should not invoke `attach` on an attached plugin', function (done) {
        var retext,
            isInvoked;

        function plugin() {}

        retext = new Retext();

        plugin.attach = function () {
            isInvoked = true;
        };

        retext.use(plugin);

        assert(isInvoked === true);

        isInvoked = false;

        retext.parse(null, function (err) {
            assert(isInvoked !== true);

            done(err);
        });
    });

    it('should invoke an attached plugin', function (done) {
        var retext,
            isInvoked;

        function plugin() {
            isInvoked = true;
        }

        retext = new Retext();

        retext.use(plugin);

        assert(isInvoked !== true);

        retext.parse(null, function (err) {
            assert(isInvoked === true);

            done(err);
        });
    });

    it('should invoke an attached plugin with a `RootNode` and retext',
        function (done) {
            var retext,
                args;

            function plugin() {
                args = arguments;
            }

            retext = new Retext();

            retext.use(plugin);

            retext.parse(null, function (err, tree) {
                assert(args[0] === tree);
                assert(args[1] === retext);
                assert(args.length === 2);

                done(err);
            });
        }
    );

    it('should invoke attached plugins in order', function (done) {
        var retext,
            isInvoked;

        function firstPlugin() {
            assert(isInvoked === false);

            isInvoked = true;
        }

        function secondPlugin() {
            assert(isInvoked === true);

            isInvoked = true;
        }

        retext = new Retext();
        isInvoked = false;

        retext
            .use(firstPlugin)
            .use(secondPlugin)
            .parse(null, done);
    });

    it('should invoke dependencies in order', function (done) {
        var retext,
            invokeCount;

        /* eslint-disable no-use-before-define */

        function thirdPlugin() {
            assert(invokeCount === 2);

            retext
                .use(firstPlugin)
                .use(secondPlugin);

            invokeCount++;
        }

        function secondPlugin() {
            assert(invokeCount === 1);

            invokeCount++;

            retext
                .use(firstPlugin)
                .use(thirdPlugin);
        }

        function firstPlugin() {
            assert(invokeCount === 0);

            invokeCount++;

            retext
                .use(secondPlugin)
                .use(thirdPlugin);
        }

        /* eslint-enable no-use-before-define */

        retext = new Retext();
        invokeCount = 0;

        retext
            .use(firstPlugin)
            .use(secondPlugin)
            .use(thirdPlugin)
            .parse(null, done);
    });

    it('should not re-invoke an attached plugin', function (done) {
        var retext,
            isInvoked;

        function nestedPlugin() {
            assert(isInvoked !== true);

            isInvoked = true;
        }

        function plugin(tree, retext) {
            retext.use(nestedPlugin);
        }

        retext = new Retext();

        retext
            .use(nestedPlugin)
            .use(plugin)
            .parse(null, done);
    });

    it('should not re-attach an attached plugin', function (done) {
        var retext;

        function nestedPlugin() {}

        function plugin(tree, retext) {
            var length;

            length = retext.ware.fns.length;

            retext.use(nestedPlugin);

            assert(length === retext.ware.fns.length);
        }

        retext = new Retext();

        retext
            .use(nestedPlugin)
            .use(plugin)
            .parse(null, done);
    });
});

/**
 * Test Retext#applyPlugins(tree, done).
 */

describe('Retext#applyPlugins(tree, done)', function () {
    it('should be a `function`', function () {
        assert(typeof Retext.prototype.applyPlugins === 'function');
        assert(typeof (new Retext()).applyPlugins === 'function');
    });

    it('should return self', function (done) {
        var retext,
            root;

        retext = new Retext();
        root = new retext.TextOM.RootNode();

        assert(retext.applyPlugins(root, done) === retext);
    });

    it('should invoke `done` with `tree`', function (done) {
        var retext,
            root;

        retext = new Retext();
        root = new retext.TextOM.RootNode();

        retext.applyPlugins(root, function (err, tree) {
            assert(root === tree);

            done(err);
        });
    });

    it('should not invoke `attach` on an attached plugin', function (done) {
        var retext,
            root,
            isInvoked;

        function plugin() {}

        retext = new Retext();
        root = new retext.TextOM.RootNode();

        plugin.attach = function () {
            isInvoked = true;
        };

        retext.use(plugin);

        assert(isInvoked === true);

        isInvoked = false;

        retext.applyPlugins(root, function (err) {
            assert(isInvoked !== true);

            done(err);
        });
    });

    it('should invoke an attached plugin', function (done) {
        var retext,
            root,
            isInvoked;

        function plugin() {
            isInvoked = true;
        }

        retext = new Retext();
        root = new retext.TextOM.RootNode();

        retext.use(plugin);

        assert(isInvoked !== true);

        retext.applyPlugins(root, function (err) {
            assert(isInvoked === true);

            done(err);
        });
    });

    it('should invoke an attached plugin with a `RootNode`', function (done) {
        var retext,
            root,
            args;

        function plugin() {
            args = arguments;
        }

        retext = new Retext();
        root = new retext.TextOM.RootNode();

        retext.use(plugin);

        retext.applyPlugins(root, function (err) {
            assert(args[0] === root);
            assert(args[1] === retext);
            assert(args.length === 2);

            done(err);
        });
    });

    it('should invoke attached plugins in order', function (done) {
        var retext,
            root,
            isInvoked;

        function firstPlugin() {
            assert(isInvoked === false);

            isInvoked = true;
        }

        function secondPlugin() {
            assert(isInvoked === true);

            isInvoked = true;
        }

        retext = new Retext();
        root = new retext.TextOM.RootNode();
        isInvoked = false;

        retext
            .use(firstPlugin)
            .use(secondPlugin)
            .applyPlugins(root, done);
    });

    it('should invoke dependencies in order', function (done) {
        var retext,
            root,
            invokeCount;

        /* eslint-disable no-use-before-define */

        function thirdPlugin() {
            assert(invokeCount === 2);

            retext
                .use(firstPlugin)
                .use(secondPlugin);

            invokeCount++;
        }

        function secondPlugin() {
            assert(invokeCount === 1);

            invokeCount++;

            retext
                .use(firstPlugin)
                .use(thirdPlugin);
        }

        function firstPlugin() {
            assert(invokeCount === 0);

            invokeCount++;

            retext
                .use(secondPlugin)
                .use(thirdPlugin);
        }

        /* eslint-enable no-use-before-define */

        retext = new Retext();
        root = new retext.TextOM.RootNode();
        invokeCount = 0;

        retext
            .use(firstPlugin)
            .use(secondPlugin)
            .use(thirdPlugin)
            .applyPlugins(root, done);
    });

    it('should not re-invoke an attached plugin', function (done) {
        var retext,
            root,
            isInvoked;

        function nestedPlugin() {
            assert(isInvoked !== true);

            isInvoked = true;
        }

        function plugin(tree, retext) {
            retext.use(nestedPlugin);
        }

        retext = new Retext();
        root = new retext.TextOM.RootNode();

        retext
            .use(nestedPlugin)
            .use(plugin)
            .applyPlugins(root, done);
    });

    it('should not re-attach an attached plugin', function (done) {
        var retext,
            root;

        function nestedPlugin() {}

        function plugin(tree, retext) {
            var length;

            length = retext.ware.fns.length;

            retext.use(nestedPlugin);

            assert(length === retext.ware.fns.length);
        }

        retext = new Retext();
        root = new retext.TextOM.RootNode();

        retext
            .use(nestedPlugin)
            .use(plugin)
            .applyPlugins(root, done);
    });
});
