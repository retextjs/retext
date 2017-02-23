'use strict';

var unherit = require('unherit');
var Dutch = require('parse-dutch');

module.exports = parse;
parse.Parser = Dutch;

function parse() {
  this.Parser = unherit(Dutch);
}
