/** @jsx React.DOM */
'use strict';

// var $ = require('jquery');
var _ = require('underscore');
// var Backbone = require('backbone');
var React = require('react');

var Button = require('react-bootstrap/cjs/Button');
var Nav = require('react-bootstrap/cjs/Nav');
var NavItem = require('react-bootstrap/cjs/NavItem');

var router = require('./router');
var CollectionList = require('./collections/list');
var SidebarCurrentCollection = require('./collections/sidebar_current_collection');
var RecentChords = require('./collections/sidebar_recent_chords');
var ChordCollection = require('./collections/collection');
var ChordBuilder = require('./chord_finder/views/builder');
var CollectionDetailView = require('./collections/detailView');
var ChordDiagram = require('./chords/diagram');

// ---- FLUXIFY -----
var Fluxxor = require('fluxxor');
var ChordGuruStore = require('./stores/ChordGuruStore');
var ChordGuruActions = require('./actions/ChordGuruActions');


//-------------------

// Backbone.$ = $;

var ChordApp = React.createClass({

    getInitialState: function(){
      return {
        userCollections: [],
        currentCollection: false,
        activeView: 'chord-finder',
        recent_chords: []
      }
    },

    componentWillMount: function() {
      router.on('route:chord-finder', this.chordFinderView);
      router.on('route:collections', this.collectionsView);
      router.on('route:collection-detail', this.collection_detail_view);
    },

    componentDidMount: function(){
      var self = this;

      console.log("Attempt to load user data");
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

            self.setState({
              userCollections: _collections,
              currentCollection: _collections[0]
            });
          }
          else{
            console.log('No user collections found');
          }
        })
        .fail(function(err){
          console.log(err);
        });

      // console.log("Starting Backbone.history")
      // Backbone.history.start();
    },

    chordFinderView: function(chord_path){
      console.log('chordFinderView ' + (chord_path ? chord_path : ''));
      this.setState({
        activeView: 'chord-finder',
        view_data: {chord_path: chord_path}
      });
    },

    collectionsView: function(){
      this.setState({
        activeView: 'collections'
      });
    },

    collection_detail_view: function(collection_id){
      var cur_coll = _.find(this.state.userCollections, function(coll){return coll.id == collection_id;});
      this.setState({
        activeView: 'collection-detail',
        currentCollection: cur_coll
      });
    },

    addToNewCollection: function(chord) {

      //create a new collection
      var new_collection_data = {
        name: "",
        items: [chord]
      };

      var self = this;
      hoodie.store.add('collections', new_collection_data)
        .done(function(new_collection){
          console.log("Added new user collection");
          console.log(new_collection);
          var current_collection = new ChordCollection(new_collection);
          var user_collections = self.state.userCollections;
          // TODO new collection should be added to front of list
          user_collections.push(current_collection);
          self.setState({
            currentCollection: current_collection,
            userCollections: user_collections
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

      hoodie.store.update('collections', curColl.id,
        {items: curColl.items.map(function(item){
          return item.asJSON();
        })
      })
      .done(function(){
        console.log("Updated collection");
      })
      .fail(function(err){
          console.log(err);
      });

      this.setState({
        currentCollection: curColl,
      });
      return false;
    },

    showCollectionDetail: function(collection){
      console.log('showCollectionDetail')
      Backbone.history.navigate('collections/'+collection.id);
      this.setState({
        activeView: 'collection-detail',
        currentCollection: collection
      });
      return false;
    },

    // handleNavSelect: function(selectedKey){
    //   if (selectedKey == 'nav-chord-finder'){
    //     this.setState({activeView: 'chord-finder'});
    //     Backbone.history.navigate('chord-finder');
    //   } else if (selectedKey == 'nav-collections'){
    //     this.setState({activeView: 'collections'});
      //     Backbone.history.navigate('collections');
    //   }
    //   return false;
    // },

    foundChord: function(chord){
      console.log('foundChord');
      console.log(chord);
      Backbone.history.navigate('chord-finder/'.concat(chord.path));
      var recent_chords = this.state.recent_chords;
      recent_chords.push(chord);
      this.setState({
        recent_chords: recent_chords,
        view_data: {chord_path: chord.path}
      });
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
      if (activeView == 'collection-detail'){
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
        console.log('calling chordbuilder with');
        console.log(this.state.view_data);
        console.log(_.extend({app: app}, this.state.view_data));

        view = ChordBuilder(_.extend({app: app}, this.state.view_data));
        activeNav = 'chord-finder';
      }

      var recent_chords_list = <RecentChords app={app} recent_chords={this.state.recent_chords} />;

      var content;
      if (sidebar){
        content = (
          <div className="row">
            <div className="col-md-8">
              {view}
            </div>
            <div className="col-md-4">
              {recent_chords_list}
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
          <div id="header" className="row">
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


//-- FLUXIFY --

var stores = {
  ChordGuruStore: new ChordGuruStore()
};


var flux = new Fluxxor.Flux(stores, ChordGuruActions);
var FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Application = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin("ChordGuruStore")],

  getStateFromFlux: function() {
    var flux = this.getFlux();
    // Normally we'd use one key per store, but we only have one store, so
    // we'll use the state of the store as our entire state here.
    return flux.store("ChordGuruStore").getState();
  },

  render: function() {
    var content = <div>Chord Guru Yo</div>;

    return (
        <div className="container">
          <div id="header" className="row">
            <div className="col-md-9 col-md-push-3">
              <Nav bsStyle="pills" activeKey={'nav-' + this.state.current_view} onSelect={this.onClickNav}>
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
  },

  onClickNav: function(section) {
    this.getFlux().actions.navigationChange(section);
  }

});

React.renderComponent(
  <Application flux={flux}/>,
  document.getElementById('main')
);
//----

//TODO
// barre chord rendering
// starting fret label
// chord label on top or bottom
// improve muted and open string rendering
// get rid of Backbone dependency
// collection should contain instrument and tuning info

// use crossing

// if initial URL is chord, add it to recent chords

var hoodie  = new Hoodie();

// React.renderComponent(
//   <ChordApp/>,
//   document.getElementById('main')
// );