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
				 <!-- <h2 class="subheading"><?php the_field('page-subheading') ?></h2> -->
		  </header>
		</div>
	</div><!-- .entry-header -->
	<div class="entry-content">
	<!-- Regular Wordpress Page Content -->
		<div class="margin-wrap">
			<?php
				the_content();

				wp_link_pages( array(
					'before' => '<div class="page-links">' . __( 'Pages:', 'twentyseventeen' ),
					'after'  => '</div>',
				) );
			?>
		</div>
	</div><!-- .entry-content -->
</article><!-- #post-## -->
