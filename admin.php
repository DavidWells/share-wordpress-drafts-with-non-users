<?php

/**
 * Admin Class
 */
class Drafts_For_Friends_Admin {

	/**
	*  Initializes class
	*/
	public function __construct() {

		self::load_hooks();
		add_action('admin_menu', array(__CLASS__, 'add_admin_pages'));
		add_action( 'wp_ajax_nopriv_drafts_for_friends_ajax', array(__CLASS__, 'drafts_for_friends_ajax' ));
		add_action( 'wp_ajax_drafts_for_friends_ajax', array(__CLASS__, 'drafts_for_friends_ajax' ));
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

	/**
	*  Loads hooks and filters
	*/
	public static function load_hooks() {
		add_action('admin_enqueue_scripts', array( __CLASS__ , 'enqueue_files' ) );
	}

	/**
	 *  Enqueues scripts and styles related to wp-call-to-action post type and cta settings pages
	 */
	public static function enqueue_files( $hook ) {
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
									'nonce' => wp_create_nonce( 'wp_json' ),
									'ajax_url' => admin_url( 'admin-ajax.php' ),
									'drafts' => self::drafts_for_friends_ajax() ) );
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
	 * Generic function to return draft posts
	 * @return array of drafts
	 */
	public static function drafts_for_friends_ajax() {
	$posts = get_posts( array(
	       'posts_per_page'   => -1,
	       'orderby'          => 'title',
	       'order'            => 'ASC',
	       'post_type'        => 'post',
	       'post_status'      => array( 'draft' )
	   ) );

	   $list = array();
	   foreach ( $posts as $post ) {
	       $list[] = array(
	           'id'   => $post->ID,
	           'name' => $post->post_title,
	           'link' => get_permalink( $post->ID ),
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