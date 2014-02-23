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

    var width = this.props.width;
    var colWidth = width / strings.length;
    var fretHeight = colWidth;
    var openMutedHeight = fretHeight * 0.5;
    var height = frets.length * fretHeight + openMutedHeight;
    var stringOffset = colWidth / 2;
    //TODO make percentage based
    var textTopOffset = openMutedHeight * 0.5;
    var textRightOffset = 5;

    var radius = (colWidth/2) * 0.75;
    var openRadius = openMutedHeight * 0.3;
    var openMutedStrokeWidth = width > 100 ? 2 : 1;

    return (
      <svg height={height} width={width} version="1.1" xmlns="http://www.w3.org/2000/svg" >

        {/* open / muted indicators */}
        {strings.map(function(string, i){
          if (string.fret == 'open' || string.fret == 'muted'){
            if (string.fret == 'open'){
              return (
                <circle
                cx={stringOffset + (5-i)*colWidth}
                cy={openMutedHeight / 2}
                r={openRadius}
                fill='white'
                stroke='black'
                strokeWidth={openMutedStrokeWidth}
                key={'open-' + i}>
              </circle>
              );
            }
            else {
              return (<g>
                <line
                  stroke="black"
                  strokeWidth={openMutedStrokeWidth}
                  x1={(stringOffset + (5-i)*colWidth)-openRadius}
                  x2={(stringOffset + (5-i)*colWidth)+openRadius}
                  y1={openMutedHeight/2 - openRadius}
                  y2={openMutedHeight/2 + openRadius}>
                </line>
                <line
                  stroke="black"
                  strokeWidth={openMutedStrokeWidth}
                  x1={(stringOffset + (5-i)*colWidth)+openRadius}
                  x2={(stringOffset + (5-i)*colWidth)-openRadius}
                  y1={openMutedHeight/2 - openRadius}
                  y2={openMutedHeight/2 + openRadius}>
                </line>
              </g>);
            }
          }
        }, this)}

        {/* strings */}
        {strings.map(function(string, i){
          return(
            <line
              stroke="black"
              x1={stringOffset + (i*colWidth)}
              x2={stringOffset + (i*colWidth)}
              y1={openMutedHeight}
              y2={height}
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
              <circle
                cx={stringOffset + (5-i)*colWidth}
                cy={openMutedHeight + (fret*fretHeight - fretHeight/2)}
                r={radius}
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
