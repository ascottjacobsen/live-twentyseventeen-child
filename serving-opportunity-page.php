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
        <div class="form-group">
          <label for="exampleFormControlSelect1">Select Country</label>
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
			<section id="country-info-container">
      
        <!-- <div class="country-info hidden-div" id="UK">
          <span class="close-container">x</span>
          <h2>United Kingdom</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti iure doloribus maiores suscipit repellendus cumque numquam quod. Voluptatum hic ad atque reprehenderit exercitationem, et accusamus rem iste similique quo ab?   
          </p>
        </div>
        <div class="country-info hidden-div" id="France">
          <span class="close-container">x</span>
          <h2>France</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti iure doloribus maiores suscipit repellendus cumque numquam quod. Voluptatum hic ad atque reprehenderit exercitationem, et accusamus rem iste similique quo ab?
            </p>
          </div>
        <div class="country-info hidden-div" id="Germany">
          <span id="close-container">x</span>
          <h2>Germany</h2>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti iure doloribus maiores suscipit repellendus cumque numquam quod. Voluptatum hic ad atque reprehenderit exercitationem, et accusamus rem iste similique quo ab?
            </p>
        </div> -->
      </section>
      

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
