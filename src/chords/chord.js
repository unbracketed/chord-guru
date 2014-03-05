function Chord(chordData){
    this.path = chordData.path;
    this.voicing = chordData.voicing;
}

Chord.prototype.keymap = {
    A: 'A',
    Bflat: 'A♯/B♭',
    B: 'B',
    C: 'C',
    Csharp: 'C♯/D♭',
    D: 'D',
    Eflat: 'D♯/E♭',
    E: 'E',
    F: 'F',
    Fsharp: 'F♯/G♭',
    G: 'G',
    Gsharp: 'G♯/A♭'
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
        shortName = shortName.concat(mod);
    }
    return shortName;
};

Chord.prototype.long_name = function(){
    var parts = this.path.split('.');
    var key = parts[0];
    var mod = this.names[parts[1]].long;

    var longName = this.keymap[key];
    if (mod){
        longName = longName.concat(' ');
        longName = longName.concat(mod);
    }
    return longName;
};

Chord.prototype.asJSON = function(){
    return {path: this.path, voicing: this.voicing};
};

module.exports = Chord;
