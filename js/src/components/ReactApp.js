/** @jsx React.DOM */

var React = require('react');

/* create factory with griddle component */
//var Griddle = React.createFactory(require('griddle-react'));
var Griddle = require('griddle-react');
var fakeData = require('../data/fakeData.js').fakeData;
var columnMeta = require('../data/columnMeta.js').columnMeta;
var resultsPerPage = 200;

var ReactApp = React.createClass({

      componentDidMount: function () {
        console.log(fakeData);

      },
      render: function () {
        return (
          <div id="table-area">

             {/*<Griddle results={fakeData} columnMetadata={columnMeta} rowMetadata={rowMeta} tableClassName="table" showFilter={true} showSettings={true} columns={["name", "city", "state", "country"]}/>, document.getElementById('grid-basic') */}
             <Griddle
                      showSettings={true}
                      showFilter={true}
                      results={fakeData}
                      columnMetadata={columnMeta}
                      resultsPerPage={resultsPerPage}
                      tableClassName="table"/>

          </div>
        )
      }
  });

/* Module.exports instead of normal dom mounting */
module.exports = ReactApp;