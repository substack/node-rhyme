var assert = require('assert');
var rhyme = require('../index');

exports.syllables = function () {
    var to = setTimeout(function () {
        assert.fail('never finished');
    }, 15000);

    rhyme(function (r) {
        clearTimeout(to);

        assert.eql(r.syllables('candles'), 2);
        assert.eql(r.syllables('themselves'), 2);
        assert.eql(r.syllables('dangerous'), 3);
        assert.eql(r.syllables('concatenate'), 4);
        assert.eql(r.syllables('special'), 2);
        assert.eql(r.syllables('alluring'), 3);
        assert.eql(r.syllables('defense'), 2);
        assert.eql(r.syllables('aim'), 1);
        assert.eql(r.syllables('pineapple'), 3);
        assert.eql(r.syllables('electrocution'), 5);
        assert.ok(r.syllables('zimfphaml') === undefined);
    });

};
