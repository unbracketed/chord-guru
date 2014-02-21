/** @jsx React.DOM */

var React = require('react');
var Button = require('react-bootstrap/cjs/Button');


var ChordResults = React.createClass({

  render: function(){
    // Don't escape the SVG
    if (this.props.result){
      return (
        <div>
          <div dangerouslySetInnerHTML={{__html: this.props.result}}></div>
          <button
            onClick={this.props.app.addToCollection}
            name={this.props.name}
            data-chord-fingering={this.props.fingering}>Add to New Collection</button>
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

    handleKeyClick: function(event) {

        //TODO switch to bind?
        var keyName = event.target.name;
        var component = this;

        $.get('assets/chord_data/guitar/chords/' + keyName + '-1.svg', function(data, textStatus, jqXHR){
            component.setState({
              result: data,
              fingering: 1,
              key: keyName
            });
        }, 'text');
        return false;
    },

    render: function() {
        return (
            <div className="col-md-8">
              {this.keys.map(function(keyname, i) {
                return (
                  <Button onClick={this.handleKeyClick} name={this.keys[i]} key={i}>{this.keys[i]}</Button>
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
  //TODO init user collections
  render: function(){
    return (
      <div className="col-md-4">
        <h2>Collections</h2>
        <p>Create collections of chords for study, practice, or reference</p>
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
          console.log('Found user collections:');
          console.log(collections[0]);
          component.setState({
            userCollections: collections[0]
          })
        })
        .fail(function(err){
          console.log(err);
        });
    },

    addToCurrentCollection: function() {

      //TODO get rid of these via bind?
      var keyName = event.target.name;
      var fId = $(event.target).data('chord-fingering');

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

      hoodie.store.add(curColl.slug, {key: keyName, fingering: fId})
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
              <ChordBuilder app={{addToCollection: this.addToCurrentCollection}} />
              <ChordCollections ref="userCollections" collections={this.state.userCollections} />
          </div>
      );
    }
});

//TODO
// split components separate files
// user integration
// live reload - gulp
// inline svg rendering

var hoodie  = new Hoodie();

React.renderComponent(
  <ChordApp/>,
  document.getElementById('content')
);