/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap/cjs/Button');
var Nav = require('react-bootstrap/cjs/Nav');
var NavItem = require('react-bootstrap/cjs/NavItem');



var ChordResults = React.createClass({

  render: function(){
    // Don't escape the SVG
    if (this.props.result){
      return (
        <div>
          <div dangerouslySetInnerHTML={{__html: this.props.result}}></div>
          <Button
            onClick={this.props.app.addToCurrentCollection.bind(null, this.props.name, this.props.fingering)}
          >Add to New Collection</Button>
        </div>
      );
    }
    else {
      return (<div className="row"></div>);
    }
  }
});

var ChordBuilder = React.createClass({

    keys: ['A', 'A#/Bb', 'B', 'C', 'C#/Db', 'D', 'D#/Eb', 'E', 'F', 'F#/Gb', 'G', 'G#/Ab'],

    getInitialState: function(){
      return {
        result: "",
        key: "",
        fingering: 0,
      }
    },

    handleKeyClick: function(keyname) {
        var component = this;
        $.get('assets/chord_data/guitar/chords/' + keyname + '-1.svg', function(data, textStatus, jqXHR){
            component.setState({
              result: data,
              fingering: 1,
              key: keyname
            });
        }, 'text');
        return false;
    },

    render: function() {
        return (
            <div className="col-md-8">
              {this.keys.map(function(keyname, i) {
                return (
                  <Button onClick={this.handleKeyClick.bind(this, keyname)} key={i}>{keyname}</Button>
                );
              }, this)}
              <ChordResults
                app={this.props.app}
                name={this.state.key}
                fingering={this.state.fingering}
                result={this.state.result} />
            </div>
        );
    }

});


var ChordCollections = React.createClass({
  render: function(){
    var infoStyle = this.props.collections.length ? {display: 'none'} : {};
    return (
      <div className="col-md-4">
        <h2>Collections</h2>
        <p style={infoStyle}>Create collections of chords for study, practice, or reference</p>
        <Nav bsStyle="pills" bsVariation="stacked" activeKey={1} onSelect={this.handleSelect}>
        {this.props.collections.map(function(coll, i){
          return(<NavItem key={1} title={coll.name}>{coll.name}</NavItem>);
        }, this)}
      </Nav>
      </div>
    );
  }
});


var ChordApp = React.createClass({

    getInitialState: function(){
      return {
        userCollections: [],
        currentCollection: false
      }
    },

    componentDidMount: function(){
      var component = this;
      hoodie.store
        .findAll('collections')
        .done(function(collections){
          if (collections.length){
            console.log('Found user collections:');
            console.log(collections[0]);
            component.setState({
              userCollections: collections[0].items
            });
          }
          else{
            console.log('No user collections found');
            component.setState({
              userCollections: []
            });
          }
        })
        .fail(function(err){
          console.log(err);
        });
    },

    addToCurrentCollection: function(keyname, fingering) {

      //TODO get rid of these via bind?
      // var keyname = event.target.name;
      // var fId = $(event.target).data('chord-fingering');

      var curColl = this.state.currentCollection;

      //is there a current collection?
      if (!curColl){
        curColl = {
          name: "New Collection",
          slug: 'newcollection'
        };

        //TODO creating duplicates of collections

        //update User Collections
        hoodie.store.add('collections', {items: [curColl]})
          .done(function(newObject){
            console.log("Added new user collection: " + curColl.name);
            console.log(newObject);
          })
          .fail(function(err){
            console.log(err);
          });
        this.setState({
          currentCollection: curColl,
          userCollections: [curColl]
        });
      }

      hoodie.store.add(curColl.slug, {key: keyname, fingering: fingering})
          .done(function(newObject){
            console.log("Added to collection: " + curColl.name);
            console.log(newObject);
          })
          .fail(function(err){
            console.log(err);
          });

      return false;
    },

    render: function() {
      return (
          <div className="row">
              <ChordBuilder app={{addToCurrentCollection: this.addToCurrentCollection}} />
              <ChordCollections ref="userCollections" collections={this.state.userCollections} />
          </div>
      );
    }
});

//TODO
// move to index.html
// split components separate files
// user integration
// live reload - gulp
// inline svg rendering

var hoodie  = new Hoodie();

React.renderComponent(
  <ChordApp/>,
  document.getElementById('content')
);