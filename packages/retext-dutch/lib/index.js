/**
 * @typedef {import('nlcst').Root} Root
 */

import {unherit} from 'unherit'
// @ts-expect-error: untyped.
import {ParseDutch} from 'parse-dutch'

/** @type {import('unified').ParserClass<Root>} */
export const Parser = ParseDutch

/** @type {import('unified').Plugin<void[], string, Root>} */
export default function retextDutch() {
  Object.assign(this, {Parser: unherit(ParseDutch)})
}
