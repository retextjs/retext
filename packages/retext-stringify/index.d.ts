import type {Root} from 'nlcst'
import type {Plugin} from 'unified'

// Note: we have to use manual types here,
// instead of getting them from `lib/index.js`,
// because TS generates wrong types for functions that use `this`.
// TS makes them into classes which is incorrect.
/**
 * Add support for serializing natural language.
 *
 * @this
 *   Unified processor.
 * @returns
 *   Nothing.
 */
declare const retextStringify: Plugin<[], Root, string>

export default retextStringify
