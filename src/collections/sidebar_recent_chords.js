/**
 * @jsx React.DOM
 */

 var React = require('react');
 var ChordDiagram = require('../chords/diagram');

 var RecentChords = React.createClass({

    getDefaultProps: function() {
      return {
        recent_chords: []
      };
    },

    render: function() {
      if (this.props.recent_chords.length > 1){
        var recent = this.props.recent_chords.slice(0);
        recent = recent.reverse().slice(1);
        return (
          <div>
            <h2>Recent Chords</h2>
            {recent.map(function(chord, idx){
              return(
                <ChordDiagram
                chord_data={chord}
                width={75}
                key={'chord-diagram-'+idx} />
              );
            }, this)}
          </div>
        );
      }

     return (
       <div />
     );
   }
 });

module.exports = RecentChords;
