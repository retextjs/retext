'use strict';

function useImmediately(rootNode, use) {
    return function (plugin) {
        var self = this,
            length = self.plugins.length;

        use.apply(self, arguments);

        if (length !== self.plugins.length) {
            plugin(rootNode, self);
        }

        return self;
    };
}

/**
 * Define `Retext`. Exported above, and used to instantiate a new
 * `Retext`.
 *
 * @param {(Object|String)?} parser - the parser, or its name, to use.
 *                                    Defaults to "parse-latin".
 * @api public
 * @constructor
 */
function Retext(parser) {
    var self = this;

    if (!parser) {
        parser = 'parse-latin';
    }

    if (typeof parser === 'string') {
        /* istanbul ignore else: TODO / TOSPEC */
        /* Load the parser for vendors without dynamic-require's */
        if (parser === 'parse-latin') {
            parser = require('parse-latin');
        } else {
            parser = require(parser);
        }

        parser = parser();
    }

    self.parser = parser;
    self.plugins = [];
}

/**
 * `Retext#use` takes a plugin—a humble function—and when the parse
 * method of the Retext instance is called, the plugin will be called
 * with the parsed tree, and the retext instance as arguments.
 *
 * Note that, during the parsing stage, when the `use` method is called
 * by a plugin, the nested plugin is immediately called, before continuing
 * on with its parent plugin.
 *
 * @param {Function} plugin - the plugin to call when parsing.
 * @param {Function?} plugin.attach - called only once with a Retext
 *                                    instance. If you're planning on
 *                                    modifying TextOM or a parser, do it
 *                                    in this method.
 * @return this
 * @api public
 */
Retext.prototype.use = function (plugin) {
    if (typeof plugin !== 'function') {
        throw new TypeError('Illegal invocation: \'' + plugin +
            '\' is not a valid argument for \'Retext.prototype.use\'');
    }

    var self = this,
        plugins = self.plugins;

    if (plugins.indexOf(plugin) === -1) {
        if (plugin.attach) {
            plugin.attach(self);
        }

        plugins.push(plugin);
    }

    return self;
};

/**
 * `Retext#parse` takes a source to be given (and parsed) by the parser.
 * Then, `parse` iterates over all plugins, and allows them to modify the
 * TextOM tree created by the parser.
 *
 * Note that, during the parsing stage, when the `use` plugin is called
 * by a plugin, the nested plugin is immediately called, before continuing
 * on with its parent plugin.
 *
 * @param {(String|Node)?} source - The source to convert.
 * @return {Node} - A RootNode containing the tokenised source.
 * @api public
 */
Retext.prototype.parse = function (source) {
    var self = this,
        parser = self.parser,
        plugins = self.plugins.concat(),
        iterator = -1,
        use = self.use,
        rootNode = parser(source);

    self.use = useImmediately(rootNode, use);

    while (plugins[++iterator]) {
        plugins[iterator](rootNode, this);
    }

    self.use = use;

    return rootNode;
};

/**
 * Expose `Retext`. Used to instantiate a new Retext object.
 */
exports = module.exports = Retext;
