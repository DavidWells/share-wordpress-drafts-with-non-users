<?php

/**
 * Limit access based on WordPress transients
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class Drafts_For_Friends_Limit_Access {

	public static $shared_post = null;

	public function __construct() {

		add_filter('posts_results', array(__CLASS__, 'posts_results_intercept'));
		add_filter('the_posts', array(__CLASS__, 'the_posts_intercept'));

	}

	public static function posts_results_intercept($posts) {

		if (!isset($_GET['drafts_for_friends']) || count($posts) != 1 ) {
			return $posts;
		}

		$p = $posts[0];
		$status = $p->post_status;
		$access = self::check_expiration($p->ID);

		// If post is published show everyone it
		if('publish' === $status) {
			return $posts;
		}

		// if access expired and post is still a draft
		if (!$access && $status === 'draft') {
			$expired_message = __('Sorry this preview link has expired. Please contact the site owner for a new one', 'draftsforfriends');
			wp_die($expired_message);
		}

		// if not published and expiration date checks out. Show draft
		if ('publish' != $status && $access) {
			self::$shared_post = $p;
		}

		return $posts;
	}

	public static function the_posts_intercept($posts){
		if (empty($posts) && !is_null(self::$shared_post)) {
			return array(self::$shared_post);
		} else {
			self::$shared_post = null;
			return $posts;
		}
	}

	public static function check_expiration($id){
		global $post;

		$nonce_transient = get_transient( 'daf_' . $id);

		// Get time from WordPress timezone
		$time = current_time( 'timestamp', 0 );
		$now = date("Y-m-d G:i:s", $time);

		if($nonce_transient && (new DateTime($nonce_transient) > new DateTime($now))) {
			// transient exists and is still valid
			return true;

		} else {
			// link expired
			return false;
		}
	}


}

$Drafts_For_Friends_Limit_Access = new Drafts_For_Friends_Limit_Access();