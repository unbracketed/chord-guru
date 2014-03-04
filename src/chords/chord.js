function Chord(chordData){
    this.path = chordData.path;
    this.voicing = chordData.voicing;
}

Chord.prototype.keymap = {
    A: 'A',
    Asharp: 'A#/Bb',
    B: 'B',
    C: 'C',
    Csharp: 'C#/Db',
    D: 'D',
    Dsharp: 'D#/Eb',
    E: 'E',
    F: 'F',
    Fsharp: 'F#/Gb',
    G: 'G',
    Gsharp: 'G#/Ab'
};

Chord.prototype.names = {
    major: {short: '', long: 'major'},
    minor: {short: 'm', long: 'minor'}
};

Chord.prototype.short_name = function(){
    var parts = this.path.split('.');
    var key = parts[0];
    var mod = this.names[parts[1]].short;

    var shortName = this.keymap[key];
    if (mod){
        shortName.concat(mod);
    }
    return shortName;
};

Chord.prototype.long_name = function(){
    var parts = this.path.split('.');
    var key = parts[0];
    var mod = this.names[parts[1]].long;

    var longName = this.keymap[key];
    if (mod){
        longName.concat(' ');
        longName.concat(mod);
    }
    return longName;
};

module.exports = Chord;
