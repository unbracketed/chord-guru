/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap/cjs/Button');
var ChordDiagram = require('../chords/diagram')


var ResultList = React.createClass({

  getDefaultProps: function(){
    return {
      footer: false,
      chord_list: []
    }
  },

  render: function(){

    var newCollectionText = this.props.app.userCollections.length ? "Add to New Collection" : "Start a Collection";

    return (
      <div className="row">
        {this.props.chord_list.map(function(chord, idx){

          var addToCurrentCollection = (
            <p>
              <Button
                onClick={this.props.app.addToCurrentCollection.bind(null, chord)}>Add to Current Collection
              </Button>
            </p>);

          return(
            <div className="col-md-8 col-md-offset-2">
              <ChordDiagram
                chord_data={chord}
                width={500}
                showLabel={false}
                key={'chord-diagram-'+idx} />
              {this.props.app.currentCollection ? addToCurrentCollection : ""}
              <p>
                <Button onClick={this.props.app.addToNewCollection.bind(null, chord)}>{newCollectionText}</Button>
              </p>

            </div>
          );
        } ,this)}
      </div>
    );
  }
});

module.exports = ResultList;
