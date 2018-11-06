'use strict'

var unherit = require('unherit')
var Latin = require('parse-latin')

module.exports = parse
parse.Parser = Latin

function parse() {
  this.Parser = unherit(Latin)
}
