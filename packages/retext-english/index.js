/**
 * @typedef {import('unified').Plugin<[]>} Plugin
 */

import {unherit} from 'unherit'
// @ts-expect-error: untyped.
import {ParseEnglish as Parser} from 'parse-english'

// Untyped.
// type-coverage:ignore-next-line
export {Parser}

/** @type {Plugin} */
export default function retextEnglish() {
  Object.assign(this, {Parser: unherit(Parser)})
}
