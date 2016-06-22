/**
 * @author Titus Wormer
 * @copyright 2014 Titus Wormer
 * @license MIT
 * @module retext:stringify
 * @fileoverview NLCST to text compiler.
 */

'use strict';

/* eslint-env commonjs */

/* Dependencies. */
var toString = require('nlcst-to-string');

/**
 * Attacher.
 *
 * @param {unified} processor - Unified processor.
 * @param {Object?} [config={}] - Configuration.
 */
function stringify(processor) {
    /**
     * Construct a new compiler.
     */
    function Compiler() {}

    /**
     * Compile the bound file.
     *
     * @param {Node} tree - NLCST node.
     * @return {string} - text.
     */
    function compile(tree) {
        return toString(tree);
    }

    /* Expose methods. */
    Compiler.prototype.compile = compile;

    /* Expose parser. */
    processor.Compiler = Compiler;
}

/* Expose plugin. */
module.exports = stringify;
