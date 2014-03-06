
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var Router =  Backbone.Router.extend({
        initialize: function(){
            alert('starting');
            Backbone.history.start();
        },
        routes: {
            '': 'index',
            'chord-finder': 'chord-finder',
        },

        index: function() {
            alert('idx');
            Backbone.history.navigate('chord-finder', {trigger: true});
        },

        'chord-finder': function(){
            alert('cf');
        }
});

module.exports = new Router();