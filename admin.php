<?php

/**
 * Admin Class
 */

// Exit if accessed directly
if ( ! defined( 'ABSPATH' ) ) exit;

class Drafts_For_Friends_Admin {

	/**
	*  Initializes class
	*/
	public function __construct() {

		add_action('admin_menu', array(__CLASS__, 'add_admin_pages'));
		add_action('admin_enqueue_scripts', array( __CLASS__ , 'enqueue_files' ) );
		add_action( 'wp_ajax_nopriv_drafts_for_friends_ajax', array(__CLASS__, 'get_drafts' ));
		add_action( 'wp_ajax_drafts_for_friends_ajax', array(__CLASS__, 'get_drafts' ));
		//add_action('admin_menu', array( __CLASS__ , 'add_sub_menus' ) );
	}

		/**
		*  Adds sub-menus to 'Calls to Action'
		*/
	public static function add_admin_pages() {

		//add_submenu_page('edit.php', __( 'Drafts for Friends' , 'draftsforfriends' ), __( 'Drafts for Friends' , 'draftsforfriends' ) , 'manage_options', 'mountPoint', 100);

		add_submenu_page("edit.php",
						__('Drafts for Friends', 'draftsforfriends'),
						__('Drafts for Friends', 'draftsforfriends'),
						'manage_options',
						'drafts_with_friends',
						array(__CLASS__, 'mountPoint'));

	}

	public static function localize_javascript_text(){

		$words = array(
			'settings' => __('Settings', 'draftsforfriends'),
			'filter' => __('Filter Results', 'draftsforfriends'),
			'stop_sharing' => __('Stop Sharing', 'draftsforfriends'),
			'type_of_post' => __('Type of Post', 'draftsforfriends')
		);

		return $words;
	}

	/**
	 *  Enqueues scripts and styles
	 */
	public static function enqueue_files($hook) {
		global $post;

		$screen = get_current_screen();
		$ver = DRAFTS_FOR_FRIENDS_CURRENT_VERSION;

		if ( ( isset($screen) && $screen->id != 'posts_page_drafts_with_friends' ) ){
			return;
		}

		/* load styles */
		wp_enqueue_script('drafts-for-friends', DRAFTS_FOR_FRIENDS_URLPATH . 'js/build/main.js', array(), $ver, true );
		wp_localize_script( 'drafts-for-friends',
							'WP_API_Settings',
							array(	'root' => esc_url_raw( get_json_url() ),
									'nonce' => wp_create_nonce( 'daf_nonce' ),
									'ajax_url' => admin_url( 'admin-ajax.php' ),
									'localization' => self::localize_javascript_text(),
									'drafts' => self::get_drafts() ) );
		/* load styles */
		wp_enqueue_style('wp-cta-css-post-new', DRAFTS_FOR_FRIENDS_URLPATH . 'css/daf.css');

	}
	/**
	 * React Mount Point
	 * @return null
	 */
	public static function mountPoint() { ?>
		<div class="wrap">
			<div id="react_mount"></div>
		</div>

	<?php }

	/**
	 * Retrieve the human-friendly expiration time
	 *
	 * @access  public
	 * @return  string
	 * @since   1.0
	*/
	public static function get_transient_expiration( $name ) {

		$time_now   = time();
		$expiration = get_option( '_transient_timeout_' . $name );

		if( empty( $expiration ) ) {
			return __( 'Does not expire', 'pw-transients-manager' );
		}

		if( $time_now > $expiration ) {
			return __( 'Expired', 'pw-transients-manager' );
		}
		return human_time_diff( $time_now, $expiration );

	}
	/**
	 * Generic function to return draft posts
	 * @return array of drafts
	 */
	public static function get_drafts() {

		$post_types = get_post_types( '', 'names' );

		$posts = get_posts( array(
		       'posts_per_page'   => -1,
		       'orderby'          => 'title',
		       'order'            => 'ASC',
		       'post_type'        => $post_types,
		       'post_status'      => array( 'draft' )
		) );

	   $list = array();

	   foreach ( $posts as $post ) {
	   		//print_r($post);
	   	   $transient = get_transient( 'daf_' . $post->ID);
	   	   $test = self::get_transient_expiration('daf_' . $post->ID);

	   	   /* _no_transient flag for initial table sort and state */
	   	   $status = ($transient) ? $test : "no_transient";
	       $list[] = array(
	           'id'   => $post->ID,
	           'title' => $post->post_title,
	           'status' => $status,
	           'actions' => "", // stub for action column
	           'type of post' => $post->post_type // stub for action column
	       );
	   }
	   /* Thanks dWalsh! http://davidwalsh.name/detect-ajax */
	   if(!empty($_SERVER['HTTP_X_REQUESTED_WITH']) && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
	   		/* special ajax here */
	   		echo json_encode( $list );
	   		die();
	   }

	   return $list;
	}


}

/**
*  Loads Class Pre-Init
*/
$Drafts_For_Friends_Admin = new Drafts_For_Friends_Admin();