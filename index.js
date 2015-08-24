/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer.
 * @license MIT
 * @module retext
 * @fileoverview Extensible system for analysing and manipulating
 *   natural language.
 */

'use strict';

/* eslint-env commonjs */

/*
 * Dependencies.
 */

var unified = require('unified');
var Parser = require('./lib/parse.js');
var Compiler = require('./lib/compile.js');

/*
 * Exports.
 */

module.exports = unified({
    'name': 'retext',
    'type': 'cst',
    'Parser': Parser,
    'Compiler': Compiler
});
