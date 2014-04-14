/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap/cjs/Button');
var FinderResults = require('../finder_results');
var Chord = require('../../chords/chord');


var ChordBuilder = React.createClass({

    //TODO deprecate display_name
    // guitar data
    chord_data: {
      A: {
        display_name: 'A',
        major: [
          'X-0-2-2-2-0:001110',
        ],
        minor: [
          'X-0-2-2-1-0'
        ]
      },
      Bflat: {
        display_name: 'A♯ / B♭',
        major: [
          'X-X-0-3-3-1:000341'
        ]
      },
      B: {
        display_name: 'B',
        major: [
          'X-2-4-4-4-2:113331'
        ]
      },
      C: {
        display_name: 'C',
        major: [
          'X-3-2-0-1-0:032010'
        ]
      },
      Csharp: {
        display_name: 'C♯ / D♭',
        major: [
          'X-4-3-1-2-1:043121'
        ]
      },
      D: {
        display_name: 'D',
        major: [
          'X-X-0-2-3-2'
        ]
      },
      Eflat: {
        display_name: 'D♯ / E♭',
        major: [
          'X-X-1-3-4-3:001243'
        ]
      },
      E:  {
        display_name: 'E',
        major: [
          '0-2-2-1-0-0'
        ],
        minor: [
          '0-2-2-0-0-0'
        ],
        seventh: [
          '0-2-2-1-3-0'
        ]
      },
      F: {
        display_name: 'F',
        major: [
          '1-3-3-2-1-1'
        ]
      },
      Fsharp: {
        display_name: 'F♯ / G♭',
        major: [
          '2-4-4-3-2-2:134211'
        ]
      },
      G: {
        display_name: 'G',
        major: [
          '3-2-0-0-0-3'
        ]
      },
    },

    getInitialState: function(){
      return {
        result: "",
        key: "",
        chord_type: "major"
      };
    },

    getDefaultProps: function() {
      return {
        chord_path: null
      };
    },

    componentDidMount: function() {
      console.log('ChordBuilder mounted');
      console.log(this.props);
      console.log(this.state);
    },

    componentWillReceiveProps: function(nextProps) {
      console.log('ChordBuilder will receive props');
      console.log(nextProps);
    },

    handleKeyClick: function(keyname, display_name) {
      //TODO cancel event

      console.log('handleKeyClick: ' + keyname + ' ' + display_name);

      var chord = this.resolveChord(keyname, this.state.chord_type);
      //TODO handle multiple results
      this.setState({
        key: keyname,
        result: chord ? [chord] : "no data",
        resultTitle: chord ? chord.long_name() : "No data yet"
      });

      if (chord){
        this.props.app.foundChord(chord);
      }
      return false;
    },

    handleChordTypeClick: function(chord_type, event) {
      event.preventDefault();
      console.log('handleChordTypeClick: ' + chord_type);
      var chord = this.resolveChord(this.state.key, chord_type);
      this.setState({
        chord_type: chord_type,
        result: chord ? [chord] : "no data",
        resultTitle: chord ? chord.long_name() : "No data yet"
      });
      if (chord){
        this.props.app.foundChord(chord);
      }
    },

    resolveChord: function(keyname, chord_type) {
      console.log('resolveChord ' + keyname + ' ' + chord_type);
      var normalized_type = chord_type.toLowerCase();
      var chord_path = keyname + '.' + chord_type;
      var voicing = this.chord_data[keyname][normalized_type];
      if (typeof voicing == 'undefined'){
        return false;
      }
      else {
        var chord = new Chord({
          path: chord_path,
          voicing: this.chord_data[keyname][chord_type]
        });
        return chord;
      }
    },

    chord_from_path: function(path){
      console.log('Builder.chord_from_path: '+path);
      var parts = path.split('.');
      var voicing = this.chord_data[parts[0]][parts[1]];
      return new Chord({path: path, voicing: voicing});
    },

    render: function() {

        console.log('Rendering chord builder with state:');
        console.log(this.state);

        // if we only have a chord path, use that
        var chord;
        var resultTitle;
        if (this.props.chord_path && !this.state.result){
          console.log("Builder - converting chord_path " + this.props.chord_path);
          chord = [this.chord_from_path(this.props.chord_path)];
          resultTitle = chord[0].long_name();
        } else {
          chord = this.state.result;
          resultTitle = this.state.resultTitle;
        }

        var buttonClass = "btn btn-default";

        return (
          <div className="row">
            <div className="col-md-12">

              <div className="row">
                {/* Key selector buttons */}
                <div className="col-md-12">
                  {Object.keys(this.chord_data).map(function(keyname, i) {
                    var className = "btn btn-default";
                    if (this.state.key == keyname){
                      className = "btn btn-primary";
                    }
                    var display_name = this.chord_data[keyname].display_name;
                    return (
                      <Button
                        onClick={this.handleKeyClick.bind(this, keyname, display_name)}
                        className={className}
                        key={i}>
                        {display_name}
                      </Button>
                    );
                  }, this)}
                </div>
              </div>

              {/* chord type selectors */}
              <div className="row">
                <div className="col-md-12">
                  {[['major', 'Major'], ['minor', 'Minor'], ['seventh', '7th']].map(function(chordType, i){
                    return (
                      <Button
                        className={this.state.chord_type == chordType[0] ? 'btn btn-primary' : buttonClass}
                        onClick={this.handleChordTypeClick.bind(this, chordType[0])}>
                        {chordType[1]}
                      </Button>
                    );
                  }, this)}
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <FinderResults
                    app={this.props.app}
                    keyName={this.state.key}
                    resultTitle={resultTitle}
                    result={chord} />
                </div>
              </div>
            </div>
          </div>
      );
    }

});

module.exports = ChordBuilder;
