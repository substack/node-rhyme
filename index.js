var fs = require('fs');
var Lazy = require('lazy');
var Hash = require('hashish');

var dictFile = __dirname + '/data/cmudict.0.7a';

module.exports = function (cb) {
    var self = {};
    var dict = {};
    
    self.pronounce = function (word) {
        return dict[word.toUpperCase()];
    };

    self.syllables = function (word) {
        var pro = self.pronounce(word)[0];
        
        var cs = pro.filter(function(ph) {
            return ['A', 'E', 'I', 'O', 'U'].every(function(l) {
                return l != ph[0];
            });
        });

        return Math.ceil((cs.length + (cs[cs.length - 1] == 'Z' ? -1 : 0)) / 2);

    }
    
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
    
    var s = fs.createReadStream(dictFile);
    
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
