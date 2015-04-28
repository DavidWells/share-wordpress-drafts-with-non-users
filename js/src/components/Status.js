var React = require('react'),
SetIntervalMixin = require('./mixins/set-interval-mixin.js'),
moment = require('moment');

var Status = React.createClass({
  refreshClock: function() {
    var interval = 60000;
    this.interval = setInterval(this.forceUpdate.bind(this), interval);
  },
  clearTimer: function(){
      clearInterval(this.interval);
  },
  componentWillUnmount: function() {
      this.clearTimer();
  },
  componentDidMount: function() {
      console.log('tets');
      if(this.props.data) {
        this.refreshClock();
      }
  },
  render: function(){
    var spanClass = 'inactive';
    if(this.props.data) {
      var start = moment(),
      expireTime   = moment(this.props.data),
      timeDiff = expireTime.diff(start),
      humanReadableTime = expireTime.from(start),
      status;
      //console.log(start);
      //console.log(timeDiff);
      // If timeDiff is
      if (timeDiff > 0) {
        status = "Expires " + humanReadableTime;
        spanClass = 'active';
      } else {
        status = "Not Shared";
        console.log('Clear the timer');
        this.clearTimer();
      }

    } else {
      status = "Not Shared";
    }

    return (<span className={spanClass}>{status}</span>);

  }
});

module.exports = Status;