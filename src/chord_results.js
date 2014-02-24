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
          <ChordList
            chord_list={this.props.result}/>
        </div>
      );
    }
    else {
      return (<div/>);
    }
  }
});


var ChordList = React.createClass({
  render: function(){
    return (
      <div>
        {this.props.chord_list.map(function(chord, idx){
          return(<ChordDiagram
            chord_data={chord}
            width={500}
            key={'chord-diagram-'+idx} />);
        } ,this)}
      </div>
    );
  }
});

module.exports = ChordResults;
