<?php
/**
 * Template Name: About Page
 *
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

get_header(); ?>

<div class="wrap">
	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<?php
			while ( have_posts() ) : the_post();

				get_template_part( 'template-parts/page/content', 'page' );


				// If comments are open or we have at least one comment, load up the comment template.
				if ( comments_open() || get_comments_number() ) :
					comments_template();
				endif;

			endwhile; // End of the loop.
			?>


			<!-- by AJ - build staff list outside of editable content area -->
			<div id="staff-list">
				<h3>Our Team</h3>

				<?php

					echo do_shortcode('[simple-staff-list image_size=thumbnail]');

				 ?>


			</div>


			<hr />

			<div>
				Greater Europe Mission UK
				Unit 3 Turner's Ln.
				Brierley Hill West Midlands DY5 2PG

				<a href="mailto:info@gemission.org.uk">info@gemission.org.uk</a>

				+44 (0)138 438 7013
			</div>

			<div id="map">
				<iframe style="border: 0;" 	src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d9487.51587197547!2d-2.1315244349782065!3d52.47687741447534!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x18108b0cccee43c7!2sGreater+Europe+Mission+UK!5e0!3m2!1sen!2sus!4v1529920099993" width="600" height="450" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
			</div>

			<hr />

		</main><!-- #main -->
	</div><!-- #primary -->
</div><!-- .wrap -->

<?php get_footer();
