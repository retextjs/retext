/**
 * @author Titus Wormer
 * @copyright 2014 Titus Wormer
 * @license MIT
 * @module retext:latin
 * @fileoverview retext parser for Latin-script natural
 *   languages.
 */

'use strict';

/* eslint-env commonjs */

/* Dependencies. */
var unherit = require('unherit');
var Latin = require('parse-latin');

/**
 * Attacher.
 *
 * @param {unified} processor - Unified processor.
 */
function parse(processor) {
    processor.Parser = unherit(Latin);
}

/* Expose. */
parse.Parser = Latin;
module.exports = parse;
