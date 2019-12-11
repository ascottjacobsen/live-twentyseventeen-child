<?php

/**
 * User added functions
 * wp_enqueue_style($handle, $src, $deps, $ver, $media)
 */


//add custom widget menus
function twentyseventeen_child_widgets_init() {
	
	// additional footer
	register_sidebar( array(
		'name'          => __( 'Footer 2', 'twentyseventeen' ),
		'id'            => 'sidebar-3',
		'description'   => __( 'Add widgets here to appear in your footer.', 'twentyseventeen' ),
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget'  => '</section>',
		'before_title'  => '<h2 class="widget-title">',
		'after_title'   => '</h2>',
	) );
	
	// search widget in jumbotron
	register_sidebar( array(
		'name'          => __( 'Masthead', 'twentyseventeen' ),
		'id'            => 'masthead-sidebar',
		'before_widget' => '<div class = "top-widget">',
		'after_widget'  => '</div>',
		'before_title'  => '<h3>',
		'after_title'   => '</h3>',
	) );

}

add_action( 'widgets_init', 'twentyseventeen_child_widgets_init' );




 function load_js_assets() {

		

		if( is_page( 'contact-us' ) ) {
			wp_enqueue_script('contact-js', '/wp-content/themes/twentyseventeen-child/assets/js/contact.js', array('jquery'), '', true);
		}
		
		if(is_page_template('serving-opportunity-page.php')) {

	
			wp_register_script('popper', 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js', '','', true);
			wp_register_script('bootstrap', 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js', '','', true);
			wp_register_script('bootstrap-toggle-js', 'https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js', '','', true);
			// wp_enqueue_script('switch-control', get_stylesheet_directory_uri().'/assets/js/serving-js/switch-control.js', array('jquery'), '', true);

			wp_register_script('serving', get_stylesheet_directory_uri().'/assets/js/serving-js/serving.js', array('popper','bootstrap', 'bootstrap-toggle-js'), '', true );
			wp_enqueue_script('serving');

			add_filter( 'script_loader_tag', 'add_type_module_to_serving', 10, 3 );
 
			function add_type_module_to_serving( $tag, $handle, $src ) {
				if ( 'serving' === $handle ) {
					$tag = '<script type="module" src="' . esc_url( $src ) . '" id="serving-js"></script>';
				}
				return $tag;
			}

		}
		
		wp_enqueue_script('fitty-dep-js', '/wp-content/themes/twentyseventeen-child/node_modules/fitty/dist/fitty.min.js', '', '', true);
		wp_enqueue_script('fitty-js', '/wp-content/themes/twentyseventeen-child/assets/js/fitty-script.js', '', '', true);
		
	
}


function enqueue_custom_styles() {
	
	if(is_page_template('serving-opportunity-page.php')) {
		wp_enqueue_style( 'twenty-seventeen-child-serving-css', '/wp-content/themes/twentyseventeen-child/assets/css/serving.css', false );
		wp_enqueue_style( 'bootstrap', 'https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css', false );
		wp_enqueue_style('bootstrap-toggle', 'https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css', false );
	}

	if(is_page('three')) {
		wp_enqueue_style( 'twenty-seventeen-child-three-css', '/wp-content/themes/twentyseventeen-child/assets/css/three.css', false );
	}
	 
}

add_action( 'wp_enqueue_scripts', 'enqueue_custom_styles' );

add_action('wp_enqueue_scripts', 'load_js_assets');
