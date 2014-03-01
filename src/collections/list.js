/** @jsx React.DOM */

var React = require('react');
var Nav = require('react-bootstrap/cjs/Nav');
var NavItem = require('react-bootstrap/cjs/NavItem');

var ChordDiagram = require('../chords/diagram');


module.exports = React.createClass({
  render: function(){
    var infoStyle = this.props.collections.length ? {display: 'none'} : {};
    return (
      <div className="row">
        <h2>Current Collection</h2>
        <p style={infoStyle}>Create collections of chords for study, practice, or reference</p>
        <Nav bsStyle="pills" bsVariation="stacked" activeKey={'collection-0'} onSelect={this.handleSelect}>
          {this.props.collections.map(function(coll, i){
            return(
              <div className="row">
              <NavItem
                key={'collection-'+i}
                title={coll.name}
                onClick={this.props.app.showCollectionDetail.bind(null, coll)}
              >
                {coll.name ? coll.getName() : ""}
              </NavItem>
              <div className="row">
                {coll.items.map(function(chord, idx){
                  return (
                    <div className="col-md-4">
                      <ChordDiagram
                        chord_data={chord}
                        width={100} />
                        <p>{chord.chordPath}</p>
                    </div>
                  );
                }, this)}
              </div>
            </div>);
          }, this)}
        </Nav>
      </div>
    );
  }
});
