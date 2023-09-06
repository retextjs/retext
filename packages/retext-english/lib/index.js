/**
 * @typedef {import('nlcst').Root} Root
 */

import {ParseEnglish} from 'parse-english'

/**
 * Add support for parsing English natural language.
 *
 * @returns {undefined}
 *   Nothing.
 */
export default function retextEnglish() {
  // @ts-expect-error -- TS in JSDoc doesn’t understand `this`.
  // eslint-disable-next-line unicorn/no-this-assignment
  const self = /** @type {import('unified').Processor<Root>} */ (this)

  self.parser = parser

  /** @type {import('unified').Parser<Root>} */
  function parser(value) {
    const parser = new ParseEnglish()
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
