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


 wp_register_script('handlebars', '/wp-content/themes/twentyseventeen-child/assets/js/serving-js/handlebars-v4.1.2.js');

 function load_js_assets() {

		if( is_page( 'contact-us' ) ) {
			wp_enqueue_script('contact-js', '/wp-content/themes/twentyseventeen/assets/js/contact.js', array('jquery'), '', true);
		}
		
		if(is_page('serving-opportunities') ) {
			wp_enqueue_script('serving-js', '/wp-content/themes/twentyseventeen-child/assets/js/serving-js/serving.js', array('jquery', 'wp-api', 'handlebars'), '', true);
		}

		if(is_page('serving-opportunities') ) {
			wp_enqueue_script('fadein-js', '/wp-content/themes/twentyseventeen-child/assets/js/serving-js/fadein.js', array('jquery'), '', true);
		}

		if( is_page('home')) {
			wp_enqueue_script('flext-text-js', '/wp-content/themes/twentyseventeen-child/assets/js/flext-text.js', '', true);
		}
	
}


function enqueue_custom_styles() {
	
	if(is_page('serving-opportunities')) {
		wp_enqueue_style( 'twenty-seventeen-child-serving-css', '/wp-content/themes/twentyseventeen-child/assets/css/serving.css', false );
	}

	if(is_page('three')) {
		wp_enqueue_style( 'twenty-seventeen-child-serving-css', '/wp-content/themes/twentyseventeen-child/assets/css/three.css', false );
	}
	 
}

add_action( 'wp_enqueue_scripts', 'enqueue_custom_styles' );

add_action('wp_enqueue_scripts', 'load_js_assets');
