/** @jsx React.DOM */

var ChordBuilder = React.createClass({

    handleTonicClick: function(event) {
        return false;
    },

    render: function() {
        return (
            <div className="chordBuilder">
                <a href="#" onClick={this.handleTonicClick}>A</a>
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