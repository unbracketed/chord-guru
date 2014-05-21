var Fluxxor = require('fluxxor');

// navigation history support
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;



var ChordGuruStore = Fluxxor.createStore({
  actions: {
    "SELECT_ROOT": "onSelectRoot",
    "SELECT_CHORD_TYPE": "onSelectChordType",
    "NAVIGATION_CHANGE": "onNavigationChange"
  },

  initialize: function() {
    this.root = null;
    this.chord_type = 'major';
    this.current_view = 'chord-finder';

    console.log("Starting Backbone.history");
    Backbone.history.start();
  },

  onNavigationChange: function(nav){
    this.current_view = nav.selectedView;
    Backbone.history.navigate(nav.selectedView);
    this.emit("change");
  },

  onSelectRoot: function(payload) {
    this.root = payload.root;
    this.emit("change");
  },

  onSelectChordType: function(payload){
    this.chord_type = payload.chord_type;
    this.emit("change");
  },

  getState: function() {
    return {
      root: this.root,
      chord_type: this.chord_type,
      current_view: this.current_view
    };
  }
});

module.exports = ChordGuruStore;
