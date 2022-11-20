/**
 * @typedef {import('nlcst').Root} Root
 */

import {unherit} from 'unherit'
import {ParseEnglish} from 'parse-english'

/**
 * @this {import('unified').Processor}
 * @type {import('unified').Plugin<[], string, Root>}
 */
export default function retextEnglish() {
  Object.assign(this, {Parser: unherit(ParseEnglish)})
}

export {ParseEnglish as Parser} from 'parse-english'
