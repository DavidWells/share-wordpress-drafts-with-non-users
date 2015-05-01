/**
 * Main React Parent Component
 */
var React = require('react'),
Grid = require('griddle-react'),
columnMeta = require('./Columns.js'),
resultsPerPage = 200;

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
            /* set state with new data and reflow grid */
            that.setState({ data: newData });

        });
    },
    render: function() {
        return (
            <div>
                <h2>Drafts for Friends</h2>
                <div id="table-area">
                    {/* Grid renders components from Columns.js */}
                    <Grid
                        initialSort="id"
                        useGriddleStyles={false}
                        settingsText={DAF_Settings.localization.settings}
                        filterPlaceholderText={DAF_Settings.localization.filter}
                        noDataMessage={DAF_Settings.localization.no_data}
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