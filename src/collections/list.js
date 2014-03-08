/** @jsx React.DOM */

var React = require('react');
var Nav = require('react-bootstrap/cjs/Nav');
var NavItem = require('react-bootstrap/cjs/NavItem');

var ChordDiagram = require('../chords/diagram');

/*
  Shows a list of user's chord collections
*/
module.exports = React.createClass({

  render: function(){

    var infoStyle = this.props.app.userCollections.length ? {display: 'none'} : {};

    return (
      <div className="row">
        <h2>Collections</h2>
        <p style={infoStyle}>Create collections of chords for study, practice, or reference</p>
        {this.props.app.userCollections.map(function(coll, i){
          return(
            <div className="row">
              <div className="col-md-2">
                <a href="#"
                  onClick={this.props.app.showCollectionDetail.bind(null, coll)}>
                {coll.getName()}
                </a>
              </div>
              {coll.items.map(function(chord, idx){
                return (
                  <div className="col-md-1">
                    <ChordDiagram
                      chord_data={chord}
                      width={100} />
                  </div>
                );
              }, this)}
            </div>
          );
        }, this)}
      </div>
    );
  }


});
