import unherit from 'unherit'
import Latin from 'parse-latin'

export {Latin as Parser}

export default function retextLatin() {
  this.Parser = unherit(Latin)
}
