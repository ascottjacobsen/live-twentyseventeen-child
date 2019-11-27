// Script to create map interactivity for serving opporunities page
import {
  showFocusCities,
  findCountries,
  addCountryHovers,
  addCountryClicks,
  dimAllCountries
} from "./country-hovers.js";

import { buildCountryContainer } from "./container-builder.js";

import {findSpheres} from "./spheres.js"

let opportunitiesData = "";
let countriesWithOpportunities = "";
let spheresWithOpportunities = "";
dimAllCountries();

//Setup Switch
jQuery('#toggle-one').bootstrapToggle({
    on: 'Search By Spheres',
    off: 'Search By Country',
    offstyle: 'info',
    style: 'ios'
});

window.onload = function() {
  setupAvailableCountriesAndSpheres();
  addSwitchListener()
};

//check api for countries which have serving opportunities available
function setupAvailableCountriesAndSpheres() {
  let requestCountries = new XMLHttpRequest();
  requestCountries.open(
    "GET",
    "https://gemission.org.uk/wp-json/wp/v2/serving_opportunity/?per_page=100"
  );
  requestCountries.onload = function() {
    opportunitiesData = JSON.parse(requestCountries.responseText);
    countriesWithOpportunities = findCountries(opportunitiesData);
    spheresWithOpportunities = findSpheres(opportunitiesData)
    addCountryHovers(countriesWithOpportunities);
    addCountryClicks(
      countriesWithOpportunities,
      buildCountryContainer,
      document.getElementById("country-info-container"),
      opportunitiesData
    );
  };
  requestCountries.send();
}

function hideTheMapOrTheSpheres(element) {
  let svgToHide = element;
  svgToHide.classList.add("hidden-svg");
}

function showTheMapOrTheSpheres(element) {
  let svgToShow = element;
  svgToShow.classList.remove("hidden-svg");
}

function addSwitchListener () {
    let button1 = document.getElementById('option1')
    let button2 = document.getElementById('option2')

    button2.parentElement.addEventListener('click', function () {
        document.getElementById('Map').classList.add('hide')
        document.getElementById('the-spheres').classList.remove('hide')
        setTimeout( function () {
          hideTheMapOrTheSpheres(document.getElementById('Map'))
          showTheMapOrTheSpheres(document.getElementById('the-spheres'))
        }, 10)

        document.getElementById('the-big-map-container').classList.remove('right-align-map')
        document.getElementById('the-big-map-container').classList.add('center-spheres')
        document.getElementById('the-spheres').classList.add('animated-graphic')        
        document.getElementById('country-or-sphere-text').innerHTML = 'country'
    })

    button1.parentElement.addEventListener('click', function () {
      document.getElementById('the-spheres').classList.add('hide')
      document.getElementById('Map').classList.remove('hide')
      setTimeout( function () {
        hideTheMapOrTheSpheres(document.getElementById('the-spheres'))
        showTheMapOrTheSpheres(document.getElementById('Map'))
      }, 10)
        document.getElementById('the-big-map-container').classList.add('right-align-map')
        document.getElementById('the-big-map-container').classList.remove('center-spheres')
        document.getElementById('Map').classList.add('animated-graphic') 
        document.getElementById('country-or-sphere-text').innerHTML = 'ministry sphere'
    })
}