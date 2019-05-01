<?php
/**
 * Displays top navigation
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.2
 */

?>
<nav id="site-navigation" class="main-navigation" role="navigation" aria-label="<?php esc_attr_e( 'Top Menu', 'twentyseventeen' ); ?>">

	<button class="menu-toggle" aria-controls="top-menu" aria-expanded="false">
		<?php
		echo twentyseventeen_get_svg( array( 'icon' => 'bars' ) );
		echo twentyseventeen_get_svg( array( 'icon' => 'close' ) );
		_e( 'Menu', 'twentyseventeen' );
		?>
	</button>

<!-- Add gem logo for scroll to menu bar -->
	<div class=logo-container>
		<svg id="menu-logo" viewBox="0 0 73.29 73.29">
			<path d="M979.57,502.84h-2.5a17.44,17.44,0,0,1,2.5,2.77Z" transform="translate(-923.84 -502.84)" style="fill:#86a83e"></path><path d="M947.68,536.47a16.94,16.94,0,0,0,5.72,7.07,16.41,16.41,0,0,0,18.05,0,17.29,17.29,0,0,0,5.74-7.12,23.91,23.91,0,0,0,0-18.68,16.59,16.59,0,0,0-5.63-7.07,15,15,0,0,0-9-2.68,15.3,15.3,0,0,0-9.12,2.71,16.59,16.59,0,0,0-5.74,7.17,23.69,23.69,0,0,0-1.92,9.45A23,23,0,0,0,947.68,536.47Z" transform="translate(-923.84 -502.84)" style="fill:#86a83e"></path><path d="M938,572.75l7-7.2a38.61,38.61,0,0,0,8.12,4,24.54,24.54,0,0,0,7.79,1.17q9.58,0,14.14-5.26a17.36,17.36,0,0,0,3.41-6.65,42.72,42.72,0,0,0,1.13-11.05,22.29,22.29,0,0,1-8,6.52,24.46,24.46,0,0,1-10.36,2,25.39,25.39,0,0,1-13.7-3.73,24.72,24.72,0,0,1-9.29-10.23,32.9,32.9,0,0,1-3.33-15,33.71,33.71,0,0,1,3.39-15.32,25.32,25.32,0,0,1,7.61-9.22h-22v73.29h19.44A39.53,39.53,0,0,1,938,572.75Z" transform="translate(-923.84 -502.84)" style="fill:#86a83e"></path><path d="M989.92,508.64l-.06,37.58c0,4.58-.13,8.32-.41,11.21a30.7,30.7,0,0,1-1.48,7.36,20.8,20.8,0,0,1-3.2,5.74,25.85,25.85,0,0,1-5.91,5.6h18.27V508.64Z" transform="translate(-923.84 -502.84)" style="fill:#86a83e"></path>
		</svg>
</div>

	<?php wp_nav_menu( array(
		'theme_location' => 'top',
		'menu_id'        => 'top-menu',
	) ); ?>

	<?php if ( ( twentyseventeen_is_frontpage() || ( is_home() && is_front_page() ) ) && has_custom_header() ) : ?>
		<a href="#content" class="menu-scroll-down"><?php echo twentyseventeen_get_svg( array( 'icon' => 'arrow-right' ) ); ?><span class="screen-reader-text"><?php _e( 'Scroll down to content', 'twentyseventeen' ); ?></span></a>
	<?php endif; ?>
</nav><!-- #site-navigation -->
