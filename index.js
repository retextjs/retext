/* jshint -W084, -W093 */
(function () {
    /**
     * Expose `Retext`. Defined below, and used to instantiate a new
     * Retext object.
     */
    exports = module.exports = Retext;

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
     * Note that, when parser is a string or not given, the to-require module
     * is first removed from the Require cache. This results in a completly
     * new parser module, and a new TextOM object, thus clearing any changes
     * made to TextOM or the parser and that, for example, the following is
     * true:
     *
     *   !(new Retext().parse() instanceof new Retext().parse().constructor);
     *
     * The following however, is also true:
     *
     *   var retext = new Retext();
     *   retext.parse() instanceof retext.parse().constructor;
     *
     *
     * @param {(Object|String)?} parser - the parser, or its name, to use.
     *                                    Defaults to "parse-english".
     * @api public
     * @constructor
     */
    function Retext(parser) {
        var self = this,
            cache = require.cache,
            attribute;

        if (!parser) {
            parser = 'parse-english';
        }

        if (typeof parser === 'string') {
            /* Load the parser for vendors without dynamic-require's */
            if (parser === 'parse-english') {
                parser = require('parse-english');
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
            rootNode = parser(source),
            plugin;

        self.use = useImmediately(rootNode, use);

        while (plugin = plugins[++iterator]) {
            plugin(rootNode, this);
        }

        self.use = use;

        return rootNode;
    };
})();
