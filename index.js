/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer. All rights reserved.
 * @module retext
 * @fileoverview Extensible system for analysing and manipulating
 *   natural language.
 */

'use strict';

/*
 * Dependencies.
 */

var nlcstToTextOM = require('nlcst-to-textom');
var TextOMConstructor = require('textom');
var ParseLatin = require('parse-latin');
var Ware = require('ware');

/**
 * Construct an instance of `Retext`.
 *
 * @example
 *   var Retext = require('retext');
 *
 *   var retext = new Retext();
 *
 * @example
 *   var Retext = require('retext');
 *   var English = require('parse-english');
 *
 *   var retext = new Retext(new English());
 *
 * @param {Function?} parser - the parser to use. Defaults
 *   to a new instance of `parse-latin`.
 * @constructor Retext
 */
function Retext(parser) {
    var self = this;
    var TextOM = new TextOMConstructor();

    if (!parser) {
        parser = new ParseLatin();
    }

    self.plugins = [];

    self.ware = new Ware();
    self.parser = parser;
    self.TextOM = TextOM;

    /*
     * Expose `TextOM` on `parser`, and vice versa.
     */

    parser.TextOM = TextOM;
    TextOM.parser = parser;
}

/**
 * Attaches `plugin`: a humble function.
 *
 * When `use` is called, the `plugin` is invoked with
 * the retext instance and an `options` object.
 * Code to initialize `plugin` should go here, such as
 * functionality to modify the object model (TextOM),
 * the parser (e.g., `parse-latin`), or the `retext`
 * instance itself.
 *
 * Optionally `plugin` can return a function which is
 * called every time the user invokes `parse` or `run`.
 * When that happends, that function is invoked with
 * a `Node` and an `options` object.
 * If `plugin` contains asynchronous functionality, it
 * should accept a third argument (`next`) and invoke
 * it on completion.
 *
 * @example
 *   var Retext = require('retext');
 *   var smartypants = require('retext-smartypants');
 *
 *   var retext = new Retext()
 *     .use(smartypants)
 *     .parse('Foo "bar" baz.', function (err, tree) {
 *       console.log(tree.toString());
 *       // 'Foo “bar” baz.'
 *     });
 *
 * @param {function(Retext, Object): function(Node, Object, Function?)} plugin
 * @return {Retext} - self
 */
Retext.prototype.use = function (plugin, options) {
    var self = this;
    var onparse;

    if (typeof plugin !== 'function') {
        throw new TypeError(
            'Illegal invocation: `' + plugin + '` ' +
            'is not a valid argument for `Retext#use(plugin)`'
        );
    }

    /*
     * Ware does not know which plugins are attached,
     * only which `onrun` methods are. Thus, we have
     * a custom list of `plugins`, and here we check
     * against that.
     */

    if (self.plugins.indexOf(plugin) === -1) {
        self.plugins.push(plugin);

        onparse = plugin(self, options || {});

        if (typeof onparse === 'function') {
            self.ware.use(onparse);
        }
    }

    return self;
};

/**
 * Transform a given value into a node, applies attached
 * plugins to the node, and invokes `done` with either an
 * error (first argument) or the transformed node (second
 * argument).
 *
 * @example
 *   var Retext = require('retext');
 *   var smartypants = require('retext-smartypants');
 *
 *   var retext = new Retext()
 *     .parse('Foo "bar" baz.', function (err, tree) {
 *       console.log(tree.type);
 *       // 'RootNode'
 *     });
 *
 * @param {string?} value - The value to transform.
 * @param {Object} [options={}] - Optional settings.
 * @param {function(Error, Node)} done - Callback to
 *   invoke when the transformations have completed.
 * @return {Retext} - self
 */
Retext.prototype.parse = function (value, options, done) {
    var self = this;
    var nlcst;

    if (!done) {
        done = options;
        options = null;
    }

    nlcst = self.parser.parse(value);

    self.run(nlcstToTextOM(self.TextOM, nlcst), options, done);

    return self;
};

/**
 * Applies attached plugins to `node` and invokes `done`
 * with either an error (first argument) or the transformed
 * `node` (second argument).
 *
 * @private
 * @param {Node} node - The node to apply attached
 *   plugins to.
 * @param {Object} [options={}] - Optional settings.
 * @param {function(Error, Node)} done - Callback to
 *   invoke when the transformations have completed.
 * @return {Retext} - self
 */
Retext.prototype.run = function (node, options, done) {
    var self = this;

    if (!done) {
        done = options;
        options = null;
    }

    self.ware.run(node, options, done);

    return self;
};

/*
 * Expose `Retext`.
 */

module.exports = Retext;
