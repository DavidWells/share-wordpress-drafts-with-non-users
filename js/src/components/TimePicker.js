/**
 * Form Component to select Extend/Share times
 */
var React = require('react'),
Button = require('./Button.js'),
utils = require('./utils/utils.js');

var Extend = React.createClass({
    getInitialState: function() {
        return {
          expireValue: 2
        };
    },
    _changeExpireValue: function(e){
        this.setState({expireValue: e.target.value});
    },
    _doAjax: function(data){
        jQuery.ajax({
            type: 'POST',
            url: DAF_Settings.ajax_url,
            context: this,
            data: data,
            success: function(data){
                var self = this,
                data = JSON.parse(data);

                var params = {
                    action: "share",
                    date: data.date,
                    row: this.props.rowData
                };
                /* Update global state data. Pseudo Flux */
                jQuery(document).trigger('updateData', params);
            },
            error: function(MLHttpRequest, textStatus, errorThrown){
                alert("Ajax not enabled :(");
            }
        });
    },
    _handleCancel: function(e){
        if(e) { e.preventDefault(); }
        this.props.hideform();
    },
    _disableShare: function(){
        var data = {
            action: 'disable_sharable_draft',
            nonce: DAF_Settings.nonce,
            post_id: this.props.rowData.id
        };
        this._doAjax(data);
    },
    _handleFormSubmit: function(e){
      /* prevent default form action */
      e.preventDefault();

      var data = {
        action: 'enable_sharable_draft',
        nonce: DAF_Settings.nonce,
        post_id: this.props.rowData.id,
        time_unit: this.refs.time_unit.getDOMNode().value,
        time_value: this.state.expireValue
      };
       // Do Ajax call with values here
      this._doAjax(data);
    },
    componentDidMount: function() {
        /* Add event listeners for better usability */
        document.addEventListener('click', this._checkClickAway);
        document.addEventListener('keyup', this._keyBinding);
        /* Grab input and focus cursor */
        var input = this.refs.expireVal.getDOMNode();
        input.focus();
        utils.setCaretPosition(input, 2);
    },
    componentWillUnmount: function() {
        /* remove event listener on unmount */
        document.removeEventListener('click', this._checkClickAway);
        document.removeEventListener('keyup', this._keyBinding);
    },
    _keyBinding: function(e){
        if (e.keyCode === 13) {
            /* if Enter hit save shared/extend */
        } else if (e.keyCode === 27) {
            /* if ESC hit close dialog */
            this._handleCancel();
        }
    },
    _checkClickAway: function(e) {
        var el = this.getDOMNode();
        // Check if the target is inside the current component
        if (this.isMounted() && e.target != el && !utils.isDescendant(el, e.target)) {
            this._handleCancel();
        }
    },
    render: function(){
        var modifierText = (this.props.action === "Share") ? "for" : "by";
        return (
            <div>
                <form className="draftsforfriends-extend" onSubmit={this._handleFormSubmit} action="" method="post">
                    <input type="hidden" name="action" value="extend" />
                    <input type="hidden" name="nonce" value={DAF_Settings.nonce} />
                    <Button
                        type="submit"
                        name="draftsforfriends_submit"
                        value={this.props.action}
                        className={"action-button " + this.props.action}
                        primary={true}>
                        {this.props.action}
                    </Button>
                    <span className={"action-button " + this.props.action} >
                        {modifierText}
                    </span>
                    <input name="expires" type="text"
                         className="expire-value"
                         ref="expireVal"
                         onChange={this._changeExpireValue}
                         value={this.state.expireValue} />
                    <select name="measure" ref="time_unit">
                      <option value="minutes">minutes</option>
                      <option value="hours" selected="selected">hours</option>
                      <option value="days">days</option>
                    </select>
                    <a onClick={this._handleCancel} >
                      Cancel
                    </a>
                </form>
            </div>
        );
    }
});

module.exports = Extend;