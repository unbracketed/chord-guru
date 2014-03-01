function ChordCollection(collectionObj) {
    this.name = collectionObj.name;
    this.items = collectionObj.items;
}

ChordCollection.prototype.name = '';
ChordCollection.prototype.items = [];

ChordCollection.prototype.getName = function() {

    if (this.name){
        return this.name;
    }
    //construct name from chords
    var chordNames = this.items.map(function(item){return item.chordPath;});
    return chordNames.join('-');
};

module.exports = ChordCollection;