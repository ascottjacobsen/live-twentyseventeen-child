<?php
/**
 * Template part for displaying page content in page.php
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

?>

<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

<!-- Set Featured Image as variable for entry header background -->

<?php $backgroundImg = wp_get_attachment_image_src( get_post_thumbnail_id($post->ID), 'full' );?>

<!-- Build header div and set background to featured image -->
	<div class="header-wrap" style="background: url('<?php echo $backgroundImg[0]; ?>') no-repeat; background-size: cover; background-attachment: fixed;">
		<div class="wrap-bg-overlay">
			<header class="entry-header-bg-image">
		     <h1 class="entry-title"><?php the_title(); ?></h1>
				 <h2 class="subheading"><?php the_field('page-subheading') ?></h2>
		  </header>
		</div>
	</div><!-- .entry-header -->
	<div class="entry-content">


		<!-- Regular Wordpress Page Content -->
		<!-- <div class="section-container">
			<div class="section-container-content"> -->
				 <!-- <?php
					the_content();

					wp_link_pages( array(
						'before' => '<div class="page-links">' . __( 'Pages:', 'twentyseventeen' ),
						'after'  => '</div>',
					) );
				?> -->
			<!-- </div>
		</div> -->


		<!-- Sections added with Advanced Custom Fields -->
		<!-- Section 1 -->
		<div class="section-container" id="section-container-1">
			<div class="section-container-content">
				<?php
					$image = get_field('section-1-image');
					$size = 'medium'; // (thumbnail, medium, large, full or custom size)

					if( $image ) {

						echo wp_get_attachment_image( $image, $size );

					}
				?>
				<h2><?php the_field('section-1-title') ?></h2>

				<p><?php the_field('section-1-article') ?></p>
			</div>
		</div>

		<!-- Section 2 -->
		<div class="section-container" id="section-container-2">
			<div class="section-container-content">
				<?php
					$image = get_field('section-2-image');
					$size = 'medium'; // (thumbnail, medium, large, full or custom size)

					if( $image ) {

						echo wp_get_attachment_image( $image, $size );

					}
				?>
				<h2><?php the_field('section-2-title') ?></h2>

				<p><?php the_field('section-2-article') ?></p>
			</div>
		</div>

		<!-- Section 3 -->
		<div class="section-container" id="section-container-3">
			<div class="section-container-content">
				<?php
					$image = get_field('section-3-image');
					$size = 'medium'; // (thumbnail, medium, large, full or custom size)

					if( $image ) {

						echo wp_get_attachment_image( $image, $size );

					}
				?>
				<h2><?php the_field('section-3-title') ?></h2>

				<p><?php the_field('section-3-article') ?></p>
			</div>
		</div>


	</div><!-- .entry-content -->
</article><!-- #post-## -->
