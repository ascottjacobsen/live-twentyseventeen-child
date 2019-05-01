<?php
/**
 * Template Name: Pod Page Template
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package WordPress
 * @subpackage Twenty_Seventeen
 * @since 1.0
 * @version 1.0
 */

get_header(); ?>

<div class="wrap-full-page">
	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">

			<?php
//this is normally where the WP Loop would be. Instead we add a loop to get pods stuff
  $mypod = pods('serving-opportunities');
  $mypod->find('name ASC');
?>
 
  <?php while ( $mypod->fetch() ) : ?>

    <?php
      // set our variables
      $name= $mypod->field('name');
      $permalink= $mypod->field('permalink');
    ?>
<div id="<?php echo $permalink; ?>" class="slide">

<h1><a href="<?php echo $permalink; ?>"><?php echo $name; ?></a></h1>

</div><!-- close -->
<?php endwhile; ?>

		</main><!-- #main -->
	</div><!-- #primary -->
</div><!-- .wrap -->

<?php get_footer();
