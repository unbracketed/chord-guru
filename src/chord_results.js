/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap/cjs/Button');


var ChordResults = React.createClass({

  render: function(){
    if (this.props.result){
      return <ChordDiagram chord_data={this.props.result} />;
    }
    else {
      return (<div className="row"></div>);
    }
  }
});

var ChordDiagram = React.createClass({

  getFret: function(info){
    if (info.fret == 'open' || info.fret == 'muted')
      return false;
    return parseInt(info.fret, 10);
  },

  render: function(){

    var strings = this.props.chord_data.fingerings[0];
    //TODO determine from data
    var frets = [1,2,3,4];

    //TODO these should be determined from props
    var width = 400;
    var height = 400;
    var openMutedHeight = 30;

    var colWidth = width / strings.length;
    var stringOffset = colWidth / 2;
    var fretHeight = (height - openMutedHeight) / frets.length;

    return (
      <svg height={400} width={height} version="1.1" xmlns="http://www.w3.org/2000/svg" >

        {/* open / muted indicators */}
        <text x="0" y="20">X</text><text x="500" y="20">O</text>
        <text x="300" y="20">O</text>

        {/* strings */}
        {strings.map(function(string, i){
          return(
            <line
              stroke="black"
              x1={stringOffset + (i*colWidth)}
              x2={stringOffset + (i*colWidth)}
              y1="30"
              y2="400"
              key={i}>
            </line>
          );
        }, this)}

        {/* frets */}
        {frets.map(function(fret, i){
          return(
            <line
              stroke="black"
              x1={stringOffset}
              x2={width - stringOffset}
              y1={openMutedHeight + i*fretHeight}
              y2={openMutedHeight + i*fretHeight}>
            </line>
          );
        }, this)}

        {/* finger down marks */}
        {strings.map(function(string, i){
          var fret = this.getFret(string);
          if (fret){
            return (
              <circle cx={stringOffset + (5-i)*colWidth} cy={openMutedHeight + (fret*fretHeight - fretHeight/2)} r="30" key={i}></circle>
            );
          }
        }, this)}
      </svg>
    );
  }
});

module.exports = ChordResults;
