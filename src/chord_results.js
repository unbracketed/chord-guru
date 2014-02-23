/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap/cjs/Button');
var ChordDiagram = require('./chord_diagram.js')


var ChordResults = React.createClass({

  render: function(){

      var test = [500, 450, 400, 300, 200, 100, 75, 50, 25];
      return (<div>{test.map(function(a, i){

        return (<div>{this.props.result ?
        <ChordDiagram
          chord_data={this.props.result}
          width={a}
          key={i} />
          : <div></div>}</div>
        );

        }, this)});
      </div>);
  }
});


module.exports = ChordResults;
