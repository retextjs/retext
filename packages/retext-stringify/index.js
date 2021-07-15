import toString from 'nlcst-to-string'

export default function retextStringify() {
  this.Compiler = compiler
}

export function compiler(tree) {
  return toString(tree)
}
