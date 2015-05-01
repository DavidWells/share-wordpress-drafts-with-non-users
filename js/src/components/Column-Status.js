var React = require('react'),
moment = require('moment');
/*
  TODO  update the component logic to show times or not shared with correct classes
 */
var Status = React.createClass({

  refreshClock: function() {
    var interval = 5000;
    this.interval = setInterval(this.forceUpdate.bind(this), interval);
  },
  clearTimer: function(){

      clearInterval(this.interval);
  },
  componentWillUnmount: function() {
      this.clearTimer();
  },
  componentDidMount: function() {
      if(this.props.data && this.props.data.shared) {
        this.refreshClock();
      }
  },
  triggerUpdate: function(){
    var params = {
      action: "delete",
      row: this.props.rowData
    };
    jQuery('#stop-'+this.props.rowData.id).hide();
    if (this.isMounted()) {
      /* fix mounted issue. Invariant Violation */
      setTimeout(function() {
        jQuery(document).trigger('updateData', params);
      }, 100);

    }
  },
  render: function(){
    var spanClass = 'inactive status-row';

    if(this.props.data.time && this.props.data.shared) {
      var start = moment(),
      expireTime = moment(this.props.data.time),
      timeDiff = expireTime.diff(start),
      humanReadableTime = expireTime.from(start),
      status;

      var sharedText = (this.props.data.shared) ? <span className="shared-text">Shared</span> : "";
      status = "- Expires " + humanReadableTime;
      spanClass = 'active';
      //console.log(timeDiff);
      if(timeDiff < 1) {
         spanClass = 'inactive status-row';
         status = "- Expired " + humanReadableTime;
         this.triggerUpdate();
         this.clearTimer();
         /* todo fix invariation */

      }

    } else {
      status = "Not Shared";
      console.log('Clear the timer');
      this.clearTimer();
    }

    return (
          <span className={spanClass}>
            {sharedText} {status}
          </span>
    );

  }
});

module.exports = Status;