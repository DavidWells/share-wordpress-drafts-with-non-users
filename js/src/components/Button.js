/**
 * Button Component
 */
var React = require('react');
var classNames = require('classnames');

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

/**
 * Class UTIL functions
 */

var classUtils = {

   mergeClasses: function(propClasses, defaultClasses, additionalClassObj) {
     var classString = '';

     //Initialize the classString with the classNames that were passed in
     if (propClasses) classString += ' ' + propClasses;

     //Add in initial classes
     if (typeof defaultClasses === 'object') {
       classString += ' ' + classNames(defaultClasses);
     } else {
       classString += ' ' + defaultClasses;
     }

     //Add in additional classes
     if (additionalClassObj) classString += ' ' + classNames(additionalClassObj);

     //Convert the class string into an object and run it through the class set
     return classNames(this.getClassSet(classString));
   },

   getClassSet: function(classString) {
     var classObj = {};

     if (classString) {
       classString.split(' ').forEach(function(className) {
         if (className) classObj[className] = true;
       });
     }

     return classObj;
   }

 };

module.exports = Button;