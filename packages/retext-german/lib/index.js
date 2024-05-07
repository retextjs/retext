/**
 * @typedef {import('nlcst').Root} Root
 */

import {ParseGerman} from 'parse-german'  

/**
 * Add support for parsing German natural language.
 *
 * @returns {undefined}
 *   Nothing.
 */
export default function retextGerman() {
  // @ts-expect-error -- TS in JSDoc doesn’t understand `this`.
  // eslint-disable-next-line unicorn/no-this-assignment
  const self = /** @type {import('unified').Processor<Root>} */ (this)

  self.parser = parser

  /** @type {import('unified').Parser<Root>} */
  function parser(value) {
    const parser = new ParseGerman()
    add(parser.tokenizeParagraphPlugins, self.data('nlcstParagraphExtensions'))
    add(parser.tokenizeRootPlugins, self.data('nlcstRootExtensions'))
    add(parser.tokenizeSentencePlugins, self.data('nlcstSentenceExtensions'))
    return parser.parse(value)
  }
}

/**
 * @template T
 * @param {Array<T>} list
 * @param {Array<T> | undefined} values
 */
function add(list, values) {
  if (values) list.unshift(...values)
}
