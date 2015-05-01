/**
 * Main react entry point
 * Mounts the react app in the dom
 */
var React = require('react'),
ReactApp = require('./components/ReactApp'),
mountNode = document.getElementById("react_mount");

/* bootstrap react app here */
React.render(new ReactApp({gridData: DAF_Settings.drafts }), mountNode);

/*
jQuery(document).ready(function($) {
		$.ajax({
			type: 'POST',
			url: DAF_Settings.ajax_url,
			context: this,
			data: {
				action: 'drafts_for_friends_ajax',
			},
			success: function(data){
				var self = this;
				console.log(data);
				// do hydration on client
			},

			error: function(MLHttpRequest, textStatus, errorThrown){
				alert("Ajax not enabled :(");
			}
		});
 });
*/
