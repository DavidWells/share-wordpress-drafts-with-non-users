<?php

/**
 * Admin Ajax
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class Drafts_For_Friends_Ajax {

	/**
	*  Initializes class
	*/
	public function __construct() {
		add_action( 'wp_ajax_enable_sharable_draft', array(__CLASS__, 'enable_sharable_draft' ));
		add_action( 'wp_ajax_disable_sharable_draft', array(__CLASS__, 'disable_sharable_draft' ));
	}
	/**
	 * Generic function to return draft posts
	 * @return array of drafts
	 */
	public static function enable_sharable_draft() {
		check_ajax_referer( 'daf_nonce', 'nonce' );

		$post_id = intval( $_POST['post_id'] );
		$date = sanitize_text_field( $_POST['date'] ); //'2015-04-30 23:56:27'
		//set_transient( 'daf_258', '2015-04-30 23:56:27', 1 * HOUR_IN_SECONDS );
		/*
			define( 'MINUTE_IN_SECONDS', 60 );
			define( 'HOUR_IN_SECONDS',   60 * MINUTE_IN_SECONDS );
			define( 'DAY_IN_SECONDS',    24 * HOUR_IN_SECONDS   );
			define( 'WEEK_IN_SECONDS',    7 * DAY_IN_SECONDS    );
			define( 'YEAR_IN_SECONDS',  365 * DAY_IN_SECONDS    );
		*/
		//$time_in_seconds = abs(strtotime($date2) - strtotime($date1));
		set_transient( 'daf_' . $post_id, $date, 1 * HOUR_IN_SECONDS );

		$set_state = array('status' => $date );

		echo json_encode( $set_state );
		die();
	}

	public static function disable_sharable_draft() {
		check_ajax_referer( 'daf_nonce', 'nonce' );
		$post_id = intval( $_POST['post_id'] );
		delete_transient( 'daf_' . $post_id);
		//$set_state = array('msg' => __('Draft disbaled', 'draftsforfriends'));
		$set_state = array('status' => false );
		echo json_encode( $set_state );
		die();
	}


}

/**
*  Loads Class Pre-Init
*/
$Drafts_For_Friends_Ajax = new Drafts_For_Friends_Ajax();