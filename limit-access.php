<?php

/**
 * Admin Class
 */
class Drafts_For_Friends_Limit_Access {

	/**
	*  Initializes class
	*/
	public function __construct() {

		add_action('wp_head', array(__CLASS__, 'limit_access'));

	}

	/**
	 * Limit access to draft posts
	 * @return null
	 */
	public static function limit_access() {

		// if GET param matches and validates with options show draft
		if (!isset($_GET['drafts_with_friends'])) {
			return;
		}

		// validate the key with options

	}

}

/**
*  Loads Class Pre-Init
*/
$Drafts_For_Friends_Limit_Access = new Drafts_For_Friends_Limit_Access();