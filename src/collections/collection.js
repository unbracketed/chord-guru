function ChordCollection(collectionObj) {
    this.name = collectionObj.name;
    this.items = collectionObj.items;
}

ChordCollection.prototype.name = '';
ChordCollection.prototype.items = [];

ChordCollection.prototype.getName = function() {
    return this.name ? this.name : "";
};

module.exports = ChordCollection;