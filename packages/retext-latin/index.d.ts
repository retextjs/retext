import type {Nodes, Paragraph, Root, Sentence} from 'nlcst'
import type {Plugin} from 'unified'

// See `parse-latin`.
type Extension<Node extends Nodes> = (node: Node) => undefined | void

// Note: we have to use manual types here,
// instead of getting them from `lib/index.js`,
// because TS generates wrong types for functions that use `this`.
// TS makes them into classes which is incorrect.
/**
 * Add support for parsing Latin-script natural language.
 *
 * @this
 *   Unified processor.
 * @returns
 *   Nothing.
 */
declare const retextLatin: Plugin<[], string, Root>
export default retextLatin

// Add custom data supported when `retext-latin` is added.
declare module 'unified' {
  interface Data {
    /**
     * List of extensions to transform paragraph nodes.
     */
    nlcstParagraphExtensions?: Array<Extension<Paragraph>>
    /**
     * List of extensions to transform root nodes.
     */
    nlcstRootExtensions?: Array<Extension<Root>>
    /**
     * List of extensions to transform sentence nodes.
     */
    nlcstSentenceExtensions?: Array<Extension<Sentence>>
  }
}
