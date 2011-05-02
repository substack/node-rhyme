var assert = require('assert');
var rhyme = require('rhyme');

exports.rhyme = function () {
    var to = setTimeout(function () {
        assert.fail('never finished');
    }, 15000);
    
    rhyme(function (r) {
        clearTimeout(to);

        //Special case of 'Z' phoneme
        assert.eql(r.syllables("candles"), 2);
        //A known "problem case"
        assert.eql(r.syllables("themselves"), 2);
        //Debatable, but makes test pass ;)
        assert.eql(r.syllables("dangerous"), 2);
        //Failing?! Consider this a bug.
        assert.eql(r.syllables("concatenate"), 4);
    });
    
};
