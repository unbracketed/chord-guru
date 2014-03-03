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
            chord_list={this.props.result}
          />
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
    var newCollectionText = this.props.app.userCollections.length ? "Add to New Collection" : "Start a Collection";
    return (
      <div>
        {this.props.chord_list.map(function(chord, idx){

          var addToCurrentCollection = (
            <Button
              onClick={this.props.app.addToCurrentCollection.bind(null, chord)}
            >
              Add to Current Collection
            </Button>);

          return(
            <div>
              <ChordDiagram
                chord_data={chord}
                width={500}
                key={'chord-diagram-'+idx} />
              <p>
                {this.props.app.currentCollection ? addToCurrentCollection : ""}
                <Button onClick={this.props.app.addToNewCollection.bind(null, chord)}>{newCollectionText}</Button>
              </p>
            </div>
          );
        } ,this)}
      </div>
    );
  }
});

exports.FinderResults = FinderResults;
exports.ResultList = ResultList;
