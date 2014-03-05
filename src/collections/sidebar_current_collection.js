/** @jsx React.DOM */

var React = require('react');
var Nav = require('react-bootstrap/cjs/Nav');
var NavItem = require('react-bootstrap/cjs/NavItem');

var ChordDiagram = require('../chords/diagram');


module.exports = React.createClass({
  render: function(){
    if (this.props.app.currentCollection){
      return (
        <div className="row">
          <h2>Current Collection</h2>
          {this.props.app.currentCollection.items.map(function(chord, i){
            return(
              <div className="col-md-4">
                <ChordDiagram
                  chord_data={chord}
                  width={100} />
              </div>
            );
          }, this)}
        </div>
      );
    } else {
      return <div/>;
    }
  }
});
