/**
 * @jsx React.DOM
 */

var React = require('react');
var ResultList = require('./list');

var FinderResults = React.createClass({

  render: function(){

    if (this.props.result){
      if (this.props.result == 'no data'){
        return <div>No diagram for this chord yet</div>
      }
      return (
        <div id="finder-results">
          <div className="row">
              <h2>{this.props.resultTitle}</h2>
          </div>
          <div className="row">
            <ResultList
              app={this.props.app}
              chord_list={this.props.result}
            />
          </div>
        </div>
      );
    }
    else {
      return (<div/>);
    }
  }
});

module.exports = FinderResults;
