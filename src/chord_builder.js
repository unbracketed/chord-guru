/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap/cjs/Button');
var ChordResults = require('./chord_results');


var ChordBuilder = React.createClass({

    keys: ['A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab'],

    getInitialState: function(){
      return {
        result: "",
        key: "",
        fingering: 0,
      }
    },

    handleKeyClick: function(keyname) {
        var component = this;
        $.get('assets/chord_data/guitar/chords/' + keyname + '.json', function(data, textStatus, jqXHR){
            component.setState({
              result: data,
              fingering: 1,
              key: keyname
            });
        }, 'json');
        return false;
    },

    render: function() {
        return (
            <div className="col-md-8">
              {this.keys.map(function(keyname, i) {
                return (
                  <Button onClick={this.handleKeyClick.bind(this, keyname)} key={i}>{keyname}</Button>
                );
              }, this)}
              <ChordResults
                app={this.props.app}
                name={this.state.key}
                fingering={this.state.fingering}
                result={this.state.result} />
            </div>
        );
    }

});

module.exports = ChordBuilder;
