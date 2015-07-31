'use strict';

/* global bench suite */

/*
 * Module dependencies (retext).
 */

var Retext = require('./');

/*
 * Test data.
 *
 * This includes:
 *
 * - An average sentence (w/ 20 words);
 * - An average paragraph (w/ 5 sentences);
 * - A (big?) section (w/ 10 paragraphs);
 * - A (big?) article (w/ 10 sections);
 *
 * Source:
 *   http://www.gutenberg.org/files/10745/10745-h/10745-h.htm
 */

var sentence = 'Where she had stood was clear, and she was gone since Sir ' +
    'Kay does not choose to assume my quarrel.';

var paragraph = 'Thou art a churlish knight to so affront a lady ' +
    'he could not sit upon his horse any longer. ' +
    'For methinks something hath befallen my lord and that he ' +
    'then, after a while, he cried out in great voice. ' +
    'For that light in the sky lieth in the south ' +
    'then Queen Helen fell down in a swoon, and lay. ' +
    'Touch me not, for I am not mortal, but Fay ' +
    'so the Lady of the Lake vanished away, everything behind. ' +
    sentence;

var section = paragraph + Array(10).join('\n\n' + paragraph);

var article = section + Array(10).join('\n\n' + section);

/*
 * Benchmark suite.
 */

suite('retext.parse(value, callback);', function () {
    var retext = new Retext();

    /*
     * Benchmark a paragraph.
     */

    bench('A paragraph (5 sentences, 100 words)',
        function () {
            retext.parse(paragraph);
        }
    );

    /*
     * Benchmark a section.
     */

    bench('A section (10 paragraphs, 50 sentences, 1,000 words)',
        function () {
            retext.parse(section);
        }
    );

    /*
     * Benchmark an article.
     */

    bench('An article (100 paragraphs, 500 sentences, 10,000 words)',
        function () {
            retext.parse(article);
        }
    );
});
