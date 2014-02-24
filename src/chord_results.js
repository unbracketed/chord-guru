/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap/cjs/Button');
var ChordDiagram = require('./chord_diagram.js')


var ChordResults = React.createClass({

  render: function(){
    if (this.props.result)
      return (
          <ChordDiagram
            chord_data={this.props.result}
            width={500}
          />
      );
    else {
      return (<div/>);
    }
  }
});


module.exports = ChordResults;
