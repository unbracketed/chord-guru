/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap/cjs/Button');
var Nav = require('react-bootstrap/cjs/Nav');
var NavItem = require('react-bootstrap/cjs/NavItem');

var ResultList = require('./chord_finder/list').ResultList;
var CollectionList = require('./collections/list');
var SidebarCurrentCollection = require('./collections/sidebar_current_collection');
var ChordCollection = require('./collections/collection');
var ChordBuilder = require('./chord_finder/builder');
var CollectionDetailView = require('./collections/detailView');
var ChordDiagram = require('./chords/diagram');


var ChordApp = React.createClass({

    getInitialState: function(){
      return {
        userCollections: [],
        currentCollection: false,
        activeView: 'chord-finder',
        recentChords: []
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

            var _collections = [];
            for (var idx in collections){
              _collections.push(new ChordCollection(collections[idx]));
            }

            // TODO find latest collection and make it current

            component.setState({
              userCollections: _collections,
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

    addToNewCollection: function(chord) {

      //create a new collection
      newCollectionData = {
        name: "",
        items: [chord]
      };

      var self = this;
      hoodie.store.add('collections', newCollectionData)
        .done(function(newCollection){
          console.log("Added new user collection");
          console.log(newCollection);
          curColl = new ChordCollection(newCollection);
          userCollections = self.state.userCollections;
          userCollections.push(newCollection);
          self.setState({
            currentCollection: curColl,
            userCollections: userCollections
          });
        })
        .fail(function(err){
          console.log(err);
        });

      return false;
    },

    addToCurrentCollection: function(chord){
      var curColl = this.state.currentCollection;
      curColl.items.push(chord);
      hoodie.store.update('collections', curColl.id, {items: curColl.items});
      this.setState({
        currentCollection: curColl,
      });
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
      } else if (selectedKey == 'nav-collections'){
        this.setState({activeView: 'collections'});
      }
      return false;
    },

    foundChord: function(chord){
      var recentChords = this.state.recentChords;
      recentChords.push(chord);
      this.setState({recentChords: recentChords});
    },

    render: function() {

      var sidebar = true;

      var app = {
        addToCurrentCollection: this.addToCurrentCollection,
        addToNewCollection: this.addToNewCollection,
        showCollectionDetail: this.showCollectionDetail,
        foundChord: this.foundChord,
        currentCollection: this.state.currentCollection,
        userCollections: this.state.userCollections
      };

      var view;
      var activeNav;
      var activeView = this.state.activeView;
      if (activeView == 'collectionDetail'){
        //TODO highlight Collections in nav
        view = <CollectionDetailView app={app} currentCollection={this.state.currentCollection} />;
        sidebar = false;
        activeNav = 'collections';
      }
      else if (activeView == 'collections'){
        view = <CollectionList app={app} />;
        sidebar = false;
        activeNav = 'collections';
      }
      else {
        view = <ChordBuilder app={app} />;
        activeNav = 'chord-finder';
      }

      if (this.state.recentChords.length > 1){
        var recent = this.state.recentChords.slice(0);
        recent = recent.reverse().slice(1);
        var recentChordsList = (
          <div>
            <h2>Recent Chords</h2>
            {recent.map(function(chord, idx){
              return(
                <div>
                  <ChordDiagram
                    chord_data={chord}
                    width={75}
                    key={'chord-diagram-'+idx} />
                  {chord.chordPath}
                </div>
                );
            }, this)}
          </div>);
      }


      var content;
      if (sidebar){
        content = (
          <div className="row">
            <div className="col-md-8">
              {view}
            </div>
            <div className="col-md-4">
              {recentChordsList ? recentChordsList : ""}
              <SidebarCurrentCollection app={app} />
            </div>
          </div>
        );
      }
      else{
        content = (
          <div className="row">
            <div className="col-md-12">
              {view}
            </div>
          </div>
        );
      }

      return (
        <div className="container">
          <div className="row">
            <div className="col-md-9 col-md-push-3">
              <Nav bsStyle="pills" activeKey={'nav-'+activeNav} onSelect={this.handleNavSelect}>
                <NavItem key={'nav-chord-finder'}>Chord Finder</NavItem>
                <NavItem key={'nav-progressions'}>Progressions</NavItem>
                <NavItem key={'nav-collections'}>Collections</NavItem>
              </Nav>
            </div>
            <div className="col-md-3 col-md-pull-9">
              <h1>chord guru</h1>
            </div>
          </div>
          {content}
        </div>
      );
    }
});

//TODO
// user integration
// use store events to keep app reactive
// local copy of jquery for development
// barre chord rendering
// collection should contain instrument and tuning info

var hoodie  = new Hoodie();

React.renderComponent(
  <ChordApp/>,
  document.getElementById('content')
);