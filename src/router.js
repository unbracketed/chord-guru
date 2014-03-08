
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var Router =  Backbone.Router.extend({
        routes: {
            '': 'index',
            'chord-finder': 'chord-finder',
            'collections': 'collections',
            'collections/:collection_id': 'collection-detail'
        },

        index: function() {
            Backbone.history.navigate('chord-finder', {trigger: true});
        }
});

module.exports = new Router();