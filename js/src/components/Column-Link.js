var React = require('react'),
utils = require('./utils/utils.js');

var LinkComponent = React.createClass({
    getInitialState: function() {
        return {
            showlink: false
        };
    },
    componentDidMount: function() {
        document.addEventListener('click', this._checkClickAway);
        document.addEventListener('keyup', this._keyBinding);
    },
    componentWillUnmount: function() {
        /* remove event listener on unmount */
        document.removeEventListener('click', this._checkClickAway);
        document.removeEventListener('keyup', this._keyBinding);
    },
    _keyBinding: function(e){
        if (e.keyCode === 27) {
            this._hideLink();
        }
    },
    _checkClickAway: function(e) {
        var el = this.getDOMNode();
        // Check if the target is inside the current component
        if (this.isMounted() && e.target != el && !utils.isDescendant(el, e.target)) {
            this._hideLink();
        }
    },
    _hideLink: function(){
        if(this.state.showlink){
            this.setState({
                showlink: false
            });
        }
    },
    showLinkInput: function(){
        this.setState({
            showlink: !this.state.showlink
        });
    },
    render: function(){
        var shared = this.props.rowData.status.shared,
        showLink = this.state.showlink,
        titleAttr = (shared) ? "Copy and share link" : "Not currently shared. View draft",
        dashicon = (showLink) ? " dashicons-no-alt" : " dashicons-admin-links",
        urlRoot = window.location.origin + "/?p=" + this.props.rowData.id,
        url = (shared) ? urlRoot + "&drafts_for_friends=baba_8A5KTEJ" : urlRoot,
        linkInput = (showLink) ? <input value={url} readonly /> : "",
        classes = "grid dashicons " + dashicon,
        icons;

        if(shared) {
            icons = (
                <span
                    title="Click to grab link"
                    className={classes}
                    onClick={this.showLinkInput}>
                </span>
            );
        }

        var title = (!showLink) ? <a href={url} target="_blank" title={titleAttr}>{this.props.data}</a> : "";

        return (
            <div>
                {icons}
                {title}
                {linkInput}
            </div>
        );
    }
});

module.exports = LinkComponent;