import unherit from 'unherit'
import English from 'parse-english'

export {English as Parser}

export default function retextEnglish() {
  this.Parser = unherit(English)
}
