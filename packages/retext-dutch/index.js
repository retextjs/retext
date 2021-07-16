/**
 * @typedef {import('unified').Plugin<[]>} Plugin
 */

import {unherit} from 'unherit'
// @ts-expect-error: untyped.
import {ParseDutch as Parser} from 'parse-dutch'

// Untyped.
// type-coverage:ignore-next-line
export {Parser}

/** @type {Plugin} */
export default function retextDutch() {
  Object.assign(this, {Parser: unherit(Parser)})
}
