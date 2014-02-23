/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap/cjs/Button');
var ChordDiagram = require('./chord_diagram.js')


var ChordResults = React.createClass({

  render: function(){
    if (this.props.result){
      return (
        <ChordDiagram
          chord_data={this.props.result}
          height={500}
          width={600} />
      );
    }
    else {
      return (<div className="row"></div>);
    }
  }
});


module.exports = ChordResults;
