    /** @jsx React.DOM */

var React = require('react');
var ReactApp = require('./components/ReactApp');

var mountNode = document.getElementById("react_mount");

/* bootstrap data here */

React.render(new ReactApp({gridData: WP_API_Settings.drafts }), mountNode);


jQuery(document).ready(function($) {

		$.ajax({
			type: 'POST',
			url: WP_API_Settings.ajax_url,
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

			/* WP-API not working sad face =(
  		    var dataArray = {};
  		    var urlRequest = WP_API_Settings.root+"/posts/";
  		    var typeRequest = 'GET';

  		    //first set the standard stuff
  		    dataArray["action"] = "wp_api";
  		    dataArray["post_status"] = "draft";
  		    dataArray["_wp_json_nonce"] =  WP_API_Settings.nonce;

  		    //make the post
  		    $.ajax(urlRequest,{
  		        url : urlRequest,
  		        type : typeRequest,
  		        data : dataArray,
  		        dataType: 'json',
  		        cache : false,
  		        beforeSend: function (xhr) {
  		            xhr.setRequestHeader('X-WP-Nonce', WP_API_Settings.nonce);

  		            if (beforeSend) {
  		                return beforeSend.apply(this, arguments);
  		            }
  		        },
  		        success: function(data) {
  		            console.log(data);
  		        },
  		    });
			*/

 });
