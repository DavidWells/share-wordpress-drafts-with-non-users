<?php
/*
Plugin Name: Drafts for Friends
Plugin URI: http://davidwells.io
Description: Now you don't need to add friends as users to the blog in order to let them preview your drafts
Author: David Wells
Version: 1.0.0
Author URI: http://davidwells.io
Text Domain: draftsforfriends
Domain Path: /lang/
*/

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

if ( !class_exists('Drafts_For_Friends_Plugin')	) {

	final class Drafts_For_Friends_Plugin {

		/**
		* Main Drafts_For_Friends_Plugin Instance
		*/
		public function __construct() {
			self::define_constants();
			self::load_classes();
			self::load_text_domain_init();
		}

		/*
		* Setup plugin constants
		*/
		private static function define_constants() {

			define('DRAFTS_FOR_FRIENDS_CURRENT_VERSION', '1.0.0' );
			define('DRAFTS_FOR_FRIENDS_PATH', WP_PLUGIN_DIR.'/'.plugin_basename( dirname(__FILE__) ).'/' );
			define('DRAFTS_FOR_FRIENDS_URLPATH',  plugins_url( '/', __FILE__ ) );
			define('DRAFTS_FOR_FRIENDS_SLUG', plugin_basename( dirname(__FILE__) ) );
			define('DRAFTS_FOR_FRIENDS_FILE', __FILE__ );
		}

		/**
		*  Load php classes
		*/
		private static function load_classes() {

			if (is_admin()) {
				/* Admin Only */
				include_once( DRAFTS_FOR_FRIENDS_PATH . 'inc/admin.php');
				include_once( DRAFTS_FOR_FRIENDS_PATH . 'inc/admin-ajax.php');

			} else {
				/* Frontend Only */
				include_once( DRAFTS_FOR_FRIENDS_PATH . 'inc/limit-access.php');
			}

		}

		/**
		*	Loads the correct .mo file for this plugin
		*/
		private static function load_text_domain_init() {
			add_action( 'init' , array( __CLASS__ , 'load_text_domain' ) );
		}

		public static function load_text_domain() {
			load_plugin_textdomain( 'draftsforfriends' , false , DRAFTS_FOR_FRIENDS_SLUG . '/languages/' );
		}

		/*** START PHP VERSION CHECKS ***/
		/**
		 * Admin notices, collected and displayed on proper action
		 *
		 * @var array
		 */
		public static $notices = array();

		/**
		 * Whether the current PHP version meets the minimum requirements
		 *
		 * @return bool
		 */
		public static function is_valid_php_version() {
			return version_compare( PHP_VERSION, '5.2', '>=' );
		}

		/**
		 * Invoked when the PHP version check fails. Load up the translations and
		 * add the error message to the admin notices
		 */
		static function fail_php_version() {
			self::notice( __( 'Drafts for Friends and WordPress require PHP version 5.2+, plugin is currently NOT ACTIVE.', 'draftsforfriends' ) );
		}

		/**
		 * Handle notice messages according to the appropriate context (WP-CLI or the WP Admin)
		 *
		 * @param string $message
		 * @param bool $is_error
		 * @return void
		 */
		public static function notice( $message, $is_error = true ) {
			if ( defined( 'WP_CLI' ) ) {
				$message = strip_tags( $message );
				if ( $is_error ) {
					WP_CLI::warning( $message );
				} else {
					WP_CLI::success( $message );
				}
			} else {
				// Trigger admin notices
				add_action( 'all_admin_notices', array( __CLASS__, 'admin_notices' ) );

				self::$notices[] = compact( 'message', 'is_error' );
			}
		}

		/**
		 * Show an error or other message in the WP Admin
		 *
		 * @action all_admin_notices
		 * @return void
		 */
		public static function admin_notices() {
			foreach ( self::$notices as $notice ) {
				$class_name	= empty( $notice['is_error'] ) ? 'updated' : 'error';
				$html_message = sprintf( '<div class="%s">%s</div>', esc_attr( $class_name ), wpautop( $notice['message'] ) );
				echo wp_kses_post( $html_message );
			}
		}
		/*** END PHP VERSION CHECKS ***/

	}

	/* Initiate Plugin */
	if ( Drafts_For_Friends_Plugin::is_valid_php_version() ) {
		$Drafts_For_Friends_Plugin = new Drafts_For_Friends_Plugin;
	} else {
		Drafts_For_Friends_Plugin::fail_php_version();
	}

}