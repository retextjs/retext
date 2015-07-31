(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Retext = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer.
 * @license MIT
 * @module retext
 * @fileoverview Extensible system for analysing and manipulating
 *   natural language.
 */

'use strict';

/*
 * Dependencies.
 */

var unified = require('unified');
var Parser = require('./lib/parse.js');
var Compiler = require('./lib/compile.js');

/*
 * Exports.
 */

module.exports = unified({
    'name': 'retext',
    'type': 'cst',
    'Parser': Parser,
    'Compiler': Compiler
});

},{"./lib/compile.js":2,"./lib/parse.js":3,"unified":34}],2:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer. All rights reserved.
 * @license MIT
 * @module retext:compile
 * @fileoverview Compile nlcst to string.
 */

'use strict';

/*
 * Dependencies.
 */

var toString = require('nlcst-to-string');

/**
 * Construct a new compiler.
 *
 * @example
 *   var file = new VFile('Hello World.');
 *
 *   file.namespace('retext').cst = {
 *       'type': 'SentenceNode',
 *       'children': [
 *           {
 *               'type': 'WordNode',
 *               'children': [{
 *                   'type': 'TextNode',
 *                   'value': 'Hello'
 *               }]
 *           },
 *           {
 *               'type': 'WhiteSpaceNode',
 *               'value': ' '
 *           },
 *           {
 *               'type': 'WordNode',
 *               'children': [{
 *                   'type': 'TextNode',
 *                   'value': 'World'
 *               }]
 *           },
 *           {
 *               'type': 'PunctuationNode',
 *               'value': '.'
 *           }
 *       ]
 *   };
 *
 *   var compiler = new Compiler(file);
 *
 * @constructor
 * @class {Compiler}
 * @param {File} file - Virtual file.
 */
function Compiler(file) {
    this.file = file;
}

/**
 * Stringify the bound file.
 *
 * @example
 *   var file = new VFile('Hello');
 *
 *   file.namespace('retext').cst = {
 *     type: 'WordNode',
 *     children: [{
 *       type: 'TextNode',
 *       value: 'Hello'
 *     }]
 *   });
 *
 *   new Compiler(file).compile();
 *   // 'Foo'
 *
 * @this {Compiler}
 * @return {string} - Document.
 */
function compile() {
    return toString(this.file.namespace('retext').cst);
}

/*
 * Expose `compile`.
 */

Compiler.prototype.compile = compile;

/*
 * Expose.
 */

module.exports = Compiler;

},{"nlcst-to-string":8}],3:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2014-2015 Titus Wormer. All rights reserved.
 * @license MIT
 * @module retext:parse
 * @fileoverview Parse a virtual file to nlcst.
 */

'use strict';

/*
 * Dependencies.
 */

var Latin = require('parse-latin');

/**
 * Construct a new parser.
 *
 * @example
 *   var file = new VFile('Hello World.');
 *   var parser = new Parser(file);
 *
 * @constructor
 * @class {Parser}
 * @param {File} file - Virtual file.
 */
function Parser(file) {
    this.file = file;
}

/**
 * Stringify the bound file.
 *
 * @example
 *   var file = new VFile('Hello world');
 *
 *   new Parser(file).parse();
 *   // ...
 *   // {
 *   //     'type': 'SentenceNode',
 *   //     'children': [
 *   //         {
 *   //             'type': 'WordNode',
 *   //             'children': [{
 *   //                 'type': 'TextNode',
 *   //                 'value': 'Hello'
 *   //             }]
 *   //         },
 *   //         {
 *   //             'type': 'WhiteSpaceNode',
 *   //             'value': ' '
 *   //         },
 *   //         {
 *   //             'type': 'WordNode',
 *   //             'children': [{
 *   //                 'type': 'TextNode',
 *   //                 'value': 'World'
 *   //             }]
 *   //         },
 *   //         {
 *   //             'type': 'PunctuationNode',
 *   //             'value': '.'
 *   //         }
 *   //     ]
 *   // }
 *   // ...
 *
 * @this {Parser}
 * @return {Node} - NLCST node.
 */
function parse() {
    return new Latin().parse(this.file.toString());
}

/*
 * Expose `parse`.
 */

Parser.prototype.parse = parse;

/*
 * Expose.
 */

module.exports = Parser;

},{"parse-latin":9}],4:[function(require,module,exports){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var base64 = require('base64-js')
var ieee754 = require('ieee754')
var isArray = require('is-array')

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50
Buffer.poolSize = 8192 // not used by this implementation

var rootParent = {}

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Note:
 *
 * - Implementation must support adding new properties to `Uint8Array` instances.
 *   Firefox 4-29 lacked support, fixed in Firefox 30+.
 *   See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *  - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *  - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *    incorrect length in some situations.
 *
 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they will
 * get the Object implementation, which is slower but will work correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = (function () {
  function Foo () {}
  try {
    var buf = new ArrayBuffer(0)
    var arr = new Uint8Array(buf)
    arr.foo = function () { return 42 }
    arr.constructor = Foo
    return arr.foo() === 42 && // typed array instances can be augmented
        arr.constructor === Foo && // constructor can be set
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        new Uint8Array(1).subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
})()

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

/**
 * Class: Buffer
 * =============
 *
 * The Buffer constructor returns instances of `Uint8Array` that are augmented
 * with function properties for all the node `Buffer` API functions. We use
 * `Uint8Array` so that square bracket notation works as expected -- it returns
 * a single octet.
 *
 * By augmenting the instances, we can avoid modifying the `Uint8Array`
 * prototype.
 */
function Buffer (arg) {
  if (!(this instanceof Buffer)) {
    // Avoid going through an ArgumentsAdaptorTrampoline in the common case.
    if (arguments.length > 1) return new Buffer(arg, arguments[1])
    return new Buffer(arg)
  }

  this.length = 0
  this.parent = undefined

  // Common case.
  if (typeof arg === 'number') {
    return fromNumber(this, arg)
  }

  // Slightly less common case.
  if (typeof arg === 'string') {
    return fromString(this, arg, arguments.length > 1 ? arguments[1] : 'utf8')
  }

  // Unusual.
  return fromObject(this, arg)
}

function fromNumber (that, length) {
  that = allocate(that, length < 0 ? 0 : checked(length) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < length; i++) {
      that[i] = 0
    }
  }
  return that
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') encoding = 'utf8'

  // Assumption: byteLength() return value is always < kMaxLength.
  var length = byteLength(string, encoding) | 0
  that = allocate(that, length)

  that.write(string, encoding)
  return that
}

function fromObject (that, object) {
  if (Buffer.isBuffer(object)) return fromBuffer(that, object)

  if (isArray(object)) return fromArray(that, object)

  if (object == null) {
    throw new TypeError('must start with number, buffer, array or string')
  }

  if (typeof ArrayBuffer !== 'undefined' && object.buffer instanceof ArrayBuffer) {
    return fromTypedArray(that, object)
  }

  if (object.length) return fromArrayLike(that, object)

  return fromJsonObject(that, object)
}

function fromBuffer (that, buffer) {
  var length = checked(buffer.length) | 0
  that = allocate(that, length)
  buffer.copy(that, 0, 0, length)
  return that
}

function fromArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Duplicate of fromArray() to keep fromArray() monomorphic.
function fromTypedArray (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  // Truncating the elements is probably not what people expect from typed
  // arrays with BYTES_PER_ELEMENT > 1 but it's compatible with the behavior
  // of the old Buffer constructor.
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayLike (that, array) {
  var length = checked(array.length) | 0
  that = allocate(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

// Deserialize { type: 'Buffer', data: [1,2,3,...] } into a Buffer object.
// Returns a zero-length buffer for inputs that don't conform to the spec.
function fromJsonObject (that, object) {
  var array
  var length = 0

  if (object.type === 'Buffer' && isArray(object.data)) {
    array = object.data
    length = checked(array.length) | 0
  }
  that = allocate(that, length)

  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function allocate (that, length) {
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = Buffer._augment(new Uint8Array(length))
  } else {
    // Fallback: Return an object instance of the Buffer class
    that.length = length
    that._isBuffer = true
  }

  var fromPool = length !== 0 && length <= Buffer.poolSize >>> 1
  if (fromPool) that.parent = rootParent

  return that
}

function checked (length) {
  // Note: cannot use `length < kMaxLength` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (subject, encoding) {
  if (!(this instanceof SlowBuffer)) return new SlowBuffer(subject, encoding)

  var buf = new Buffer(subject, encoding)
  delete buf.parent
  return buf
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  var i = 0
  var len = Math.min(x, y)
  while (i < len) {
    if (a[i] !== b[i]) break

    ++i
  }

  if (i !== len) {
    x = a[i]
    y = b[i]
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'binary':
    case 'base64':
    case 'raw':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) throw new TypeError('list argument must be an Array of Buffers.')

  if (list.length === 0) {
    return new Buffer(0)
  } else if (list.length === 1) {
    return list[0]
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; i++) {
      length += list[i].length
    }
  }

  var buf = new Buffer(length)
  var pos = 0
  for (i = 0; i < list.length; i++) {
    var item = list[i]
    item.copy(buf, pos)
    pos += item.length
  }
  return buf
}

function byteLength (string, encoding) {
  if (typeof string !== 'string') string = '' + string

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'binary':
      // Deprecated
      case 'raw':
      case 'raws':
        return len
      case 'utf8':
      case 'utf-8':
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

// pre-set for values that may exist in the future
Buffer.prototype.length = undefined
Buffer.prototype.parent = undefined

function slowToString (encoding, start, end) {
  var loweredCase = false

  start = start | 0
  end = end === undefined || end === Infinity ? this.length : end | 0

  if (!encoding) encoding = 'utf8'
  if (start < 0) start = 0
  if (end > this.length) end = this.length
  if (end <= start) return ''

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'binary':
        return binarySlice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return 0
  return Buffer.compare(this, b)
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset) {
  if (byteOffset > 0x7fffffff) byteOffset = 0x7fffffff
  else if (byteOffset < -0x80000000) byteOffset = -0x80000000
  byteOffset >>= 0

  if (this.length === 0) return -1
  if (byteOffset >= this.length) return -1

  // Negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = Math.max(this.length + byteOffset, 0)

  if (typeof val === 'string') {
    if (val.length === 0) return -1 // special case: looking for empty string always fails
    return String.prototype.indexOf.call(this, val, byteOffset)
  }
  if (Buffer.isBuffer(val)) {
    return arrayIndexOf(this, val, byteOffset)
  }
  if (typeof val === 'number') {
    if (Buffer.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === 'function') {
      return Uint8Array.prototype.indexOf.call(this, val, byteOffset)
    }
    return arrayIndexOf(this, [ val ], byteOffset)
  }

  function arrayIndexOf (arr, val, byteOffset) {
    var foundIndex = -1
    for (var i = 0; byteOffset + i < arr.length; i++) {
      if (arr[byteOffset + i] === val[foundIndex === -1 ? 0 : i - foundIndex]) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === val.length) return byteOffset + foundIndex
      } else {
        foundIndex = -1
      }
    }
    return -1
  }

  throw new TypeError('val must be string, number or Buffer')
}

// `get` will be removed in Node 0.13+
Buffer.prototype.get = function get (offset) {
  console.log('.get() is deprecated. Access using array indexes instead.')
  return this.readUInt8(offset)
}

// `set` will be removed in Node 0.13+
Buffer.prototype.set = function set (v, offset) {
  console.log('.set() is deprecated. Access using array indexes instead.')
  return this.writeUInt8(v, offset)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new Error('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; i++) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) throw new Error('Invalid hex string')
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function binaryWrite (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    var swap = encoding
    encoding = offset
    offset = length | 0
    length = swap
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'binary':
        return binaryWrite(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  var res = ''
  var tmp = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    if (buf[i] <= 0x7F) {
      res += decodeUtf8Char(tmp) + String.fromCharCode(buf[i])
      tmp = ''
    } else {
      tmp += '%' + buf[i].toString(16)
    }
  }

  return res + decodeUtf8Char(tmp)
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function binarySlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; i++) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; i++) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = Buffer._augment(this.subarray(start, end))
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; i++) {
      newBuf[i] = this[i + start]
    }
  }

  if (newBuf.length) newBuf.parent = this.parent || this

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('buffer must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkInt(this, value, offset, byteLength, Math.pow(2, 8 * byteLength), 0)

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = value
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; i++) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; i++) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = value
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = value < 0 ? 1 : 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = value
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = value
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = value
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = value
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (value > max || value < min) throw new RangeError('value is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('index out of range')
  if (offset < 0) throw new RangeError('index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start

  if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < len; i++) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    target._set(this.subarray(start, start + len), targetStart)
  }

  return len
}

// fill(value, start=0, end=buffer.length)
Buffer.prototype.fill = function fill (value, start, end) {
  if (!value) value = 0
  if (!start) start = 0
  if (!end) end = this.length

  if (end < start) throw new RangeError('end < start')

  // Fill 0 bytes; we're done
  if (end === start) return
  if (this.length === 0) return

  if (start < 0 || start >= this.length) throw new RangeError('start out of bounds')
  if (end < 0 || end > this.length) throw new RangeError('end out of bounds')

  var i
  if (typeof value === 'number') {
    for (i = start; i < end; i++) {
      this[i] = value
    }
  } else {
    var bytes = utf8ToBytes(value.toString())
    var len = bytes.length
    for (i = start; i < end; i++) {
      this[i] = bytes[i % len]
    }
  }

  return this
}

/**
 * Creates a new `ArrayBuffer` with the *copied* memory of the buffer instance.
 * Added in Node 0.12. Only available in browsers that support ArrayBuffer.
 */
Buffer.prototype.toArrayBuffer = function toArrayBuffer () {
  if (typeof Uint8Array !== 'undefined') {
    if (Buffer.TYPED_ARRAY_SUPPORT) {
      return (new Buffer(this)).buffer
    } else {
      var buf = new Uint8Array(this.length)
      for (var i = 0, len = buf.length; i < len; i += 1) {
        buf[i] = this[i]
      }
      return buf.buffer
    }
  } else {
    throw new TypeError('Buffer.toArrayBuffer not supported in this browser')
  }
}

// HELPER FUNCTIONS
// ================

var BP = Buffer.prototype

/**
 * Augment a Uint8Array *instance* (not the Uint8Array class!) with Buffer methods
 */
Buffer._augment = function _augment (arr) {
  arr.constructor = Buffer
  arr._isBuffer = true

  // save reference to original Uint8Array set method before overwriting
  arr._set = arr.set

  // deprecated, will be removed in node 0.13+
  arr.get = BP.get
  arr.set = BP.set

  arr.write = BP.write
  arr.toString = BP.toString
  arr.toLocaleString = BP.toString
  arr.toJSON = BP.toJSON
  arr.equals = BP.equals
  arr.compare = BP.compare
  arr.indexOf = BP.indexOf
  arr.copy = BP.copy
  arr.slice = BP.slice
  arr.readUIntLE = BP.readUIntLE
  arr.readUIntBE = BP.readUIntBE
  arr.readUInt8 = BP.readUInt8
  arr.readUInt16LE = BP.readUInt16LE
  arr.readUInt16BE = BP.readUInt16BE
  arr.readUInt32LE = BP.readUInt32LE
  arr.readUInt32BE = BP.readUInt32BE
  arr.readIntLE = BP.readIntLE
  arr.readIntBE = BP.readIntBE
  arr.readInt8 = BP.readInt8
  arr.readInt16LE = BP.readInt16LE
  arr.readInt16BE = BP.readInt16BE
  arr.readInt32LE = BP.readInt32LE
  arr.readInt32BE = BP.readInt32BE
  arr.readFloatLE = BP.readFloatLE
  arr.readFloatBE = BP.readFloatBE
  arr.readDoubleLE = BP.readDoubleLE
  arr.readDoubleBE = BP.readDoubleBE
  arr.writeUInt8 = BP.writeUInt8
  arr.writeUIntLE = BP.writeUIntLE
  arr.writeUIntBE = BP.writeUIntBE
  arr.writeUInt16LE = BP.writeUInt16LE
  arr.writeUInt16BE = BP.writeUInt16BE
  arr.writeUInt32LE = BP.writeUInt32LE
  arr.writeUInt32BE = BP.writeUInt32BE
  arr.writeIntLE = BP.writeIntLE
  arr.writeIntBE = BP.writeIntBE
  arr.writeInt8 = BP.writeInt8
  arr.writeInt16LE = BP.writeInt16LE
  arr.writeInt16BE = BP.writeInt16BE
  arr.writeInt32LE = BP.writeInt32LE
  arr.writeInt32BE = BP.writeInt32BE
  arr.writeFloatLE = BP.writeFloatLE
  arr.writeFloatBE = BP.writeFloatBE
  arr.writeDoubleLE = BP.writeDoubleLE
  arr.writeDoubleBE = BP.writeDoubleBE
  arr.fill = BP.fill
  arr.inspect = BP.inspect
  arr.toArrayBuffer = BP.toArrayBuffer

  return arr
}

var INVALID_BASE64_RE = /[^+\/0-9A-z\-]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []
  var i = 0

  for (; i < length; i++) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (leadSurrogate) {
        // 2 leads in a row
        if (codePoint < 0xDC00) {
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          leadSurrogate = codePoint
          continue
        } else {
          // valid surrogate pair
          codePoint = leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00 | 0x10000
          leadSurrogate = null
        }
      } else {
        // no lead yet

        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else {
          // valid lead
          leadSurrogate = codePoint
          continue
        }
      }
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
      leadSurrogate = null
    }

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x200000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; i++) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; i++) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function decodeUtf8Char (str) {
  try {
    return decodeURIComponent(str)
  } catch (err) {
    return String.fromCharCode(0xFFFD) // UTF 8 invalid char
  }
}

},{"base64-js":5,"ieee754":6,"is-array":7}],5:[function(require,module,exports){
var lookup = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

;(function (exports) {
	'use strict';

  var Arr = (typeof Uint8Array !== 'undefined')
    ? Uint8Array
    : Array

	var PLUS   = '+'.charCodeAt(0)
	var SLASH  = '/'.charCodeAt(0)
	var NUMBER = '0'.charCodeAt(0)
	var LOWER  = 'a'.charCodeAt(0)
	var UPPER  = 'A'.charCodeAt(0)
	var PLUS_URL_SAFE = '-'.charCodeAt(0)
	var SLASH_URL_SAFE = '_'.charCodeAt(0)

	function decode (elt) {
		var code = elt.charCodeAt(0)
		if (code === PLUS ||
		    code === PLUS_URL_SAFE)
			return 62 // '+'
		if (code === SLASH ||
		    code === SLASH_URL_SAFE)
			return 63 // '/'
		if (code < NUMBER)
			return -1 //no match
		if (code < NUMBER + 10)
			return code - NUMBER + 26 + 26
		if (code < UPPER + 26)
			return code - UPPER
		if (code < LOWER + 26)
			return code - LOWER + 26
	}

	function b64ToByteArray (b64) {
		var i, j, l, tmp, placeHolders, arr

		if (b64.length % 4 > 0) {
			throw new Error('Invalid string. Length must be a multiple of 4')
		}

		// the number of equal signs (place holders)
		// if there are two placeholders, than the two characters before it
		// represent one byte
		// if there is only one, then the three characters before it represent 2 bytes
		// this is just a cheap hack to not do indexOf twice
		var len = b64.length
		placeHolders = '=' === b64.charAt(len - 2) ? 2 : '=' === b64.charAt(len - 1) ? 1 : 0

		// base64 is 4/3 + up to two characters of the original data
		arr = new Arr(b64.length * 3 / 4 - placeHolders)

		// if there are placeholders, only get up to the last complete 4 chars
		l = placeHolders > 0 ? b64.length - 4 : b64.length

		var L = 0

		function push (v) {
			arr[L++] = v
		}

		for (i = 0, j = 0; i < l; i += 4, j += 3) {
			tmp = (decode(b64.charAt(i)) << 18) | (decode(b64.charAt(i + 1)) << 12) | (decode(b64.charAt(i + 2)) << 6) | decode(b64.charAt(i + 3))
			push((tmp & 0xFF0000) >> 16)
			push((tmp & 0xFF00) >> 8)
			push(tmp & 0xFF)
		}

		if (placeHolders === 2) {
			tmp = (decode(b64.charAt(i)) << 2) | (decode(b64.charAt(i + 1)) >> 4)
			push(tmp & 0xFF)
		} else if (placeHolders === 1) {
			tmp = (decode(b64.charAt(i)) << 10) | (decode(b64.charAt(i + 1)) << 4) | (decode(b64.charAt(i + 2)) >> 2)
			push((tmp >> 8) & 0xFF)
			push(tmp & 0xFF)
		}

		return arr
	}

	function uint8ToBase64 (uint8) {
		var i,
			extraBytes = uint8.length % 3, // if we have 1 byte left, pad 2 bytes
			output = "",
			temp, length

		function encode (num) {
			return lookup.charAt(num)
		}

		function tripletToBase64 (num) {
			return encode(num >> 18 & 0x3F) + encode(num >> 12 & 0x3F) + encode(num >> 6 & 0x3F) + encode(num & 0x3F)
		}

		// go through the array every three bytes, we'll deal with trailing stuff later
		for (i = 0, length = uint8.length - extraBytes; i < length; i += 3) {
			temp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
			output += tripletToBase64(temp)
		}

		// pad the end with zeros, but make sure to not forget the extra bytes
		switch (extraBytes) {
			case 1:
				temp = uint8[uint8.length - 1]
				output += encode(temp >> 2)
				output += encode((temp << 4) & 0x3F)
				output += '=='
				break
			case 2:
				temp = (uint8[uint8.length - 2] << 8) + (uint8[uint8.length - 1])
				output += encode(temp >> 10)
				output += encode((temp >> 4) & 0x3F)
				output += encode((temp << 2) & 0x3F)
				output += '='
				break
		}

		return output
	}

	exports.toByteArray = b64ToByteArray
	exports.fromByteArray = uint8ToBase64
}(typeof exports === 'undefined' ? (this.base64js = {}) : exports))

},{}],6:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}

},{}],7:[function(require,module,exports){

/**
 * isArray
 */

var isArray = Array.isArray;

/**
 * toString
 */

var str = Object.prototype.toString;

/**
 * Whether or not the given `val`
 * is an array.
 *
 * example:
 *
 *        isArray([]);
 *        // > true
 *        isArray(arguments);
 *        // > false
 *        isArray('');
 *        // > false
 *
 * @param {mixed} val
 * @return {bool}
 */

module.exports = isArray || function (val) {
  return !! val && '[object Array]' == str.call(val);
};

},{}],8:[function(require,module,exports){
'use strict';

/**
 * Stringify an NLCST node.
 *
 * @param {NLCSTNode} nlcst
 * @return {string}
 */
function nlcstToString(nlcst) {
    var values,
        length,
        children;

    if (typeof nlcst.value === 'string') {
        return nlcst.value;
    }

    children = nlcst.children;
    length = children.length;

    /**
     * Shortcut: This is pretty common, and a small performance win.
     */

    if (length === 1 && 'value' in children[0]) {
        return children[0].value;
    }

    values = [];

    while (length--) {
        values[length] = nlcstToString(children[length]);
    }

    return values.join('');
}

/*
 * Expose `nlcstToString`.
 */

module.exports = nlcstToString;

},{}],9:[function(require,module,exports){
'use strict';

module.exports = require('./lib/parse-latin');

},{"./lib/parse-latin":12}],10:[function(require,module,exports){
module.exports = {
    'affixSymbol': /^([\)\]\}\u0F3B\u0F3D\u169C\u2046\u207E\u208E\u2309\u230B\u232A\u2769\u276B\u276D\u276F\u2771\u2773\u2775\u27C6\u27E7\u27E9\u27EB\u27ED\u27EF\u2984\u2986\u2988\u298A\u298C\u298E\u2990\u2992\u2994\u2996\u2998\u29D9\u29DB\u29FD\u2E23\u2E25\u2E27\u2E29\u3009\u300B\u300D\u300F\u3011\u3015\u3017\u3019\u301B\u301E\u301F\uFD3E\uFE18\uFE36\uFE38\uFE3A\uFE3C\uFE3E\uFE40\uFE42\uFE44\uFE48\uFE5A\uFE5C\uFE5E\uFF09\uFF3D\uFF5D\uFF60\uFF63]|["'\xBB\u2019\u201D\u203A\u2E03\u2E05\u2E0A\u2E0D\u2E1D\u2E21]|[!\.\?\u2026\u203D])\1*$/,
    'newLine': /^(\r?\n|\r)+$/,
    'newLineMulti': /^(\r?\n|\r){2,}$/,
    'terminalMarker': /^((?:[!\.\?\u2026\u203D])+)$/,
    'wordSymbolInner': /^((?:[&'\-\.:=\?@\xAD\xB7\u2010\u2011\u2019\u2027])|(?:[\/_])+)$/,
    'punctuation': /^(?:[!"'-\),-\/:;\?\[-\]_\{\}\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u201F\u2022-\u2027\u2032-\u203A\u203C-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B])+$/,
    'numerical': /^(?:[0-9\xB2\xB3\xB9\xBC-\xBE\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u09F4-\u09F9\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0B72-\u0B77\u0BE6-\u0BF2\u0C66-\u0C6F\u0C78-\u0C7E\u0CE6-\u0CEF\u0D66-\u0D75\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F33\u1040-\u1049\u1090-\u1099\u1369-\u137C\u16EE-\u16F0\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1946-\u194F\u19D0-\u19DA\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\u2070\u2074-\u2079\u2080-\u2089\u2150-\u2182\u2185-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2CFD\u3007\u3021-\u3029\u3038-\u303A\u3192-\u3195\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\uA620-\uA629\uA6E6-\uA6EF\uA830-\uA835\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]|\uD800[\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDEE1-\uDEFB\uDF20-\uDF23\uDF41\uDF4A\uDFD1-\uDFD5]|\uD801[\uDCA0-\uDCA9]|\uD802[\uDC58-\uDC5F\uDC79-\uDC7F\uDCA7-\uDCAF\uDCFB-\uDCFF\uDD16-\uDD1B\uDDBC\uDDBD\uDDC0-\uDDCF\uDDD2-\uDDFF\uDE40-\uDE47\uDE7D\uDE7E\uDE9D-\uDE9F\uDEEB-\uDEEF\uDF58-\uDF5F\uDF78-\uDF7F\uDFA9-\uDFAF]|\uD803[\uDCFA-\uDCFF\uDE60-\uDE7E]|\uD804[\uDC52-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDDE1-\uDDF4\uDEF0-\uDEF9]|\uD805[\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9\uDF30-\uDF3B]|\uD806[\uDCE0-\uDCF2]|\uD809[\uDC00-\uDC6E]|\uD81A[\uDE60-\uDE69\uDF50-\uDF59\uDF5B-\uDF61]|\uD834[\uDF60-\uDF71]|\uD835[\uDFCE-\uDFFF]|\uD83A[\uDCC7-\uDCCF]|\uD83C[\uDD00-\uDD0C])+$/,
    'lowerInitial': /^(?:[a-z\xB5\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0561-\u0587\u13F8-\u13FD\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7B5\uA7B7\uA7FA\uAB30-\uAB5A\uAB60-\uAB65\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A]|\uD801[\uDC28-\uDC4F]|\uD803[\uDCC0-\uDCF2]|\uD806[\uDCC0-\uDCDF]|\uD835[\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB])/,
    'token': /(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09F4-\u09F9\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71-\u0B77\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BF2\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C78-\u0C7E\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D75\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F33\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u17F0-\u17F9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABE\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u20D0-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u3192-\u3195\u31A0-\u31BA\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA672\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA830-\uA835\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0-\uDEFB\uDF00-\uDF23\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F-\uDE47\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE6\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDCFF\uDE60-\uDE7E]|\uD804[\uDC00-\uDC46\uDC52-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF3B]|\uD806[\uDCA0-\uDCF2\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44\uDF60-\uDF71]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF])+|(?:[\t-\r \x85\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000])+|(?:[\uD800-\uDFFF])+|([\s\S])\1*/g,
    'word': /^(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u09F4-\u09F9\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71-\u0B77\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BF2\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C78-\u0C7E\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D75\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F33\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u17F0-\u17F9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABE\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u20D0-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u2E2F\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099\u309A\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u3192-\u3195\u31A0-\u31BA\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA672\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA830-\uA835\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0-\uDEFB\uDF00-\uDF23\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F-\uDE47\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE6\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDCFF\uDE60-\uDE7E]|\uD804[\uDC00-\uDC46\uDC52-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF3B]|\uD806[\uDCA0-\uDCF2\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44\uDF60-\uDF71]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF])+$/,
    'whiteSpace': /^(?:[\t-\r \x85\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000])+$/
};

},{}],11:[function(require,module,exports){
'use strict';

/*
 * Dependencies.
 */

var iterate;

iterate = require('array-iterate');

/**
 * Pass the context as the third argument to `callback`.
 *
 * @param {function(Object, number, Object): number|undefined} callback
 * @return {function(Object, number)}
 */
function wrapperFactory(callback) {
    return function (value, index) {
        return callback(value, index, this);
    };
}

/**
 * Turns `callback` into a ``iterator'' accepting a parent.
 *
 * see ``array-iterate'' for more info.
 *
 * @param {function(Object, number, Object): number|undefined} callback
 * @return {function(NLCSTParent)}
 */
function iteratorFactory(callback) {
    return function (parent) {
        return iterate(parent.children, callback, parent);
    };
}

/**
 * Turns `callback` into a ``iterator'' accepting a parent.
 *
 * see ``array-iterate'' for more info.
 *
 * @param {function(Object, number, Object): number|undefined} callback
 * @return {function(Object)}
 */
function modifierFactory(callback) {
    return iteratorFactory(wrapperFactory(callback));
}

/*
 * Expose `modifierFactory`.
 */

module.exports = modifierFactory;

},{"array-iterate":32}],12:[function(require,module,exports){
/*!
 * parse-latin
 *
 * Licensed under MIT.
 * Copyright (c) 2014 Titus Wormer <tituswormer@gmail.com>
 */

'use strict';

/*
 * Dependencies.
 */

var createParser,
    expressions,
    pluginFactory,
    modifierFactory;

createParser = require('./parser');
expressions = require('./expressions');
pluginFactory = require('./plugin');
modifierFactory = require('./modifier');

/*
 * == CLASSIFY ===============================================================
 */

/*
 * Constants.
 */

var EXPRESSION_TOKEN,
    EXPRESSION_WORD,
    EXPRESSION_PUNCTUATION,
    EXPRESSION_WHITE_SPACE;

/*
 * Match all tokens:
 * - One or more number, alphabetic, or
 *   combining characters;
 * - One or more white space characters;
 * - One or more astral plane characters;
 * - One or more of the same character;
 */

EXPRESSION_TOKEN = expressions.token;

/*
 * Match a word.
 */

EXPRESSION_WORD = expressions.word;

/*
 * Match a string containing ONLY punctuation.
 */

EXPRESSION_PUNCTUATION = expressions.punctuation;

/*
 * Match a string containing ONLY white space.
 */

EXPRESSION_WHITE_SPACE = expressions.whiteSpace;

/**
 * Classify a token.
 *
 * @param {string?} value
 * @return {string} - value's type.
 */
function classify(value) {
    if (EXPRESSION_WHITE_SPACE.test(value)) {
        return 'WhiteSpace';
    }

    if (EXPRESSION_WORD.test(value)) {
        return 'Word';
    }

    if (EXPRESSION_PUNCTUATION.test(value)) {
        return 'Punctuation';
    }

    return 'Symbol';
}

/**
 * Transform a `value` into a list of `NLCSTNode`s.
 *
 * @param {ParseLatin} parser
 * @param {string?} value
 * @return {Array.<NLCSTNode>}
 */
function tokenize(parser, value) {
    var tokens,
        offset,
        line,
        column,
        match;

    if (value === null || value === undefined) {
        value = '';
    } else if (value instanceof String) {
        value = value.toString();
    }

    if (typeof value !== 'string') {
        /**
         * Return the given nodes if this is either an
         * empty array, or an array with a node as a first
         * child.
         */

        if ('length' in value && (!value[0] || value[0].type)) {
            return value;
        }

        throw new Error(
            'Illegal invocation: \'' + value + '\'' +
            ' is not a valid argument for \'ParseLatin\''
        );
    }

    tokens = [];

    if (!value) {
        return tokens;
    }

    offset = 0;
    line = 1;
    column = 1;

    /**
     * Get the current position.
     *
     * @example
     *   position = now(); // {line: 1, column: 1}
     *
     * @return {Object}
     */
    function now() {
        return {
            'line': line,
            'column': column,
            'offset': offset
        };
    }

    /**
     * Store position information for a node.
     *
     * @example
     *   start = now();
     *   updatePosition('foo');
     *   location = new Position(start);
     *   // {start: {line: 1, column: 1}, end: {line: 1, column: 3}}
     *
     * @param {Object} start
     */
    function Position(start) {
        this.start = start;
        this.end = now();
    }

    /**
     * Mark position and patch `node.position`.
     *
     * @example
     *   var update = position();
     *   updatePosition('foo');
     *   update({});
     *   // {
     *   //   position: {
     *   //     start: {line: 1, column: 1}
     *   //     end: {line: 1, column: 3}
     *   //   }
     *   // }
     *
     * @returns {function(Node): Node}
     */
    function position() {
        var before = now();

        /**
         * Add the position to a node.
         *
         * @example
         *   update({type: 'text', value: 'foo'});
         *
         * @param {Node} node - Node to attach position
         *   on.
         * @return {Node} - `node`.
         */
        function patch(node) {
            node.position = new Position(before);

            return node;
        }

        return patch;
    }

    /**
     * Update line and column based on `value`.
     *
     * @example
     *   update('foo');
     *
     * @param {string} subvalue
     */
    function update(subvalue) {
        var subvalueLength = subvalue.length,
            character = -1,
            lastIndex = -1;

        offset += subvalueLength;

        while (++character < subvalueLength) {
            if (subvalue.charAt(character) === '\n') {
                lastIndex = character;
                line++;
            }
        }

        if (lastIndex === -1) {
            column = column + subvalueLength;
        } else {
            column = subvalueLength - lastIndex;
        }
    }

    /**
     * Add mechanism.
     *
     * @param {NLCSTNode} node - Node to add.
     * @param {NLCSTParentNode?} [parent] - Optional parent
     *   node to insert into.
     * @return {NLCSTNode} - `node`.
     */
    function add(node, parent) {
        if (parent) {
            parent.children.push(node);
        } else {
            tokens.push(node);
        }

        return node;
    }

    /**
     * Remove `subvalue` from `value`.
     * Expects `subvalue` to be at the start from
     * `value`, and applies no validation.
     *
     * @example
     *   eat('foo')({type: 'TextNode', value: 'foo'});
     *
     * @param {string} subvalue - Removed from `value`,
     *   and passed to `update`.
     * @return {Function} - Wrapper around `add`, which
     *   also adds `position` to node.
     */
    function eat(subvalue) {
        var pos = position();

        /**
         * Add the given arguments, add `position` to
         * the returned node, and return the node.
         *
         * @return {Node}
         */
        function apply() {
            return pos(add.apply(null, arguments));
        }

        value = value.substring(subvalue.length);

        update(subvalue);

        return apply;
    }

    /**
     * Remove `subvalue` from `value`. Does not patch
     * positional information.
     *
     * @param {string} subvalue - Value to eat.
     * @return {Function}
     */
    function noPositionEat(subvalue) {
        /**
         * Add the given arguments and return the node.
         *
         * @return {Node}
         */
        function apply() {
            return add.apply(null, arguments);
        }

        value = value.substring(subvalue.length);

        return apply;
    }

    /*
     * Eat mechanism to use.
     */

    var eater = parser.position ? eat : noPositionEat;

    /**
     * Continue matching.
     */
    function next() {
        EXPRESSION_TOKEN.lastIndex = 0;

        match = EXPRESSION_TOKEN.exec(value);
    }

    next();

    while (match) {
        parser['tokenize' + classify(match[0])](match[0], eater);

        next();
    }

    return tokens;
}

/**
 * Add mechanism used when text-tokenisers are called
 * directly outside of the `tokenize` function.
 *
 * @param {NLCSTNode} node - Node to add.
 * @param {NLCSTParentNode?} [parent] - Optional parent
 *   node to insert into.
 * @return {NLCSTNode} - `node`.
 */
function noopAdd(node, parent) {
    if (parent) {
        parent.children.push(node);
    }

    return node;
}

/**
 * Eat and add mechanism without adding positional
 * information, used when text-tokenisers are called
 * directly outside of the `tokenize` function.
 *
 * @return {Function}
 */
function noopEat() {
    return noopAdd;
}

/*
 * == PARSE LATIN ============================================================
 */

/**
 * Transform Latin-script natural language into
 * an NLCST-tree.
 *
 * @constructor {ParseLatin}
 */
function ParseLatin(options) {
    /*
     * TODO: This should later be removed (when this
     * change bubbles through to dependants).
     */

    if (!(this instanceof ParseLatin)) {
        return new ParseLatin(options);
    }

    this.position = Boolean(options && options.position);
}

/*
 * Quick access to the prototype.
 */

var parseLatinPrototype;

parseLatinPrototype = ParseLatin.prototype;

/*
 * == TOKENIZE ===============================================================
 */

/**
 * Transform a `value` into a list of `NLCSTNode`s.
 *
 * @see tokenize
 */
parseLatinPrototype.tokenize = function (value) {
    return tokenize(this, value);
};

/*
 * == TEXT NODES =============================================================
 */

/**
 * Factory to create a `Text`.
 *
 * @param {string?} type
 * @return {function(value): NLCSTText}
 */
function createTextFactory(type) {
    type += 'Node';

    /**
     * Construct a `Text` from a bound `type`
     *
     * @param {value} value - Value of the node.
     * @param {Function?} [eat] - Optional eat mechanism
     *   to use.
     * @param {NLCSTParentNode?} [parent] - Optional
     *   parent to insert into.
     * @return {NLCSTText}
     */
    return function (value, eat, parent) {
        if (value === null || value === undefined) {
            value = '';
        }

        return (eat || noopEat)(value)({
            'type': type,
            'value': String(value)
        }, parent);
    };
}

/**
 * Create a `SymbolNode` with the given `value`.
 *
 * @param {string?} value
 * @return {NLCSTSymbolNode}
 */
parseLatinPrototype.tokenizeSymbol = createTextFactory('Symbol');

/**
 * Create a `WhiteSpaceNode` with the given `value`.
 *
 * @param {string?} value
 * @return {NLCSTWhiteSpaceNode}
 */
parseLatinPrototype.tokenizeWhiteSpace = createTextFactory('WhiteSpace');

/**
 * Create a `PunctuationNode` with the given `value`.
 *
 * @param {string?} value
 * @return {NLCSTPunctuationNode}
 */
parseLatinPrototype.tokenizePunctuation = createTextFactory('Punctuation');

/**
 * Create a `SourceNode` with the given `value`.
 *
 * @param {string?} value
 * @return {NLCSTSourceNode}
 */
parseLatinPrototype.tokenizeSource = createTextFactory('Source');

/**
 * Create a `TextNode` with the given `value`.
 *
 * @param {string?} value
 * @return {NLCSTTextNode}
 */
parseLatinPrototype.tokenizeText = createTextFactory('Text');

/*
 * == PARENT NODES ===========================================================
 *
 * All these nodes are `pluggable`: they come with a
 * `use` method which accepts a plugin
 * (`function(NLCSTNode)`). Every time one of these
 * methods are called, the plugin is invoked with the
 * node, allowing for easy modification.
 *
 * In fact, the internal transformation from `tokenize`
 * (a list of words, white space, punctuation, and
 * symbols) to `tokenizeRoot` (an NLCST tree), is also
 * implemented through this mechanism.
 */

/**
 * Run transform plug-ins for `key` on `nodes`.
 *
 * @param {string} key
 * @param {Array.<Node>} nodes
 * @return {Array.<Node>} - `nodes`.
 */
function run(key, nodes) {
    var wareKey,
        plugins,
        index;

    wareKey = key + 'Plugins';

    plugins = this[wareKey];

    if (plugins) {
        index = -1;

        while (plugins[++index]) {
            plugins[index](nodes);
        }
    }

    return nodes;
}

/*
 * Expose `run`.
 */

parseLatinPrototype.run = run;

/**
 * @param {Function} Constructor
 * @param {string} key
 * @param {function(*): undefined} callback
 */
function pluggable(Constructor, key, callback) {
    /**
     * Set a pluggable version of `callback`
     * on `Constructor`.
     */
    Constructor.prototype[key] = function () {
        return this.run(key, callback.apply(this, arguments));
    };
}

/**
 * Factory to inject `plugins`. Takes `callback` for
 * the actual inserting.
 *
 * @param {function(Object, string, Array.<Function>)} callback
 * @return {function(string, Array.<Function>)}
 */
function useFactory(callback) {
    /*
     * Validate if `plugins` can be inserted. Invokes
     * the bound `callback` to do the actual inserting.
     *
     * @param {string} key - Method to inject on
     * @param {Array.<Function>|Function} plugins - One
     *   or more plugins.
     */

    return function (key, plugins) {
        var self,
            wareKey;

        self = this;

        /*
         * Throw if the method is not pluggable.
         */

        if (!(key in self)) {
            throw new Error(
                'Illegal Invocation: Unsupported `key` for ' +
                '`use(key, plugins)`. Make sure `key` is a ' +
                'supported function'
            );
        }

        /*
         * Fail silently when no plugins are given.
         */

        if (!plugins) {
            return;
        }

        wareKey = key + 'Plugins';

        /*
         * Make sure `plugins` is a list.
         */

        if (typeof plugins === 'function') {
            plugins = [plugins];
        } else {
            plugins = plugins.concat();
        }

        /*
         * Make sure `wareKey` exists.
         */

        if (!self[wareKey]) {
            self[wareKey] = [];
        }

        /*
         * Invoke callback with the ware key and plugins.
         */

        callback(self, wareKey, plugins);
    };
}

/*
 * Inject `plugins` to modifiy the result of the method
 * at `key` on the operated on context.
 *
 * @param {string} key
 * @param {Function|Array.<Function>} plugins
 * @this {ParseLatin|Object}
 */

parseLatinPrototype.use = useFactory(function (context, key, plugins) {
    context[key] = context[key].concat(plugins);
});

/*
 * Inject `plugins` to modifiy the result of the method
 * at `key` on the operated on context, before any other.
 *
 * @param {string} key
 * @param {Function|Array.<Function>} plugins
 * @this {ParseLatin|Object}
 */

parseLatinPrototype.useFirst = useFactory(function (context, key, plugins) {
    context[key] = plugins.concat(context[key]);
});

/**
 * Create a `WordNode` with its children set to a single
 * `TextNode`, its value set to the given `value`.
 *
 * @see pluggable
 *
 * @param {string?} value
 * @return {NLCSTWordNode}
 */
pluggable(ParseLatin, 'tokenizeWord', function (value, eat) {
    var add,
        parent;

    add = (eat || noopEat)('');
    parent = {
        'type': 'WordNode',
        'children': []
    };

    this.tokenizeText(value, eat, parent);

    return add(parent);
});

/**
 * Create a `SentenceNode` with its children set to
 * `Node`s, their values set to the tokenized given
 * `value`.
 *
 * Unless plugins add new nodes, the sentence is
 * populated by `WordNode`s, `SymbolNode`s,
 * `PunctuationNode`s, and `WhiteSpaceNode`s.
 *
 * @see pluggable
 *
 * @param {string?} value
 * @return {NLCSTSentenceNode}
 */
pluggable(ParseLatin, 'tokenizeSentence', createParser({
    'type': 'SentenceNode',
    'tokenizer': 'tokenize'
}));

/**
 * Create a `ParagraphNode` with its children set to
 * `Node`s, their values set to the tokenized given
 * `value`.
 *
 * Unless plugins add new nodes, the paragraph is
 * populated by `SentenceNode`s and `WhiteSpaceNode`s.
 *
 * @see pluggable
 *
 * @param {string?} value
 * @return {NLCSTParagraphNode}
 */
pluggable(ParseLatin, 'tokenizeParagraph', createParser({
    'type': 'ParagraphNode',
    'delimiter': expressions.terminalMarker,
    'delimiterType': 'PunctuationNode',
    'tokenizer': 'tokenizeSentence'
}));

/**
 * Create a `RootNode` with its children set to `Node`s,
 * their values set to the tokenized given `value`.
 *
 * Unless plugins add new nodes, the root is populated by
 * `ParagraphNode`s and `WhiteSpaceNode`s.
 *
 * @see pluggable
 *
 * @param {string?} value
 * @return {NLCSTRootNode}
 */
pluggable(ParseLatin, 'tokenizeRoot', createParser({
    'type': 'RootNode',
    'delimiter': expressions.newLine,
    'delimiterType': 'WhiteSpaceNode',
    'tokenizer': 'tokenizeParagraph'
}));

/**
 * Easy access to the document parser.
 *
 * @see ParseLatin#tokenizeRoot
 */
parseLatinPrototype.parse = function (value) {
    return this.tokenizeRoot(value);
};

/*
 * == PLUGINS ================================================================
 */

parseLatinPrototype.use('tokenizeSentence', [
    require('./plugin/merge-initial-word-symbol'),
    require('./plugin/merge-final-word-symbol'),
    require('./plugin/merge-inner-word-symbol'),
    require('./plugin/merge-initialisms'),
    require('./plugin/merge-words'),
    require('./plugin/patch-position')
]);

parseLatinPrototype.use('tokenizeParagraph', [
    require('./plugin/merge-non-word-sentences'),
    require('./plugin/merge-affix-symbol'),
    require('./plugin/merge-initial-lower-case-letter-sentences'),
    require('./plugin/merge-prefix-exceptions'),
    require('./plugin/merge-affix-exceptions'),
    require('./plugin/merge-remaining-full-stops'),
    require('./plugin/make-initial-white-space-siblings'),
    require('./plugin/make-final-white-space-siblings'),
    require('./plugin/break-implicit-sentences'),
    require('./plugin/remove-empty-nodes'),
    require('./plugin/patch-position')
]);

parseLatinPrototype.use('tokenizeRoot', [
    require('./plugin/make-initial-white-space-siblings'),
    require('./plugin/make-final-white-space-siblings'),
    require('./plugin/remove-empty-nodes'),
    require('./plugin/patch-position')
]);

/*
 * == EXPORT =================================================================
 */

/*
 * Expose `ParseLatin`.
 */

module.exports = ParseLatin;

/*
 * Expose `pluginFactory` on `ParseLatin` as `plugin`.
 */

ParseLatin.plugin = pluginFactory;

/*
 * Expose `modifierFactory` on `ParseLatin` as `modifier`.
 */

ParseLatin.modifier = modifierFactory;

},{"./expressions":10,"./modifier":11,"./parser":13,"./plugin":14,"./plugin/break-implicit-sentences":15,"./plugin/make-final-white-space-siblings":16,"./plugin/make-initial-white-space-siblings":17,"./plugin/merge-affix-exceptions":18,"./plugin/merge-affix-symbol":19,"./plugin/merge-final-word-symbol":20,"./plugin/merge-initial-lower-case-letter-sentences":21,"./plugin/merge-initial-word-symbol":22,"./plugin/merge-initialisms":23,"./plugin/merge-inner-word-symbol":24,"./plugin/merge-non-word-sentences":25,"./plugin/merge-prefix-exceptions":26,"./plugin/merge-remaining-full-stops":27,"./plugin/merge-words":28,"./plugin/patch-position":29,"./plugin/remove-empty-nodes":30}],13:[function(require,module,exports){
'use strict';

var tokenizer;

tokenizer = require('./tokenizer');

/**
 * Construct a parser based on `options`.
 *
 * @param {Object} options
 * @return {function(string): NLCSTNode}
 */
function parserFactory(options) {
    var type,
        delimiter,
        tokenizerProperty;

    type = options.type;
    tokenizerProperty = options.tokenizer;
    delimiter = options.delimiter;

    if (delimiter) {
        delimiter = tokenizer(options.delimiterType, options.delimiter);
    }

    return function (value) {
        var children;

        children = this[tokenizerProperty](value);

        return {
            'type': type,
            'children': delimiter ? delimiter(children) : children
        };
    };
}

module.exports = parserFactory;

},{"./tokenizer":31}],14:[function(require,module,exports){
'use strict';

/**
 * Turns `callback` into a ``plugin'' accepting a parent.
 *
 * @param {function(Object, number, Object)} callback
 * @return {function(NLCSTParent)}
 */
function pluginFactory(callback) {
    return function (parent) {
        var index,
            children;

        index = -1;
        children = parent.children;

        while (children[++index]) {
            callback(children[index], index, parent);
        }
    };
}

/*
 * Expose `pluginFactory`.
 */

module.exports = pluginFactory;

},{}],15:[function(require,module,exports){
'use strict';

/*
 * Dependencies.
 */

var nlcstToString,
    modifier,
    expressions;

nlcstToString = require('nlcst-to-string');
modifier = require('../modifier');
expressions = require('../expressions');

/*
 * Constants.
 *
 * - Two or more new line characters.
 */

var EXPRESSION_MULTI_NEW_LINE;

EXPRESSION_MULTI_NEW_LINE = expressions.newLineMulti;

/**
 * Break a sentence if a white space with more
 * than one new-line is found.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParagraphNode} parent
 * @return {undefined}
 */
function breakImplicitSentences(child, index, parent) {
    var children,
        position,
        length,
        tail,
        head,
        end,
        insertion,
        node;

    if (child.type !== 'SentenceNode') {
        return;
    }

    children = child.children;

    length = children.length;

    position = -1;

    while (++position < length) {
        node = children[position];

        if (
            node.type !== 'WhiteSpaceNode' ||
            !EXPRESSION_MULTI_NEW_LINE.test(nlcstToString(node))
        ) {
            continue;
        }

        child.children = children.slice(0, position);

        insertion = {
            'type': 'SentenceNode',
            'children': children.slice(position + 1)
        };

        tail = children[position - 1];
        head = children[position + 1];

        parent.children.splice(index + 1, 0, node, insertion);

        if (child.position && tail.position && head.position) {
            end = child.position.end;

            child.position.end = tail.position.end;

            insertion.position = {
                'start': head.position.start,
                'end': end
            };
        }

        return index + 1;
    }
}

/*
 * Expose `breakImplicitSentences` as a plugin.
 */

module.exports = modifier(breakImplicitSentences);

},{"../expressions":10,"../modifier":11,"nlcst-to-string":33}],16:[function(require,module,exports){
'use strict';

/*
 * Dependencies.
 */

var modifier;

modifier = require('../modifier');

/**
 * Move white space ending a paragraph up, so they are
 * the siblings of paragraphs.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParent} parent
 * @return {undefined|number}
 */
function makeFinalWhiteSpaceSiblings(child, index, parent) {
    var children,
        prev;

    children = child.children;

    if (
        children &&
        children.length !== 0 &&
        children[children.length - 1].type === 'WhiteSpaceNode'
    ) {
        parent.children.splice(index + 1, 0, child.children.pop());
        prev = children[children.length - 1];

        if (prev && prev.position && child.position) {
            child.position.end = prev.position.end;
        }

        /*
         * Next, iterate over the current node again.
         */

        return index;
    }
}

/*
 * Expose `makeFinalWhiteSpaceSiblings` as a modifier.
 */

module.exports = modifier(makeFinalWhiteSpaceSiblings);

},{"../modifier":11}],17:[function(require,module,exports){
'use strict';

/*
 * Dependencies.
 */

var plugin;

plugin = require('../plugin');

/**
 * Move white space starting a sentence up, so they are
 * the siblings of sentences.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParent} parent
 */
function makeInitialWhiteSpaceSiblings(child, index, parent) {
    var children,
        next;

    children = child.children;

    if (
        children &&
        children.length !== 0 &&
        children[0].type === 'WhiteSpaceNode'
    ) {
        parent.children.splice(index, 0, children.shift());
        next = children[0];

        if (next && next.position && child.position) {
            child.position.start = next.position.start;
        }
    }
}

/*
 * Expose `makeInitialWhiteSpaceSiblings` as a plugin.
 */

module.exports = plugin(makeInitialWhiteSpaceSiblings);

},{"../plugin":14}],18:[function(require,module,exports){
'use strict';

/*
 * Dependencies.
 */

var nlcstToString,
    modifier;

nlcstToString = require('nlcst-to-string');
modifier = require('../modifier');

/**
 * Merge a sentence into its previous sentence, when
 * the sentence starts with a comma.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParagraphNode} parent
 * @return {undefined|number}
 */
function mergeAffixExceptions(child, index, parent) {
    var children,
        node,
        position,
        previousChild,
        value;

    children = child.children;

    if (!children || !children.length || index === 0) {
        return;
    }

    position = -1;

    while (children[++position]) {
        node = children[position];

        if (node.type === 'WordNode') {
            return;
        }

        if (
            node.type === 'SymbolNode' ||
            node.type === 'PunctuationNode'
        ) {
            value = nlcstToString(node);

            if (value !== ',' && value !== ';') {
                return;
            }

            previousChild = parent.children[index - 1];

            previousChild.children = previousChild.children.concat(children);

            /*
             * Update position.
             */

            if (previousChild.position && child.position) {
                previousChild.position.end = child.position.end;
            }

            parent.children.splice(index, 1);

            /*
             * Next, iterate over the node *now* at the current
             * position.
             */

            return index;
        }
    }
}

/*
 * Expose `mergeAffixExceptions` as a modifier.
 */

module.exports = modifier(mergeAffixExceptions);

},{"../modifier":11,"nlcst-to-string":33}],19:[function(require,module,exports){
'use strict';

/*
 * Dependencies.
 */

var nlcstToString,
    modifier,
    expressions;

nlcstToString = require('nlcst-to-string');
modifier = require('../modifier');
expressions = require('../expressions');

/*
 * Constants.
 *
 * - Closing or final punctuation, or terminal markers
 *   that should still be included in the previous
 *   sentence, even though they follow the sentence's
 *   terminal marker.
 */

var EXPRESSION_AFFIX_SYMBOL;

EXPRESSION_AFFIX_SYMBOL = expressions.affixSymbol;

/**
 * Move certain punctuation following a terminal
 * marker (thus in the next sentence) to the
 * previous sentence.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParagraphNode} parent
 * @return {undefined|number}
 */
function mergeAffixSymbol(child, index, parent) {
    var children,
        prev,
        first,
        second;

    children = child.children;

    if (
        children &&
        children.length &&
        index !== 0
    ) {
        first = children[0];
        second = children[1];
        prev = parent.children[index - 1];

        if (
            (
                first.type === 'SymbolNode' ||
                first.type === 'PunctuationNode'
            ) &&
            EXPRESSION_AFFIX_SYMBOL.test(nlcstToString(first))
        ) {
            prev.children.push(children.shift());

            /*
             * Update position.
             */

            if (first.position && prev.position) {
                prev.position.end = first.position.end;
            }

            if (second && second.position && child.position) {
                child.position.start = second.position.start;
            }

            /*
             * Next, iterate over the previous node again.
             */

            return index - 1;
        }
    }
}

/*
 * Expose `mergeAffixSymbol` as a modifier.
 */

module.exports = modifier(mergeAffixSymbol);

},{"../expressions":10,"../modifier":11,"nlcst-to-string":33}],20:[function(require,module,exports){
'use strict';

/*
 * Dependencies.
 */

var nlcstToString,
    modifier;

nlcstToString = require('nlcst-to-string');
modifier = require('../modifier');

/**
 * Merge certain punctuation marks into their
 * preceding words.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTSentenceNode} parent
 * @return {undefined|number}
 */
function mergeFinalWordSymbol(child, index, parent) {
    var children,
        prev,
        next;

    if (
        index !== 0 &&
        (
            child.type === 'SymbolNode' ||
            child.type === 'PunctuationNode'
        ) &&
        nlcstToString(child) === '-'
    ) {
        children = parent.children;

        prev = children[index - 1];
        next = children[index + 1];

        if (
            (
                !next ||
                next.type !== 'WordNode'
            ) &&
            (
                prev &&
                prev.type === 'WordNode'
            )
        ) {
            /*
             * Remove `child` from parent.
             */

            children.splice(index, 1);

            /*
             * Add the punctuation mark at the end of the
             * previous node.
             */

            prev.children.push(child);

            /*
             * Update position.
             */

            if (prev.position && child.position) {
                prev.position.end = child.position.end;
            }

            /*
             * Next, iterate over the node *now* at the
             * current position (which was the next node).
             */

            return index;
        }
    }
}

/*
 * Expose `mergeFinalWordSymbol` as a modifier.
 */

module.exports = modifier(mergeFinalWordSymbol);

},{"../modifier":11,"nlcst-to-string":33}],21:[function(require,module,exports){
'use strict';

/*
 * Dependencies.
 */

var nlcstToString,
    modifier,
    expressions;

nlcstToString = require('nlcst-to-string');
modifier = require('../modifier');
expressions = require('../expressions');

/*
 * Constants.
 *
 * - Initial lowercase letter.
 */

var EXPRESSION_LOWER_INITIAL;

EXPRESSION_LOWER_INITIAL = expressions.lowerInitial;

/**
 * Merge a sentence into its previous sentence, when
 * the sentence starts with a lower case letter.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParagraphNode} parent
 * @return {undefined|number}
 */
function mergeInitialLowerCaseLetterSentences(child, index, parent) {
    var siblings,
        children,
        position,
        node,
        prev;

    children = child.children;

    if (
        children &&
        children.length &&
        index !== 0
    ) {
        position = -1;

        while (children[++position]) {
            node = children[position];

            if (node.type === 'WordNode') {
                if (!EXPRESSION_LOWER_INITIAL.test(nlcstToString(node))) {
                    return;
                }

                siblings = parent.children;

                prev = siblings[index - 1];

                prev.children = prev.children.concat(children);

                siblings.splice(index, 1);

                /*
                 * Update position.
                 */

                if (prev.position && child.position) {
                    prev.position.end = child.position.end;
                }

                /*
                 * Next, iterate over the node *now* at
                 * the current position.
                 */

                return index;
            }

            if (
                node.type === 'SymbolNode' ||
                node.type === 'PunctuationNode'
            ) {
                return;
            }
        }
    }
}

/*
 * Expose `mergeInitialLowerCaseLetterSentences` as a modifier.
 */

module.exports = modifier(mergeInitialLowerCaseLetterSentences);

},{"../expressions":10,"../modifier":11,"nlcst-to-string":33}],22:[function(require,module,exports){
'use strict';

/*
 * Dependencies.
 */

var nlcstToString,
    modifier;

nlcstToString = require('nlcst-to-string');
modifier = require('../modifier');

/**
 * Merge certain punctuation marks into their
 * following words.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTSentenceNode} parent
 * @return {undefined|number}
 */
function mergeInitialWordSymbol(child, index, parent) {
    var children,
        next;

    if (
        (
            child.type !== 'SymbolNode' &&
            child.type !== 'PunctuationNode'
        ) ||
        nlcstToString(child) !== '&'
    ) {
        return;
    }

    children = parent.children;

    next = children[index + 1];

    /*
     * If either a previous word, or no following word,
     * exists, exit early.
     */

    if (
        (
            index !== 0 &&
            children[index - 1].type === 'WordNode'
        ) ||
        !(
            next &&
            next.type === 'WordNode'
        )
    ) {
        return;
    }

    /*
     * Remove `child` from parent.
     */

    children.splice(index, 1);

    /*
     * Add the punctuation mark at the start of the
     * next node.
     */

    next.children.unshift(child);

    /*
     * Update position.
     */

    if (next.position && child.position) {
        next.position.start = child.position.start;
    }

    /*
     * Next, iterate over the node at the previous
     * position, as it's now adjacent to a following
     * word.
     */

    return index - 1;
}

/*
 * Expose `mergeInitialWordSymbol` as a modifier.
 */

module.exports = modifier(mergeInitialWordSymbol);

},{"../modifier":11,"nlcst-to-string":33}],23:[function(require,module,exports){
'use strict';

/*
 * Dependencies.
 */

var nlcstToString,
    modifier,
    expressions;

nlcstToString = require('nlcst-to-string');
modifier = require('../modifier');
expressions = require('../expressions');

/*
 * Constants.
 *
 * - Numbers.
 */

var EXPRESSION_NUMERICAL;

EXPRESSION_NUMERICAL = expressions.numerical;

/**
 * Merge initialisms.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTSentenceNode} parent
 * @return {undefined|number}
 */
function mergeInitialisms(child, index, parent) {
    var siblings,
        prev,
        children,
        length,
        position,
        otherChild,
        isAllDigits,
        value;

    if (
        index !== 0 &&
        nlcstToString(child) === '.'
    ) {
        siblings = parent.children;

        prev = siblings[index - 1];
        children = prev.children;

        length = children && children.length;

        if (
            prev.type === 'WordNode' &&
            length !== 1 &&
            length % 2 !== 0
        ) {
            position = length;

            isAllDigits = true;

            while (children[--position]) {
                otherChild = children[position];

                value = nlcstToString(otherChild);

                if (position % 2 === 0) {
                    /*
                     * Initialisms consist of one
                     * character values.
                     */

                    if (value.length > 1) {
                        return;
                    }

                    if (!EXPRESSION_NUMERICAL.test(value)) {
                        isAllDigits = false;
                    }
                } else if (value !== '.') {
                    if (position < length - 2) {
                        break;
                    } else {
                        return;
                    }
                }
            }

            if (!isAllDigits) {
                /*
                 * Remove `child` from parent.
                 */

                siblings.splice(index, 1);

                /*
                 * Add child to the previous children.
                 */

                children.push(child);

                /*
                 * Update position.
                 */

                if (prev.position && child.position) {
                    prev.position.end = child.position.end;
                }

                /*
                 * Next, iterate over the node *now* at the current
                 * position.
                 */

                return index;
            }
        }
    }
}

/*
 * Expose `mergeInitialisms` as a modifier.
 */

module.exports = modifier(mergeInitialisms);

},{"../expressions":10,"../modifier":11,"nlcst-to-string":33}],24:[function(require,module,exports){
'use strict';

/*
 * Dependencies.
 */

var nlcstToString,
    modifier,
    expressions;

nlcstToString = require('nlcst-to-string');
modifier = require('../modifier');
expressions = require('../expressions');

/*
 * Constants.
 *
 * - Symbols part of surrounding words.
 */

var EXPRESSION_INNER_WORD_SYMBOL;

EXPRESSION_INNER_WORD_SYMBOL = expressions.wordSymbolInner;

/**
 * Merge two words surrounding certain punctuation marks.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTSentenceNode} parent
 * @return {undefined|number}
 */
function mergeInnerWordSymbol(child, index, parent) {
    var siblings,
        sibling,
        prev,
        last,
        position,
        tokens,
        queue;

    if (
        index !== 0 &&
        (
            child.type === 'SymbolNode' ||
            child.type === 'PunctuationNode'
        )
    ) {
        siblings = parent.children;

        prev = siblings[index - 1];

        if (prev && prev.type === 'WordNode') {
            position = index - 1;

            tokens = [];
            queue = [];

            /*
             * - If a token which is neither word nor
             *   inner word symbol is found, the loop
             *   is broken.
             * - If an inner word symbol is found,
             *   it's queued.
             * - If a word is found, it's queued (and
             *   the queue stored and emptied).
             */

            while (siblings[++position]) {
                sibling = siblings[position];

                if (sibling.type === 'WordNode') {
                    tokens = tokens.concat(queue, sibling.children);

                    queue = [];
                } else if (
                    (
                        sibling.type === 'SymbolNode' ||
                        sibling.type === 'PunctuationNode'
                    ) &&
                    EXPRESSION_INNER_WORD_SYMBOL.test(nlcstToString(sibling))
                ) {
                    queue.push(sibling);
                } else {
                    break;
                }
            }

            if (tokens.length) {
                /*
                 * If there is a queue, remove its length
                 * from `position`.
                 */

                if (queue.length) {
                    position -= queue.length;
                }

                /*
                 * Remove every (one or more) inner-word punctuation
                 * marks and children of words.
                 */

                siblings.splice(index, position - index);

                /*
                 * Add all found tokens to `prev`s children.
                 */

                prev.children = prev.children.concat(tokens);

                last = tokens[tokens.length - 1];

                /*
                 * Update position.
                 */

                if (prev.position && last.position) {
                    prev.position.end = last.position.end;
                }

                /*
                 * Next, iterate over the node *now* at the current
                 * position.
                 */

                return index;
            }
        }
    }
}

/*
 * Expose `mergeInnerWordSymbol` as a modifier.
 */

module.exports = modifier(mergeInnerWordSymbol);

},{"../expressions":10,"../modifier":11,"nlcst-to-string":33}],25:[function(require,module,exports){
'use strict';

/*
 * Dependencies.
 */

var modifier;

modifier = require('../modifier');

/**
 * Merge a sentence into the following sentence, when
 * the sentence does not contain word tokens.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParagraphNode} parent
 * @return {undefined|number}
 */
function mergeNonWordSentences(child, index, parent) {
    var children,
        position,
        prev,
        next;

    children = child.children;
    position = -1;

    while (children[++position]) {
        if (children[position].type === 'WordNode') {
            return;
        }
    }

    prev = parent.children[index - 1];

    if (prev) {
        prev.children = prev.children.concat(children);

        /*
         * Remove the child.
         */

        parent.children.splice(index, 1);

        /*
         * Patch position.
         */

        if (prev.position && child.position) {
            prev.position.end = child.position.end;
        }

        /*
         * Next, iterate over the node *now* at
         * the current position (which was the
         * next node).
         */

        return index;
    }

    next = parent.children[index + 1];

    if (next) {
        next.children = children.concat(next.children);

        /*
         * Patch position.
         */

        if (next.position && child.position) {
            next.position.start = child.position.start;
        }

        /*
         * Remove the child.
         */

        parent.children.splice(index, 1);
    }
}

/*
 * Expose `mergeNonWordSentences` as a modifier.
 */

module.exports = modifier(mergeNonWordSentences);

},{"../modifier":11}],26:[function(require,module,exports){
'use strict';

/*
 * Dependencies.
 */

var nlcstToString,
    modifier;

nlcstToString = require('nlcst-to-string');
modifier = require('../modifier');

/*
 * Constants.
 *
 * - Blacklist of full stop characters that should not
 *   be treated as terminal sentence markers: A
 *   case-insensitive abbreviation.
 */

var EXPRESSION_ABBREVIATION_PREFIX;

EXPRESSION_ABBREVIATION_PREFIX = new RegExp(
    '^(' +
        '[0-9]+|' +
        '[a-z]|' +

        /*
         * Common Latin Abbreviations:
         * Based on: http://en.wikipedia.org/wiki/List_of_Latin_abbreviations
         * Where only the abbreviations written without joining full stops,
         * but with a final full stop, were extracted.
         *
         * circa, capitulus, confer, compare, centum weight, eadem, (et) alii,
         * et cetera, floruit, foliis, ibidem, idem, nemine && contradicente,
         * opere && citato, (per) cent, (per) procurationem, (pro) tempore,
         * sic erat scriptum, (et) sequentia, statim, videlicet.
         */

        'al|ca|cap|cca|cent|cf|cit|con|cp|cwt|ead|etc|ff|' +
        'fl|ibid|id|nem|op|pro|seq|sic|stat|tem|viz' +
    ')$'
);

/**
 * Merge a sentence into its next sentence, when the
 * sentence ends with a certain word.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParagraphNode} parent
 * @return {undefined|number}
 */
function mergePrefixExceptions(child, index, parent) {
    var children,
        node,
        next;

    children = child.children;

    if (
        children &&
        children.length &&
        index !== parent.children.length - 1
    ) {
        node = children[children.length - 1];

        if (
            node &&
            nlcstToString(node) === '.'
        ) {
            node = children[children.length - 2];

            if (
                node &&
                node.type === 'WordNode' &&
                EXPRESSION_ABBREVIATION_PREFIX.test(
                    nlcstToString(node).toLowerCase()
                )
            ) {
                next = parent.children[index + 1];

                child.children = children.concat(next.children);

                parent.children.splice(index + 1, 1);

                /*
                 * Update position.
                 */

                if (next.position && child.position) {
                    child.position.end = next.position.end;
                }

                /*
                 * Next, iterate over the current node again.
                 */

                return index - 1;
            }
        }
    }
}

/*
 * Expose `mergePrefixExceptions` as a modifier.
 */

module.exports = modifier(mergePrefixExceptions);

},{"../modifier":11,"nlcst-to-string":33}],27:[function(require,module,exports){
'use strict';

/*
 * Dependencies.
 */

var nlcstToString,
    plugin,
    expressions;

nlcstToString = require('nlcst-to-string');
plugin = require('../plugin');
expressions = require('../expressions');

/*
 * Constants.
 *
 * - Blacklist of full stop characters that should not
 *   be treated as terminal sentence markers: A
 *   case-insensitive abbreviation.
 */

var EXPRESSION_TERMINAL_MARKER;

EXPRESSION_TERMINAL_MARKER = expressions.terminalMarker;

/**
 * Merge non-terminal-marker full stops into
 * the previous word (if available), or the next
 * word (if available).
 *
 * @param {NLCSTNode} child
 */
function mergeRemainingFullStops(child) {
    var children,
        position,
        grandchild,
        prev,
        next,
        nextNext,
        hasFoundDelimiter;

    children = child.children;
    position = children.length;

    hasFoundDelimiter = false;

    while (children[--position]) {
        grandchild = children[position];

        if (
            grandchild.type !== 'SymbolNode' &&
            grandchild.type !== 'PunctuationNode'
        ) {
            /*
             * This is a sentence without terminal marker,
             * so we 'fool' the code to make it think we
             * have found one.
             */

            if (grandchild.type === 'WordNode') {
                hasFoundDelimiter = true;
            }

            continue;
        }

        /*
         * Exit when this token is not a terminal marker.
         */

        if (!EXPRESSION_TERMINAL_MARKER.test(nlcstToString(grandchild))) {
            continue;
        }

        /*
         * Ignore the first terminal marker found
         * (starting at the end), as it should not
         * be merged.
         */

        if (!hasFoundDelimiter) {
            hasFoundDelimiter = true;

            continue;
        }

        /*
         * Only merge a single full stop.
         */

        if (nlcstToString(grandchild) !== '.') {
            continue;
        }

        prev = children[position - 1];
        next = children[position + 1];

        if (prev && prev.type === 'WordNode') {
            nextNext = children[position + 2];

            /*
             * Continue when the full stop is followed by
             * a space and another full stop, such as:
             * `{.} .`
             */

            if (
                next &&
                nextNext &&
                next.type === 'WhiteSpaceNode' &&
                nlcstToString(nextNext) === '.'
            ) {
                continue;
            }

            /*
             * Remove `child` from parent.
             */

            children.splice(position, 1);

            /*
             * Add the punctuation mark at the end of the
             * previous node.
             */

            prev.children.push(grandchild);

            /*
             * Update position.
             */

            if (grandchild.position && prev.position) {
                prev.position.end = grandchild.position.end;
            }

            position--;
        } else if (next && next.type === 'WordNode') {
            /*
             * Remove `child` from parent.
             */

            children.splice(position, 1);

            /*
             * Add the punctuation mark at the start of
             * the next node.
             */

            next.children.unshift(grandchild);

            if (grandchild.position && next.position) {
                next.position.start = grandchild.position.start;
            }
        }
    }
}

/*
 * Expose `mergeRemainingFullStops` as a plugin.
 */

module.exports = plugin(mergeRemainingFullStops);

},{"../expressions":10,"../plugin":14,"nlcst-to-string":33}],28:[function(require,module,exports){
'use strict';

/*
 * Dependencies.
 */

var modifier = require('../modifier');

/**
 * Merge multiple words. This merges the children of
 * adjacent words, something which should not occur
 * naturally by parse-latin, but might happen when
 * custom tokens were passed in.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTSentenceNode} parent
 * @return {undefined|number}
 */
function mergeFinalWordSymbol(child, index, parent) {
    var siblings = parent.children,
        next;

    if (child.type === 'WordNode') {
        next = siblings[index + 1];

        if (next && next.type === 'WordNode') {
            /*
             * Remove `next` from parent.
             */

            siblings.splice(index + 1, 1);

            /*
             * Add the punctuation mark at the end of the
             * previous node.
             */

            child.children = child.children.concat(next.children);

            /*
             * Update position.
             */

            if (next.position && child.position) {
                child.position.end = next.position.end;
            }

            /*
             * Next, re-iterate the current node.
             */

            return index;
        }
    }
}

/*
 * Expose `mergeFinalWordSymbol` as a modifier.
 */

module.exports = modifier(mergeFinalWordSymbol);

},{"../modifier":11}],29:[function(require,module,exports){
'use strict';

/*
 * Dependencies.
 */

var plugin = require('../plugin');

/**
 * Add a `position` object when it does not yet exist
 * on `node`.
 *
 * @param {NLCSTNode} node - Node to patch.
 */
function patch(node) {
    if (!node.position) {
        node.position = {};
    }
}

/**
 * Patch the position on a parent node based on its first
 * and last child.
 *
 * @param {NLCSTNode} child
 */
function patchPosition(child, index, node) {
    var siblings = node.children;

    if (!child.position) {
        return;
    }

    if (
        index === 0 &&
        (!node.position || /* istanbul ignore next */ !node.position.start)
    ) {
        patch(node);
        node.position.start = child.position.start;
    }

    if (
        index === siblings.length - 1 &&
        (!node.position || !node.position.end)
    ) {
        patch(node);
        node.position.end = child.position.end;
    }
}

/*
 * Expose `patchPosition` as a plugin.
 */

module.exports = plugin(patchPosition);

},{"../plugin":14}],30:[function(require,module,exports){
'use strict';

/*
 * Dependencies.
 */

var modifier;

modifier = require('../modifier');

/**
 * Remove empty children.
 *
 * @param {NLCSTNode} child
 * @param {number} index
 * @param {NLCSTParagraphNode} parent
 * @return {undefined|number}
 */
function removeEmptyNodes(child, index, parent) {
    if ('children' in child && !child.children.length) {
        parent.children.splice(index, 1);

        /*
         * Next, iterate over the node *now* at
         * the current position (which was the
         * next node).
         */

        return index;
    }
}

/*
 * Expose `removeEmptyNodes` as a modifier.
 */

module.exports = modifier(removeEmptyNodes);

},{"../modifier":11}],31:[function(require,module,exports){
'use strict';

var nlcstToString;

nlcstToString = require('nlcst-to-string');

/**
 * Factory to create a tokenizer based on a given
 * `expression`.
 *
 * @param {string} childType
 * @param {RegExp} expression
 * @return {function(NLCSTParent): Array.<NLCSTChild>}
 */
function tokenizerFactory(childType, expression) {
    /**
     * A function which splits
     *
     * @param {NLCSTParent} node
     * @return {Array.<NLCSTChild>}
     */
    return function (node) {
        var children,
            tokens,
            type,
            length,
            index,
            lastIndex,
            start,
            parent,
            first,
            last;

        children = [];

        tokens = node.children;
        type = node.type;

        length = tokens.length;

        index = -1;

        lastIndex = length - 1;

        start = 0;

        while (++index < length) {
            if (
                index === lastIndex ||
                (
                    tokens[index].type === childType &&
                    expression.test(nlcstToString(tokens[index]))
                )
            ) {
                first = tokens[start];
                last = tokens[index];

                parent = {
                    'type': type,
                    'children': tokens.slice(start, index + 1)
                };

                if (first.position && last.position) {
                    parent.position = {
                        'start': first.position.start,
                        'end': last.position.end
                    };
                }

                children.push(parent);

                start = index + 1;
            }
        }

        return children;
    };
}

module.exports = tokenizerFactory;

},{"nlcst-to-string":33}],32:[function(require,module,exports){
'use strict';

/**
 * Cache `hasOwnProperty`.
 */

var has;

has = Object.prototype.hasOwnProperty;

/**
 * `Array#forEach()` with the possibility to change
 * the next position.
 *
 * @param {{length: number}} values
 * @param {function(*, number, {length: number}): number|undefined} callback
 * @param {*} context
 */

function iterate(values, callback, context) {
    var index,
        result;

    if (!values) {
        throw new Error(
            'TypeError: Iterate requires that |this| ' +
            'not be ' + values
        );
    }

    if (!has.call(values, 'length')) {
        throw new Error(
            'TypeError: Iterate requires that |this| ' +
            'has a `length`'
        );
    }

    if (typeof callback !== 'function') {
        throw new Error(
            'TypeError: callback must be a function'
        );
    }

    index = -1;

    /**
     * The length might change, so we do not cache it.
     */

    while (++index < values.length) {
        /**
         * Skip missing values.
         */

        if (!(index in values)) {
            continue;
        }

        result = callback.call(context, values[index], index, values);

        /**
         * If `callback` returns a `number`, move `index` over to
         * `number`.
         */

        if (typeof result === 'number') {
            /**
             * Make sure that negative numbers do not
             * break the loop.
             */

            if (result < 0) {
                index = 0;
            }

            index = result - 1;
        }
    }
}

/**
 * Expose `iterate`.
 */

module.exports = iterate;

},{}],33:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"dup":8}],34:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module unified
 * @fileoverview Parse / Transform / Compile / Repeat.
 */

'use strict';

/*
 * Dependencies.
 */

var bail = require('bail');
var ware = require('ware');
var AttachWare = require('attach-ware')(ware);
var VFile = require('vfile');
var unherit = require('unherit');

/*
 * Processing pipeline.
 */

var pipeline = ware()
    .use(function (ctx) {
        ctx.tree = ctx.context.parse(ctx.file, ctx.settings);
    })
    .use(function (ctx, next) {
        ctx.context.run(ctx.tree, ctx.file, next);
    })
    .use(function (ctx) {
        ctx.result = ctx.context.stringify(ctx.tree, ctx.file, ctx.settings);
    });

/**
 * Construct a new Processor class based on the
 * given options.
 *
 * @param {Object} options - Configuration.
 * @param {string} options.name - Private storage.
 * @param {string} options.type - Type of syntax tree.
 * @param {Function} options.Parser - Class to turn a
 *   virtual file into a syntax tree.
 * @param {Function} options.Compiler - Class to turn a
 *   syntax tree into a string.
 * @return {Processor} - A new constructor.
 */
function unified(options) {
    var name = options.name;
    var type = options.type;
    var Parser = options.Parser;
    var Compiler = options.Compiler;

    /**
     * Construct a Processor instance.
     *
     * @constructor
     * @class {Processor}
     */
    function Processor(processor) {
        var self = this;

        if (!(self instanceof Processor)) {
            return new Processor(processor);
        }

        self.ware = new AttachWare(processor && processor.ware);
        self.ware.context = self;

        self.Parser = unherit(Parser);
        self.Compiler = unherit(Compiler);
    }

    /**
     * Either return `context` if its an instance
     * of `Processor` or construct a new `Processor`
     * instance.
     *
     * @private
     * @param {Processor?} [context] - Context object.
     * @return {Processor} - Either `context` or a new
     *   Processor instance.
     */
    function instance(context) {
        return context instanceof Processor ? context : new Processor();
    }

    /**
     * Attach a plugin.
     *
     * @this {Processor?} - Either a Processor instance or
     *   the Processor constructor.
     * @return {Processor}
     */
    function use() {
        var self = instance(this);

        self.ware.use.apply(self.ware, arguments);

        return self;
    }

    /**
     * Transform.
     *
     * @this {Processor?} - Either a Processor instance or
     *   the Processor constructor.
     * @param {Node} [node] - Syntax tree.
     * @param {VFile?} [file] - Virtual file.
     * @param {Function?} [done] - Callback.
     * @return {Node} - `node`.
     */
    function run(node, file, done) {
        var self = this;
        var space;

        if (typeof file === 'function') {
            done = file;
            file = null;
        }

        if (!file && node && !node.type) {
            file = node;
            node = null;
        }

        file = new VFile(file);
        space = file.namespace(name);

        if (!node) {
            node = space[type] || node;
        } else if (!space[type]) {
            space[type] = node;
        }

        if (!node) {
            throw new Error('Expected node, got ' + node);
        }

        done = typeof done === 'function' ? done : bail;

        /*
         * Only run when this is an instance of Processor,
         * and when there are transformers.
         */

        if (self.ware && self.ware.fns) {
            self.ware.run(node, file, done);
        } else {
            done(null, node, file);
        }

        return node;
    }

    /**
     * Parse a file.
     *
     * Patches the parsed node onto the `name`
     * namespace on the `type` property.
     *
     * @this {Processor?} - Either a Processor instance or
     *   the Processor constructor.
     * @param {string|VFile} value - Input to parse.
     * @param {Object?} [settings] - Configuration.
     * @return {Node} - `node`.
     */
    function parse(value, settings) {
        var file = new VFile(value);
        var CustomParser = (this && this.Parser) || Parser;
        var node = new CustomParser(file, settings).parse();

        file.namespace(name)[type] = node;

        return node;
    }

    /**
     * Compile a file.
     *
     * Used the parsed node at the `name`
     * namespace at `type` when no node was given.
     *
     * @this {Processor?} - Either a Processor instance or
     *   the Processor constructor.
     * @param {Object} [node] - Syntax tree.
     * @param {VFile} [file] - File with syntax tree.
     * @param {Object?} [settings] - Configuration.
     * @return {string} - Compiled `file`.
     */
    function stringify(node, file, settings) {
        var CustomCompiler = (this && this.Compiler) || Compiler;
        var space;

        if (settings === null || settings === undefined) {
            settings = file;
            file = null;
        }

        if (!file && node && !node.type) {
            file = node;
            node = null;
        }

        file = new VFile(file);
        space = file.namespace(name);

        if (!node) {
            node = space[type] || node;
        } else if (!space[type]) {
            space[type] = node;
        }

        if (!node) {
            throw new Error('Expected node, got ' + node);
        }

        return new CustomCompiler(file, settings).compile();
    }

    /**
     * Parse / Transform / Compile.
     *
     * @this {Processor?} - Either a Processor instance or
     *   the Processor constructor.
     * @param {string|VFile} value - Input to process.
     * @param {Object?} [settings] - Configuration.
     * @param {Function?} [done] - Callback.
     * @return {string?} - Parsed document, when
     *   transformation was async.
     */
    function process(value, settings, done) {
        var self = instance(this);
        var file = new VFile(value);
        var result = null;

        if (typeof settings === 'function') {
            done = settings;
            settings = null;
        }

        pipeline.run({
            'context': self,
            'file': file,
            'settings': settings || {}
        }, function (err, res) {
            result = res && res.result;

            if (done) {
                done(err, file, result);
            } else if (err) {
                bail(err);
            }
        });

        return result;
    }

    /*
     * Methods / functions.
     */

    var proto = Processor.prototype;

    Processor.use = proto.use = use;
    Processor.parse = proto.parse = parse;
    Processor.run = proto.run = run;
    Processor.stringify = proto.stringify = stringify;
    Processor.process = proto.process = process;

    return Processor;
}

/*
 * Expose.
 */

module.exports = unified;

},{"attach-ware":35,"bail":36,"unherit":37,"vfile":40,"ware":41}],35:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module attach-ware
 * @fileoverview Middleware with configuration.
 * @example
 *   var ware = require('attach-ware')(require('ware'));
 *
 *   var middleware = ware()
 *     .use(function (context, options) {
 *         if (!options.condition) return;
 *
 *         return function (req, res, next) {
 *           res.x = 'hello';
 *           next();
 *         };
 *     }, {
 *         'condition': true
 *     })
 *     .use(function (context, options) {
 *         if (!options.condition) return;
 *
 *         return function (req, res, next) {
 *           res.y = 'world';
 *           next();
 *         };
 *     }, {
 *         'condition': false
 *     });
 *
 *   middleware.run({}, {}, function (err, req, res) {
 *     res.x; // "hello"
 *     res.y; // undefined
 *   });
 */

'use strict';

var slice = [].slice;
var unherit = require('unherit');

/**
 * Clone `Ware` without affecting the super-class and
 * turn it into configurable middleware.
 *
 * @param {Function} Ware - Ware-like constructor.
 * @return {Function} AttachWare - Configurable middleware.
 */
function patch(Ware) {
    /*
     * Methods.
     */

    var useFn = Ware.prototype.use;

    /**
     * @constructor
     * @class {AttachWare}
     */
    var AttachWare = unherit(Ware);

    AttachWare.prototype.foo = true;

    /**
     * Attach configurable middleware.
     *
     * @memberof {AttachWare}
     * @this {AttachWare}
     * @param {Function} attach
     * @return {AttachWare} - `this`.
     */
    function use(attach) {
        var self = this;
        var params = slice.call(arguments, 1);
        var index;
        var length;
        var fn;

        /*
         * Accept other `AttachWare`.
         */

        if (attach instanceof AttachWare) {
            if (attach.attachers) {
                return self.use(attach.attachers);
            }

            return self;
        }

        /*
         * Accept normal ware.
         */

        if (attach instanceof Ware) {
            self.fns = self.fns.concat(attach.fns);
            return self;
        }

        /*
         * Multiple attachers.
         */

        if ('length' in attach && typeof attach !== 'function') {
            index = -1;
            length = attach.length;

            while (++index < length) {
                self.use.apply(self, [attach[index]].concat(params));
            }

            return self;
        }

        /*
         * Single attacher.
         */

        fn = attach.apply(null, [self.context || self].concat(params));

        /*
         * Store the attacher to not break `new Ware(otherWare)`
         * functionality.
         */

        if (!self.attachers) {
            self.attachers = [];
        }

        self.attachers.push(attach);

        /*
         * Pass `fn` to the original `Ware#use()`.
         */

        if (fn) {
            useFn.call(self, fn);
        }

        return self;
    }

    AttachWare.prototype.use = use;

    return function (fn) {
        return new AttachWare(fn);
    };
}

module.exports = patch;

},{"unherit":37}],36:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer. All rights reserved.
 * @module bail
 * @fileoverview Throw a given error.
 */

'use strict';

/**
 * Throw a given error.
 *
 * @example
 *   bail();
 *
 * @example
 *   bail(new Error('failure'));
 *   // Error: failure
 *   //     at repl:1:6
 *   //     at REPLServer.defaultEval (repl.js:154:27)
 *   //     ...
 *
 * @param {Error?} [err] - Optional error.
 * @throws {Error} - `err`, when given.
 */
function bail(err) {
    if (err) {
        throw err;
    }
}

/*
 * Expose.
 */

module.exports = bail;

},{}],37:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module unherit
 * @fileoverview Create a custom constructor which can be modified
 *   without affecting the original class.
 * @example
 *   var EventEmitter = require('events').EventEmitter;
 *   var Emitter = unherit(EventEmitter);
 *   // Create a private class which acts just like
 *   // `EventEmitter`.
 *
 *   Emitter.prototype.defaultMaxListeners = 0;
 *   // Now, all instances of `Emitter` have no maximum
 *   // listeners, without affecting other `EventEmitter`s.
 */

'use strict';

/*
 * Dependencies.
 */

var clone = require('clone');
var inherits = require('inherits');

/**
 * Create a custom constructor which can be modified
 * without affecting the original class.
 *
 * @param {Function} Super - Super-class.
 * @return {Function} - Constructor acting like `Super`,
 *   which can be modified without affecting the original
 *   class.
 */
function unherit(Super) {
    var base = clone(Super.prototype);
    var result;
    var key;

    /**
     * Constructor accepting a single argument,
     * which itself is an `arguments` object.
     */
    function From(parameters) {
        return Super.apply(this, parameters);
    }

    /**
     * Constructor accepting variadic arguments.
     */
    function Of() {
        if (!(this instanceof Of)) {
            return new From(arguments);
        }

        return Super.apply(this, arguments);
    }

    inherits(Of, Super);
    inherits(From, Of);

    /*
     * Both do duplicate work. However, cloning the
     * prototype ensures clonable things are cloned
     * and thus used. The `inherits` call ensures
     * `instanceof` still thinks an instance subclasses
     * `Super`.
     */

    result = Of.prototype;

    for (key in base) {
        result[key] = base[key];
    }

    return Of;
}

/*
 * Expose.
 */

module.exports = unherit;

},{"clone":38,"inherits":39}],38:[function(require,module,exports){
(function (Buffer){
var clone = (function() {
'use strict';

/**
 * Clones (copies) an Object using deep copying.
 *
 * This function supports circular references by default, but if you are certain
 * there are no circular references in your object, you can save some CPU time
 * by calling clone(obj, false).
 *
 * Caution: if `circular` is false and `parent` contains circular references,
 * your program may enter an infinite loop and crash.
 *
 * @param `parent` - the object to be cloned
 * @param `circular` - set to true if the object to be cloned may contain
 *    circular references. (optional - true by default)
 * @param `depth` - set to a number if the object is only to be cloned to
 *    a particular depth. (optional - defaults to Infinity)
 * @param `prototype` - sets the prototype to be used when cloning an object.
 *    (optional - defaults to parent prototype).
*/
function clone(parent, circular, depth, prototype) {
  var filter;
  if (typeof circular === 'object') {
    depth = circular.depth;
    prototype = circular.prototype;
    filter = circular.filter;
    circular = circular.circular
  }
  // maintain two arrays for circular references, where corresponding parents
  // and children have the same index
  var allParents = [];
  var allChildren = [];

  var useBuffer = typeof Buffer != 'undefined';

  if (typeof circular == 'undefined')
    circular = true;

  if (typeof depth == 'undefined')
    depth = Infinity;

  // recurse this function so we don't reset allParents and allChildren
  function _clone(parent, depth) {
    // cloning null always returns null
    if (parent === null)
      return null;

    if (depth == 0)
      return parent;

    var child;
    var proto;
    if (typeof parent != 'object') {
      return parent;
    }

    if (clone.__isArray(parent)) {
      child = [];
    } else if (clone.__isRegExp(parent)) {
      child = new RegExp(parent.source, __getRegExpFlags(parent));
      if (parent.lastIndex) child.lastIndex = parent.lastIndex;
    } else if (clone.__isDate(parent)) {
      child = new Date(parent.getTime());
    } else if (useBuffer && Buffer.isBuffer(parent)) {
      child = new Buffer(parent.length);
      parent.copy(child);
      return child;
    } else {
      if (typeof prototype == 'undefined') {
        proto = Object.getPrototypeOf(parent);
        child = Object.create(proto);
      }
      else {
        child = Object.create(prototype);
        proto = prototype;
      }
    }

    if (circular) {
      var index = allParents.indexOf(parent);

      if (index != -1) {
        return allChildren[index];
      }
      allParents.push(parent);
      allChildren.push(child);
    }

    for (var i in parent) {
      var attrs;
      if (proto) {
        attrs = Object.getOwnPropertyDescriptor(proto, i);
      }

      if (attrs && attrs.set == null) {
        continue;
      }
      child[i] = _clone(parent[i], depth - 1);
    }

    return child;
  }

  return _clone(parent, depth);
}

/**
 * Simple flat clone using prototype, accepts only objects, usefull for property
 * override on FLAT configuration object (no nested props).
 *
 * USE WITH CAUTION! This may not behave as you wish if you do not know how this
 * works.
 */
clone.clonePrototype = function clonePrototype(parent) {
  if (parent === null)
    return null;

  var c = function () {};
  c.prototype = parent;
  return new c();
};

// private utility functions

function __objToStr(o) {
  return Object.prototype.toString.call(o);
};
clone.__objToStr = __objToStr;

function __isDate(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Date]';
};
clone.__isDate = __isDate;

function __isArray(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Array]';
};
clone.__isArray = __isArray;

function __isRegExp(o) {
  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
};
clone.__isRegExp = __isRegExp;

function __getRegExpFlags(re) {
  var flags = '';
  if (re.global) flags += 'g';
  if (re.ignoreCase) flags += 'i';
  if (re.multiline) flags += 'm';
  return flags;
};
clone.__getRegExpFlags = __getRegExpFlags;

return clone;
})();

if (typeof module === 'object' && module.exports) {
  module.exports = clone;
}

}).call(this,require("buffer").Buffer)
},{"buffer":4}],39:[function(require,module,exports){
if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}

},{}],40:[function(require,module,exports){
/**
 * @author Titus Wormer
 * @copyright 2015 Titus Wormer
 * @license MIT
 * @module vfile
 * @fileoverview Virtual file format to attach additional
 *   information related to processed input.  Similar to
 *   `wearefractal/vinyl`.  Additionally, `VFile` can be
 *   passed directly to ESLint formatters to visualise
 *   warnings and errors relating to a file.
 * @example
 *   var VFile = require('vfile');
 *
 *   var file = new VFile({
 *     'directory': '~',
 *     'filename': 'example',
 *     'extension': 'txt',
 *     'contents': 'Foo *bar* baz'
 *   });
 *
 *   file.toString(); // 'Foo *bar* baz'
 *   file.filePath(); // '~/example.txt'
 *
 *   file.move({'extension': 'md'});
 *   file.filePath(); // '~/example.md'
 *
 *   file.warn('Something went wrong', {'line': 2, 'column': 3});
 *   // { [~/example.md:2:3: Something went wrong]
 *   //   name: '~/example.md:2:3',
 *   //   file: '~/example.md',
 *   //   reason: 'Something went wrong',
 *   //   line: 2,
 *   //   column: 3,
 *   //   fatal: false }
 */

'use strict';

var SEPARATOR = '/';

try {
    SEPARATOR = require('pa' + 'th').sep;
} catch (e) { /* empty */ }

/**
 * File-related message with location information.
 *
 * @typedef {Error} VFileMessage
 * @property {string} name - (Starting) location of the
 *   message, preceded by its file-path when available,
 *   and joined by `:`. Used internally by the native
 *   `Error#toString()`.
 * @property {string} file - File-path.
 * @property {string} reason - Reason for message.
 * @property {number?} line - Line of message, when
 *   available.
 * @property {number?} column - Column of message, when
 *   available.
 * @property {string?} stack - Stack of message, when
 *   available.
 * @property {boolean?} fatal - Whether the associated file
 *   is still processable.
 */

/**
 * Stringify a position.
 *
 * @example
 *   stringify({'line': 1, 'column': 3}) // '1:3'
 *   stringify({'line': 1}) // '1:1'
 *   stringify({'column': 3}) // '1:3'
 *   stringify() // '1:1'
 *
 * @private
 * @param {Object?} [position] - Single position, like
 *   those available at `node.position.start`.
 * @return {string}
 */
function stringify(position) {
    if (!position) {
        position = {};
    }

    return (position.line || 1) + ':' + (position.column || 1);
}

/**
 * ESLint's formatter API expects `filePath` to be a
 * string.  This hack supports invocation as well as
 * implicit coercion.
 *
 * @example
 *   var file = new VFile({
 *     'filename': 'example',
 *     'extension': 'txt'
 *   });
 *
 *   filePath = filePathFactory(file);
 *
 *   String(filePath); // 'example.txt'
 *   filePath(); // 'example.txt'
 *
 * @private
 * @param {VFile} file
 * @return {Function}
 */
function filePathFactory(file) {
    /**
     * Get the filename, with extension and directory, if applicable.
     *
     * @example
     *   var file = new VFile({
     *     'directory': '~',
     *     'filename': 'example',
     *     'extension': 'txt'
     *   });
     *
     *   String(file.filePath); // ~/example.txt
     *   file.filePath() // ~/example.txt
     *
     * @memberof {VFile}
     * @property {Function} toString - Itself. ESLint's
     *   formatter API expects `filePath` to be `string`.
     *   This hack supports invocation as well as implicit
     *   coercion.
     * @return {string} - If the `vFile` has a `filename`,
     *   it will be prefixed with the directory (slashed),
     *   if applicable, and suffixed with the (dotted)
     *   extension (if applicable).  Otherwise, an empty
     *   string is returned.
     */
    function filePath() {
        var directory = file.directory;
        var separator;

        if (file.filename || file.extension) {
            separator = directory.charAt(directory.length - 1);

            if (separator === '/' || separator === '\\') {
                directory = directory.slice(0, -1);
            }

            if (directory === '.') {
                directory = '';
            }

            return (directory ? directory + SEPARATOR : '') +
                file.filename +
                (file.extension ? '.' + file.extension : '');
        }

        return '';
    }

    filePath.toString = filePath;

    return filePath;
}

/**
 * Construct a new file.
 *
 * @example
 *   var file = new VFile({
 *     'directory': '~',
 *     'filename': 'example',
 *     'extension': 'txt',
 *     'contents': 'Foo *bar* baz'
 *   });
 *
 *   file === VFile(file) // true
 *   file === new VFile(file) // true
 *   VFile('foo') instanceof VFile // true
 *
 * @constructor
 * @class {VFile}
 * @param {Object|VFile|string} [options] - either an
 *   options object, or the value of `contents` (both
 *   optional).  When a `file` is passed in, it's
 *   immediately returned.
 * @property {string} [contents=''] - Content of file.
 * @property {string} [directory=''] - Path to parent
 *   directory.
 * @property {string} [filename=''] - Filename.
 *   A file-path can still be generated when no filename
 *   exists.
 * @property {string} [extension=''] - Extension.
 *   A file-path can still be generated when no extension
 *   exists.
 * @property {boolean?} quiet - Whether an error created by
 *   `VFile#fail()` is returned (when truthy) or thrown
 *   (when falsey). Ensure all `messages` associated with
 *   a file are handled properly when setting this to
 *   `true`.
 * @property {Array.<VFileMessage>} messages - List of associated
 *   messages.
 */
function VFile(options) {
    var self = this;

    /*
     * No `new` operator.
     */

    if (!(self instanceof VFile)) {
        return new VFile(options);
    }

    /*
     * Given file.
     */

    if (
        options &&
        typeof options.message === 'function' &&
        typeof options.hasFailed === 'function'
    ) {
        return options;
    }

    if (!options) {
        options = {};
    } else if (typeof options === 'string') {
        options = {
            'contents': options
        };
    }

    self.contents = options.contents || '';
    self.filename = options.filename || '';
    self.directory = options.directory || '';
    self.extension = options.extension || '';

    self.messages = [];

    /*
     * Make sure eslint’s formatters stringify `filePath`
     * properly.
     */

    self.filePath = filePathFactory(self);
}

/**
 * Get the value of the file.
 *
 * @example
 *   var vFile = new VFile('Foo');
 *   String(vFile); // 'Foo'
 *
 * @this {VFile}
 * @memberof {VFile}
 * @return {string} - value at the `contents` property
 *   in context.
 */
function toString() {
    return this.contents;
}

/**
 * Move a file by passing a new directory, filename,
 * and extension.  When these are not given, the default
 * values are kept.
 *
 * @example
 *   var file = new VFile({
 *     'directory': '~',
 *     'filename': 'example',
 *     'extension': 'txt',
 *     'contents': 'Foo *bar* baz'
 *   });
 *
 *   file.move({'directory': '/var/www'});
 *   file.filePath(); // '/var/www/example.txt'
 *
 *   file.move({'extension': 'md'});
 *   file.filePath(); // '/var/www/example.md'
 *
 * @this {VFile}
 * @memberof {VFile}
 * @param {Object?} [options]
 * @return {VFile} - Context object.
 */
function move(options) {
    var self = this;

    if (!options) {
        options = {};
    }

    self.directory = options.directory || self.directory || '';
    self.filename = options.filename || self.filename || '';
    self.extension = options.extension || self.extension || '';

    return self;
}

/**
 * Create a message with `reason` at `position`.
 * When an error is passed in as `reason`, copies the
 * stack.  This does not add a message to `messages`.
 *
 * @example
 *   var file = new VFile();
 *
 *   file.message('Something went wrong');
 *   // { [1:1: Something went wrong]
 *   //   name: '1:1',
 *   //   file: '',
 *   //   reason: 'Something went wrong',
 *   //   line: null,
 *   //   column: null }
 *
 * @this {VFile}
 * @memberof {VFile}
 * @param {string|Error} reason - Reason for message.
 * @param {Node|Location|Position} [position] - Location
 *   of message in file.
 * @return {VFileMessage} - File-related message with
 *   location information.
 */
function message(reason, position) {
    var filePath = this.filePath();
    var location;
    var err;

    /*
     * Node / location / position.
     */

    if (position && position.position) {
        position = position.position;
    }

    if (position && position.start) {
        location = stringify(position.start) + '-' + stringify(position.end);
        position = position.start;
    } else {
        location = stringify(position);
    }

    err = new Error(reason.message || reason);

    err.name = (filePath ? filePath + ':' : '') + location;
    err.file = filePath;
    err.reason = reason.message || reason;
    err.line = position ? position.line : null;
    err.column = position ? position.column : null;

    if (reason.stack) {
        err.stack = reason.stack;
    }

    return err;
}

/**
 * Warn. Creates a non-fatal message (see `VFile#message()`),
 * and adds it to the file's `messages` list.
 *
 * @example
 *   var file = new VFile();
 *
 *   file.warn('Something went wrong');
 *   // { [1:1: Something went wrong]
 *   //   name: '1:1',
 *   //   file: '',
 *   //   reason: 'Something went wrong',
 *   //   line: null,
 *   //   column: null,
 *   //   fatal: false }
 *
 * @see VFile#message
 * @this {VFile}
 * @memberof {VFile}
 */
function warn() {
    var err = this.message.apply(this, arguments);

    err.fatal = false;

    this.messages.push(err);

    return err;
}

/**
 * Fail. Creates a fatal message (see `VFile#message()`),
 * sets `fatal: true`, adds it to the file's
 * `messages` list.
 *
 * If `quiet` is not `true`, throws the error.
 *
 * @example
 *   var file = new VFile();
 *
 *   file.fail('Something went wrong');
 *   // 1:1: Something went wrong
 *   //     at VFile.exception (vfile/index.js:296:11)
 *   //     at VFile.fail (vfile/index.js:360:20)
 *   //     at repl:1:6
 *
 *   file.quiet = true;
 *   file.fail('Something went wrong');
 *   // { [1:1: Something went wrong]
 *   //   name: '1:1',
 *   //   file: '',
 *   //   reason: 'Something went wrong',
 *   //   line: null,
 *   //   column: null,
 *   //   fatal: true }
 *
 * @this {VFile}
 * @memberof {VFile}
 * @throws {VFileMessage} - When not `quiet: true`.
 * @param {string|Error} reason - Reason for failure.
 * @param {Node|Location|Position} [position] - Place
 *   of failure in file.
 * @return {VFileMessage} - Unless thrown, of course.
 */
function fail(reason, position) {
    var err = this.message(reason, position);

    err.fatal = true;

    this.messages.push(err);

    if (!this.quiet) {
        throw err;
    }

    return err;
}

/**
 * Check if a fatal message occurred making the file no
 * longer processable.
 *
 * @example
 *   var file = new VFile();
 *   file.quiet = true;
 *
 *   file.hasFailed(); // false
 *
 *   file.fail('Something went wrong');
 *   file.hasFailed(); // true
 *
 * @this {VFile}
 * @memberof {VFile}
 * @return {boolean} - `true` if at least one of file's
 *   `messages` has a `fatal` property set to `true`
 */
function hasFailed() {
    var messages = this.messages;
    var index = -1;
    var length = messages.length;

    while (++index < length) {
        if (messages[index].fatal) {
            return true;
        }
    }

    return false;
}

/**
 * Access private information relating to a file.
 *
 * @example
 *   var file = new VFile('Foo');
 *
 *   file.namespace('foo').bar = 'baz';
 *
 *   console.log(file.namespace('foo').bar) // 'baz';
 *
 * @this {VFile}
 * @memberof {VFile}
 * @param {string} key - Namespace key.
 * @return {Object} - Private space.
 */
function namespace(key) {
    var self = this;
    var space = self.data;

    if (!space) {
        space = self.data = {};
    }

    if (!space[key]) {
        space[key] = {};
    }

    return space[key];
}

/*
 * Methods.
 */

var vFilePrototype = VFile.prototype;

vFilePrototype.move = move;
vFilePrototype.toString = toString;
vFilePrototype.message = message;
vFilePrototype.warn = warn;
vFilePrototype.fail = fail;
vFilePrototype.hasFailed = hasFailed;
vFilePrototype.namespace = namespace;

/*
 * Expose.
 */

module.exports = VFile;

},{}],41:[function(require,module,exports){
/**
 * Module Dependencies
 */

var slice = [].slice;
var wrap = require('wrap-fn');

/**
 * Expose `Ware`.
 */

module.exports = Ware;

/**
 * Throw an error.
 *
 * @param {Error} error
 */

function fail (err) {
  throw err;
}

/**
 * Initialize a new `Ware` manager, with optional `fns`.
 *
 * @param {Function or Array or Ware} fn (optional)
 */

function Ware (fn) {
  if (!(this instanceof Ware)) return new Ware(fn);
  this.fns = [];
  if (fn) this.use(fn);
}

/**
 * Use a middleware `fn`.
 *
 * @param {Function or Array or Ware} fn
 * @return {Ware}
 */

Ware.prototype.use = function (fn) {
  if (fn instanceof Ware) {
    return this.use(fn.fns);
  }

  if (fn instanceof Array) {
    for (var i = 0, f; f = fn[i++];) this.use(f);
    return this;
  }

  this.fns.push(fn);
  return this;
};

/**
 * Run through the middleware with the given `args` and optional `callback`.
 *
 * @param {Mixed} args...
 * @param {Function} callback (optional)
 * @return {Ware}
 */

Ware.prototype.run = function () {
  var fns = this.fns;
  var ctx = this;
  var i = 0;
  var last = arguments[arguments.length - 1];
  var done = 'function' == typeof last && last;
  var args = done
    ? slice.call(arguments, 0, arguments.length - 1)
    : slice.call(arguments);

  // next step
  function next (err) {
    if (err) return (done || fail)(err);
    var fn = fns[i++];
    var arr = slice.call(args);

    if (!fn) {
      return done && done.apply(null, [null].concat(args));
    }

    wrap(fn, next).apply(ctx, arr);
  }

  next();

  return this;
};

},{"wrap-fn":42}],42:[function(require,module,exports){
/**
 * Module Dependencies
 */

var noop = function(){};
var co = require('co');

/**
 * Export `wrap-fn`
 */

module.exports = wrap;

/**
 * Wrap a function to support
 * sync, async, and gen functions.
 *
 * @param {Function} fn
 * @param {Function} done
 * @return {Function}
 * @api public
 */

function wrap(fn, done) {
  done = once(done || noop);

  return function() {
    // prevents arguments leakage
    // see https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) args[i] = arguments[i];

    var ctx = this;

    // done
    if (!fn) {
      return done.apply(ctx, [null].concat(args));
    }

    // async
    if (fn.length > args.length) {
      // NOTE: this only handles uncaught synchronous errors
      try {
        return fn.apply(ctx, args.concat(done));
      } catch (e) {
        return done(e);
      }
    }

    // generator
    if (generator(fn)) {
      return co(fn).apply(ctx, args.concat(done));
    }

    // sync
    return sync(fn, done).apply(ctx, args);
  }
}

/**
 * Wrap a synchronous function execution.
 *
 * @param {Function} fn
 * @param {Function} done
 * @return {Function}
 * @api private
 */

function sync(fn, done) {
  return function () {
    var ret;

    try {
      ret = fn.apply(this, arguments);
    } catch (err) {
      return done(err);
    }

    if (promise(ret)) {
      ret.then(function (value) { done(null, value); }, done);
    } else {
      ret instanceof Error ? done(ret) : done(null, ret);
    }
  }
}

/**
 * Is `value` a generator?
 *
 * @param {Mixed} value
 * @return {Boolean}
 * @api private
 */

function generator(value) {
  return value
    && value.constructor
    && 'GeneratorFunction' == value.constructor.name;
}


/**
 * Is `value` a promise?
 *
 * @param {Mixed} value
 * @return {Boolean}
 * @api private
 */

function promise(value) {
  return value && 'function' == typeof value.then;
}

/**
 * Once
 */

function once(fn) {
  return function() {
    var ret = fn.apply(this, arguments);
    fn = noop;
    return ret;
  };
}

},{"co":43}],43:[function(require,module,exports){

/**
 * slice() reference.
 */

var slice = Array.prototype.slice;

/**
 * Expose `co`.
 */

module.exports = co;

/**
 * Wrap the given generator `fn` and
 * return a thunk.
 *
 * @param {Function} fn
 * @return {Function}
 * @api public
 */

function co(fn) {
  var isGenFun = isGeneratorFunction(fn);

  return function (done) {
    var ctx = this;

    // in toThunk() below we invoke co()
    // with a generator, so optimize for
    // this case
    var gen = fn;

    // we only need to parse the arguments
    // if gen is a generator function.
    if (isGenFun) {
      var args = slice.call(arguments), len = args.length;
      var hasCallback = len && 'function' == typeof args[len - 1];
      done = hasCallback ? args.pop() : error;
      gen = fn.apply(this, args);
    } else {
      done = done || error;
    }

    next();

    // #92
    // wrap the callback in a setImmediate
    // so that any of its errors aren't caught by `co`
    function exit(err, res) {
      setImmediate(function(){
        done.call(ctx, err, res);
      });
    }

    function next(err, res) {
      var ret;

      // multiple args
      if (arguments.length > 2) res = slice.call(arguments, 1);

      // error
      if (err) {
        try {
          ret = gen.throw(err);
        } catch (e) {
          return exit(e);
        }
      }

      // ok
      if (!err) {
        try {
          ret = gen.next(res);
        } catch (e) {
          return exit(e);
        }
      }

      // done
      if (ret.done) return exit(null, ret.value);

      // normalize
      ret.value = toThunk(ret.value, ctx);

      // run
      if ('function' == typeof ret.value) {
        var called = false;
        try {
          ret.value.call(ctx, function(){
            if (called) return;
            called = true;
            next.apply(ctx, arguments);
          });
        } catch (e) {
          setImmediate(function(){
            if (called) return;
            called = true;
            next(e);
          });
        }
        return;
      }

      // invalid
      next(new TypeError('You may only yield a function, promise, generator, array, or object, '
        + 'but the following was passed: "' + String(ret.value) + '"'));
    }
  }
}

/**
 * Convert `obj` into a normalized thunk.
 *
 * @param {Mixed} obj
 * @param {Mixed} ctx
 * @return {Function}
 * @api private
 */

function toThunk(obj, ctx) {

  if (isGeneratorFunction(obj)) {
    return co(obj.call(ctx));
  }

  if (isGenerator(obj)) {
    return co(obj);
  }

  if (isPromise(obj)) {
    return promiseToThunk(obj);
  }

  if ('function' == typeof obj) {
    return obj;
  }

  if (isObject(obj) || Array.isArray(obj)) {
    return objectToThunk.call(ctx, obj);
  }

  return obj;
}

/**
 * Convert an object of yieldables to a thunk.
 *
 * @param {Object} obj
 * @return {Function}
 * @api private
 */

function objectToThunk(obj){
  var ctx = this;
  var isArray = Array.isArray(obj);

  return function(done){
    var keys = Object.keys(obj);
    var pending = keys.length;
    var results = isArray
      ? new Array(pending) // predefine the array length
      : new obj.constructor();
    var finished;

    if (!pending) {
      setImmediate(function(){
        done(null, results)
      });
      return;
    }

    // prepopulate object keys to preserve key ordering
    if (!isArray) {
      for (var i = 0; i < pending; i++) {
        results[keys[i]] = undefined;
      }
    }

    for (var i = 0; i < keys.length; i++) {
      run(obj[keys[i]], keys[i]);
    }

    function run(fn, key) {
      if (finished) return;
      try {
        fn = toThunk(fn, ctx);

        if ('function' != typeof fn) {
          results[key] = fn;
          return --pending || done(null, results);
        }

        fn.call(ctx, function(err, res){
          if (finished) return;

          if (err) {
            finished = true;
            return done(err);
          }

          results[key] = res;
          --pending || done(null, results);
        });
      } catch (err) {
        finished = true;
        done(err);
      }
    }
  }
}

/**
 * Convert `promise` to a thunk.
 *
 * @param {Object} promise
 * @return {Function}
 * @api private
 */

function promiseToThunk(promise) {
  return function(fn){
    promise.then(function(res) {
      fn(null, res);
    }, fn);
  }
}

/**
 * Check if `obj` is a promise.
 *
 * @param {Object} obj
 * @return {Boolean}
 * @api private
 */

function isPromise(obj) {
  return obj && 'function' == typeof obj.then;
}

/**
 * Check if `obj` is a generator.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isGenerator(obj) {
  return obj && 'function' == typeof obj.next && 'function' == typeof obj.throw;
}

/**
 * Check if `obj` is a generator function.
 *
 * @param {Mixed} obj
 * @return {Boolean}
 * @api private
 */

function isGeneratorFunction(obj) {
  return obj && obj.constructor && 'GeneratorFunction' == obj.constructor.name;
}

/**
 * Check for plain object.
 *
 * @param {Mixed} val
 * @return {Boolean}
 * @api private
 */

function isObject(val) {
  return val && Object == val.constructor;
}

/**
 * Throw `err` in a new stack.
 *
 * This is used when co() is invoked
 * without supplying a callback, which
 * should only be for demonstrational
 * purposes.
 *
 * @param {Error} err
 * @api private
 */

function error(err) {
  if (!err) return;
  setImmediate(function(){
    throw err;
  });
}

},{}]},{},[1])(1)
});