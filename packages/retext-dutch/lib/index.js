/**
 * @typedef {import('nlcst').Root} Root
 */

import {unherit} from 'unherit'
import {ParseDutch} from 'parse-dutch'

/**
 * @this {import('unified').Processor}
 * @type {import('unified').Plugin<[], string, Root>}
 */
export default function retextDutch() {
  Object.assign(this, {Parser: unherit(ParseDutch)})
}

export {ParseDutch as Parser} from 'parse-dutch'
