/** @jsx React.DOM */

var ChordResults = React.createClass({

  render: function(){
    // Don't escape the SVG
    if (this.props.result){
      return (
        <div>
          <div dangerouslySetInnerHTML={{__html: this.props.result}}></div>
          <button onClick={this.props.addToCollection}>Add to Collection</button>
        </div>
      );
    }
    else {
      return (<div/>);
    }
  }
});

var ChordBuilder = React.createClass({

    getInitialState: function(){
      return {
        result: ""
      }
    },

    handleTonicClick: function(event) {

        var cname = event.target.id;
        var component = this;

        // TODO move to common
        request = new XMLHttpRequest;
        request.open('GET', 'assets/chord_data/guitar/chords/' + cname + '-1.svg', true);

        request.onload = function() {
          if (request.status >= 200 && request.status < 400){
            // Success!
            resp = request.responseText;
            component.setState({result: resp});
          } else {
            // We reached our target server, but it returned an error

          }
        };

        request.onerror = function() {
          // There was a connection error of some sort
        };

      request.send();

        return false;
    },

    addToCollection: function(event){
      alert('you');
    },

    render: function() {
        return (
            <div className="chordBuilder">
                <button id="A" onClick={this.handleTonicClick}>A</button>
                <button id="B" onClick={this.handleTonicClick}>B</button>
                <button id="C" onClick={this.handleTonicClick}>C</button>
                <button id="D" onClick={this.handleTonicClick}>D</button>
                <button id="E" onClick={this.handleTonicClick}>E</button>
                <button id="F" onClick={this.handleTonicClick}>F</button>
                <button id="G" onClick={this.handleTonicClick}>G</button>
                <ChordResults result={this.state.result} addToCollection={this.addToCollection} />
            </div>
        );
    }

});

var ChordFinder = React.createClass({
    render: function() {
        return (
            <div className="chordSearch">
                <ChordBuilder/>
            </div>
        );
    }
});


React.renderComponent(
  <ChordFinder/>,
  document.getElementById('content')
);