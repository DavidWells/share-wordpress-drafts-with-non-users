var React = require('react'),
TimePicker = require('./TimePicker.js');

var Actions = React.createClass({
	getInitialState: function() {
		var currentlyShared = !this.props.rowData.status.match(/no_transient/);
		return {
			status: currentlyShared,
			showForm: false
		};
	},
	componentDidMount: function() {
		this.parent = this.getDOMNode().parentNode.parentNode;
		//console.log(this.parent);
	},
	_handleDisable: function(){
	  console.log('trigger ajax delete');
	  this.setState({showForm: true});

	},
	_hideForm: function(){
		this.setState({showForm: false});
	},

	_handleExtend: function(){
      	console.log('trigger ajax extend');
      	/* trigger popup here */
      	this.setState({showForm: true});
  },
  render: function(){
    url = "";

    console.log(this.state.status);
    if(this.state.status) {
      var extendButton = <span onClick={this._handleExtend}>Extend</span>;
      var stopSharingButton =  <span onClick={this._handleDisable}>Stop Sharing</span>;
      var shareButton = "";
      var action = "Extend";
    } else {
      extendButton = "";
      stopSharingButton = "";
      shareButton = <span href={url} onClick={this._handleExtend}>Share this draft</span>;
      action ="Share";
    }

    if(this.state.showForm) {
    	timepicker = <TimePicker action={action} rowData={this.props.rowData} hideform={this._hideForm} />
    	extendButton = "";
    	stopSharingButton = "";
    	shareButton = "";
    } else {
    	timepicker = "";
    }

    return (
          <div>
            {shareButton}
            {extendButton}
            {stopSharingButton}
            {timepicker}
          </div>
    );
  }
});

module.exports = Actions;