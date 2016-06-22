/**
 * @author Titus Wormer
 * @copyright 2014 Titus Wormer
 * @license MIT
 * @module retext
 * @fileoverview Natural language processor powered by
 *   plugins.
 */

'use strict';

/* eslint-env commonjs */

/* Dependencies. */
var unified = require('unified');
var latin = require('retext-latin');
var stringify = require('retext-stringify');

/* Expose. */
module.exports = unified()
    .use(latin)
    .use(stringify)
    .abstract();
