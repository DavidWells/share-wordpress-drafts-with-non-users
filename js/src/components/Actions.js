var React = require('react'),
TimePicker = require('./TimePicker.js'),
Button = require('./Button.js');

var Actions = React.createClass({
	getInitialState: function() {
		var currentlyShared = this.props.rowData.status.shared;

		return {
			status: currentlyShared,
			showForm: false
		};
	},
	componentDidMount: function() {
		this.parent = this.getDOMNode().parentNode.parentNode;
		//console.log(this.parent);
	},
	_stopSharing: function(){
	  console.log('trigger ajax delete');
	  jQuery.ajax({
	  	type: 'POST',
	  	url: DAF_Settings.ajax_url,
	  	context: this,
	  	data: {
				action: 'stop_sharing_draft',
				nonce: DAF_Settings.nonce,
				post_id: this.props.rowData.id
		},
	  	success: function(data){
	  		var self = this,
	  		data = JSON.parse(data);
	  		console.log(data);
	  		console.log(data.status);
	  		this.setState({status: data.status});
	  		console.log(self);
	  		var test = jQuery(this.parent);
	  		console.log(test);
	  		/* wrong */
	  		var params = {
	  			action: "delete",
	  			row: this.props.rowData
	  		};
	  		jQuery(document).trigger('updateData', params);
	  		/* need to reload the TR row data */
	  		// I need to return the entire list of data again and reflow the table
	  	},
	  	error: function(MLHttpRequest, textStatus, errorThrown){
	  		alert("Ajax not enabled :(");
	  	}
	  });
	},
	_hideForm: function(){
		this.setState({showForm: false});
	},

	_handleExtend: function(){
      	console.log('trigger ajax extend');
      	/* trigger popup here */
      	this.setState({showForm: true});
  },
  _updateStatus: function(){
		this.setState({
			status: true,
			showForm: false
		});
  },
  render: function(){
  	var timepicker,
  	extendButton,
  	stopButton,
  	shareButton,
  	action;

    if(this.state.status) {
      extendButton = <Button onClick={this._handleExtend}>Extend</Button>;
      stopButton =  <Button id={"stop-"+this.props.rowData.id} onClick={this._stopSharing} className="stop" primary={true}>Stop Sharing</Button>;
      shareButton = "";
      action = "Extend";
    } else {
      extendButton = "";
      stopButton = "";
      shareButton = <Button onClick={this._handleExtend}>Share Draft</Button>;
      action ="Share";
    }

    if(this.state.showForm) {
    	timepicker = (<TimePicker action={action}
								  rowData={this.props.rowData}
								  hideform={this._hideForm}
								  updateStatus={this._updateStatus} />
    				);
    	extendButton = "";
    	stopButton = "";
    	shareButton = "";
    } else {
    	timepicker = "";
    }

    return (
          <div className="action-holder">
            {shareButton}
            {extendButton}
            {stopButton}
            {timepicker}
          </div>
    );
  }
});

module.exports = Actions;