rhyme
=====

A rhyming dictionary for your node.js.

example
=======

    var rhyme = require('rhyme');
    rhyme(function (r) {
        console.log(r.rhyme('bed').join(' '));
    });

output:

    $ node examples/bed.js
    BLED BREAD BRED DEAD DREAD DRED DREDD ED FED FLED FREAD FRED FREDA GED HEAD
    JED LEAD LED MED NED NEDD PLED READ READE RED REDD SAID SCHWED SFFED SHEAD
    SHED SHEDD SHRED SLED SLEDD SPED SPREAD STEAD SWED SZWED TED THREAD TREAD
    WED WEDD WEHDE ZED

methods
=======

rhyme(cb)
---------

Read in the rhyme database. `cb` gets called with the rhyme handle.

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

installation
============

Using [npm](http://npmjs.org):

    npm install rhyme
