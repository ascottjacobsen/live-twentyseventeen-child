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
    
      <?php
      //get serving opportunities pod and build variables
      $servingPod = pods('serving_opportunity');
      $servingPod->find('name ASC', 'limit => -1');
      $countries = array();
      ?>
      <?php while ( $servingPod->fetch() ) : ?>
        <?php
          // build array of countries listed in Pods
          $country = $servingPod->field('country');
          array_push($countries, $country)
        ?>
      <?php endwhile; ?>
      
      <?php 
        //Uniquify the array and sort alphabetically
        $filteredCountries = array_unique($countries);
        natcasesort($filteredCountries);
      ?>
        <div id="map-and-sphere-grid">

            <div id="where-to-container">
              <h2>Where To?</h2>
              <p>Select a country to see how you could be a part of GEM.</p>
              <p>Or search by <span id="country-or-sphere-text">ministry sphere</span> instead:</p>
              <!-- <div id="toggle-box" class="checkbox">
                <input id="toggle-one" type="checkbox" checked data-toggle="toggle" >
                
              </div> -->

              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-secondary active">
                  <input type="radio" name="options" id="option1" autocomplete="off" checked> Search By Country
                </label>
                <label class="btn btn-secondary">
                  <input type="radio" name="options" id="option2" autocomplete="off"> Search By Ministry Sphere
                </label>
              </div>
            </div>
          <div id="the-big-map-container" class="right-align-map">
            <?php 
              echo file_get_contents( get_stylesheet_directory_uri() . '/assets/images/europe-map.svg' );
            ?>
            <?php 
              echo file_get_contents( get_stylesheet_directory_uri() . '/assets/images/gem-spheres.svg' );
            ?>
          </div>
          
        </div>
        
        <div class="form-group" id="form-group">
          <label for="exampleFormControlSelect1"><h2>Where to?</h2><p>Select a country to see how you could be part of GEM. <a href="/contact-us/?subject=interested-in-gem">Let us know</a> if you don't see what you're looking for.</p></label>
          <select class="form-control" id="country-select">
            <option value="select a country">Select a country...</option>
            <?php
              // Loop through countries array
              foreach($filteredCountries as $value){
                  echo "<option>" .  $value . "</option>";
              }
            ?>
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
