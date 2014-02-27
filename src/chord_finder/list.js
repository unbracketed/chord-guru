/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap/cjs/Button');
var ChordDiagram = require('../chords/diagram')


var FinderResults = React.createClass({

  render: function(){
    if (this.props.result){
      return (
        <div>
          <h2>{this.props.resultTitle}</h2>
          <ResultList
            app={this.props.app}
            chord_list={this.props.result} />
        </div>
      );
    }
    else {
      return (<div/>);
    }
  }
});



var ResultList = React.createClass({
  getDefaultProps: function(){
    return {
      footer: false
    }
  },

  render: function(){
    return (
      <div>
        {this.props.chord_list.map(function(chord, idx){
          return(
            <div>
              <ChordDiagram
                chord_data={chord}
                width={500}
                key={'chord-diagram-'+idx} />
                <Button onClick={this.props.app.addToCurrentCollection.bind(null, chord)}>Add to Collection</Button>
            </div>
          );
        } ,this)}
      </div>
    );
  }
});

exports.FinderResults = FinderResults;
exports.ResultList = ResultList;
