/**
 * Button Component
 */
var React = require('react');
var classUtils = require('./utils/classes.js');

var Button = React.createClass({

  propTypes: {
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    className: React.PropTypes.string,
    href: React.PropTypes.string,
    target: React.PropTypes.string,
    primary: React.PropTypes.bool,
    onClick: React.PropTypes.func,
    label: function(props, propName, componentName){
          if (!props.children && !props.label) {
            return new Error('Warning: Required prop `label` or `children` was not specified in `'+ componentName + '`.')
          }
    },
  },

  render: function() {
    var isLink = (this.props.href) ? true : false,
    children = (this.props.label) ? <span className="button-label">{this.props.label}</span> : this.props.children;

    var classes = classUtils.mergeClasses(this.props.className, 'button', {
          'button-primary': !this.props.disabled && this.props.primary,
    });

    var buttonProps = {
      className: classes,
      disabled: this.props.disabled
    };

    if (this.props.disabled && isLink) {
      return (
        <span
          className={classes}
          disabled={this.props.disabled}>
          {children}
        </span>
      );
    }

    if(isLink) {
        return (
          <a href={this.props.href}
             className={classes}
             disabled={this.props.disabled}
             onClick={this.props.onClick} >
            {children}
          </a>
        );
    } else {
      return (
          <button className={classes} id={this.props.id} disabled={this.props.disabled} onClick={this.props.onClick} >
                {children}
          </button>
      );
    }
  }

});

module.exports = Button;