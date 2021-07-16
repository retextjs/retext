import {toString} from 'nlcst-to-string'

export default function retextStringify() {
  this.Compiler = compiler
}

function compiler(tree) {
  return toString(tree)
}
