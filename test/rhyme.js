var assert = require('assert');
var rhyme = require('../index');

exports.rhyme = function () {
    var to = setTimeout(function () {
        assert.fail('never finished');
    }, 15000);

    rhyme(function (r) {
        clearTimeout(to);

        assert.eql(r.rhyme('orange'), []);
        assert.ok(r.pronounce('orange').length === 2);

        var bed = r.rhyme('bed');
        assert.ok(bed.length > 10);
        assert.ok(bed.indexOf('RED') >= 0);
        assert.ok(bed.indexOf('BREAD') >= 0);
        assert.ok(bed.indexOf('BED') < 0);

        var zed = r.rhyme('zed');
        assert.eql(bed.concat('BED').sort(), zed.concat('ZED').sort());
    });

};
