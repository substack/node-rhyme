var assert = require('assert');
var rhyme = require('../index');

exports.findRhymes = function () {
    var to = setTimeout(function () {
        assert.fail('never finished');
    }, 15000);

    rhyme(function (r) {
        clearTimeout(to);

        assert.eql(r.findRhymes(['orange', 'banana']), []);

        assert.eql(r.findRhymes(['bed', 'bed']), []);
        assert.eql(r.findRhymes(['bed', 'red']), [['bed', 'red']]);
        assert.eql(r.findRhymes(['bed', 'bread', 'red']), [['bed', 'bread'], ['bed', 'red'], ['bread', 'red']]);
        assert.eql(r.findRhymes(['bed', 'bedderkat']), []);

        assert.eql(r.findRhymes(['bed', 'read', 'feed']), [['bed', 'read'], ['read', 'feed']]);
    });

};
