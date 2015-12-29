var assert = require('assert');
var rhyme = require('../index');

exports.doRhyme = function () {
    var to = setTimeout(function () {
        assert.fail('never finished');
    }, 15000);

    rhyme(function (r) {
        clearTimeout(to);

        assert.eql(r.doRhyme('orange', 'banana'), false);

        assert.eql(r.doRhyme('bed', 'bed'), false);
        assert.eql(r.doRhyme('bed', 'red'), true);
        assert.eql(r.doRhyme('bed', 'read'), true);
        assert.eql(r.doRhyme('bed', 'bread'), true);
        assert.eql(r.doRhyme('bed', 'bedderkat'), false);
    });

};
