/** @jsx React.DOM */

var React = require('react');
var Nav = require('react-bootstrap/cjs/Nav');
var NavItem = require('react-bootstrap/cjs/NavItem');


var ChordCollections = React.createClass({
  render: function(){
    var infoStyle = this.props.collections.length ? {display: 'none'} : {};
    return (
      <div className="col-md-4">
        <h2>Collections</h2>
        <p style={infoStyle}>Create collections of chords for study, practice, or reference</p>
        <Nav bsStyle="pills" bsVariation="stacked" activeKey={1} onSelect={this.handleSelect}>
        {this.props.collections.map(function(coll, i){
          return(<NavItem key={1} title={coll.name}>{coll.name}</NavItem>);
        }, this)}
      </Nav>
      </div>
    );
  }
});

module.exports = ChordCollections;
