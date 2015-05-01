var React = require('react');

//var Griddle = React.createFactory(require('griddle-react'));
var Grid = require('griddle-react');
var fakeData = require('../data/fakeData.js').fakeData;
//var columnMeta = require('../data/columnMeta.js');
var columnMeta = require('./Columns.js');

var resultsPerPage = 200;

var events = require('events');
var eventEmitter = new events.EventEmitter();

var ReactApp = React.createClass({
      getInitialState: function() {
        return {
          data: this.props.gridData
        };
      },
      componentDidMount: function() {
        var that = this;
        /* Pseudo Flux implementation */
        jQuery(document).on( 'updateData', function( event, data ) {
            /* var filterTest = that.state.data.filter(function(user) {
                return user.id === 300;
            }); console.log(filterTest);*/
            console.log('dtata', data);
            if( data.action === "delete" ) {
                var newData = that.state.data;
                for (var i = newData.length - 1; i >= 0; i--) {
                   if(newData[i].id === data.row.id) {
                        newData[i].status.shared = false;
                   }
                }
            } else if ( data.action === "share" ) {
                var newData = that.state.data;
                for (var i = newData.length - 1; i >= 0; i--) {
                   if(newData[i].id === data.row.id) {
                        newData[i].status.shared = true;
                        newData[i].status.time = data.date;
                   }
                }
            }

            console.log('new data', newData);
            that.setState({ data: newData });

          });
      },
      render: function () {
        return (
          <div>
          <h2>Drafts for Friends</h2>
            <div id="table-area">
              {/* Grid renders components from Columns.js */}
               <Grid
                      initialSort="id"
                      useGriddleStyles={false}
                      settingsText={WP_API_Settings.localization.settings}
                      filterPlaceholderText={WP_API_Settings.localization.filter}
                      showSettings={true}
                      showFilter={true}
                      results={this.state.data}
                      columnMetadata={columnMeta}
                      resultsPerPage={resultsPerPage}
                      settingsToggleClassName="button"
                      tableClassName="wp-list-table widefat fixed striped posts"/>
            </div>
          </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = ReactApp;