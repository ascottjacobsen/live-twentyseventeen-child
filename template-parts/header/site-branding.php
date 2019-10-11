<?php
/**
 * Displays header site branding for CHILD THEME
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

?>
<div class="site-branding">
	<div class="site-brand-inner-wrap">
		<div class="search-and-title-container">
			<?php if ( is_active_sidebar( 'masthead-sidebar' ) ) : ?>
				<div id="search-widget-top" class="search-widget" role="complementary">
					<?php dynamic_sidebar( 'masthead-sidebar' ); ?>
				</div>
			<?php endif; ?>

			<div class="wrap">
				<!--Replace CMS logo with SVG <?php the_custom_logo(); ?> -->

				<div class="masthead-image-container">
						<?php 
						echo file_get_contents( get_stylesheet_directory_uri() . '/assets/images/gem-logo.svg' );
						?>	
				</div>


				<div class="site-branding-text">
					<?php if ( is_front_page() ) : ?>
						<h1 class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></h1>
					<?php else : ?>
						<p class="site-title"><a href="<?php echo esc_url( home_url( '/' ) ); ?>" rel="home"><?php bloginfo( 'name' ); ?></a></p>
					<?php endif; ?>

					<?php
					$description = get_bloginfo( 'description', 'display' );

					if ( $description || is_customize_preview() ) :
					?>
						<p class="site-description flext-text"><?php echo $description; ?></p>

					<?php endif; ?>

				</div><!-- .site-branding-text -->

				
				
				<?php if ( ( twentyseventeen_is_frontpage() || ( is_home() && is_front_page() ) ) && ! has_nav_menu( 'top' ) ) : ?>
				<a href="#content" class="menu-scroll-down"><?php echo twentyseventeen_get_svg( array( 'icon' => 'arrow-right' ) ); ?><span class="screen-reader-text"><?php _e( 'Scroll down to content', 'twentyseventeen' ); ?></span></a>
			<?php endif; ?>

			</div><!-- .wrap -->
		</div> <!-- .search-and-title-container -->
	</div>
	
	<!-- adding custom widget area to masthead -->
	<div id="search-widget-bottom" class="search-widget" role="complementary">
			<?php dynamic_sidebar( 'masthead-sidebar' ); ?>
			</div>

</div><!-- .site-branding -->
