/** @jsx React.DOM */

var ChordBuilder = React.createClass({displayName: 'ChordBuilder',

    handleTonicClick: function(event) {
        return false;
    },

    render: function() {
        return (
            React.DOM.div( {className:"chordBuilder"}, 
                React.DOM.a( {href:"#", onClick:this.handleTonicClick}, "A")
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