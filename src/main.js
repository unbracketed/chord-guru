/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap/cjs/Button');

var ChordResults = require('./chord_results');
var ChordCollections = require('./chord_collections');
var ChordBuilder = require('./chord_builder');


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

      var curColl = this.state.currentCollection;

      //is there a current collection?
      if (!curColl){
        curColl = {
          name: "New Collection",
          slug: 'newcollection'
        };

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
// user integration
// live reload - gulp
// inline svg rendering

var hoodie  = new Hoodie();

React.renderComponent(
  <ChordApp/>,
  document.getElementById('content')
);