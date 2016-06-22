/**
 * @author Titus Wormer
 * @copyright 2014 Titus Wormer
 * @license MIT
 * @module retext:english
 * @fileoverview retext parser for the English language.
 */

'use strict';

/* eslint-env commonjs */

/* Dependencies. */
var unherit = require('unherit');
var English = require('parse-english');

/**
 * Attacher.
 *
 * @param {unified} processor - Unified processor.
 */
function parse(processor) {
    processor.Parser = unherit(English);
}

/* Expose. */
parse.Parser = English;
module.exports = parse;
