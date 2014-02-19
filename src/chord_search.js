/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap/cjs/Button');


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
      hoodie.store.add('mycollection', {title: 'hello'})
                .done(function (newObject) {
                  alert('done');
                }).fail(function(info){
                  alert('fail');
                });
      return false;
    },

    render: function() {
        return (
            <div className="chordBuilder">
                <Button id="A" onClick={this.handleTonicClick}>A</Button>
                <Button id="B" onClick={this.handleTonicClick}>B</Button>
                <Button id="C" onClick={this.handleTonicClick}>C</Button>
                <Button id="D" onClick={this.handleTonicClick}>D</Button>
                <Button id="E" onClick={this.handleTonicClick}>E</Button>
                <Button id="F" onClick={this.handleTonicClick}>F</Button>
                <Button id="G" onClick={this.handleTonicClick}>G</Button>
                <ChordResults result={this.state.result} addToCollection={this.addToCollection} />
            </div>
        );
    }

});

var ChordFinder = React.createClass({

    componentDidMount: function(){
      hoodie.store
        .findAll('mycollection')
        .done(function(items){
          items.forEach(
            function(item){alert(item.title);}
          );
        });
    },

    render: function() {
        return (
            <div className="chordSearch">
                <ChordBuilder/>
            </div>
        );
    }
});


var hoodie  = new Hoodie();

React.renderComponent(
  <ChordFinder/>,
  document.getElementById('content')
);