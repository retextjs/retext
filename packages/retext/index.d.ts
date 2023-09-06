/// <reference types="retext-latin" />
/// <reference types="retext-stringify" />

import type {Root} from 'nlcst'
import type {Processor} from 'unified'

/**
 * Create a new unified processor that already uses `retext-latin` and
 * `retext-stringify`.
 */
export const retext: Processor<Root, undefined, undefined, Root, string>
