/** @jsx React.DOM */

var ChordResults = React.createClass({displayName: 'ChordResults',

  render: function(){
    // Don't escape the SVG
    if (this.props.result){
      return (
        React.DOM.div(null, 
          React.DOM.div( {dangerouslySetInnerHTML:{__html: this.props.result}}),
          React.DOM.button( {onClick:this.props.addToCollection}, "Add to Collection")
        )
      );
    }
    else {
      return (React.DOM.div(null));
    }
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
        request.open('GET', '/data/guitar/chords/' + cname + '-1.svg', true);

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
            React.DOM.div( {className:"chordBuilder"}, 
                React.DOM.button( {id:"A", onClick:this.handleTonicClick}, "A"),
                React.DOM.button( {id:"B", onClick:this.handleTonicClick}, "B"),
                React.DOM.button( {id:"C", onClick:this.handleTonicClick}, "C"),
                React.DOM.button( {id:"D", onClick:this.handleTonicClick}, "D"),
                React.DOM.button( {id:"E", onClick:this.handleTonicClick}, "E"),
                React.DOM.button( {id:"F", onClick:this.handleTonicClick}, "F"),
                React.DOM.button( {id:"G", onClick:this.handleTonicClick}, "G"),
                ChordResults( {result:this.state.result, addToCollection:this.addToCollection} )
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