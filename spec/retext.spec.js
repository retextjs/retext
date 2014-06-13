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

    it('should set the `parser` attribute to `parse-english`, when invoked ' +
        'without arguments', function () {
            var retext = new Retext();
            assert('parser' in retext);
            assert(typeof retext.parser === 'function');
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
        'not requiring from memory', function () {
            var rootNode1 = new Retext().parse(),
                rootNode2 = new Retext().parse();

            assert(rootNode1 instanceof rootNode1.constructor);
            assert(!(rootNode1 instanceof rootNode2.constructor));
            assert(rootNode2 instanceof rootNode2.constructor);
            assert(!(rootNode2 instanceof rootNode1.constructor));
        }
    );

    it('should set the `plugins` attribute to an empty array', function () {
        var retext = new Retext();
        assert('plugins' in retext);
        assert(retext.plugins instanceof Array);
        assert(retext.hasOwnProperty('plugins'));
        assert(retext.plugins.length === 0);
    });
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
        assert(retext.plugins.length === 0);
        retext.use(noop);
        assert(retext.plugins.length === 1);
    });

    it('should not attach `use`d plugins multiple times', function () {
        var retext = new Retext();
        retext.use(noop);
        assert(retext.plugins.length === 1);
        retext.use(noop);
        assert(retext.plugins.length === 1);
    });
});

describe('Retext#parse', function () {
    it('should be of type `function`', function () {
        assert(typeof Retext.prototype.parse === 'function');
        assert(typeof (new Retext()).parse === 'function');
    });

    it('should return an instance of RootNode', function () {
        var retext = new Retext();
        assert(retext.parse() instanceof retext.parser.TextOM.RootNode);
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
        function () {
            var retext = new Retext(),
                isCalled = false;

            function plugin () {}

            plugin.attach = function () {
                isCalled = true;
            };

            retext.use(plugin);

            isCalled = false;

            retext.parse();

            assert(isCalled === false);
        }
    );

    it('should call `use`d plugins, when `parse` is called', function () {
        var retext = new Retext(),
            isCalled = false;

        function plugin () {
            isCalled = true;
        }

        retext.use(plugin);

        assert(isCalled === false);

        retext.parse();

        assert(isCalled === true);
    });

    it('should call `use`d plugins with an instance of RootNode and ' +
        'Retext, when `parse` is called', function () {
            var retext = new Retext(),
                args = null,
                tree;

            function plugin () {
                args = arguments;
            }

            retext.use(plugin);

            tree = retext.parse();

            assert(args[0] === tree);
            assert(args[1] === retext);
        }
    );

    it('should immediately call (during parsing) `use`d plugins, with ' +
        'an instance of RootNode and Retext', function () {
            var retext = new Retext(),
                args = null;

            function nestedPlugin () {
                args = arguments;
            }

            function plugin (tree, retext) {
                retext.use(nestedPlugin);
                assert(args[0] === tree);
                assert(args[1] === retext);
            }

            retext.use(plugin).parse();
        }
    );

    it('should not call (during parsing) `use`d plugins, when already used',
        function () {
            var retext = new Retext();

            function nestedPlugin () {}

            function plugin (tree, retext) {
                var length = retext.plugins.length;
                retext.use(nestedPlugin);
                assert(length === retext.plugins.length);
            }

            retext.use(nestedPlugin).use(plugin).parse();
        }
    );
});
