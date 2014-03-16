/**
 * @jsx React.DOM
 */

 var React = require('react');
 var BuilderChord = require('../chord_finder/builder_chord');

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
          <div className="row">
            <h2>Recent Chords</h2>
            {recent.map(function(chord, idx){
              return <BuilderChord app={this.props.app} chord={chord} width={75}/>;
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
