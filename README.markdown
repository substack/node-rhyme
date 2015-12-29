rhyme-plus
=====

A rhyming dictionary for your node.js.

example
=======

    var rhyme = require('rhyme-plus');
    rhyme(function (r) {
        console.log(r.rhyme('bed').join(' '));
    });

output:

    $ node examples/bed.js
    BLED BREAD BRED DEAD DREAD DRED DREDD ED FED FLED FREAD FRED FREDA GED HEAD
    JED LEAD LED MED NED NEDD PLED READ READE RED REDD SAID SCHWED SFFED SHEAD
    SHED SHEDD SHRED SLED SLEDD SPED SPREAD STEAD SWED SZWED TED THREAD TREAD
    WED WEDD WEHDE ZED


example2
=======

    var rhyme = require('rhyme-plus');
    rhyme(function (r) {
        console.log(JSON.stringify(r.findRhymes(['bed', 'read', 'feed'])));
    });

output:

    $ node examples/bed.js
    [['BED', 'READ'], ['READ', 'FEED']]

methods
=======

rhyme(callback)
---------

Read in the rhyme database. Callback function gets called with the rhyme handle.

rhyme handle
============

r.rhyme(word)
-------------

Returns all rhymes for `word`.

r.pronounce(word)
-----------------

Shows how to pronounce `word` using
[CMU's pronouncing dictionary phonemes
](http://www.speech.cs.cmu.edu/cgi-bin/cmudict).

r.syllables(word)
-----------------

Counts the syllables in `word` using the phonemes in `r.pronounce` and some
heuristics.

r.alliteration(word)
-----------------

Returns alliterative words, which begin with the same syllable as `word`.

r.doRhyme(word1, word2)
-----------------

Returns whether these words could rhyme (for example: read and feed, read and fed).

r.findRhymes(words)
-----------------

Searches the words array for pairs of rhyming words. Returns an array of pairs.

installation
============

Using [npm](http://npmjs.org):

    npm install rhyme-plus

testing
============

Download rhyming dictionary using ```cd data && ./fetch.sh```
