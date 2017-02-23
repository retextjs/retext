'use strict';

var unified = require('unified');
var latin = require('retext-latin');
var stringify = require('retext-stringify');

module.exports = unified()
  .use(latin)
  .use(stringify)
  .freeze();
