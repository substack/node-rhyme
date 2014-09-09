var fs = require('fs');
var Lazy = require('lazy');
var Hash = require('hashish');

var dictFile = __dirname + '/data/cmudict.0.7a';

module.exports = function (cb, dictFileDirect) {
    var self = {};
    var dict = {};

    self.pronounce = function (word) {
        return dict[word.toUpperCase()];
    };

    self.syllables = function (word) {
        var prose = self.pronounce(word);
        return prose && prose[0].filter(function (ph) {
            return ph.match(/^[AEIOU]/);
        }).length;
    };

    self.rhyme = function (word) {
        word = word.toUpperCase();
        if (!dict[word]) return [];

        var xs = dict[word].reduce(function (acc, w) {
            acc[active(w)] = true;
            return acc;
        }, {});

        var rhymes = [];
        Object.keys(dict).forEach(function (w) {
            if (w === word) return;

            var some = dict[w].some(function (p) {
                return xs[active(p)];
            });
            if (some) rhymes.push(w);
        }, []);
        return rhymes;
    };

    self.doRhyme = function(word1, word2) {
        // find words in rhyming dictionary
        word1 = word1.toUpperCase();
        word2 = word2.toUpperCase();
        rhyme1 = dict[word1];
        rhyme2 = dict[word2];

        // reject if rhymes not possible
        if (!rhyme1 || !rhyme2 || (rhyme1 === rhyme2)) {
            return false;
        }

        var xs = rhyme1.reduce(function (acc, w) {
            acc[active(w)] = true;
            return acc;
        }, {});

        var foundRhyme = rhyme2.some(function (p) {
            return xs[active(p)];
        });

        return foundRhyme;
    };

    self.findRhymes = function(words) {
        // see if words rhyme
        var rhymes = [];
        for (var w = 0; w < words.length - 1; w++) {
            for (var w2 = w + 1; w2 < words.length; w2++) {
                if (this.doRhyme(words[w], words[w2])) {
                    rhymes.push([words[w], words[w2]]);
                }
            }
        }
        return rhymes;
    };

    self.alliteration = function (word) {
        word = word.toUpperCase();
        if (!dict[word]) return [];

        var firstSlice = function (ws) {
            // active rhyming region: slice off the trailing consonants
            for (
                var i = ws.length - 1;
                i > 0 && ws[i].match(/^[^AEIOU]/i);
                i--
            );
            ws.splice(i + 1);
            return ws.join(' ');
        };

        var xs = dict[word].reduce(function (acc, w) {
            acc[firstSlice(w)] = true;
            return acc;
        }, {});

        var rhymes = [];
        Object.keys(dict).forEach(function (w) {
            if (w === word) return;

            var some = dict[w].some(function (p) {
                return xs[firstSlice(p)];
            });
            if (some) rhymes.push(w);
        }, []);
        return rhymes;
    };

    var s = fs.createReadStream(dictFileDirect || dictFile);

    s.on('end', function () {
        cb(self);
    });

    Lazy(s).lines.map(String).forEach(function (line) {
        if (line.match(/^[A-Z]/i)) {
            var words = line.split(/\s+/);
            var w = words[0].replace(/\(\d+\)$/, '');

            if (!dict[w]) dict[w] = [];
            dict[w].push(words.slice(1));
        }
    });
};

function active (ws) {
    // active rhyming region: slice off the leading consonants
    for (
        var i = 0;
        i < ws.length && ws[i].match(/^[^AEIOU]/i);
        i++
    );
    return ws.slice(i).join(' ');
}
