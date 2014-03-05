/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap/cjs/Button');
var FinderResults = require('../chord_finder/list').FinderResults;
var Chord = require('../chords/chord');


var ChordBuilder = React.createClass({

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
      }
    },

    handleKeyClick: function(keyname, display_name) {
      var chord = new Chord({
        path: keyname + '.major',
        voicing: this.chord_data[keyname].major
      });
      //TODO handle multiple results
      this.setState({
        key: keyname,
        result: [chord],
        resultTitle: chord.long_name()
      });
      this.props.app.foundChord(chord);
      return false;
    },

    render: function() {
        return (
            <div className="row">

              {/* Key selector buttons */}
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


              <FinderResults
                app={this.props.app}
                keyName={this.state.key}
                resultTitle={this.state.resultTitle}
                result={this.state.result} />
            </div>
        );
    }

});

module.exports = ChordBuilder;
