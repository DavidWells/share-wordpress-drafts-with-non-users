var React = require('react');

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
  		url: WP_API_Settings.ajax_url,
  		context: this,
  		data: data,
  		success: function(data){
  			var self = this,
  			data = JSON.parse(data);
  			console.log(data.status);
  			this.setState({status: data.status});
  		},
  		error: function(MLHttpRequest, textStatus, errorThrown){
  			alert("Ajax not enabled :(");
  		}
  	});
  },
  _handleCancel: function(e){
  	if(e) {
  		e.preventDefault();
  	}
  	this.props.hideform();
  },
  _disableShare: function(){
	  	var data = {
				action: 'disable_sharable_draft',
				nonce: WP_API_Settings.nonce,
				post_id: this.props.rowData.id
		};
  		this._doAjax(data);
  },
  _extendShare: function(){
  	      	var data = {
  					action: 'enable_sharable_draft',
  					nonce: WP_API_Settings.nonce,
  					post_id: this.props.rowData.id,
  					date: "2015-04-28 23:56:27"
  			};
  			//this._doAjax(data);
  			this._doAjax(data);
  },
  _handleFormSubmit: function(e){
  	   e.preventDefault();
  	   console.log(e);
  },
  setCaretPosition: function (ctrl, pos) {
      if(ctrl.setSelectionRange){
        ctrl.focus();
        ctrl.setSelectionRange(pos,pos);
      } else if (ctrl.createTextRange) {
        var range = ctrl.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
      }
  },
  componentDidMount: function() {
    document.addEventListener('click', this._checkClickAway);
    /* Grab input and focus cursor */
    var input = this.refs.expireVal.getDOMNode();
    input.focus();
    this.setCaretPosition(input, 2);
  },
  componentWillUnmount: function() {
  	/* remove event listener on unmount */
    document.removeEventListener('click', this._checkClickAway);
  },
  isDescendant: function(parent, child) {
    var node = child.parentNode;

    while (node != null) {
      if (node == parent) return true;
      node = node.parentNode;
    }

    return false;
  },
  _checkClickAway: function(e) {
    var el = this.getDOMNode();

    // Check if the target is inside the current component
    if (this.isMounted() &&
      e.target != el &&
      !this.isDescendant(el, e.target)) {
      if (this._handleCancel) this._handleCancel();
    }
  },
  render: function(){
  	var modifierText = (this.props.action === "Share") ? "for" : "by";
    return (
          <div>
           <form className="draftsforfriends-extend" onSubmit={this._handleFormSubmit} action="" method="post">
					<input type="hidden" name="action" value="extend" />
					<input type="hidden" name="nonce" value={WP_API_Settings.nonce} />
					<input type="submit" className="button" name="draftsforfriends_extend_submit" value={this.props.action} />
					<span>{modifierText}</span>
           			<input name="expires" type="text" size="3"
           				   ref="expireVal"
           				   onChange={this._changeExpireValue}
           				   value={this.state.expireValue} />
           			<select name="measure">
           				<option value="m">minutes</option>
           				<option value="h" selected="selected">hours</option>
           				<option value="d">days</option>
           			</select>
           			<a className="draftsforfriends-extend-cancel" onClick={this._handleCancel} >
           				Cancel
           			</a>
          </form>
          </div>
    );
  }
});

module.exports = Extend;