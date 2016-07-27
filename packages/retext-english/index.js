/**
 * @author Titus Wormer
 * @copyright 2014 Titus Wormer
 * @license MIT
 * @module retext:english
 * @fileoverview retext parser for the English language.
 */

'use strict';

/* Dependencies. */
var unherit = require('unherit');
var English = require('parse-english');

/* Expose. */
module.exports = parse;
parse.Parser = English;

/**
 * Attacher.
 *
 * @param {unified} processor - Unified processor.
 */
function parse(processor) {
  processor.Parser = unherit(English);
}
