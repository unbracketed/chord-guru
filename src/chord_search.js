/** @jsx React.DOM */

var ChordBuilder = React.createClass({

    handleTonicClick: function(event) {

        cname = event.target.id;

        // TODO move to common
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
                <button id="A" onClick={this.handleTonicClick}>A</button>
                <button id="C" onClick={this.handleTonicClick}>C</button>
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