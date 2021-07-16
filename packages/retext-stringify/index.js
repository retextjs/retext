/**
 * @typedef {import('unified').Plugin<[]>} Plugin
 * @typedef {import('unist').Node} Node
 */

import {toString} from 'nlcst-to-string'

/** @type {Plugin} */
export default function retextStringify() {
  Object.assign(this, {Compiler})
}

/**
 * @param {Node} tree
 * @returns {string}
 */
function Compiler(tree) {
  return toString(tree)
}
