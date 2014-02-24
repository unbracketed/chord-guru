/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap/cjs/Button');
var ChordDiagram = require('./chord_diagram.js')


var ChordResults = React.createClass({

  render: function(){
    if (this.props.result){
      var footer = <Button onClick={this.props.app.addToCurrentCollection}>Add to Collection</Button>;
      return (
        <div>
          <h2>{this.props.resultTitle}</h2>
          <ChordList
            chord_list={this.props.result}
            footer={footer}/>
        </div>
      );
    }
    else {
      return (<div/>);
    }
  }
});


var ChordList = React.createClass({
  getDefaultProps: function(){
    return {
      footer: false
    }
  },

  render: function(){
    return (
      <div>
        {this.props.chord_list.map(function(chord, idx){
          var footer = this.props.footer;
          if (footer){
            footer.props.onClick.bind(null, chord);
          }
          return(
            <div>
              <ChordDiagram
                chord_data={chord}
                width={500}
                key={'chord-diagram-'+idx} />
              {footer}
            </div>
          );
        } ,this)}
      </div>
    );
  }
});

module.exports = ChordResults;
