var assert = require('assert');
var rhyme = require('../index');

exports.alliteration = function () {
    var to = setTimeout(function () {
        assert.fail('never finished');
    }, 15000);

    rhyme(function (r) {
        clearTimeout(to);

        var friend = r.alliteration('friend');
        assert.ok(friend.length > 10);
        assert.ok(friend.indexOf('FRED') >= 0);
        assert.ok(friend.indexOf('FRESH') >= 0);
        assert.ok(friend.indexOf('FRIEND') < 0);

        var fred = r.alliteration('fred');
        assert.eql(friend.concat('FRIEND').sort(), fred.concat('FRED').sort());
    });

};
