import type {Nodes, Paragraph, Root, Sentence} from 'nlcst'
import type {Plugin} from 'unified'

// See `parse-latin`.
type Extension<Node extends Nodes> = (node: Node) => undefined | void

/**
 * Add support for parsing Dutch natural language.
 *
 * @this
 *   Unified processor.
 * @returns
 *   Nothing.
 */
declare const retextDutch: Plugin<[], string, Root>
export default retextDutch

// Add custom data supported when `retext-dutch` is added.
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
