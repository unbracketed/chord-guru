/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap/cjs/Button');


var ChordResults = React.createClass({

  render: function(){
    // Don't escape the SVG
    if (this.props.result){
      // return (
      //   <div>
      //     <div dangerouslySetInnerHTML={{__html: this.props.result}}></div>
      //     <Button
      //       onClick={this.props.app.addToCurrentCollection.bind(null, this.props.name, this.props.fingering)}
      //     >Add to New Collection</Button>
      //   </div>
      // );
      return <ChordDiagram />;
    }
    else {
      return (<div className="row"></div>);
    }
  }
});

var ChordDiagram = React.createClass({
  render: function(){
    //svg baseProfile full
    //svg  xmlns:ev="http://www.w3.org/2001/xml-events" xmlns:xlink="http://www.w3.org/1999/xlink"

    //TODO these should be determined from the data
    var strings = [1,2,3,4,5,6];
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
              y2="400">
            </line>);
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
        <circle cx="200" cy="175" r="30"></circle>
        <circle cx="100" cy="275" r="30"></circle>
      </svg>
    );
  }
});

module.exports = ChordResults;
