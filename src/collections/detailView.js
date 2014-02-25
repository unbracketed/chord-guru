/** @jsx React.DOM */

var React = require('react');
var ChordDiagram = require('../chords/diagram');

module.exports = React.createClass({
    render: function(){
        return(
            <div className="row">
              <h2>{this.props.currentCollection.name}</h2>
              <div>
                {this.props.currentCollection.items.map(function(chord, idx){
                  return (
                      <ChordDiagram chord_data={chord}
                          width={500}
                          key={'chord-diagram-'+idx} />
                  );
                }, this)}
              </div>
            </div>
        );
    }
});

