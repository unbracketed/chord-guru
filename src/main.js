/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap/cjs/Button');

var ResultList = require('./chord_finder/list').ResultList;
var CollectionsList = require('./collections/list');
var ChordBuilder = require('./chord_finder/builder');
var CollectionDetailView = require('./collections/detailView');


var ChordApp = React.createClass({

    getInitialState: function(){
      return {
        userCollections: [],
        currentCollection: false,
        activeView: 'chord-builder'
      }
    },

    componentDidMount: function(){
      var component = this;
      hoodie.store
        .findAll('collections')
        .done(function(collections){
          if (collections.length){
            console.log('Found user collections:');
            console.log(collections);

            // TODO find latest collection and make it current

            component.setState({
              userCollections: collections,
              currentCollection: collections[0]
            });
          }
          else{
            console.log('No user collections found');
            // component.setState({
            //   userCollections: []
            // });
          }
        })
        .fail(function(err){
          console.log(err);
        });
    },

    addToCurrentCollection: function(chord) {

      var curColl = this.state.currentCollection;

      //is there a current collection?
      if (!curColl){
        curColl = {
          name: "New Collection",
          items: []
        };

        curColl.items.push(chord);

        //create default User Collection
        hoodie.store.add('collections', curColl)
          .done(function(newObject){
            console.log("Added new user collection: " + curColl.name);
            console.log(newObject);
            curColl = newObject;
          })
          .fail(function(err){
            console.log(err);
          });
        this.setState({
          currentCollection: curColl,
          userCollections: [curColl]
        });
      }
      else {
        curColl.items.push(chord);
        hoodie.store.update('collections', curColl.id, {items: curColl.items});
        this.setState({
          currentCollection: curColl,
        });
      }

      return false;
    },

    showCollectionDetail: function(collection){
      this.setState({
        activeView: 'collectionDetail',
        currentCollection: collection
      });
      return false;
    },

    render: function() {

      var app = {
        addToCurrentCollection: this.addToCurrentCollection,
        showCollectionDetail: this.showCollectionDetail
      };

      if (this.state.activeView == 'collectionDetail'){
        return (
          <CollectionDetailView
            app={app}
            currentCollection={this.state.currentCollection} />
        );
      }
      else {
        return (
          <div className="row">
            <ChordBuilder app={app} />
            <CollectionsList
              ref="userCollections"
              app={app}
              collections={this.state.userCollections} />
          </div>
        );
      }
    }
});

//TODO
// user integration
// live reload - gulp
// use store events to keep app reactive

var hoodie  = new Hoodie();

React.renderComponent(
  <ChordApp/>,
  document.getElementById('content')
);