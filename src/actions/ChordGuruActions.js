var Fluxxor = require('fluxxor');


var actions = {

  navigationChange: function(view){
    this.dispatch("NAVIGATION_CHANGE", {selectedView: view});
  },

  selectRoot: function(root) {
    this.dispatch("SELECT_ROOT", {root: root});
  },

  selectChordType: function(chord_type) {
    this.dispatch("SELECT_CHORD_TYPE", {chord_type: chord_type});
  },

};

module.exports = actions;
