/**
 * @author Titus Wormer
 * @copyright 2014 Titus Wormer
 * @license MIT
 * @module retext:stringify
 * @fileoverview NLCST to text compiler.
 */

'use strict';

/* Dependencies. */
var toString = require('nlcst-to-string');

/* Expose plugin. */
module.exports = stringify;

/**
 * Attacher.
 *
 * @param {unified} processor - Unified processor.
 * @param {Object?} [config={}] - Configuration.
 */
function stringify(processor) {
  /* Attach. */
  processor.Compiler = Compiler;

  /* Expose methods. */
  Compiler.prototype.compile = compile;

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
}
