<?php

/**
 * Admin Ajax
 * Controls the enable/disable of sharable drafts
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class Drafts_For_Friends_Ajax {

	/**
	*  Initializes class
	*/
	public function __construct() {
		add_action( 'wp_ajax_enable_sharable_draft', array(__CLASS__, 'enable_sharable_draft' ));
		add_action( 'wp_ajax_stop_sharing_draft', array(__CLASS__, 'stop_sharing_draft' ));
	}
	/**
	 * Enable sharable draft
	 * Updates transient values and dates
	 */
	public static function enable_sharable_draft() {
		check_ajax_referer( 'daf_nonce', 'nonce' );

		$post_id = intval( $_POST['post_id'] );
		$time_value = intval( $_POST['time_value'] );
		$time_unit = sanitize_text_field( $_POST['time_unit'] );
		$transient_name = 'daf_' . $post_id;
		$time = current_time( 'timestamp', 0 );
		$now = date("Y-m-d G:i:s", $time);

		switch ($time_unit) {
		    case 'minutes':
		        $time_const = MINUTE_IN_SECONDS;
		        break;
		    case 'hours':
		        $time_const = HOUR_IN_SECONDS;
		        break;
		    case 'days':
		        $time_const = DAY_IN_SECONDS;
		        break;
		}

		$time_modifier = $time_value * $time_const;

		$transient = get_transient( $transient_name );

		if($transient) {

			$trans_expiration = get_option( '_transient_timeout_' . $transient_name );
			$trans_expiration_date = date('Y-m-d G:i:s',  $trans_expiration);
			$trans_expire_gmt = get_date_from_gmt( $trans_expiration_date, 'Y-m-d G:i:s' );

			$new_date = date('Y-m-d G:i:s', strtotime($trans_expire_gmt) + $time_modifier);

			$timePast  = strtotime($now);
			$timeFuture = strtotime($new_date);
			$new_expiration = ($timeFuture - $timePast);

			$expiration = $new_expiration;


		} else {

			$new_date = date('Y-m-d G:i:s',  strtotime($now) + $time_modifier);
			$expiration = $time_modifier;

		}

		set_transient( $transient_name, $new_date, $expiration );

		$set_state = array( 'status' => $new_date,
							'date' => $new_date,
							'expiration_saved'=> $expiration
						   );

		echo json_encode( $set_state );
		die();
	}
	/**
	 * disable sharable draft
	 */
	public static function stop_sharing_draft() {
		check_ajax_referer( 'daf_nonce', 'nonce' );
		$post_id = intval( $_POST['post_id'] );
		delete_transient( 'daf_' . $post_id);
		$set_state = array('status' => false );
		echo json_encode( $set_state );
		die();
	}


}

/**
*  Loads Class Pre-Init
*/
$Drafts_For_Friends_Ajax = new Drafts_For_Friends_Ajax();