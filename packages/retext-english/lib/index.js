/**
 * @typedef {import('nlcst').Root} Root
 */

import {unherit} from 'unherit'
// @ts-expect-error: untyped.
import {ParseEnglish} from 'parse-english'

/** @type {import('unified').ParserClass<Root>} */
export const Parser = ParseEnglish

/** @type {import('unified').Plugin<void[], string, Root>} */
export default function retextEnglish() {
  Object.assign(this, {Parser: unherit(ParseEnglish)})
}
