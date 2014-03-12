/** @jsx React.DOM */

var React = require('react');


var ChordDiagram = React.createClass({

  getDefaultProps: function(){
    return {
      showLabel: true
    }
  },

  getFret: function(info){
    if (info == '0' || info == 'X')
      return false;
    return parseInt(info, 10);
  },

  render: function(){

    var _info = this.props.chord_data.voicing[0];
    parts = _info.split(":");
    var frets_info = parts[0];
    var strings = frets_info.split('-');

    //TODO determine from data
    var frets = [1,2,3,4];

    var width = this.props.width;
    var colWidth = width / strings.length;
    var fretHeight = colWidth;
    var openMutedHeight = fretHeight * 0.5;
    var labelHeight = fretHeight * 2;
    var fretboardBottom = frets.length * fretHeight + openMutedHeight;
    var height = fretboardBottom + (this.props.showLabel ? labelHeight : 0);
    var stringOffset = colWidth / 2;
    //TODO make percentage based
    var textTopOffset = openMutedHeight * 0.5;
    var textRightOffset = 5;

    var radius = (colWidth/2) * 0.75;
    var openRadius = openMutedHeight * 0.3;
    var openMutedStrokeWidth = width > 100 ? 2 : 1;

    var label = this.props.showLabel ? (<text className="diagram-bottom-label" x={width/2} y={height-(labelHeight/2)}>{this.props.chord_data.short_name()}</text>) : '';

    return (
      <svg height={height} width={width} version="1.1" xmlns="http://www.w3.org/2000/svg" >

        {/* open / muted indicators */}
        {strings.map(function(string, i){
          if (string == '0' || string == 'X'){
            if (string == '0'){
              return (
                <circle
                  className="open-string"
                  cx={stringOffset + i*colWidth}
                  cy={openMutedHeight / 2}
                  r={openRadius}
                  strokeWidth={openMutedStrokeWidth}
                  key={'open-' + i}>
                </circle>
              );
            }
            else {
              return (<g>
                <line
                  className="muted-string"
                  strokeWidth={openMutedStrokeWidth}
                  x1={(stringOffset + i*colWidth)-openRadius}
                  x2={(stringOffset + i*colWidth)+openRadius}
                  y1={openMutedHeight/2 - openRadius}
                  y2={openMutedHeight/2 + openRadius}>
                </line>
                <line
                  className="muted-string"
                  strokeWidth={openMutedStrokeWidth}
                  x1={(stringOffset + i*colWidth)+openRadius}
                  x2={(stringOffset + i*colWidth)-openRadius}
                  y1={openMutedHeight/2 - openRadius}
                  y2={openMutedHeight/2 + openRadius}>
                </line>
              </g>);
            }
          }
        }, this)}

        {/* fretboard background */}
        <rect
          className="fretboard-background"
          x={stringOffset}
          y={openMutedHeight}
          width={width-stringOffset*2}
          height={frets.length * fretHeight}>
        </rect>

        {/* strings */}
        {strings.map(function(string, i){
          return(
            <line
              className="string-line"
              x1={stringOffset + (i*colWidth)}
              x2={stringOffset + (i*colWidth)}
              y1={openMutedHeight}
              y2={fretboardBottom}
              key={i}>
            </line>
          );
        }, this)}

        {/* frets */}
        {frets.map(function(fret, i){
          return(
            <line
              className="fret-line"
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
                className="finger-mark"
                cx={stringOffset + (i)*colWidth}
                cy={openMutedHeight + (fret*fretHeight - fretHeight/2)}
                r={radius}
                key={i}>
              </circle>
            );
          }
        }, this)}

        {/* label */}
        {label}
      </svg>
    );
  }
});

module.exports = ChordDiagram;
