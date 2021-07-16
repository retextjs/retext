import {unherit} from 'unherit'
import {ParseLatin} from 'parse-latin'

export {ParseLatin as Parser}

export default function retextLatin() {
  this.Parser = unherit(ParseLatin)
}
