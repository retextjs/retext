/**
 * @author Titus Wormer
 * @copyright 2014 Titus Wormer
 * @license MIT
 * @module retext:latin
 * @fileoverview retext parser for Latin-script natural
 *   languages.
 */

'use strict';

/* Dependencies. */
var unherit = require('unherit');
var Latin = require('parse-latin');

/* Expose. */
module.exports = parse;
parse.Parser = Latin;

/**
 * Attacher.
 *
 * @param {unified} processor - Unified processor.
 */
function parse(processor) {
  processor.Parser = unherit(Latin);
}
