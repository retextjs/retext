/**
 * @typedef {import('nlcst').Root} Root
 */

import {unherit} from 'unherit'
import {ParseLatin} from 'parse-latin'

/**
 * @this {import('unified').Processor}
 * @type {import('unified').Plugin<[], string, Root>}
 */
export default function retextLatin() {
  Object.assign(this, {Parser: unherit(ParseLatin)})
}

export {ParseLatin as Parser} from 'parse-latin'
