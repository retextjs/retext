/**
 * @author Titus Wormer
 * @copyright 2014 Titus Wormer
 * @license MIT
 * @module retext:compile
 * @fileoverview Compile NLCST to string.
 */

/* eslint-env commonjs */

'use strict';

/*
 * Dependencies.
 */

var toString = require('nlcst-to-string');

/**
 * Construct a new compiler.
 *
 * @example
 *   var file = new VFile('Hello World.');
 *
 *   file.namespace('retext').cst = {
 *       'type': 'SentenceNode',
 *       'children': [
 *           {
 *               'type': 'WordNode',
 *               'children': [{
 *                   'type': 'TextNode',
 *                   'value': 'Hello'
 *               }]
 *           },
 *           {
 *               'type': 'WhiteSpaceNode',
 *               'value': ' '
 *           },
 *           {
 *               'type': 'WordNode',
 *               'children': [{
 *                   'type': 'TextNode',
 *                   'value': 'World'
 *               }]
 *           },
 *           {
 *               'type': 'PunctuationNode',
 *               'value': '.'
 *           }
 *       ]
 *   };
 *
 *   var compiler = new Compiler(file);
 *
 * @constructor
 * @class {Compiler}
 * @param {File} file - Virtual file.
 */
function Compiler(file) {
    this.file = file;
}

/**
 * Stringify the bound file.
 *
 * @example
 *   var file = new VFile('Hello');
 *
 *   file.namespace('retext').cst = {
 *     type: 'WordNode',
 *     children: [{
 *       type: 'TextNode',
 *       value: 'Hello'
 *     }]
 *   });
 *
 *   new Compiler(file).compile();
 *   // 'Foo'
 *
 * @this {Compiler}
 * @return {string} - Document.
 */
function compile() {
    return toString(this.file.namespace('retext').tree);
}

/*
 * Expose `compile`.
 */

Compiler.prototype.compile = compile;

/*
 * Expose.
 */

module.exports = Compiler;
