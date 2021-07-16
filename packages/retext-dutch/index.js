import {unherit} from 'unherit'
import {ParseDutch} from 'parse-dutch'

export {ParseDutch as Parser}

export default function retextDutch() {
  this.Parser = unherit(ParseDutch)
}
