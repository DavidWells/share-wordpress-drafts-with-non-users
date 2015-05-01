
var utils = {
	isDescendant: function(parent, child) {
	  var node = child.parentNode;

	  while (node != null) {
	    if (node == parent) return true;
	    node = node.parentNode;
	  }

	  return false;
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
	}
};

module.exports = utils;