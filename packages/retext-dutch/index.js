/**
 * @author Titus Wormer
 * @copyright 2014 Titus Wormer
 * @license MIT
 * @module retext:dutch
 * @fileoverview retext parser for the Dutch language.
 */

'use strict';

/* Dependencies. */
var unherit = require('unherit');
var Dutch = require('parse-dutch');

/* Expose. */
module.exports = parse;
parse.Parser = Dutch;

/**
 * Attacher.
 *
 * @param {unified} processor - Unified processor.
 */
function parse(processor) {
  processor.Parser = unherit(Dutch);
}
