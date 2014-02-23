/** @jsx React.DOM */

var React = require('react');


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

    //TODO make percentage based
    var openMutedHeight = 30;

    var colWidth = this.props.width / strings.length;
    var stringOffset = colWidth / 2;
    var fretHeight = (this.props.height - openMutedHeight) / frets.length;
    //TODO make percentage based
    var textTopOffset = 20;
    var textRightOffset = 5;

    return (
      <svg height={this.props.height} width={this.props.width} version="1.1" xmlns="http://www.w3.org/2000/svg" >

        {/* open / muted indicators */}
        {strings.map(function(string, i){
          if (string.fret == 'open' || string.fret == 'muted'){
            return (
              <text
                x={(stringOffset + (5-i)*colWidth) - textRightOffset}
                y={textTopOffset}>
              {string.fret == 'open' ? 'O' : 'X'}
              </text>);
          }
        }, this)}

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
              x2={this.props.width - stringOffset}
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
              <circle
                cx={stringOffset + (5-i)*colWidth}
                cy={openMutedHeight + (fret*fretHeight - fretHeight/2)}
                r="30"
                key={i}>
              </circle>
            );
          }
        }, this)}

      </svg>
    );
  }
});

module.exports = ChordDiagram;
