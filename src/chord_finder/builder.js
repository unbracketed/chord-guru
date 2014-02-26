/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap/cjs/Button');
var FinderResults = require('../chord_finder/list').FinderResults;


var ChordBuilder = React.createClass({

    // guitar data
    // TODO unicode flat/sharp
    chord_data: {
      A: {
        display_name: 'A',
        major: [
          '02220X-011100',
        ],
        minor: [
          '01220X'
        ]
      },
      Bflat: {
        display_name: 'A#/Bb',
        major: [
          '1330XX-143000'
        ]
      },
      B: {
        display_name: 'B',
        major: [
          '24442X-133311'
        ]
      },
      C: {
        display_name: 'C',
        major: [
          '01023X-010230'
        ]
      },
      Csharp: {
        display_name: 'C#/Db',
        major: [
          '12134X-121340'
        ]
      },
      D: {
        display_name: 'D',
        major: [
          '2320XX'
        ]
      },
      Eflat: {
        display_name: 'D#/Eb',
        major: [
          '3431XX-342100'
        ]
      },
      E:  {
        display_name: 'E',
        major: [
          '001220'
        ]
      },
      F: {
        display_name: 'F',
        major: [
          '112331'
        ]
      },
      Fsharp: {
        display_name: 'F#/Gb',
        major: [
          '223442-112431'
        ]
      },
      G: {
        display_name: 'G',
        major: [
          '300023'
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
      this.setState({
        key: keyname,
        result: [{
          chordPath: keyname + '.major',
          voicing: this.chord_data[keyname].major
        }],
        resultTitle: display_name+" Major"
      });
      return false;
    },

    render: function() {
        return (
            <div className="row">
              {Object.keys(this.chord_data).map(function(keyname, i) {
                var display_name = this.chord_data[keyname].display_name;
                return (
                  <Button onClick={this.handleKeyClick.bind(this, keyname, display_name)} key={i}>{display_name}</Button>
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
