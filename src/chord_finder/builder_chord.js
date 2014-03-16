/**
 * @jsx React.DOM
 */


 var React = require('react');
 var ChordDiagram = require('../chords/diagram');

 var BuilderChord = React.createClass({

    getDefaultProps: function() {
      return {
        width: 75
      };
    },

    handleClick: function(chord) {
        // go to builder for chord
        this.props.app.foundChord(chord);
    },

   render: function() {
     return (
        <div className="col-md-4" onClick={this.handleClick.bind(null, this.props.chord)}>
            <ChordDiagram
                chord_data={this.props.chord}
                width={this.props.width} />
        </div>
     );
   }

 });

 module.exports = BuilderChord;