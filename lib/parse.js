/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer. All rights reserved.
 * @license MIT
 * @module retext:parse
 * @fileoverview Parse a virtual file to nlcst.
 */

'use strict';

/*
 * Dependencies.
 */

var Latin = require('parse-latin');

/**
 * Construct a new parser.
 *
 * @example
 *   var file = new VFile('Hello World.');
 *   var parser = new Parser(file);
 *
 * @constructor
 * @class {Parser}
 * @param {File} file - Virtual file.
 */
function Parser(file) {
    this.file = file;
}

/**
 * Stringify the bound file.
 *
 * @example
 *   var file = new VFile('Hello world');
 *
 *   new Parser(file).parse();
 *   // ...
 *   // {
 *   //     'type': 'SentenceNode',
 *   //     'children': [
 *   //         {
 *   //             'type': 'WordNode',
 *   //             'children': [{
 *   //                 'type': 'TextNode',
 *   //                 'value': 'Hello'
 *   //             }]
 *   //         },
 *   //         {
 *   //             'type': 'WhiteSpaceNode',
 *   //             'value': ' '
 *   //         },
 *   //         {
 *   //             'type': 'WordNode',
 *   //             'children': [{
 *   //                 'type': 'TextNode',
 *   //                 'value': 'World'
 *   //             }]
 *   //         },
 *   //         {
 *   //             'type': 'PunctuationNode',
 *   //             'value': '.'
 *   //         }
 *   //     ]
 *   // }
 *   // ...
 *
 * @this {Parser}
 * @return {Node} - NLCST node.
 */
function parse() {
    return new Latin({
        'position': true
    }).parse(this.file.toString());
}

/*
 * Expose `parse`.
 */

Parser.prototype.parse = parse;

/*
 * Expose.
 */

module.exports = Parser;
