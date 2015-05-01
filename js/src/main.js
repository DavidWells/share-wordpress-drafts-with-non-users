    /** @jsx React.DOM */

var React = require('react');
var ReactApp = require('./components/ReactApp');

var mountNode = document.getElementById("react_mount");

/* bootstrap data here */

React.render(new ReactApp({gridData: DAF_Settings.drafts }), mountNode);


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

			},

			error: function(MLHttpRequest, textStatus, errorThrown){
				alert("Ajax not enabled :(");
			}
		});

 });
