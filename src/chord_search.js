/** @jsx React.DOM */

var ChordBuilder = React.createClass({

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
            <div className="chordBuilder">
                <a href="A" id="A" onClick={this.handleTonicClick}>A</a>
                <a href="C" id="C" onClick={this.handleTonicClick}>C</a>
            </div>
        );
    }

});

var ChordFinder = React.createClass({

    getInitialState: function() {
        return {searchTerm: ''};
    },

    handleChange: function(event) {
        this.setState({searchTerm: event.target.value});
    },

    render: function() {
        var searchTerm = this.state.searchTerm;
        return (
            <div className="chordSearch">
                Find a chord:
                <input type="text" value={searchTerm} onChange={this.handleChange} />
                <ChordBuilder/>
            </div>
        );
    }
});


React.renderComponent(
  <ChordFinder/>,
  document.getElementById('content')
);