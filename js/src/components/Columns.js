var React = require('react');
var LinkComponent = require('./Link.js'),
Actions = require('./Actions.js'),
Status = require('./Status.js');

var columnMeta = [
  {
    "columnName": "id",
    "order": 1,
    "locked": false,
    "visible": true,
    //"customComponent": CheckBox,
    "cssClassName": "checkbox-column"
  },
  {
    "columnName": "title",
    "order": 2,
    "locked": false,
    "visible": true,
    "customComponent": LinkComponent
  },
  {
    "columnName": "status",
    "order": 3,
    "locked": false,
    "visible": true,
    "customComponent": Status
  },
  {
    "columnName": "actions",
    "order": 4,
    "locked": false,
    "sortable": false,
    "visible": true,
    "customComponent": Actions,
    "cssClassName": "actions-column"
  }
];

module.exports = columnMeta;