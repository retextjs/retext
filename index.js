/**
 * @author Titus Wormer
 * @copyright 2014 Titus Wormer
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
var Parser = require('parse-latin');
var Compiler = require('./lib/compile.js');

/*
 * Exports.
 */

module.exports = unified({
    'name': 'retext',
    'Parser': Parser,
    'Compiler': Compiler
});
