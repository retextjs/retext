/**
 * @typedef {import('nlcst').Root} Root
 */

import {unherit} from 'unherit'
// @ts-expect-error: untyped.
import {ParseLatin} from 'parse-latin'

/**
 * @this {import('unified').Processor}
 * @type {import('unified').Plugin<[], string, Root>}
 */
export default function retextLatin() {
  Object.assign(this, {Parser: unherit(ParseLatin)})
}

// @ts-expect-error: untyped.
export {ParseLatin as Parser} from 'parse-latin'
