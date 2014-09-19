'use strict';

var Retext = require('..'),
    assert = require('assert');

/* istanbul ignore next: noop */
function noop() {}

describe('Retext()', function () {
    it('should be of type `function`', function () {
        assert(typeof Retext === 'function');
    });

    it('should return a newly initialized `Retext` object, when invoked ' +
        'without arguments', function () {
            assert(new Retext() instanceof Retext);
        }
    );

    it('should set the `parser` attribute to `parse-latin`, when invoked ' +
        'without arguments', function () {
            var retext = new Retext();
            assert('parser' in retext);
            assert('TextOM' in retext.parser);
        }
    );

    it('should set the `parser` attribute to the passed in parser, ' +
        'when given', function () {
            var retext = new Retext(noop);
            assert('parser' in retext);
            assert(retext.parser === noop);
        }
    );

    it('should create a new context/parser/textom when required, thus ' +
        'not requiring from memory', function (done) {
            new Retext().parse(null, function (err, rootNode1) {
                /* istanbul ignore if: won't error. */
                if (err) {
                    done(err);
                }

                new Retext().parse(null, function (err, rootNode2) {
                    assert(rootNode1 instanceof rootNode1.constructor);
                    assert(!(rootNode1 instanceof rootNode2.constructor));
                    assert(rootNode2 instanceof rootNode2.constructor);
                    assert(!(rootNode2 instanceof rootNode1.constructor));

                    done(err);
                });
            });
        }
    );
});

describe('Retext#use', function () {
    it('should be of type `function`', function () {
        assert(typeof Retext.prototype.use === 'function');
        assert(typeof (new Retext()).use === 'function');
    });

    it('should return self', function () {
        var retext = new Retext();
        assert(retext.use(noop) === retext);
    });

    it('should throw, when something other than a function was given',
        function () {
            var retext = new Retext();

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
        }
    );

    it('should attach `use`d plugins', function () {
        var retext = new Retext();
        assert(retext.ware.fns.length === 0);
        retext.use(noop);
        assert(retext.ware.fns.length === 1);
    });

    it('should not attach `use`d plugins multiple times', function () {
        var retext = new Retext();
        retext.use(noop);
        assert(retext.ware.fns.length === 1);
        retext.use(noop);
        assert(retext.ware.fns.length === 1);
    });
});

describe('Retext#parse', function () {
    it('should be of type `function`', function () {
        assert(typeof Retext.prototype.parse === 'function');
        assert(typeof (new Retext()).parse === 'function');
    });

    it('should return an instance of RootNode', function (done) {
        var retext = new Retext();

        retext.parse(null, function (err, rootNode) {
            assert(rootNode instanceof retext.parser.TextOM.RootNode);

            done(err);
        });
    });

    it('should immediately call the `attach` method on a plugin, when ' +
        '`use` is called', function () {
            var retext = new Retext(),
                isCalled = false;

            /* istanbul ignore next: noop */
            function plugin () {}

            plugin.attach = function () {
                isCalled = true;
            };

            retext.use(plugin);

            assert(isCalled === true);
        }
    );

    it('should not call the `attach` method, when `parse` is called',
        function (done) {
            var retext = new Retext(),
                isCalled = false;

            function plugin () {}

            plugin.attach = function () {
                isCalled = true;
            };

            retext.use(plugin);

            isCalled = false;

            retext.parse(null, function (err) {
                assert(isCalled === false);

                done(err);
            });
        }
    );

    it('should call `use`d plugins, when `parse` is called', function (done) {
        var retext = new Retext(),
            isCalled = false;

        function plugin () {
            isCalled = true;
        }

        retext.use(plugin);

        assert(isCalled === false);

        retext.parse(null, function (err) {
            assert(isCalled === true);

            done(err);
        });
    });

    it('should call `use`d plugins with an instance of RootNode and ' +
        'Retext, when `parse` is called', function (done) {
            var retext = new Retext(),
                args;

            function plugin () {
                args = arguments;
            }

            retext.use(plugin);

            retext.parse(null, function (err, tree) {
                assert(args[0] === tree);
                assert(args[1] === retext);
                assert(args.length === 2);

                done(err);
            });
        }
    );

    it('should not call (during parsing) `use`d plugins, when already used',
        function (done) {
            var retext = new Retext();

            function nestedPlugin () {}

            function plugin (tree, retext) {
                var length = retext.ware.fns.length;
                retext.use(nestedPlugin);
                assert(length === retext.ware.fns.length);
            }

            retext.use(nestedPlugin).use(plugin).parse(null, done);
        }
    );

    it('should parse something into a Text Object Model', function (done) {
        new Retext().parse('Something something', function (err, root) {
            assert('head' in root);
            assert('tail' in root);
            assert(root.head.parent === root);
            assert('TextOM' in root);

            done(err);
        });
    });
});

describe('Retext#applyPlugins', function () {
    it('should be of type `function`', function () {
        assert(typeof Retext.prototype.applyPlugins === 'function');
        assert(typeof (new Retext()).applyPlugins === 'function');
    });
});
