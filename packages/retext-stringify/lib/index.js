/**
 * @import {Root} from 'nlcst'
 * @import {Processor} from 'unified'
 */

import {toString} from 'nlcst-to-string'

/**
 * Add support for serializing natural language.
 *
 * @this {Processor<undefined, undefined, undefined, Root, string>}
 *   Processor.
 * @returns {undefined}
 *   Nothing.
 */
export default function retextStringify() {
  this.compiler = compiler
}

/**
 * @param {Root} tree
 *   Tree.
 * @returns {string}
 *   Document.
 */
function compiler(tree) {
  return toString(tree)
}
