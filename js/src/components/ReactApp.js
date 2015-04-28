var React = require('react');

//var Griddle = React.createFactory(require('griddle-react'));
var Griddle = require('griddle-react');
var fakeData = require('../data/fakeData.js').fakeData;
//var columnMeta = require('../data/columnMeta.js');
var columnMeta = require('./Columns.js');

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
               <Griddle
                        initialSort="status"
                        initialSortAscending={false}
                        useGriddleStyles={false}
                        settingsText={WP_API_Settings.localization.settings}
                        filterPlaceholderText={WP_API_Settings.localization.filter}
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