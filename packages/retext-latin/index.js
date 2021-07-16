/**
 * @typedef {import('unified').Plugin<[]>} Plugin
 */

import {unherit} from 'unherit'
// @ts-expect-error: untyped.
import {ParseLatin as Parser} from 'parse-latin'

// Untyped.
// type-coverage:ignore-next-line
export {Parser}

/** @type {Plugin} */
export default function retextLatin() {
  Object.assign(this, {Parser: unherit(Parser)})
}
