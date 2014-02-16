/** @jsx React.DOM */

var ChordResults = React.createClass({

  render: function(){
    // Don't escape the SVG
    return (
      <div dangerouslySetInnerHTML={{__html: this.props.result}}></div>
    );
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
        request.open('GET', 'http://localhost:8000/data/guitar/chords/' + cname + '-1.svg', true);

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

    render: function() {
        return (
            <div className="chordBuilder">
                <button id="A" onClick={this.handleTonicClick}>A</button>
                <button id="C" onClick={this.handleTonicClick}>C</button>
                <ChordResults ref="resultsSection" result={this.state.result} />
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