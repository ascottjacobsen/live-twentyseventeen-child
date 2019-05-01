// Script to create map interactivity for serving opporunities page
window.onload = function(){ 
    // Setup selectors
    let prevCountry;
    let countrySelector = document.getElementById('country-select')
    

    //add event listener for drop down
    countrySelector.addEventListener('change', function(e){
        let country = e.target.value
              
        let requestOpportunities = new XMLHttpRequest();
        requestOpportunities.open('GET', 'http://dev.gemuk.dev.cc/wp-json/wp/v2/serving_opportunity/');
        requestOpportunities.onload = function() {
            let opportunityData = JSON.parse(requestOpportunities.responseText)
            renderHTML(opportunityData, country)
        }

        requestOpportunities.send();

    })
}

function renderHTML(data, countryName) {
    let countryContainer = document.getElementById('country-info-container');
    let country = countryName
    
    if (country === 'UK' ) {
        country = 'United Kingdom'
    }

    buildCountryContainer(countryContainer, country, data)

    
}

function buildCountryContainer(container, country, countryData) {
    
    //build node to return message if no matches found
    let matchCounter = 0;
    let noMatchMessage = document.createElement('p')
    noMatchMessage.classList.add('no-match')
    noMatchMessage.innerHTML = "Sorry, we currently have no opportunities in that country."

    //build individual nodes
    let countryInfo = document.createElement('div')
    countryInfo.classList.add('country-info')

    let closeContainer = document.createElement('span')
    closeContainer.innerHTML = 'x'
    closeContainer.classList.add('close-container')
    countryInfo.appendChild(closeContainer)
    closeContainer.addEventListener("click", function(e){
        countryInfo.classList.add('hidden-div');
        // countryInfo.remove();
    })

    let countryTitle = document.createElement('h2')
    countryTitle.innerHTML = country
    countryInfo.appendChild(countryTitle)

    //add above nodes to the container
    container.appendChild(countryInfo)

    countryData.map(opportunity => {
        if (opportunity.country === country) {
            matchCounter++
        }
    })

    if (matchCounter == 0 ) {
        countryInfo.appendChild(noMatchMessage)
    } else {
        countryData.map(opportunity => {
            if (opportunity.country === country) {
                let description = document.createElement('p')
                description.innerHTML = opportunity.description
                countryInfo.appendChild(description)

            }

        })
    }

}



//create div and header for the country information
    // let countryInfo = document.createElement('div');
    // countryInfo.classList.add('country-info',)

    // let closeContainer = document.createElement('span')
    // closeContainer.innerHTML = 'x'
    // closeContainer.classList.add('close-container')
    
    // let countryInfoTitle = document.createElement('h2')
    // countryInfoTitle.innerHTML = country;

    // let countryInfoDetails = document.createElement('div')

    // countryInfo.appendChild(closeContainer)
    // countryInfo.appendChild(countryInfoTitle)
    // countryInfo.appendChild(countryInfoDetails)
    // countryContainer.appendChild(countryInfo)

    // closeContainer.addEventListener("click", function(e){
    //     countryInfo.classList.add('hidden-div');
    //     countryInfo.remove();
    // })


    // data.map(opportunity => {

    //     if (opportunity.country === country) {
    //         console.log('match! ' + opportunity.country + ' is the same as ' + country)
    //     }

    //     else {
    //         console.log('sorry, ' + country + ' doesn\'t contain any matches :(')
    //     }
        
    //     let opportunityContainer = document.createElement('div')

    //     let opportunityCountry = document.createElement('h3')
    //     opportunityCountry.innerHTML = opportunity.country

    //     let description = document.createElement('p')
    //     description.innerHTML = opportunity.description

    //     //build opportunity container
    //     opportunityContainer.appendChild(opportunityCountry)
    //     // opportunityContainer.appendChild(species)
    //     opportunityContainer.appendChild(description)
    //     // opportunityContainer.appendChild(dislikes)

    //     //add opportunity container to countryInfoDetails
    //     countryInfoDetails.appendChild(opportunityContainer)
        
        

    // })

    // countryContainer.appendChild(countryInfo)
