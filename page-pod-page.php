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
    <h2>hello world</h2>
			<?php
//this is normally where the WP Loop would be. Instead we add a loop to get pods stuff
  $servingPod = pods('serving_opportunity');
  $servingPod->find('name ASC');
  $countries = array("select a country");
?>
 
  <?php while ( $servingPod->fetch() ) : ?>

    <?php
      // set our variables
      $country = $servingPod->field('country');
      array_push($countries, $country)
    ?>

  <?php endwhile; ?>
  <?php $filteredCountries = array_unique($countries); ?>

<ul>
  <?php

    // Loop through countries array
    foreach($filteredCountries as $value){
        echo "<li>" .  $value . "</li>";
    }
  ?>
</ul>

		</main><!-- #main -->
	</div><!-- #primary -->
</div><!-- .wrap -->

<?php get_footer();



