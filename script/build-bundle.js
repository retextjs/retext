'use strict';

var fs = require('fs');
var path = require('path');
var chalk = require('chalk');
var bail = require('bail');
var browserify = require('browserify');
var esprima = require('esprima');
var esmangle = require('esmangle');
var escodegen = require('escodegen');
var collapser = require('bundle-collapser/plugin');
var pack = require('../packages/retext/package.json');

var write = fs.writeFileSync;

var comment = [
  '/*!',
  ' * @copyright 2014 Titus Wormer',
  ' * @license ' + pack.license,
  ' * @module ' + pack.name,
  ' * @version ' + pack.version,
  ' */',
  ''
].join('\n');

var input = path.join.bind(null, __dirname, '..', 'packages', 'retext');
var output = path.join.bind(null, __dirname, '..');

var opts = {
  standalone: 'retext',
  detectGlobals: false,
  insertGlobals: ['process', 'global', '__filename', '__dirname']
};

browserify(input('index.js'), opts).bundle(function (err, buf) {
  bail(err);

  write(output('retext.js'), comment + buf);

  console.log(chalk.green('✓') + ' wrote `retext.js`');
});

browserify(input('index.js'), opts)
  .transform('uglifyify', {
    global: true,
    sourcemap: false
  })
  .plugin(collapser)
  .bundle(function (err, buf) {
    var ast;

    bail(err);

    ast = esmangle.mangle(esmangle.optimize(esprima.parse(String(buf), {
      loc: true,
      range: true,
      raw: true,
      comment: true,
      tolerant: true
    }), {
      destructive: true,
      directive: true,
      preserveCompletionValue: false,
      legacy: false,
      topLevelContext: null,
      inStrictCode: true
    }));

    write(output('retext.min.js'), comment + escodegen.generate(ast, {
      format: {
        renumber: true,
        hexadecimal: true,
        escapeless: true,
        compact: true,
        semicolons: false,
        parentheses: false
      }
    }));

    console.log(chalk.green('✓') + ' wrote `retext.min.js`');
  });
