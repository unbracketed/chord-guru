/** @jsx React.DOM */

var ChordBuilder = React.createClass({displayName: 'ChordBuilder',

    handleTonicClick: function(event) {

        cname = event.target.id;
        request = new XMLHttpRequest;
        request.open('GET', 'http://localhost:8000/data/guitar/chords/' + cname + '-1.svg', true);

        request.onload = function() {
          if (request.status >= 200 && request.status < 400){
            // Success!
            resp = request.responseText;

            var content = document.querySelectorAll('#content')[0];
            content.insertAdjacentHTML('afterend', resp);
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
                React.DOM.a( {href:"A", id:"A", onClick:this.handleTonicClick}, "A"),
                React.DOM.a( {href:"C", id:"C", onClick:this.handleTonicClick}, "C")
            )
        );
    }

});

var ChordFinder = React.createClass({displayName: 'ChordFinder',

    getInitialState: function() {
        return {searchTerm: ''};
    },

    handleChange: function(event) {
        this.setState({searchTerm: event.target.value});
    },

    render: function() {
        var searchTerm = this.state.searchTerm;
        return (
            React.DOM.div( {className:"chordSearch"}, 
                " Find a chord: ",
                React.DOM.input( {type:"text", value:searchTerm, onChange:this.handleChange} ),
                ChordBuilder(null)
            )
        );
    }
});


React.renderComponent(
  ChordFinder(null),
  document.getElementById('content')
);