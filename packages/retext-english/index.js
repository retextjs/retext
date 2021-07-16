import {unherit} from 'unherit'
import {ParseEnglish} from 'parse-english'

export {ParseEnglish as Parser}

export default function retextEnglish() {
  this.Parser = unherit(ParseEnglish)
}
