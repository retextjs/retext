/**
 * @import {Root} from 'nlcst'
 * @import {Processor} from 'unified'
 */

import {ParseDutch} from 'parse-dutch'

/**
 * Add support for parsing Dutch natural language.
 *
 * @this {Processor<Root>}
 *   Processor.
 * @returns {undefined}
 *   Nothing.
 */
export default function retextDutch() {
  const self = this

  self.parser = parser

  /**
   * @param {string} value
   *   Document.
   * @returns {Root}
   *   Tree.
   */
  function parser(value) {
    const parser = new ParseDutch()
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
