'use strict';

var nlcstToTextOM,
    TextOMConstructor,
    ParseLatin,
    Ware;

/**
 * Module dependencies.
 */

nlcstToTextOM = require('nlcst-to-textom');
TextOMConstructor = require('textom');
ParseLatin = require('parse-latin');
Ware = require('ware');

/**
 * Construct an instance of `Retext`.
 *
 * @param {Function?} parser - the parser to use. Defaults
 *   to a new instance of `parse-latin`.
 * @constructor
 */

function Retext(parser) {
    var self,
        TextOM;

    if (!parser) {
        parser = new ParseLatin();
    }

    self = this;
    TextOM = new TextOMConstructor();

    self.plugins = [];

    self.ware = new Ware();
    self.parser = parser;
    self.TextOM = TextOM;

    /**
     * Expose `TextOM` on `parser`, and vice versa.
     */

    parser.TextOM = TextOM;
    TextOM.parser = parser;
}

/**
 * Attaches `plugin`: a humble function.
 *
 * When `parse` or `run` is invoked, `plugin` is
 * invoked with `node` and a `retext` instance.
 *
 * If `plugin` contains asynchronous functionality, it
 * should accept a third argument (`next`) and invoke
 * it on completion.
 *
 * `plugin.attach` is invoked with a `retext` instance
 * when attached, enabling `plugin` to depend on other
 * plugins.
 *
 * Code to initialize `plugin` should go into its `attach`
 * method, such as functionality to modify the object model
 * (TextOM), the parser (e.g., `parse-latin`), or the
 * `retext` instance. `plugin.attach` is invoked when
 * `plugin` is attached to a `retext` instance.
 *
 * @param {function(Retext): function(Node, Function?)} plugin -
 *   Functionality to initialize the plugin an manipulate the
 *   object model and parser; returns a function
 * @return this
 */

Retext.prototype.use = function (plugin, options) {
    var self,
        onparse;

    if (typeof plugin !== 'function') {
        throw new TypeError(
            'Illegal invocation: `' + plugin + '` ' +
            'is not a valid argument for `Retext#use(plugin)`'
        );
    }

    if (typeof plugin.attach === 'function') {
        throw new TypeError(
            'Illegal invocation: `' + plugin + '` ' +
            'is not a valid argument for ' +
            '`Retext#use(plugin)`.\n' +
            'This breaking change, the removal of ' +
            '`attach`, occurred in 0.3.0-rc.2, see ' +
            'GitHub for more information.'
        );
    }

    self = this;

    /**
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
 * @param {string?} value - The value to transform.
 * @param {Object} [options={}] - Optional settings.
 * @param {function(Error, Node)} done - Callback to
 *   invoke when the transformations have completed.
 * @return this
 */

Retext.prototype.parse = function (value, options, done) {
    var self,
        nlcst;

    if (!done) {
        done = options;
        options = null;
    }

    if (typeof done !== 'function') {
        throw new TypeError(
            'Illegal invocation: `' + done + '` ' +
            'is not a valid argument for `Retext#parse(value, done)`.\n' +
            'This breaking change occurred in 0.2.0-rc.1, see GitHub for ' +
            'more information.'
        );
    }

    self = this;

    nlcst = self.parser.parse(value);

    self.run(nlcstToTextOM(self.TextOM, nlcst), options, done);

    return self;
};

/**
 * Applies attached plugins to `node` and invokes `done`
 * with either an error (first argument) or the transformed
 * `node` (second argument).
 *
 * @param {Node} node - The node to apply attached
 *   plugins to.
 * @param {Object} [options={}] - Optional settings.
 * @param {function(Error, Node)} done - Callback to
 *   invoke when the transformations have completed.
 * @return this
 */

Retext.prototype.run = function (node, options, done) {
    var self;

    if (!done) {
        done = options;
        options = null;
    }

    if (typeof done !== 'function') {
        throw new TypeError(
            'Illegal invocation: `' + done + '` ' +
            'is not a valid argument for ' +
            '`Retext#run(node, done)`.\n' +
            'This breaking change occurred in 0.2.0-rc.1, see GitHub for ' +
            'more information.'
        );
    }

    self = this;

    self.ware.run(node, options, done);

    return self;
};

/**
 * Expose `Retext`.
 */

module.exports = Retext;
