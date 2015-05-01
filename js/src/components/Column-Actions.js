var React = require('react'),
TimePicker = require('./TimePicker.js'),
Button = require('./Button.js');

var Actions = React.createClass({
    getInitialState: function() {
        return {
            status: this.props.rowData.status.shared,
            showForm: false
        };
    },
    /* Handles removing sharable draft */
    _stopSharing: function(){
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
                this.setState({status: data.status});

                var params = {
                    action: "delete",
                    row: this.props.rowData
                };
                /* Trigger pseudo flux */
                jQuery(document).trigger('updateData', params);
            },
            error: function(MLHttpRequest, textStatus, errorThrown){
                alert("Ajax not enabled :(");
            }
        });
    },
    _hideForm: function(){
        this.setState({showForm: false});
    },
    _showForm: function(){
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
            extendButton = <Button onClick={this._showForm}>Extend</Button>;
            stopButton = (
                <Button id={"stop-"+this.props.rowData.id}
                        onClick={this._stopSharing}
                        className="stop"
                        primary={true}>
                Stop Sharing
                </Button>
            );
            shareButton = "";
            action = "Extend";
        } else {
            shareButton = <Button onClick={this._showForm}>Share Draft</Button>;
            action ="Share";
        }

        if(this.state.showForm) {
            timepicker = (
                <TimePicker action={action}
                            rowData={this.props.rowData}
                            hideform={this._hideForm}
                            updateStatus={this._updateStatus} />
            );
            extendButton = "";
            stopButton = "";
            shareButton = "";
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