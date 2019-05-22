<?php
/**
 * Template Name: Serving Opporunity Template
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
    <section >
        <div class="form-group" id="form-group">
          <label for="exampleFormControlSelect1"><h2>Where to?</h2><p>Select a country to see how you could be part of GEM. <a href="#">Let us know</a> if you don't see what you're looking for.</p></label>
          <select class="form-control" id="country-select">
            <option>select a country</option>
            <option>UK</option>
            <option>France</option>
            <option>Germany</option>
            <option>Spain</option>
            <option>Italy</option>
            <option>Portugal</option>
            <option>Greece</option>
            <option>Macedonia</option>
            <option>Ireland</option>
            <option>Belgium</option>
            <option>The Netherlands</option>
            <option>Norway</option>
            <option>Sweden</option>
            <option>Switzerland</option>
            <option>Czech Republic</option>
            <option>Austria</option>
          </select>

      
       </div>
      </section>
			<section id="country-info-container"></section>
      

		</main><!-- #main -->
	</div><!-- #primary -->
</div><!-- .wrap -->
<?php
  function load_js() {
    wp_register_script('serving', plugins_url('serving.js', __FILE__), array('jquery')); 
    wp_enqueue_script('bye');
  }
?>
<?php get_footer();
