// Script to create map interactivity for serving opporunities page
import {showFocusCities, findCountries, addCountryHovers, addCountryClicks, dimAllCountries} from './country-hovers.js'
import {buildCountryContainer} from './container-builder.js'

let opportunitiesData = '';
let countriesWithOpportunities = '';
dimAllCountries()


window.onload = function(){
    setupAvailableCountries()

    
    
}

/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Here's the new stuff I'm working on
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

//check api for countries which have serving opportunities available
function setupAvailableCountries() {

    let requestCountries = new XMLHttpRequest();
        requestCountries.open('GET', '/wp-json/wp/v2/serving_opportunity/?per_page=100');
        requestCountries.onload = function() {
            opportunitiesData = JSON.parse(requestCountries.responseText)
            countriesWithOpportunities = findCountries(opportunitiesData)
            addCountryHovers(countriesWithOpportunities)
            addCountryClicks(countriesWithOpportunities, buildCountryContainer, document.getElementById('country-info-container'), opportunitiesData)
        }
    requestCountries.send();
        
}










/*---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
Old Stuff
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------*/



function renderHTML(data, countryName) {
    let countryContainer = document.getElementById('country-info-container');
    countryContainer.classList.add('full-width')
    let country = countryName
    
    if (country === 'UK' ) {
        country = 'United Kingdom'
    }

    buildCountryContainer(countryContainer, country, data)
}

function addDropDownSelectors() {
    let countrySelector = document.getElementById('country-select')
countrySelector.addEventListener('change', function(e){
    let country = e.target.value
          
    let requestOpportunities = new XMLHttpRequest();
    requestOpportunities.open('GET', '/wp-json/wp/v2/serving_opportunity/?per_page=100');
    requestOpportunities.onload = function() {
        let opportunityData = JSON.parse(requestOpportunities.responseText)
        renderHTML(opportunityData, country)
    }

    requestOpportunities.send();
    
})
}

jQuery(function() {
    jQuery('#country-opp-switch').bootstrapToggle({
      on: 'Enabled',
      off: 'Disabled'
    });
  })

  jQuery(document).ready(function(){
    jQuery("#country-opp-switch").click(function(){
      alert("The paragraph was clicked.");
    });
  });

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------



