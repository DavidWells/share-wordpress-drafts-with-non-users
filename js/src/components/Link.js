var React = require('react');

var LinkComponent = React.createClass({
  render: function(){
    title = (this.props.rowData.status) ? "Copy and share link" : "Not currently shared";
    url = window.location.origin + "/?p=" + this.props.rowData.id + "&drafts_for_friends=baba_8A5K&TEJ";
    return <a href={url} title={title}>{this.props.data}</a>
  }
});

module.exports = LinkComponent;