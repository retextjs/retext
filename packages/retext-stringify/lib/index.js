/**
 * @import {Root} from 'nlcst'
 * @import {Compiler, Processor} from 'unified'
 */

import {toString} from 'nlcst-to-string'

/**
 * Add support for serializing natural language.
 *
 * @returns {undefined}
 *   Nothing.
 */
export default function retextStringify() {
  // eslint-disable-next-line unicorn/no-this-assignment
  const self =
    /** @type {Processor<undefined, undefined, undefined, Root, string>} */ (
      // @ts-expect-error -- TS in JSDoc doesn’t understand `this`.
      this
    )

  self.compiler = compiler
}

/** @type {Compiler<Root, string>} */
function compiler(tree) {
  return toString(tree)
}
