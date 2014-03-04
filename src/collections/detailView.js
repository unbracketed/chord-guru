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
                      <div className="col-md-3">
                        <ChordDiagram chord_data={chord}
                            width={250}
                            key={'chord-diagram-'+idx} />
                        <p>{chord.long_name()}</p>
                      </div>
                  );
                }, this)}
              </div>
            </div>
        );
    }
});

