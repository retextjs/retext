/**
 * @typedef {import('nlcst').Root} Root
 */

import {unherit} from 'unherit'
// @ts-expect-error: untyped.
import {ParseDutch} from 'parse-dutch'

/**
 * @this {import('unified').Processor}
 * @type {import('unified').Plugin<[], string, Root>}
 */
export default function retextDutch() {
  Object.assign(this, {Parser: unherit(ParseDutch)})
}

// @ts-expect-error: untyped.
export {ParseDutch as Parser} from 'parse-dutch'
