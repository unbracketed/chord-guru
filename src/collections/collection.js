var Chord = require('../chords/chord');

function ChordCollection(collectionObj) {
    this.id = collectionObj.id;
    this.name = collectionObj.name;
    this.items = collectionObj.items.map(function(data){return new Chord(data);});
}

ChordCollection.prototype.name = '';
ChordCollection.prototype.items = [];

ChordCollection.prototype.getName = function() {

    if (this.name){
        return this.name;
    }
    //construct name from chords
    var chordNames = this.items.map(function(item){return item.short_name();});
    return chordNames.join('-');
};

module.exports = ChordCollection;