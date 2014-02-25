/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap/cjs/Button');
var Nav = require('react-bootstrap/cjs/Nav');
var NavItem = require('react-bootstrap/cjs/NavItem');

var ResultList = require('./chord_finder/list').ResultList;
var CollectionsList = require('./collections/list');
var ChordBuilder = require('./chord_finder/builder');
var CollectionDetailView = require('./collections/detailView');


var ChordApp = React.createClass({

    getInitialState: function(){
      return {
        userCollections: [],
        currentCollection: false,
        activeView: 'chord-finder'
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

    handleNavSelect: function(selectedKey){
      if (selectedKey == 'nav-chord-finder'){
        this.setState({activeView: 'chord-finder'});
      }
      return false;
    },

    render: function() {

      var app = {
        addToCurrentCollection: this.addToCurrentCollection,
        showCollectionDetail: this.showCollectionDetail
      };

      var view;
      var activeView = this.state.activeView;
      if (activeView == 'collectionDetail'){
        view = <CollectionDetailView app={app} currentCollection={this.state.currentCollection} />;
      }
      else {
        view = <ChordBuilder app={app} />;
      }

      return (
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-md-push-3">
              <Nav bsStyle="pills" activeKey={'nav-'+activeView} onSelect={this.handleNavSelect}>
                <NavItem key={'nav-chord-finder'}>Chord Finder</NavItem>
                <NavItem key={'nav-progressions'}>Progressions</NavItem>
              </Nav>
            </div>
            <div className="col-md-3 col-md-pull-9">
              <h1>chord guru</h1>
            </div>
          </div>
          <div className="row">
            <div className="col-md-8">
              {view}
            </div>
            <div className="col-md-4">
              <CollectionsList
                ref="userCollections"
                app={app}
                collections={this.state.userCollections} />
            </div>
          </div>
        </div>
      );

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