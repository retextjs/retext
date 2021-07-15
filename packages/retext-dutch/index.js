import unherit from 'unherit'
import Dutch from 'parse-dutch'

export {Dutch as Parser}

export default function retextDutch() {
  this.Parser = unherit(Dutch)
}
