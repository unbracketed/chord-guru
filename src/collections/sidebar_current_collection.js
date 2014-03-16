/** @jsx React.DOM */

var React = require('react');
var Nav = require('react-bootstrap/cjs/Nav');
var NavItem = require('react-bootstrap/cjs/NavItem');

var BuilderChord = require('../chord_finder/builder_chord');


module.exports = React.createClass({
  render: function(){
    if (this.props.app.currentCollection){
      return (
        <div className="row">
          <h2>Current Collection</h2>
          {this.props.app.currentCollection.items.map(function(chord, i){
            return(
              <BuilderChord
                app={this.props.app}
                chord={chord}
                width={100} />
            );
          }, this)}
        </div>
      );
    } else {
      return <div/>;
    }
  }
});
