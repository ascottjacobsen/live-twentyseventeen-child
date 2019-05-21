// Script to create map interactivity for serving opporunities page
window.onload = function(){ 
    // Setup selectors
    let countrySelector = document.getElementById('country-select')
    
    

    //add event listeners
   
    countrySelector.addEventListener('change', function(e){
        let country = e.target.value
              
        let requestOpportunities = new XMLHttpRequest();
        requestOpportunities.open('GET', '/wp-json/wp/v2/serving_opportunity/');
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
    let noMatchContainer = document.createElement('div')
    let noMatchMessage = document.createElement('p')
    noMatchMessage.classList.add('no-match')
    noMatchMessage.innerHTML = "Sorry, we currently have no opportunities in " + (country === "United Kingdom" ? "The " + country : country) + ". Please contact us below and let us know how we can help."

    let noMatchMessageButton = document.createElement('button')
    let noMatchLink = document.createElement('a')
    noMatchLink.setAttribute('href', '/contact-us/?subject=looking-for-new-opportunities')
    noMatchLink.innerHTML = "Contact Us"
    noMatchMessageButton.appendChild(noMatchLink)

    noMatchContainer.appendChild(noMatchMessage)
    noMatchContainer.appendChild(noMatchMessageButton)

    //build individual nodes
    let countryInfo = document.createElement('div')
    countryInfo.classList.add('country-info', 'hidden-div')
    countryInfo.setAttribute('id', 'current-country-info')

    let closeContainerButton = document.createElement('span')
    closeContainerButton.innerHTML = 'x'
    closeContainerButton.classList.add('close-container')
    countryInfo.appendChild(closeContainerButton)
    

    closeContainerButton.addEventListener("click", e => {
        let nodeToClose = e.target.parentElement
        closeCountryContainer(nodeToClose)
    })

    let countryTitle = document.createElement('h2')
    countryTitle.innerHTML = country

    let opportunitiesGrid = document.createElement('div')
    opportunitiesGrid.classList.add('opportunities-grid')
    countryInfo.appendChild(countryTitle)
    countryInfo.appendChild(opportunitiesGrid)

    //add above nodes to the container
    container.appendChild(countryInfo)

    let countryOppsList = countryData.filter(opp => opp.country === country)
    countryOppsList == 0 ? countryInfo.appendChild(noMatchContainer) : buildCountryInfo(countryOppsList)

    function buildCountryInfo(countryList) {
        countryList.map(opportunity => {

            
                let featuredImageUrl = opportunity.uagb_featured_image_src.full[0] ? 'url(' + opportunity.uagb_featured_image_src.medium_large[0] + ')' : 'url(' + '/wp-content/uploads/2019/05/GEM-square-only.png' + ')'

                let oppContainer = document.createElement('div')
                let oppHero = document.createElement('div')
                let coverTitle = document.createElement('h3')
                let fullTitle = document.createElement('h3')
                let location = document.createElement('h4')
                let time = document.createElement('p')
                let description = document.createElement('p')
                let actionButton = document.createElement('button')
                let actionLink = document.createElement('a')
                
                fullTitle.innerHTML = opportunity.full_title
                location.innerHTML = opportunity.location + ' | ' + opportunity.time
                time.innerHTML = opportunity.time
                description.innerHTML = opportunity.description
                actionLink.setAttribute('href', opportunity.action_link)
                actionLink.setAttribute('target', "_blank")
                actionLink.innerHTML = "Go Now!"
                actionButton.appendChild(actionLink)

                oppContainer.classList.add('opportunity-container')
                oppHero.classList.add('opp-hero')

                oppHero.style.backgroundImage = featuredImageUrl

                oppContainer.appendChild(oppHero)
                oppContainer.appendChild(fullTitle)
                oppContainer.appendChild(location)
                // oppContainer.appendChild(time)
                oppContainer.appendChild(description)
                oppContainer.appendChild(actionButton)
                opportunitiesGrid.appendChild(oppContainer)


                
        })
    }
    setTimeout(function(){
        document.getElementById('form-group').classList.add('blur')
        countryInfo.classList.remove('hidden-div')
    }, 50)

    let page = document.getElementById('page')
    page.addEventListener('click', e => {

        if (e.target.id != "current-country-info") {
            let theParent = document.getElementById('current-country-info')
            let theChild = e.target
            
            if (!isDescendant(theParent, theChild)) {
                closeCountryContainer(countryInfo)
            }
        } 
    })
}

function closeCountryContainer (container) {
    let containerToClose = container
    containerToClose.classList.add('hidden-div')
    document.getElementById('form-group').classList.remove('blur')

    setTimeout(function() {
        containerToClose.remove()
    }, 200)

}

function isDescendant(parent, child) {
    let node = child.parentNode;
    while (node != null) {
        if (node == parent) {
            return true;
        }
        node = node.parentNode;
    }
    return false;
}