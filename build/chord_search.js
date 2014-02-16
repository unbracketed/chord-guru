/** @jsx React.DOM */

var ChordResults = React.createClass({displayName: 'ChordResults',

  render: function(){
    // Don't escape the SVG
    return (
      React.DOM.div( {dangerouslySetInnerHTML:{__html: this.props.result}})
    );
  }
});

var ChordBuilder = React.createClass({displayName: 'ChordBuilder',

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
            React.DOM.div( {className:"chordBuilder"}, 
                React.DOM.button( {id:"A", onClick:this.handleTonicClick}, "A"),
                React.DOM.button( {id:"C", onClick:this.handleTonicClick}, "C"),
                ChordResults( {ref:"resultsSection", result:this.state.result} )
            )
        );
    }

});

var ChordFinder = React.createClass({displayName: 'ChordFinder',
    render: function() {
        return (
            React.DOM.div( {className:"chordSearch"}, 
                ChordBuilder(null)
            )
        );
    }
});


React.renderComponent(
  ChordFinder(null),
  document.getElementById('content')
);