'use strict';

var Retext,
    assert;

/*
 * Module dependencies (retext, assert).
 */

Retext = require('./');
assert = require('assert');

/*
 * Cache a (by istanbul ignored) no-operation function.
 */

/* istanbul ignore next */
/**
 * No-op.
 */
function noop() {}

/*
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

        assert('parse' in retext.parser);
    });

    it('should set `TextOM` to an instance of `TextOM`', function () {
        var retext;

        retext = new Retext();

        assert('TextOM' in retext);
        assert('parser' in retext.TextOM);

        assert('Node' in retext.TextOM);
    });

    /*
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

/*
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

/*
 * Test `Retext#use(plugin, options?)`.
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
        }, /undefined/);

        assert.throws(function () {
            retext.use(null);
        }, /null/);

        assert.throws(function () {
            retext.use(undefined);
        }, /undefined/);

        assert.throws(function () {
            retext.use(true);
        }, /true/);

        assert.throws(function () {
            retext.use({});
        }, /object Object/);
    });

    it('should throw when `plugin.attach` is a `function`', function () {
        var retext;

        retext = new Retext();

        /* istanbul ignore next */
        /**
         * No-op.
         */
        function plugin() {}

        plugin.attach = noop;

        assert.throws(function () {
            retext.use(plugin);
        }, /`attach`/);
    });

    it('should attach a plugin', function () {
        var retext;

        retext = new Retext();

        assert(retext.plugins.length === 0);

        retext.use(noop);

        assert(retext.plugins.length === 1);
    });

    it('should invoke an attached plugin', function () {
        var retext,
            isInvoked;

        /**
         * Spy.
         */
        function plugin() {
            isInvoked = true;
        }

        retext = new Retext();

        retext.use(plugin);

        assert(isInvoked === true);
    });

    it('should invoke a plugin with `retext` and `options`', function () {
        var retext,
            options,
            parameters;

        /**
         * A plugin to test its arguments.
         */
        function plugin() {
            parameters = arguments;
        }

        retext = new Retext();

        options = {};

        retext.use(plugin, options);

        assert(parameters[0] === retext);
        assert(parameters[1] === options);
        assert(parameters.length === 2);
    });

    it('should invoke plugins in order', function () {
        var retext,
            isInvoked;

        /**
         * A plugin checking that the second plugin
         * is not invoked.
         */
        function firstPlugin() {
            assert(isInvoked === false);

            isInvoked = true;
        }

        /**
         * A plugin checking that the first plugin
         * is already invoked.
         */
        function secondPlugin() {
            assert(isInvoked === true);

            isInvoked = true;
        }

        retext = new Retext();
        isInvoked = false;

        retext
            .use(firstPlugin)
            .use(secondPlugin);
    });

    it('should invoke dependencies in order', function () {
        var retext,
            invokeCount;

        /* eslint-disable no-use-before-define */

        /**
         * A plugin checking that it's the first invoked
         * plugin.
         */
        function firstPlugin() {
            assert(invokeCount === 0);

            invokeCount++;

            retext
                .use(secondPlugin)
                .use(thirdPlugin);
        }

        /**
         * A plugin checking that it's the second invoked
         * plugin.
         */
        function secondPlugin() {
            assert(invokeCount === 1);

            invokeCount++;

            retext
                .use(firstPlugin)
                .use(thirdPlugin);
        }

        /**
         * A plugin checking that it's the last invoked
         * plugin.
         */
        function thirdPlugin() {
            assert(invokeCount === 2);

            retext
                .use(firstPlugin)
                .use(secondPlugin);

            invokeCount++;
        }

        /* eslint-enable no-use-before-define */

        retext = new Retext();
        invokeCount = 0;

        retext
            .use(firstPlugin)
            .use(secondPlugin)
            .use(thirdPlugin);
    });

    it('should not re-attach an attached plugin', function () {
        var retext;

        retext = new Retext();

        retext.use(noop);

        assert(retext.plugins.length === 1);

        retext.use(noop);

        assert(retext.plugins.length === 1);
    });
});

/*
 * Test Retext#parse(value, options?, done).
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

    it('should throw when `done` is not a `function`', function () {
        var retext;

        retext = new Retext();

        assert.throws(function () {
            retext.parse(null);
        }, /undefined/);

        assert.throws(function () {
            retext.parse(null, null);
        }, /null/);

        assert.throws(function () {
            retext.parse(null, undefined);
        }, /undefined/);

        assert.throws(function () {
            retext.parse(null, true);
        }, /true/);

        assert.throws(function () {
            retext.parse(null, {});
        }, /object Object/);
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

    it('should not invoke attached plugins', function (done) {
        var retext,
            isInvoked;

        /**
         * A plugin returning a spy, checking it's
         * invoked.
         */
        function plugin() {
            isInvoked = true;
        }

        retext = new Retext();

        retext.use(plugin);

        assert(isInvoked === true);

        isInvoked = false;

        retext.parse(null, function (err) {
            assert(isInvoked !== true);

            done(err);
        });
    });

    it('should invoke `onrun`', function (done) {
        var retext,
            isInvoked;

        /**
         * A plugin returning a spy, checking it's
         * invoked.
         */
        function plugin() {
            return function () {
                isInvoked = true;
            };
        }

        retext = new Retext();

        retext.use(plugin);

        assert(isInvoked !== true);

        retext.parse(null, function (err) {
            assert(isInvoked === true);

            done(err);
        });
    });

    it('should invoke `onrun` with a `RootNode`, retext, and `options`',
        function (done) {
            var retext,
                options,
                parameters;

            /**
             * A plugin returning a spy, to test its
             * arguments.
             */
            function plugin() {
                return function () {
                    parameters = arguments;
                };
            }

            retext = new Retext();

            options = {};

            retext.use(plugin);

            retext.parse(null, options, function (err, tree) {
                assert(parameters[0] === tree);
                assert(parameters[1] === options);
                assert(parameters.length === 2);

                done(err);
            });
        }
    );

    it('should invoke `onrun`s in order', function (done) {
        var retext,
            isInvoked;

        /**
         * A plugin returning a spy checking that it
         * is the first invoked plugin.
         */
        function firstPlugin() {
            return function () {
                assert(isInvoked === false);

                isInvoked = true;
            };
        }

        /**
         * A plugin returning a spy checking that the
         * first plugin is already invoked.
         */
        function secondPlugin() {
            return function () {
                assert(isInvoked === true);

                isInvoked = true;
            };
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

        /**
         * A plugin checking that it's the first invoked
         * plugin.
         */
        function thirdPlugin() {
            retext
                .use(firstPlugin)
                .use(secondPlugin);

            return function () {
                assert(invokeCount === 0);

                invokeCount++;
            };
        }

        /**
         * A plugin checking that it's the second invoked
         * plugin.
         */
        function secondPlugin() {
            retext
                .use(firstPlugin)
                .use(thirdPlugin);

            return function () {
                assert(invokeCount === 1);

                invokeCount++;
            };
        }

        /**
         * A plugin checking that it's the last invoked
         * plugin.
         */
        function firstPlugin() {
            retext
                .use(secondPlugin)
                .use(thirdPlugin);

            return function () {
                assert(invokeCount === 2);

                invokeCount++;
            };
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

    it('should not re-invoke `onrun`', function (done) {
        var retext,
            isInvoked;

        /**
         * A plugin returning a spy which detects if
         * its invoked.
         */
        function nestedPlugin() {
            return function () {
                assert(isInvoked !== true);

                isInvoked = true;
            };
        }

        /**
         * A plugin using another plugin.
         *
         * @param {Retext} retext
         */
        function plugin(retext) {
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

        /**
         * Nested plugin.
         */
        function nestedPlugin() {}

        /**
         * A plugin returning a spy,
         * using a nested plugin.
         *
         * @param {Retext} retext
         */
        function plugin(retext) {
            return function () {
                var length;

                length = retext.plugins.length;

                retext.use(nestedPlugin);

                assert(length === retext.plugins.length);
            };
        }

        retext = new Retext();

        retext
            .use(nestedPlugin)
            .use(plugin)
            .parse(null, done);
    });
});

/*
 * Test Retext#run(tree, options?, done).
 */

describe('Retext#run(tree, done)', function () {
    it('should be a `function`', function () {
        assert(typeof Retext.prototype.run === 'function');
        assert(typeof (new Retext()).run === 'function');
    });

    it('should return self', function (done) {
        var retext,
            root;

        retext = new Retext();
        root = new retext.TextOM.RootNode();

        assert(retext.run(root, done) === retext);
    });

    it('should throw when `done` is not a `function`', function () {
        var retext,
            root;

        retext = new Retext();
        root = new retext.TextOM.RootNode();

        assert.throws(function () {
            retext.run(root);
        }, /undefined/);

        assert.throws(function () {
            retext.run(root, null);
        }, /null/);

        assert.throws(function () {
            retext.run(root, undefined);
        }, /undefined/);

        assert.throws(function () {
            retext.run(root, true);
        }, /true/);

        assert.throws(function () {
            retext.run(root, {});
        }, /object Object/);
    });

    it('should invoke `done` with `tree`', function (done) {
        var retext,
            root;

        retext = new Retext();
        root = new retext.TextOM.RootNode();

        retext.run(root, function (err, tree) {
            assert(root === tree);

            done(err);
        });
    });

    it('should not invoke an attached plugin', function (done) {
        var retext,
            root,
            isInvoked;

        /**
         * A plugin returning a spy.
         */
        function plugin() {
            isInvoked = true;
        }

        retext = new Retext();
        root = new retext.TextOM.RootNode();

        retext.use(plugin);

        assert(isInvoked === true);

        isInvoked = false;

        retext.run(root, function (err) {
            assert(isInvoked !== true);

            done(err);
        });
    });

    it('should invoke `onrun`', function (done) {
        var retext,
            root,
            isInvoked;

        /**
         * A plugin returning a spy.
         */
        function plugin() {
            return function () {
                isInvoked = true;
            };
        }

        retext = new Retext();
        root = new retext.TextOM.RootNode();

        retext.use(plugin);

        assert(isInvoked !== true);

        retext.run(root, function (err) {
            assert(isInvoked === true);

            done(err);
        });
    });

    it('should invoke `onrun` with `root`, retext, and `options`',
        function (done) {
            var retext,
                root,
                options,
                parameters;

            /**
             * A plugin returning a spy, to test its
             * arguments.
             */
            function plugin() {
                return function () {
                    parameters = arguments;
                };
            }

            retext = new Retext();

            root = new retext.TextOM.RootNode();

            options = {};

            retext.use(plugin);

            retext.run(root, options, function (err) {
                assert(parameters[0] === root);
                assert(parameters[1] === options);
                assert(parameters.length === 2);

                done(err);
            });
        }
    );

    it('should invoke attached plugins in order', function (done) {
        var retext,
            root,
            isInvoked;

        /**
         * A plugin returning a spy, detecting if
         * none of the spies are already invoked.
         */
        function firstPlugin() {
            return function () {
                assert(isInvoked === false);

                isInvoked = true;
            };
        }

        /**
         * A plugin returning a spy, detecting if
         * one of the spies is already invoked.
         */
        function secondPlugin() {
            return function () {
                assert(isInvoked === true);

                isInvoked = true;
            };
        }

        retext = new Retext();
        root = new retext.TextOM.RootNode();
        isInvoked = false;

        retext
            .use(firstPlugin)
            .use(secondPlugin)
            .run(root, done);
    });

    it('should invoke dependencies in order', function (done) {
        var retext,
            root,
            invokeCount;

        /* eslint-disable no-use-before-define */

        /**
         * A plugin depending on two other plugins.
         */
        function thirdPlugin() {
            retext
                .use(firstPlugin)
                .use(secondPlugin);

            return function () {
                assert(invokeCount === 0);

                invokeCount++;
            };
        }

        /**
         * A plugin depending on two other plugins.
         */
        function secondPlugin() {
            retext
                .use(firstPlugin)
                .use(thirdPlugin);

            return function () {
                assert(invokeCount === 1);

                invokeCount++;
            };
        }

        /**
         * A plugin depending on two other plugins.
         */
        function firstPlugin() {
            retext
                .use(secondPlugin)
                .use(thirdPlugin);

            return function () {
                assert(invokeCount === 2);

                invokeCount++;
            };
        }

        /* eslint-enable no-use-before-define */

        retext = new Retext();
        root = new retext.TextOM.RootNode();
        invokeCount = 0;

        retext
            .use(firstPlugin)
            .use(secondPlugin)
            .use(thirdPlugin)
            .run(root, done);
    });

    it('should not re-invoke `onrun`', function (done) {
        var retext,
            root,
            isInvoked;

        /**
         * Nested plugin.
         */
        function nestedPlugin() {
            return function () {
                assert(isInvoked !== true);

                isInvoked = true;
            };
        }

        /**
         * plugin using a nested plugin.
         *
         * @param {Retext} retext
         */
        function plugin(retext) {
            retext.use(nestedPlugin);
        }

        retext = new Retext();
        root = new retext.TextOM.RootNode();

        retext
            .use(nestedPlugin)
            .use(plugin)
            .run(root, done);
    });

    it('should not re-attach an attached plugin', function (done) {
        var retext,
            root;

        /**
         * Nested plugin.
         */
        function nestedPlugin() {}

        /**
         * Spy.
         *
         * @param {Retext} retext
         */
        function plugin(retext) {
            return function () {
                var length;

                length = retext.ware.fns.length;

                retext.use(nestedPlugin);

                assert(length === retext.ware.fns.length);
            };
        }

        retext = new Retext();
        root = new retext.TextOM.RootNode();

        retext
            .use(nestedPlugin)
            .use(plugin)
            .run(root, done);
    });
});
