'use strict'

var toString = require('nlcst-to-string')

module.exports = stringify

function stringify() {
  this.Compiler = compiler
}

function compiler(tree) {
  return toString(tree)
}
