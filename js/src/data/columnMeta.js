var React = require('react');
var events = require('events');
var eventEmitter = new events.EventEmitter();

var CheckBox = React.createClass({
  _onChange: function() {
    console.log('changed');
    console.log(this.props);
    console.log(this.state);
    eventEmitter.emit('RowSelected', 'test');
  },

  componentDidMount: function() {
    //eventEmitter.on('RowSelected', this._handleRowSelect);
  },
  render: function(){
    url ="#speakers/" + this.props.rowData.state + "/" + this.props.data;
    return (
        <div>
          <input id="cb-select"
                onChange={this._onChange}
                type="checkbox" name="post[]" value={this.props.rowData.state} />
        </div>
    );
  }
});

var LinkComponent = React.createClass({
  render: function(){
    url = window.location.origin + "/?p=" + this.props.rowData.id + "&draftsforfriends=baba_8A5K&TEJ";
    return <a href={url}>{this.props.data}</a>
  }
});

var ShareStatus = React.createClass({
  render: function(){
    var status = (this.props.data !== "Not Shared") ? 'time' : this.props.data;

    return (<span>x {status}</span>);

  }
});


var Actions = React.createClass({
  _handleDisable: function(){
      console.log('trigger ajax delete');
  },
  _handleExtend: function(){
      console.log('trigger ajax extend');
  },
  render: function(){
    url ="#speakers/" + this.props.rowData.state + "/" + this.props.data;
    return (
          <div>
            <a href={url} onClick={this._handleExtend}>Extend</a>{" "}
            <a href={url} onClick={this._handleDisable}>Delete</a>
          </div>
    );
  }
});

var test = function() {
  alert('test');
}

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
    "customComponent": ShareStatus
  },
  {
    "columnName": "actions",
    "order": 4,
    "locked": false,
    "visible": true,
    "customComponent": Actions,
    "cssClassName": "actions-column"
  }
];

module.exports.columnMeta = columnMeta;
