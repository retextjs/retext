/**
 * @author Titus Wormer
 * @copyright 2014 Titus Wormer
 * @license MIT
 * @module retext:dutch
 * @fileoverview retext parser for the Dutch language.
 */

'use strict';

/* eslint-env commonjs */

/* Dependencies. */
var unherit = require('unherit');
var Dutch = require('parse-dutch');

/**
 * Attacher.
 *
 * @param {unified} processor - Unified processor.
 */
function parse(processor) {
    processor.Parser = unherit(Dutch);
}

/* Expose. */
parse.Parser = Dutch;
module.exports = parse;
