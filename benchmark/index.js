'use strict';

var Retext, source, tiny, small, medium, large;

Retext = require('..');

source = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ' +
    'ac ultricies diam, quis vehicula mauris. Vivamus accumsan eleifend ' +
    'quam et varius. Etiam congue id magna eu fermentum. Aliquam mollis ' +
    'adipiscing.\n\n';

/* Test data */
tiny = source;
small = Array(11).join(source);
medium = Array(11).join(small);
large = Array(11).join(medium);

/* Benchmarks */
suite('retext.parse(); // Reuses the same TextOM object', function () {
    set('iterations', 20);

    var retext = new Retext();
    bench('tiny (1 paragraph, 5 sentences, 30 words, 208 B)',
        function (done) {
            retext.parse(tiny);
            done();
        }
    );

    retext = new Retext();
    bench('small (10 paragraphs, 50 sentences, 300 words, 2.08 kB)',
        function (done) {
            retext.parse(small);
            done();
        }
    );

    retext = new Retext();
    bench('medium (100 paragraphs, 500 sentences, 3000 words, 20.80 kB)',
        function (done) {
            retext.parse(medium);
            done();
        }
    );

    retext = new Retext();
    bench('large (1000 paragraphs, 5000 sentences, 30000 words, 208.00 kB)',
        function (done) {
            retext.parse(large);
            done();
        }
    );
});

suite('new Retext().parse(); // Creates a new TextOM object', function () {
    set('iterations', 20);

    bench('tiny (1 paragraph, 5 sentences, 30 words, 208 B)',
        function (done) {
            new Retext().parse(tiny);
            done();
        }
    );

    bench('small (10 paragraphs, 50 sentences, 300 words, 2.08 kB)',
        function (done) {
            new Retext().parse(small);
            done();
        }
    );

    bench('medium (100 paragraphs, 500 sentences, 3000 words, 20.80 kB)',
        function (done) {
            new Retext().parse(medium);
            done();
        }
    );

    bench('large (1000 paragraphs, 5000 sentences, 30000 words, 208.00 kB)',
        function (done) {
            new Retext().parse(large);
            done();
        }
    );
});
