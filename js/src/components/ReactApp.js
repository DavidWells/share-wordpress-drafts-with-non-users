var React = require('react');

//var Griddle = React.createFactory(require('griddle-react'));
var Griddle = require('griddle-react');
var fakeData = require('../data/fakeData.js').fakeData;
var columnMeta = require('../data/columnMeta.js').columnMeta;
var resultsPerPage = 200;
var events = require('events');
var eventEmitter = new events.EventEmitter();

var ReactApp = React.createClass({
      getInitialState: function() {
        return {
          selected: []
        };
      },
      componentWillMount: function () {

      },
      componentDidMount: function () {


      },
      render: function () {
        return (
          <div>
          <h2>Drafts for Friends</h2>
          <div id="table-area">
             {/*<Griddle results={fakeData} columnMetadata={columnMeta} rowMetadata={rowMeta} tableClassName="table" showFilter={true} showSettings={true} columns={["name", "city", "state", "country"]}/>, document.getElementById('grid-basic') */}
             <Griddle

                      showSettings={true}
                      showFilter={true}
                      results={this.props.drafts}
                      columnMetadata={columnMeta}
                      resultsPerPage={resultsPerPage}
                      tableClassName="wp-list-table widefat fixed striped posts"/>

          </div>
          </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = ReactApp;