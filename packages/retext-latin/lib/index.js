/**
 * @typedef {import('nlcst').Root} Root
 */

import {unherit} from 'unherit'
// @ts-expect-error: untyped.
import {ParseLatin} from 'parse-latin'

/** @type {import('unified').ParserClass<Root>} */

/** @type {import('unified').Plugin<void[], string, Root>} */
export default function retextLatin() {
  Object.assign(this, {Parser: unherit(ParseLatin)})
}

// @ts-expect-error: untyped.
export {ParseLatin as Parser} from 'parse-latin'
