var React = require('react'),
LinkColumn = require('./Column-Link.js'),
ActionsColumn = require('./Column-Actions.js'),
StatusColumn = require('./Column-Status.js');

var columnMeta = [
  {
    "columnName": "id",
    "order": 1,
    "locked": false,
    "visible": true,
    "cssClassName": "checkbox-column"
  },
  {
    "columnName": "title",
    "order": 2,
    "locked": false,
    "visible": true,
    "customComponent": LinkColumn,
    "cssClassName": "title-column"
  },
  {
    "columnName": "status",
    "order": 3,
    "locked": false,
    "visible": true,
    "sortable": false,
    "customComponent": StatusColumn,
    "cssClassName": "status-column"
  },
  {
    "columnName": "actions",
    "order": 4,
    "locked": false,
    "sortable": false,
    "visible": true,
    "customComponent": ActionsColumn,
    "cssClassName": "actions-column"
  }
];
module.exports = columnMeta;