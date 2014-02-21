/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap/cjs/Button');


var ChordResults = React.createClass({

  render: function(){
    // Don't escape the SVG
    if (this.props.result){
      return (
        <div>
          <div dangerouslySetInnerHTML={{__html: this.props.result}}></div>
          <Button
            onClick={this.props.app.addToCurrentCollection.bind(null, this.props.name, this.props.fingering)}
          >Add to New Collection</Button>
        </div>
      );
    }
    else {
      return (<div className="row"></div>);
    }
  }
});

module.exports = ChordResults;
