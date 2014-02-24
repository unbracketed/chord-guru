/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap/cjs/Button');
var ChordDiagram = require('./chord_diagram.js')


var ChordResults = React.createClass({

  render: function(){
    if (this.props.result){
      return (
        <div>
          <h2>{this.props.resultTitle}</h2>
          <ChordDiagram
            chord_data={this.props.result}
            width={500}
          />
        </div>
      );
    }
    else {
      return (<div/>);
    }
  }
});


module.exports = ChordResults;
